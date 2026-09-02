import json
import base64
import hmac
import hashlib
from typing import Optional
from fastapi import APIRouter, HTTPException, Depends, status, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from config import settings
from models import LoginRequest, UserSession
import fallback_data

router = APIRouter(prefix="/api/auth", tags=["Authentication"])
security = HTTPBearer(auto_error=False)


def create_token(payload: dict) -> str:
    """
    Creates a tamper-proof signed bearer token containing user session payload.
    """
    payload_json = json.dumps(payload, separators=(',', ':'), sort_keys=True)
    payload_b64 = base64.urlsafe_b64encode(payload_json.encode()).decode().rstrip("=")
    signature = hmac.new(
        settings.JWT_SECRET.encode(),
        payload_b64.encode(),
        hashlib.sha256
    ).hexdigest()
    return f"{payload_b64}.{signature}"


def decode_token(token: str) -> Optional[dict]:
    """
    Verifies signature and decodes bearer token payload.
    """
    try:
        parts = token.split(".")
        if len(parts) != 2:
            return None
        payload_b64, signature = parts[0], parts[1]
        
        expected_sig = hmac.new(
            settings.JWT_SECRET.encode(),
            payload_b64.encode(),
            hashlib.sha256
        ).hexdigest()
        
        if not hmac.compare_digest(signature, expected_sig):
            return None
        
        # Add back padding if needed
        padding = 4 - (len(payload_b64) % 4)
        if padding != 4:
            payload_b64 += "=" * padding
            
        payload_bytes = base64.urlsafe_b64decode(payload_b64)
        return json.loads(payload_bytes.decode())
    except Exception:
        return None


@router.post("/login", response_model=UserSession)
async def login(req: LoginRequest):
    """
    Authenticates TPO officers and students.
    Returns session token and role metadata.
    """
    email = req.email.strip().lower()
    
    # Check if TPO account
    if "tpo" in email or "admin" in email:
        session_data = {
            "role": "TPO",
            "email": req.email,
            "name": "Dr. K. S. Ramaiah (Head TPO)",
            "student_id": None
        }
        token = create_token(session_data)
        return UserSession(
            token=token,
            role="TPO",
            email=req.email,
            name="Dr. K. S. Ramaiah (Head TPO)",
            student_id=None
        )
    
    # Check if Student account (or default student USN_2024_001)
    matched_student = None
    for s in fallback_data.STUDENTS_DB:
        if s["student_id"].lower() in email or s["full_name"].lower().replace(" ", "") in email:
            matched_student = s
            break
            
    if not matched_student:
        # Default to first student for demo simplicity if no specific USN in email
        matched_student = fallback_data.STUDENTS_DB[0]

    session_data = {
        "role": "STUDENT",
        "email": req.email,
        "name": matched_student["full_name"],
        "student_id": matched_student["student_id"]
    }
    token = create_token(session_data)
    return UserSession(
        token=token,
        role="STUDENT",
        email=req.email,
        name=matched_student["full_name"],
        student_id=matched_student["student_id"]
    )


async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
    authorization: Optional[str] = Header(None)
) -> UserSession:
    """
    Validates Bearer token from Authorization header and extracts UserSession.
    """
    token = None
    if credentials:
        token = credentials.credentials
    elif authorization and authorization.startswith("Bearer "):
        token = authorization.replace("Bearer ", "").strip()

    if not token:
        # For development / fallback convenience if no token provided
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing Bearer authentication token."
        )

    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session token."
        )

    return UserSession(
        token=token,
        role=payload["role"],
        email=payload["email"],
        name=payload["name"],
        student_id=payload.get("student_id")
    )


@router.get("/me", response_model=UserSession)
async def get_me(user: UserSession = Depends(get_current_user)):
    """
    Returns current active user session.
    """
    return user


async def require_tpo(user: UserSession = Depends(get_current_user)) -> UserSession:
    """
    Enforces TPO role requirement.
    """
    if user.role != "TPO":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access restricted to Training and Placement Officers (TPO) only."
        )
    return user


async def require_student(user: UserSession = Depends(get_current_user)) -> UserSession:
    """
    Enforces STUDENT role requirement and ensures student_id presence.
    """
    if user.role != "STUDENT" or not user.student_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access restricted to enrolled students only."
        )
    return user
