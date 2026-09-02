from fastapi import APIRouter, Depends, HTTPException, status
from models import StudentProfileResponse, UserSession
from routes.auth import require_student
import fallback_data

router = APIRouter(prefix="/api/student", tags=["Student Isolated Profile"])


@router.get("/me", response_model=StudentProfileResponse)
async def get_my_profile(current_user: UserSession = Depends(require_student)):
    """
    Returns the isolated profile and Reverse Roadmap baseline for the authenticated student.
    Strict student data isolation is strictly enforced via the authenticated session token.
    """
    student_id = current_user.student_id
    if not student_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Student USN is missing from user session."
        )

    profile = fallback_data.get_student_profile(student_id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student record not found for USN: {student_id}"
        )

    return profile
