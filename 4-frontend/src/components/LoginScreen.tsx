import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LampIcon } from './Header';
import { Shield, User, Lock, ArrowRight } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('demo1234');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter a valid institutional email address.');
      return;
    }
    setError(null);
    try {
      await login(email, password);
    } catch {
      setError('Authentication failed. Check credentials.');
    }
  };

  const handleQuickDemoTPO = async () => {
    setEmail('tpo@rvce.edu.in');
    setError(null);
    await login('tpo@rvce.edu.in', 'tpopassword');
  };

  const handleQuickDemoStudent = async () => {
    setEmail('priya.ise21@rvce.edu.in');
    setError(null);
    await login('priya.ise21@rvce.edu.in', 'studentpassword');
  };

  return (
    <div className="min-h-screen bg-app-bg flex flex-col items-center justify-center p-4">
      {/* Centered Login Card */}
      <div className="w-full max-w-md bg-app-panel border border-app-border rounded-lg p-6 shadow-none">
        {/* Header / Logo */}
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-app-border">
          <div className="p-2 bg-app-bg border border-app-border rounded flex items-center justify-center">
            <LampIcon size={20} color="#0284C7" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-app-text tracking-tight">Skill Lamp</h1>
            <p className="text-xs text-app-muted">Institutional Placement Intelligence Console</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-app-muted mb-1.5">
              Institutional Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. tpo@rvce.edu.in or usn@rvce.edu.in"
                className="w-full bg-app-bg border border-app-border rounded px-3 py-2 text-sm text-app-text placeholder-app-muted/60 focus:outline-none focus:border-app-action font-mono text-xs"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-app-muted mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-app-bg border border-app-border rounded px-3 py-2 text-sm text-app-text placeholder-app-muted/60 focus:outline-none focus:border-app-action font-mono text-xs"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded bg-app-bg border border-app-danger text-app-danger text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded bg-app-action hover:bg-app-actionHover text-white text-xs font-medium transition-colors duration-150 disabled:opacity-50"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isLoading ? 'Authenticating...' : 'Sign In to Portal'}</span>
          </button>
        </form>

        {/* Quick Demo Section */}
        <div className="mt-6 pt-5 border-t border-app-border">
          <div className="text-[11px] font-medium uppercase tracking-wider text-app-muted mb-3 flex items-center justify-between">
            <span>Quick Demo Identities</span>
            <span className="text-[10px] text-app-muted font-mono">1-Click Fast Auth</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              type="button"
              onClick={handleQuickDemoTPO}
              disabled={isLoading}
              className="flex items-center justify-between p-2.5 rounded bg-app-bg border border-app-border hover:border-app-action hover:bg-app-bg/80 transition-colors duration-150 text-left"
            >
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded bg-app-panel border border-app-border">
                  <Shield className="w-3.5 h-3.5 text-app-action" />
                </div>
                <div>
                  <div className="text-xs font-medium text-app-text">TPO Placement Officer</div>
                  <div className="text-[11px] font-mono text-app-muted">tpo@rvce.edu.in</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-app-muted" />
            </button>

            <button
              type="button"
              onClick={handleQuickDemoStudent}
              disabled={isLoading}
              className="flex items-center justify-between p-2.5 rounded bg-app-bg border border-app-border hover:border-app-action hover:bg-app-bg/80 transition-colors duration-150 text-left"
            >
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 rounded bg-app-panel border border-app-border">
                  <User className="w-3.5 h-3.5 text-app-action" />
                </div>
                <div>
                  <div className="text-xs font-medium text-app-text">Student: Priya Nair</div>
                  <div className="text-[11px] font-mono text-app-muted">priya.ise21@rvce.edu.in (ISE | 8.12 CGPA)</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-app-muted" />
            </button>
          </div>
        </div>

        {/* Governance footnote */}
        <div className="mt-5 text-center">
          <p className="text-[11px] text-app-muted/80 font-mono">
            Governed by Unity Catalog RBAC • PII Masked
          </p>
        </div>
      </div>
    </div>
  );
};
