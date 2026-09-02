import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { isFailsafeActive, toggleFailsafeMode } from '../api/client';
import { LogOut, ArrowLeftRight, Database } from 'lucide-react';

export const LampIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = '',
  size = 16,
  color = '#0284C7'
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
  >
    {/* Geometric Minimalist Lamp Icon */}
    <path d="M12 2L6 9H18L12 2Z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 9V17" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M8 21H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 17V21" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Header: React.FC = () => {
  const { user, role, switchPersona, logout, isSwitching } = useAuth();
  const [failsafe, setFailsafe] = useState<boolean>(isFailsafeActive());

  useEffect(() => {
    const handleFailsafeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ active: boolean }>;
      setFailsafe(customEvent.detail.active);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'F' || e.key === 'f')) {
        e.preventDefault();
        const next = toggleFailsafeMode();
        setFailsafe(next);
      }
    };

    window.addEventListener('failsafe-mode-changed', handleFailsafeChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('failsafe-mode-changed', handleFailsafeChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggleFailsafe = () => {
    const next = toggleFailsafeMode();
    setFailsafe(next);
  };

  return (
    <header className="h-14 bg-app-bg border-b border-app-border px-4 flex items-center justify-between select-none z-30 sticky top-0">
      {/* Left: App Title + Lamp Icon + Unity Catalog Governance Status Dot */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-app-panel px-2.5 py-1.5 rounded border border-app-border">
          <LampIcon size={16} color="#0284C7" />
          <span className="font-semibold text-sm tracking-tight text-app-text">Skill Lamp</span>
        </div>

        {/* Unity Catalog Governance Status Dot */}
        <button
          onClick={handleToggleFailsafe}
          title={
            failsafe
              ? 'Unity Catalog Failsafe Mode Active (Cached). Click or press Ctrl+Shift+F to switch.'
              : 'Unity Catalog Live Cloud Connected (Serverless Photon). Click to test failsafe.'
          }
          className="flex items-center space-x-1.5 px-2 py-1 rounded bg-app-panel border border-app-border hover:border-app-borderLight transition-colors duration-150 text-xs text-app-muted"
        >
          <span
            className="w-1.5 h-1.5 rounded-full inline-block shrink-0"
            style={{ backgroundColor: failsafe ? '#0284C7' : '#16A34A' }}
          />
          <span className="font-mono text-[11px] text-app-text">
            {failsafe ? 'UC: Cached Failsafe' : 'UC: Live Cloud'}
          </span>
          <Database className="w-3.5 h-3.5 text-app-muted ml-0.5" />
        </button>

        {/* Current Active Persona Pill */}
        <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded bg-app-panel border border-app-border text-xs text-app-muted">
          <span className="text-[11px] uppercase tracking-wider text-app-muted">Mode:</span>
          <span className="font-medium text-app-text">
            {role === 'TPO' ? 'TPO Command Portal' : 'Student Time Machine (Priya Nair)'}
          </span>
        </div>
      </div>

      {/* Right: Persona Switcher Pill + Logout */}
      <div className="flex items-center space-x-3">
        {/* Discreet Switch Persona (Demo Mode) Pill */}
        <button
          onClick={() => switchPersona()}
          disabled={isSwitching}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded bg-app-panel border border-app-border hover:border-app-action hover:text-app-action transition-colors duration-150 text-xs font-medium text-app-text ${
            isSwitching ? 'opacity-50 cursor-wait' : ''
          }`}
          title="Fast ~0.5s Persona Transition for Hackathon Live Demo"
        >
          <ArrowLeftRight className="w-3.5 h-3.5 text-app-action" />
          <span>
            {role === 'TPO' ? 'Switch Persona ⇄ Student: Priya' : 'Switch Persona ⇄ TPO Portal'}
          </span>
          {isSwitching && <span className="w-1.5 h-1.5 rounded-full bg-app-action animate-ping" />}
        </button>

        {/* User identifier & Logout */}
        <div className="flex items-center space-x-2 pl-2 border-l border-app-border">
          <span className="text-xs text-app-muted hidden md:inline truncate max-w-[140px]">
            {user?.email}
          </span>
          <button
            onClick={logout}
            className="p-1.5 rounded bg-app-panel border border-app-border hover:border-app-danger hover:text-app-danger transition-colors duration-150 text-app-muted"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
