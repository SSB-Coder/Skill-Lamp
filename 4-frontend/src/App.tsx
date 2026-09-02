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
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center font-mono text-xs text-[#94A3B8]">
        <div className="flex items-center space-x-3 p-4 rounded-xl bg-[#151D2C] border border-[#1E293B]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7] animate-ping" />
          <span className="text-white font-medium">Validating Institutional Session...</span>
        </div>
      </div>
    );
  }

  // Auth gating
  if (!user || !role) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-[#F8FAFC] font-sans antialiased">
      {/* Universal Header with Logo & Role Module Indicator */}
      <Header />

      {/* Main Workspace Area Strictly Role-Isolated */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {role === 'TPO' ? (
          /* TPO Persona: Candidate Catalog + Genie AI Copilot */
          <div className="flex-1 flex flex-row overflow-hidden">
            <SidebarCopilot
              onFilterSync={(matchedIds) => setSyncedStudentIds(matchedIds)}
              activeStudentId={user.student_id || 'USN_2025_042'}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
              <TPOSpreadsheet
                syncedStudentIds={syncedStudentIds}
                onClearSync={() => setSyncedStudentIds(null)}
              />
            </div>
          </div>
        ) : (
          /* Student Persona: Private What-If Time Machine + Genie Copilot */
          <StudentDashboard />
        )}
      </main>

    </div>
  );
};

export default function App() {
  return <AppContent />;
}
