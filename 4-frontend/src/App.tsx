import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { LoginScreen } from './components/LoginScreen';
import { SidebarCopilot } from './components/SidebarCopilot';
import { TPOSpreadsheet } from './components/TPOSpreadsheet';
import { StudentDashboard } from './components/StudentDashboard';

export const AppContent: React.FC = () => {
  const { user, role, isLoading } = useAuth();
  const [syncedStudentIds, setSyncedStudentIds] = useState<string[] | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-app-bg flex items-center justify-center font-mono text-xs text-app-muted">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-app-action animate-ping" />
          <span>Validating Institutional Session...</span>
        </div>
      </div>
    );
  }

  // Auth gating
  if (!user || !role) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-app-bg text-app-text font-sans antialiased">
      {/* Universal Header */}
      <Header />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-row overflow-hidden">
        {/* Left 380px Sidebar: Genie Copilot / Career Advisor */}
        <SidebarCopilot
          onFilterSync={(matchedIds) => setSyncedStudentIds(matchedIds)}
          activeStudentId={user.student_id || 'USN_2025_042'}
        />

        {/* Right Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {role === 'TPO' ? (
            <TPOSpreadsheet
              syncedStudentIds={syncedStudentIds}
              onClearSync={() => setSyncedStudentIds(null)}
            />
          ) : (
            <StudentDashboard />
          )}
        </main>
      </div>

      {/* System Status Footer (Zero Social Links, purely system metadata) */}
      <footer className="h-6 bg-app-bg border-t border-app-border px-4 flex items-center justify-between text-[10px] font-mono text-app-muted select-none">
        <div className="flex items-center space-x-3">
          <span>Catalog: campus_intelligence.gold</span>
          <span>•</span>
          <span>Engine: Serverless Photon</span>
          <span>•</span>
          <span className="text-app-success">RBAC: Enforced</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Skill Lamp v1.0.0</span>
          <span>•</span>
          <span>Session: {role}</span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
