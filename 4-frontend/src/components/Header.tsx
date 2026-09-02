import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  LogOut,
  Sparkles,
  Users,
  Clock,
  ChevronDown,
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

interface HeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab = 'explorer',
  onTabChange
}) => {
  const { user, role, switchPersona, logout, isSwitching } = useAuth();
  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState(false);

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
                // Fallback if path differs
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

        {/* Navigation Tabs */}
        {onTabChange && (
          <nav className="hidden md:flex items-center space-x-1 bg-[#151D2C] p-1 rounded-lg border border-[#1E293B]">
            {role === 'TPO' ? (
              <>
                <button
                  onClick={() => onTabChange('explorer')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'explorer'
                      ? 'bg-[#0284C7] text-white shadow-sm'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Candidate Directory</span>
                </button>

                <button
                  onClick={() => onTabChange('genie')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'genie'
                      ? 'bg-[#482868] text-white shadow-sm'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D8B4FE]" />
                  <span>Databricks Genie Space</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#A855F7]/30 text-[#E9D5FF] border border-[#A855F7]/40">
                    AI
                  </span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onTabChange('genie')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'genie'
                      ? 'bg-[#482868] text-white shadow-sm'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D8B4FE]" />
                  <span>Genie Career Advisor</span>
                </button>

                <button
                  onClick={() => onTabChange('whatif')}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeTab === 'whatif'
                      ? 'bg-[#0284C7] text-white shadow-sm'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>What-If Time Machine</span>
                </button>
              </>
            )}
          </nav>
        )}
      </div>

      {/* Right: Persona Switcher + Profile */}
      <div className="flex items-center space-x-3">

        {/* Workspace / Persona Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
            disabled={isSwitching}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#151D2C] border border-[#1E293B] hover:border-[#334155] text-xs font-medium text-white transition-all shadow-sm"
          >
            {role === 'TPO' ? (
              <>
                <Building2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>TPO Portal</span>
              </>
            ) : (
              <>
                <GraduationCap className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span>Student: Priya Nair</span>
              </>
            )}
            <ChevronDown className="w-3 h-3 text-[#64748B]" />
          </button>

          {isPersonaMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-60 bg-[#151D2C] border border-[#1E293B] rounded-lg shadow-xl py-1 z-50">
              <div className="px-3 py-1.5 border-b border-[#1E293B] text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
                Switch Workspace Persona
              </div>
              <button
                onClick={() => {
                  setIsPersonaMenuOpen(false);
                  if (role !== 'TPO') switchPersona();
                }}
                className={`w-full px-3 py-2 text-left text-xs flex items-center space-x-2.5 hover:bg-[#1E293B] ${
                  role === 'TPO' ? 'bg-[#0284C7]/15 text-[#38BDF8] font-medium' : 'text-[#CBD5E1]'
                }`}
              >
                <Building2 className="w-4 h-4 text-[#38BDF8]" />
                <div>
                  <div className="font-medium">Training & Placement Office</div>
                  <div className="text-[10px] text-[#64748B]">Administrator Access</div>
                </div>
              </button>
              <button
                onClick={() => {
                  setIsPersonaMenuOpen(false);
                  if (role !== 'STUDENT') switchPersona();
                }}
                className={`w-full px-3 py-2 text-left text-xs flex items-center space-x-2.5 hover:bg-[#1E293B] ${
                  role === 'STUDENT' ? 'bg-[#A855F7]/15 text-[#D8B4FE] font-medium' : 'text-[#CBD5E1]'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-[#FBBF24]" />
                <div>
                  <div className="font-medium">Priya Nair (Student)</div>
                  <div className="text-[10px] text-[#64748B]">USN_2025_042 • ISE</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* User Avatar & Logout */}
        <div className="flex items-center space-x-2 pl-2 border-l border-[#1E293B]">
          <div
            className="w-8 h-8 rounded-full bg-[#1E293B] border border-[#334155] flex items-center justify-center font-bold text-xs text-[#38BDF8]"
            title={user?.email || user?.name}
          >
            {user?.name ? user.name.slice(0, 2).toUpperCase() : (role === 'TPO' ? 'TP' : 'PN')}
          </div>
          <span className="hidden xl:inline text-xs font-medium text-[#CBD5E1]">
            {user?.name || (role === 'TPO' ? 'TPO Officer' : 'Priya Nair')}
          </span>
          <button
            onClick={logout}
            className="p-2 rounded-lg bg-[#151D2C] border border-[#1E293B] hover:border-[#EF4444]/50 hover:text-[#EF4444] text-[#94A3B8] transition-all"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
