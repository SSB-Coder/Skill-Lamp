import React, { useState, useEffect, useMemo } from 'react';
import { getStudentsSpreadsheet } from '../api/client';
import { StudentCandidate } from '../api/types';
import {
  Search,
  Download,
  SlidersHorizontal,
  RotateCcw,
  CheckCircle2,
  Briefcase
} from 'lucide-react';

interface TPOSpreadsheetProps {
  syncedStudentIds?: string[] | null;
  onClearSync?: () => void;
}

export const TPOSpreadsheet: React.FC<TPOSpreadsheetProps> = ({
  syncedStudentIds,
  onClearSync
}) => {
  const [students, setStudents] = useState<StudentCandidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [minCgpa, setMinCgpa] = useState<number>(0.0);
  const [zeroBacklogsOnly, setZeroBacklogsOnly] = useState<boolean>(false);

  useEffect(() => {
    fetchStudents();
  }, [selectedBranch, minCgpa, zeroBacklogsOnly]);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const resp = await getStudentsSpreadsheet({
        branch: selectedBranch,
        min_cgpa: minCgpa > 0 ? minCgpa : undefined,
        max_backlogs: zeroBacklogsOnly ? 0 : undefined,
        search: searchQuery || undefined
      });
      setStudents(resp.students);
    } catch {
      // Fallback handled in client
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStudents();
  };

  // Filter students considering syncedStudentIds if active
  const displayedStudents = useMemo(() => {
    let list = [...students];

    // 1. Genie Sync Filter (Whatever the genie queries and calls is shown in the list)
    if (syncedStudentIds && syncedStudentIds.length > 0) {
      list = list.filter(s => syncedStudentIds.includes(s.usn));
    }

    // 2. Search query client filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.usn.toLowerCase().includes(q) ||
          s.skills.some(sk => sk.toLowerCase().includes(q))
      );
    }

    // 3. Branch filter
    if (selectedBranch !== 'All') {
      list = list.filter(s => s.branch === selectedBranch);
    }

    // 4. CGPA filter
    if (minCgpa > 0) {
      list = list.filter(s => s.cgpa >= minCgpa);
    }

    // 5. Backlog filter
    if (zeroBacklogsOnly) {
      list = list.filter(s => s.active_backlogs === 0);
    }

    return list;
  }, [students, syncedStudentIds, searchQuery, selectedBranch, minCgpa, zeroBacklogsOnly]);

  const handleExportCSV = () => {
    if (displayedStudents.length === 0) return;

    const headers = [
      'USN',
      'Full Name',
      'Branch',
      'CGPA',
      'Active Backlogs',
      'Verified Skills',
      'Eligible Companies Count',
      'Dream Eligible Count',
      'Super Dream Eligible Count',
      'Placement Readiness Score',
      'Email'
    ];

    const rows = displayedStudents.map((s) => [
      s.usn,
      `"${s.name}"`,
      s.branch,
      s.cgpa.toFixed(2),
      s.active_backlogs,
      `"${s.skills.join(', ')}"`,
      s.eligible_company_count,
      s.dream_eligible_count,
      s.super_dream_eligible_count,
      s.placement_readiness_score.toFixed(1),
      s.email || ''
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `SkillLamp_Candidate_Shortlist_${selectedBranch}_${Date.now()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const branches = ['All', 'CSE', 'ISE', 'ECE', 'AI/DS'];

  return (
    <div className="flex-1 h-[calc(100vh-4rem)] flex flex-col bg-[#0B0F19] overflow-hidden select-none">
      {/* Top Filter & Action Bar */}
      <div className="p-3 bg-[#151D2C] border-b border-[#1E293B] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative w-56">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#64748B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate, USN, skill..."
              className="w-full bg-[#0B0F19] border border-[#334155] rounded pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#0284C7]"
            />
          </form>

          {/* Branch Filter Pills */}
          <div className="flex items-center space-x-1 bg-[#0B0F19] p-0.5 rounded border border-[#1E293B]">
            {branches.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBranch(b)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors duration-150 ${
                  selectedBranch === b
                    ? 'bg-[#0284C7] text-white'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Min CGPA Slider */}
          <div className="flex items-center space-x-2 bg-[#0B0F19] px-2.5 py-1 rounded border border-[#1E293B] text-xs text-[#94A3B8]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#64748B]" />
            <span className="text-[11px]">Min CGPA:</span>
            <input
              type="range"
              min="0"
              max="9.5"
              step="0.5"
              value={minCgpa}
              onChange={(e) => setMinCgpa(parseFloat(e.target.value))}
              className="w-16 accent-[#0284C7] cursor-pointer"
            />
            <span className="font-mono text-white text-[11px] w-6">
              {minCgpa > 0 ? minCgpa.toFixed(1) : 'Off'}
            </span>
          </div>

          {/* Zero Backlogs Toggle */}
          <button
            type="button"
            onClick={() => setZeroBacklogsOnly(!zeroBacklogsOnly)}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-medium border transition-colors duration-150 ${
              zeroBacklogsOnly
                ? 'bg-[#151D2C] border-[#0284C7] text-white'
                : 'bg-[#0B0F19] border-[#1E293B] text-[#94A3B8] hover:text-white'
            }`}
          >
            <CheckCircle2
              className={`w-3.5 h-3.5 ${
                zeroBacklogsOnly ? 'text-[#0284C7]' : 'text-[#64748B]'
              }`}
            />
            <span>0 Backlogs</span>
          </button>
        </div>

        {/* Action: Export CSV + Sync Indicator */}
        <div className="flex items-center space-x-2">
          {syncedStudentIds && syncedStudentIds.length > 0 && (
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#0284C7]/20 border border-[#0284C7]/40 text-xs text-white">
              <span className="font-mono text-[11px] text-[#38BDF8]">
                Genie Filter ({displayedStudents.length} matched)
              </span>
              {onClearSync && (
                <button
                  onClick={onClearSync}
                  className="p-0.5 hover:text-[#EF4444] transition-colors ml-1"
                  title="Reset Filter to All Students"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          <button
            onClick={handleExportCSV}
            disabled={displayedStudents.length === 0}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#0284C7] hover:bg-[#0369A1] disabled:opacity-40 text-white text-xs font-medium transition-colors duration-150 shadow-sm"
            title="Download CSV Shortlist for Visiting Recruiter"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Shortlist (CSV)</span>
          </button>
        </div>
      </div>

      {/* Grid Stats Bar */}
      <div className="px-4 py-2 bg-[#0B0F19] border-b border-[#1E293B] flex items-center justify-between text-xs text-[#94A3B8]">
        <div>
          Showing <span className="text-white font-semibold">{displayedStudents.length}</span> candidate records
        </div>
        <div className="flex items-center space-x-4 text-[11px] text-[#94A3B8]">
          <span>
            Avg CGPA:{' '}
            <strong className="text-white">
              {displayedStudents.length > 0
                ? (
                    displayedStudents.reduce((acc, s) => acc + s.cgpa, 0) /
                    displayedStudents.length
                  ).toFixed(2)
                : '0.00'}
            </strong>
          </span>
          <span>
            Zero Backlogs:{' '}
            <strong className="text-white">
              {displayedStudents.filter((s) => s.active_backlogs === 0).length}
            </strong>
          </span>
          <span>
            Super Dream Ready:{' '}
            <strong className="text-white">
              {displayedStudents.filter((s) => s.super_dream_eligible_count > 0).length}
            </strong>
          </span>
        </div>
      </div>

      {/* Main Table Grid */}
      <div className="flex-1 overflow-auto bg-[#0B0F19]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#151D2C] text-[#94A3B8] text-[11px] font-medium uppercase tracking-wider sticky top-0 border-b border-[#1E293B] z-10 select-none">
            <tr>
              <th className="py-2.5 px-4 font-normal">USN</th>
              <th className="py-2.5 px-4 font-normal">Candidate Name</th>
              <th className="py-2.5 px-3 font-normal">Branch</th>
              <th className="py-2.5 px-3 font-normal">CGPA</th>
              <th className="py-2.5 px-3 font-normal text-center">Backlogs</th>
              <th className="py-2.5 px-4 font-normal">Verified Skill Competencies</th>
              <th className="py-2.5 px-3 font-normal text-center">Eligible Drives</th>
              <th className="py-2.5 px-3 font-normal text-right pr-4">Readiness</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B] text-xs">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-[#64748B] font-mono">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-ping" />
                    <span>Querying Unity Catalog Gold Layer...</span>
                  </div>
                </td>
              </tr>
            ) : displayedStudents.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-[#64748B] font-mono">
                  No student records matched the specified filter criteria.
                </td>
              </tr>
            ) : (
              displayedStudents.map((student) => {
                const isSyncedMatch =
                  syncedStudentIds && syncedStudentIds.includes(student.usn);

                return (
                  <tr
                    key={student.usn}
                    className={`transition-colors duration-150 ${
                      isSyncedMatch
                        ? 'bg-[#0284C7]/10 border-l-2 border-l-[#0284C7]'
                        : 'hover:bg-[#151D2C]/60'
                    }`}
                  >
                    {/* USN */}
                    <td className="py-2.5 px-4 font-mono text-[11px] text-white whitespace-nowrap">
                      {student.usn}
                    </td>

                    {/* Name */}
                    <td className="py-2.5 px-4 font-medium text-white whitespace-nowrap">
                      <div className="flex items-center space-x-1.5">
                        <span>{student.name}</span>
                        {isSyncedMatch && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#0284C7] text-white font-mono">
                            MATCH
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Branch */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-[#151D2C] border border-[#1E293B] font-mono text-[11px] text-white">
                        {student.branch}
                      </span>
                    </td>

                    {/* CGPA (Clean Neutral Color) */}
                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-white">
                      <span className="font-semibold">
                        {student.cgpa.toFixed(2)}
                      </span>
                    </td>

                    {/* Backlogs (Clean Neutral Color) */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap font-mono text-white">
                      <span>{student.active_backlogs}</span>
                    </td>

                    {/* Skills Tags (Uniform Neutral Badges - No Highlighting) */}
                    <td className="py-2.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-md">
                        {student.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded border bg-[#0B0F19] border-[#1E293B] text-[#94A3B8]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Eligible Drives Count */}
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <div className="inline-flex items-center space-x-1 font-mono text-xs text-white">
                        <Briefcase className="w-3 h-3 text-[#64748B]" />
                        <span className="font-semibold">{student.eligible_company_count}</span>
                        <span className="text-[10px] text-[#64748B]">
                          ({student.super_dream_eligible_count} SD)
                        </span>
                      </div>
                    </td>

                    {/* Placement Readiness Score (Clean Neutral Color) */}
                    <td className="py-2.5 px-3 text-right pr-4 whitespace-nowrap font-mono font-semibold text-white">
                      <span>
                        {student.placement_readiness_score.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
