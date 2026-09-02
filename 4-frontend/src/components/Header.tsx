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
    <header className="h-16 bg-[#0B0F19] border-b border-[#1E293B] px-5 flex items-center justify-between select-none z-30 sticky top-0 shadow-sm">
      {/* Left: Logo & Brand */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Skill Lamp Logo"
              className="h-9 w-auto object-contain drop-shadow-[0_2px_8px_rgba(234,179,8,0.25)]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'logo.png';
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-tight text-white">Skill Lamp</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#1E293B] text-[#94A3B8] border border-[#334155]">
                v1.0
              </span>
            </div>
            <span className="text-[10px] text-[#64748B] font-medium tracking-wide">
              Placement Intelligence Platform
            </span>
          </div>
        </div>
      </div>

      {/* Right: User Profile & Secure Logout */}
      <div className="flex items-center space-x-3">
        {/* Role Identity Pill */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#151D2C] border border-[#1E293B] text-xs font-medium text-white">
          {role === 'TPO' ? (
            <>
              <Building2 className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Training & Placement Officer</span>
            </>
          ) : (
            <>
              <GraduationCap className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span>Student: {user?.name || 'Priya Nair'} ({user?.student_id || 'USN_2025_042'})</span>
            </>
          )}
        </div>

        {/* User Avatar & Logout Button */}
        <div className="flex items-center space-x-2 pl-2 border-l border-[#1E293B]">
          <div
            className="w-8 h-8 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center font-bold text-xs text-[#38BDF8]"
            title={user?.email || (role === 'TPO' ? 'tpo@rvce.edu.in' : 'priya.ise21@rvce.edu.in')}
          >
            {initials}
          </div>
          <span className="hidden xl:inline text-xs font-medium text-[#CBD5E1]">
            {displayName}
          </span>
          <button
            onClick={logout}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#151D2C] border border-[#1E293B] hover:border-[#EF4444]/60 hover:text-[#EF4444] text-[#94A3B8] text-xs font-medium transition-all"
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
