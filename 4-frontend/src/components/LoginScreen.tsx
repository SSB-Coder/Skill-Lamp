import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LampIcon } from './Header';
import { Shield, GraduationCap, Lock, LogIn } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'TPO' | 'STUDENT'>('TPO');
  const [email, setEmail] = useState('tpo@rvce.edu.in');
  const [password, setPassword] = useState('TpoPlacement@2025');
  const [error, setError] = useState<string | null>(null);

  const handleRoleChange = (role: 'TPO' | 'STUDENT') => {
    setSelectedRole(role);
    setError(null);
    if (role === 'TPO') {
      setEmail('tpo@rvce.edu.in');
      setPassword('TpoPlacement@2025');
    } else {
      setEmail('priya.ise21@rvce.edu.in');
      setPassword('Priya@RVCE2025');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter a valid institutional email address.');
      return;
    }
    setError(null);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please check your institutional credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center p-4">
      {/* Centered Login Card */}
      <div className="w-full max-w-md bg-[#151D2C] border border-[#1E293B] rounded-xl p-6 shadow-2xl">
        {/* Header / Logo */}
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-[#1E293B]">
          <div className="p-2 bg-[#0B0F19] border border-[#1E293B] rounded-lg flex items-center justify-center shadow-inner">
            <LampIcon size={22} color="#0284C7" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-white tracking-tight">Skill Lamp</h1>
            <p className="text-xs text-[#94A3B8]">Institutional Placement Intelligence Platform</p>
          </div>
        </div>

        {/* Switch-Like Role Toggle Tabs (Inside small rectangle) */}
        <div className="mb-5 p-1 bg-[#0B0F19] border border-[#1E293B] rounded-lg grid grid-cols-2 gap-1 select-none">
          <button
            type="button"
            onClick={() => handleRoleChange('TPO')}
            className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-xs font-semibold transition-all duration-200 ${
              selectedRole === 'TPO'
                ? 'bg-[#0284C7] text-white shadow-md'
                : 'text-[#94A3B8] hover:text-white hover:bg-[#151D2C]'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Placement Officer (TPO)</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('STUDENT')}
            className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-xs font-semibold transition-all duration-200 ${
              selectedRole === 'STUDENT'
                ? 'bg-[#0284C7] text-white shadow-md'
                : 'text-[#94A3B8] hover:text-white hover:bg-[#151D2C]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student Portal</span>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
              {selectedRole === 'TPO' ? 'Officer Institutional Email' : 'Student Institutional Email'}
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={selectedRole === 'TPO' ? 'tpo@rvce.edu.in' : 'e.g. priya.ise21@rvce.edu.in'}
                className="w-full bg-[#0B0F19] border border-[#334155] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#0284C7] font-mono transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
              Secure Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0B0F19] border border-[#334155] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#0284C7] font-mono transition-colors"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-lg bg-[#0B0F19] border border-[#EF4444]/60 text-[#EF4444] text-xs font-mono">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-lg bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold transition-all duration-150 shadow-md disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <>
                <Lock className="w-3.5 h-3.5 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In to {selectedRole === 'TPO' ? 'TPO Console' : 'Student Dashboard'}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
