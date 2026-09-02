import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  LogOut,
  Building2,
  GraduationCap
} from 'lucide-react';

export const LampIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = '',
  size = 16
}) => (
  <img
    src="/logo.png"
    alt="Lamp"
    style={{ width: size, height: size }}
    className={`inline-block shrink-0 object-contain ${className}`}
    onError={(e) => {
      (e.target as HTMLImageElement).src = 'logo.png';
    }}
  />
);

export const Header: React.FC = () => {
  const { user, role, logout } = useAuth();

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n: string) => n[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : role === 'TPO'
    ? 'TP'
    : 'PN';
  const displayName = user?.name || (role === 'TPO' ? 'Dr. S. K. Murthy (TPO)' : 'Priya Nair');

  return (
    <header className="h-16 bg-app-bg border-b border-app-border px-5 flex items-center justify-between select-none z-30 sticky top-0">
      {/* Left: Logo & Brand */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Skill Lamp Logo"
              className="h-9 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'logo.png';
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-tight text-app-text">Skill Lamp</span>
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-app-surface text-app-muted border border-app-border">
                v1.0
              </span>
            </div>
            <span className="text-[10px] text-app-subtle font-medium tracking-wide">
              Placement Intelligence Platform
            </span>
          </div>
        </div>
      </div>

      {/* Right: User Profile & Secure Logout */}
      <div className="flex items-center space-x-3">
        {/* Role Identity Pill */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-app-surface border border-app-border text-xs font-medium text-app-text">
          {role === 'TPO' ? (
            <>
              <Building2 className="w-3.5 h-3.5 text-app-accent" />
              <span>Training & Placement Officer</span>
            </>
          ) : (
            <>
              <GraduationCap className="w-3.5 h-3.5 text-app-accent" />
              <span>Student: {user?.name || 'Priya Nair'} ({user?.student_id || 'USN_2025_042'})</span>
            </>
          )}
        </div>

        {/* User Avatar & Logout Button */}
        <div className="flex items-center space-x-2 pl-2 border-l border-app-border">
          <div
            className="w-8 h-8 rounded-full bg-app-surfaceRaised border border-app-border flex items-center justify-center font-bold text-xs text-app-accent"
            title={user?.email || (role === 'TPO' ? 'tpo@rvce.edu.in' : 'priya.ise21@rvce.edu.in')}
          >
            {initials}
          </div>
          <span className="hidden xl:inline text-xs font-medium text-app-text">
            {displayName}
          </span>
          <button
            onClick={logout}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-app-surface border border-app-border hover:border-app-danger/60 hover:text-app-danger text-app-muted text-xs font-medium transition-colors"
            title="Log Out of System"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
