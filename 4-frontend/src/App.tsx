import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { LoginScreen } from './components/LoginScreen';
import { SidebarCopilot } from './components/SidebarCopilot';
import { TPOSpreadsheet } from './components/TPOSpreadsheet';
import { StudentDashboard } from './components/StudentDashboard';
import { DatabricksGenieSpace } from './components/DatabricksGenieSpace';

export const AppContent: React.FC = () => {
  const { user, role, isLoading } = useAuth();
  const [syncedStudentIds, setSyncedStudentIds] = useState<string[] | null>(null);
  const [activeTab, setActiveTab] = useState<string>('explorer');

  // Sync tab defaults when role changes
  React.useEffect(() => {
    if (role === 'TPO') {
      setActiveTab('explorer');
    } else {
      setActiveTab('genie');
    }
  }, [role]);

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
      {/* Universal Header with Logo & Tabs */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {role === 'TPO' ? (
          activeTab === 'explorer' ? (
            <div className="flex-1 flex flex-row overflow-hidden">
              {/* Left Sidebar: Genie Copilot */}
              <SidebarCopilot
                onFilterSync={(matchedIds) => setSyncedStudentIds(matchedIds)}
                activeStudentId={user.student_id || 'USN_2025_042'}
              />

              {/* Right: Candidate Directory Spreadsheet */}
              <div className="flex-1 flex flex-col overflow-hidden">
                <TPOSpreadsheet
                  syncedStudentIds={syncedStudentIds}
                  onClearSync={() => setSyncedStudentIds(null)}
                />
              </div>
            </div>
          ) : (
            /* Full-Screen Databricks Genie Space */
            <DatabricksGenieSpace
              onFilterSync={(matchedIds) => setSyncedStudentIds(matchedIds)}
            />
          )
        ) : (
          /* Student Persona Views */
          activeTab === 'genie' ? (
            <DatabricksGenieSpace
              onFilterSync={(matchedIds) => setSyncedStudentIds(matchedIds)}
            />
          ) : (
            <StudentDashboard />
          )
        )}
      </main>

      {/* System Status Footer */}
      <footer className="h-6 bg-[#0B0F19] border-t border-[#1E293B] px-5 flex items-center justify-between text-[10px] font-mono text-[#64748B] select-none">
        <div className="flex items-center space-x-3">
          <span className="text-[#94A3B8]">Databricks Unity Catalog</span>
          <span>•</span>
          <span>Catalog: workspace.campus_intelligence_gold</span>
          <span>•</span>
          <span className="text-[#16A34A]">RBAC & Masking: Active</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Skill Lamp Enterprise</span>
          <span>•</span>
          <span>Mode: {role}</span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
