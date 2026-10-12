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
import { useTheme } from '../context/ThemeContext';

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
  const { isMidnight } = useTheme();
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
      <div
        className={`rounded-3xl p-5 sm:p-6 md:p-8 border shadow-rising mb-6 ${
          isMidnight
            ? 'bg-[#0F172A] border-orange-500/25 shadow-2xl text-white'
            : 'bg-white border-orange-100 shadow-rising text-slate-900'
        }`}
      >
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b ${isMidnight ? 'border-slate-800' : 'border-slate-100'}`}>
          <div>
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 border ${
                isMidnight
                  ? 'bg-orange-500/15 border-orange-400/30 text-amber-300'
                  : 'bg-orange-50 border-orange-200/60 text-orange-800'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
              <span>Verified Home & Online Teachers</span>
            </div>
            <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isMidnight ? 'text-white' : 'text-[#0F172A]'}`}>
              Matching Tutors {selectedClass ? `for Class ${selectedClass}` : ''}
            </h3>
            <p className={`text-xs sm:text-sm mt-1 ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
              {filteredTutors.length} verified educators available based on your board, subjects, and teaching mode.
            </p>
          </div>

          {/* Quick Active Filter Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {selectedClass && (
              <span
                className={`text-xs font-bold px-3 py-1 rounded-lg border ${
                  isMidnight
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                }`}
              >
                Class {selectedClass}
              </span>
            )}
            {selectedBoard && (
              <span
                className={`text-xs font-bold px-3 py-1 rounded-lg border ${
                  isMidnight
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    : 'bg-blue-50 text-blue-700 border-blue-100'
                }`}
              >
                {boardName}
              </span>
            )}
            <span
              className={`text-xs font-bold px-3 py-1 rounded-lg ${
                isMidnight ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {filterMode}
            </span>
            {location && filterMode === 'Home Tuition' && (
              <span
                className={`text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1 border ${
                  isMidnight
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                <MapPin className="w-3 h-3" />
                {location}
              </span>
            )}
            <button
              onClick={onChangeSelection}
              className={`text-xs font-semibold underline ml-1 cursor-pointer ${
                isMidnight ? 'text-amber-400 hover:text-amber-300' : 'text-indigo-600 hover:text-indigo-800'
              }`}
            >
              Change
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5">
            <span className={`text-xs font-bold uppercase tracking-wider mr-1 ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
              Mode:
            </span>
            {(['Both', 'Home Tuition', 'Online Tuition'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setFilterMode(m)}
                className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
                  filterMode === m
                    ? 'bg-gradient-to-r from-indigo-700 via-rose-600 to-orange-500 text-white shadow-xs'
                    : isMidnight
                    ? 'bg-[#131B2E] text-slate-300 hover:bg-[#1A2640]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className={`w-4 h-4 ${isMidnight ? 'text-slate-400' : 'text-slate-400'}`} />
            <span className={`text-xs font-bold uppercase tracking-wider ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={`border text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                isMidnight
                  ? 'bg-[#0B101D] border-slate-700 text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
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
        <div
          className={`rounded-3xl p-8 sm:p-12 border text-center max-w-2xl mx-auto shadow-sm ${
            isMidnight ? 'bg-[#0F172A] border-slate-700 text-white' : 'bg-white border-slate-200'
          }`}
        >
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border ${
              isMidnight
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                : 'bg-amber-50 text-amber-600 border-amber-100'
            }`}
          >
            <AlertCircle className="w-8 h-8" />
          </div>

          <h4 className={`text-xl font-bold tracking-tight ${isMidnight ? 'text-white' : 'text-slate-900'}`}>
            No matching tutors are available for your current selection.
          </h4>

          <p className={`text-sm mt-2 max-w-md mx-auto leading-relaxed ${isMidnight ? 'text-slate-300' : 'text-slate-600'}`}>
            We couldn't find a direct match for this exact combination of locality, subjects, and board. Don’t worry — we can arrange a verified tutor for you or switch to online tuition.
          </p>

          {/* Requirement 9 Action buttons: Change Selection, Try Online Tuition, Request a Tutor */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onChangeSelection}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border transition-all cursor-pointer ${
                isMidnight
                  ? 'bg-[#131B2E] hover:bg-[#1A2640] text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              <RefreshCw className="w-4 h-4 text-slate-400" />
              <span>Change Selection</span>
            </button>

            <button
              type="button"
              onClick={onSwitchToOnline}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border transition-all cursor-pointer ${
                isMidnight
                  ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/40'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
              }`}
            >
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Try Online Tuition</span>
            </button>

            <button
              type="button"
              onClick={onRequestCustomTutor}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-700 via-rose-600 to-orange-500 hover:opacity-95 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-rising transition-all cursor-pointer"
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
