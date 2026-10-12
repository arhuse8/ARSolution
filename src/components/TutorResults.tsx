import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  AlertCircle,
  RefreshCw,
  Globe,
  SlidersHorizontal,
  Sparkles,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { BoardId, Tutor } from '../types';
import { MOCK_TUTORS, SUPPORTED_BOARDS } from '../data/mockData';
import { TutorCard } from './TutorCard';

interface TutorResultsProps {
  selectedClass: number | null;
  selectedBoard: BoardId | null;
  selectedSubjects: string[];
  teachingMode: 'Home Tuition' | 'Online Tuition' | 'Both';
  location: string;
  onViewProfile: (tutor: Tutor) => void;
  onRequestClass: (tutor: Tutor) => void;
  onRequestCustomTutor: () => void;
  onChangeSelection: () => void;
  onSwitchToOnline: () => void;
}

export const TutorResults: React.FC<TutorResultsProps> = ({
  selectedClass,
  selectedBoard,
  selectedSubjects,
  teachingMode,
  location,
  onViewProfile,
  onRequestClass,
  onRequestCustomTutor,
  onChangeSelection,
  onSwitchToOnline,
}) => {
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'feeAsc'>('rating');
  const [filterMode, setFilterMode] = useState<string>(teachingMode);

  // Sync mode if parent changes it
  React.useEffect(() => {
    setFilterMode(teachingMode);
  }, [teachingMode]);

  const boardName = useMemo(() => {
    if (!selectedBoard) return '';
    return SUPPORTED_BOARDS.find((b) => b.id === selectedBoard)?.name || selectedBoard.toUpperCase();
  }, [selectedBoard]);

  // Filter logic
  const filteredTutors = useMemo(() => {
    return MOCK_TUTORS.filter((tutor) => {
      // Filter by Class (if selected)
      if (selectedClass !== null) {
        if (!tutor.classes.includes(selectedClass)) return false;
      }

      // Filter by Board (if selected)
      if (selectedBoard && selectedBoard !== 'other') {
        const boardMatch = tutor.boards.some(
          (b) =>
            b.toLowerCase().includes(selectedBoard.toLowerCase()) ||
            (selectedBoard === 'maharashtra' && (b.includes('State') || b.includes('Maharashtra'))) ||
            (selectedBoard === 'cbse' && b.includes('CBSE')) ||
            (selectedBoard === 'icse' && b.includes('ICSE'))
        );
        if (!boardMatch) return false;
      }

      // Filter by Subject (if any selected)
      if (selectedSubjects.length > 0) {
        const subjectMatch = selectedSubjects.some((sub) => {
          const subLower = sub.toLowerCase();
          return tutor.subjects.some(
            (ts) =>
              ts.toLowerCase().includes(subLower) ||
              subLower.includes(ts.toLowerCase()) ||
              (subLower.includes('math') && ts.toLowerCase().includes('math')) ||
              (subLower.includes('science') && (ts.toLowerCase().includes('science') || ts.toLowerCase().includes('physics') || ts.toLowerCase().includes('chemistry') || ts.toLowerCase().includes('bio')))
          );
        });
        if (!subjectMatch) return false;
      }

      // Filter by Teaching Mode
      if (filterMode === 'Home Tuition') {
        if (tutor.teachingMode !== 'Home Tuition' && tutor.teachingMode !== 'Both') return false;
      } else if (filterMode === 'Online Tuition') {
        if (tutor.teachingMode !== 'Online Tuition' && tutor.teachingMode !== 'Both') return false;
      }

      // Filter by Location if Home Tuition and location entered
      if (filterMode === 'Home Tuition' && location.trim().length > 2) {
        const locLower = location.toLowerCase();
        // Check if tutor services this locality or city
        const areaMatch =
          tutor.serviceAreas.some((area) => area.toLowerCase().includes(locLower) || locLower.includes(area.toLowerCase().split(' ')[0])) ||
          tutor.city.toLowerCase().includes(locLower) ||
          locLower.includes(tutor.city.toLowerCase());
        
        // If not explicit area match, keep if in same city
        if (!areaMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'feeAsc') return a.feePerHour - b.feePerHour;
      return 0;
    });
  }, [selectedClass, selectedBoard, selectedSubjects, filterMode, location, sortBy]);

  return (
    <div id="tutor-results-section" className="mt-8 scroll-mt-24">
      {/* Top Section Summary & Filter Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 md:p-8 border border-orange-100 shadow-rising mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/60 text-orange-800 text-xs font-bold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
              <span>Verified Home & Online Teachers</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Matching Tutors {selectedClass ? `for Class ${selectedClass}` : ''}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {filteredTutors.length} verified educators available based on your board, subjects, and teaching mode.
            </p>
          </div>

          {/* Quick Active Filter Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {selectedClass && (
              <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg border border-indigo-100">
                Class {selectedClass}
              </span>
            )}
            {selectedBoard && (
              <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-100">
                {boardName}
              </span>
            )}
            <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
              {filterMode}
            </span>
            {location && filterMode === 'Home Tuition' && (
              <span className="text-xs font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-lg flex items-center gap-1 border border-amber-200">
                <MapPin className="w-3 h-3" />
                {location}
              </span>
            )}
            <button
              onClick={onChangeSelection}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline ml-1 cursor-pointer"
            >
              Change
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
              Mode:
            </span>
            {(['Both', 'Home Tuition', 'Online Tuition'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setFilterMode(m)}
                className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
                  filterMode === m
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="rating">Top Rated (4.9+)</option>
              <option value="experience">Most Experienced</option>
              <option value="feeAsc">Fee (Lowest First)</option>
            </select>
          </div>
        </div>
      </div>

      {/* TUTORS GRID */}
      {filteredTutors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              onViewProfile={onViewProfile}
              onRequestClass={onRequestClass}
            />
          ))}
        </div>
      ) : (
        /* EMPTY STATE (Requirement 9) */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center max-w-2xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-100">
            <AlertCircle className="w-8 h-8" />
          </div>

          <h4 className="text-xl font-bold text-slate-900 tracking-tight">
            No matching tutors are available for your current selection.
          </h4>

          <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
            We couldn't find a direct match for this exact combination of locality, subjects, and board. Don’t worry — we can arrange a verified tutor for you or switch to online tuition.
          </p>

          {/* Requirement 9 Action buttons: Change Selection, Try Online Tuition, Request a Tutor */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onChangeSelection}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-slate-300 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-slate-500" />
              <span>Change Selection</span>
            </button>

            <button
              type="button"
              onClick={onSwitchToOnline}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-blue-200 transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Try Online Tuition</span>
            </button>

            <button
              type="button"
              onClick={onRequestCustomTutor}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-700 via-indigo-600 to-orange-500 hover:opacity-95 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-rising transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Request a Tutor</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
