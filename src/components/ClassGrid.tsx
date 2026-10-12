import React from 'react';
import {
  BookOpen,
  Calculator,
  Compass,
  Atom,
  GraduationCap,
  Sparkles,
  ChevronRight,
  School,
  Layers,
  Award,
  BookMarked,
  BrainCircuit,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ClassGridProps {
  selectedClass: number | null;
  onSelectClass: (classNum: number) => void;
}

const CLASS_CONFIGS = [
  { num: 1, label: 'Primary Foundation', icon: BookOpen, tag: 'Classes 1–5' },
  { num: 2, label: 'Early Learning', icon: Sparkles, tag: 'Classes 1–5' },
  { num: 3, label: 'Core Fundamentals', icon: Calculator, tag: 'Classes 1–5' },
  { num: 4, label: 'Foundational Concepts', icon: Compass, tag: 'Classes 1–5' },
  { num: 5, label: 'Primary Board Prep', icon: School, tag: 'Classes 1–5' },
  { num: 6, label: 'Middle School Intro', icon: BookMarked, tag: 'Classes 6–8' },
  { num: 7, label: 'Concept Deepening', icon: Layers, tag: 'Classes 6–8' },
  { num: 8, label: 'Pre-Secondary Bridge', icon: Atom, tag: 'Classes 6–8' },
  { num: 9, label: 'Secondary Foundation', icon: BrainCircuit, tag: 'Classes 9–10' },
  { num: 10, label: 'Board Exam Special', icon: Award, tag: 'Board Exam' },
  { num: 11, label: 'Senior Streams', icon: Compass, tag: 'Class 11' },
  { num: 12, label: 'Senior Board / Entrance', icon: GraduationCap, tag: 'Board Exam' },
];

export const ClassGrid: React.FC<ClassGridProps> = ({ selectedClass, onSelectClass }) => {
  const { isMidnight } = useTheme();

  return (
    <div id="class-selection-section" className="scroll-mt-24">
      {/* Header text with warm rising badge */}
      <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2.5 border ${
            isMidnight
              ? 'bg-orange-500/15 border-orange-400/30 text-amber-300'
              : 'bg-orange-50 border-orange-200/80 text-orange-800'
          }`}
        >
          <span>Step 1 • Student Class</span>
        </div>
        <h2
          className={`text-2xl sm:text-3.5xl font-extrabold tracking-tight ${
            isMidnight ? 'text-white' : 'text-[#0F172A]'
          }`}
        >
          Choose Your Child's Class
        </h2>
        <p
          className={`mt-1.5 text-xs sm:text-sm max-w-md mx-auto ${
            isMidnight ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          Tap a class to explore available boards, syllabus chapters, and verified home tutors.
        </p>
      </div>

      {/* Grid: Mobile 2 cols, Tablet 3-4 cols, Laptop 4 cols, Desktop 6 cols */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {CLASS_CONFIGS.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedClass === item.num;

          return (
            <button
              key={item.num}
              type="button"
              onClick={() => onSelectClass(item.num)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectClass(item.num);
                }
              }}
              tabIndex={0}
              aria-label={`Select Class ${item.num} to explore boards, subjects and tutors`}
              aria-pressed={isSelected}
              className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-3 focus-visible:ring-orange-500 ${
                isSelected
                  ? 'bg-gradient-to-br from-indigo-700 via-rose-600 to-orange-500 text-white shadow-rising ring-2 ring-orange-500 scale-[1.02]'
                  : isMidnight
                  ? 'bg-[#0F172A] hover:bg-[#162036] text-white border border-orange-500/25 hover:border-amber-400/60 shadow-lg shadow-black/50 hover:shadow-orange-500/10'
                  : 'bg-white hover:bg-orange-50/30 text-slate-900 border border-slate-200/90 hover:border-orange-300 shadow-xs hover:shadow-md'
              }`}
            >
              {/* Top row with icon & tag */}
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : isMidnight
                      ? 'bg-orange-500/20 text-amber-300 group-hover:bg-orange-500/30'
                      : 'bg-orange-50 text-orange-600 group-hover:bg-orange-100 group-hover:text-orange-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {item.num === 10 || item.num === 12 ? (
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isSelected
                        ? 'bg-amber-300 text-slate-900 shadow-xs'
                        : isMidnight
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                        : 'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}
                  >
                    Board
                  </span>
                ) : (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-indigo-100'
                        : isMidnight
                        ? 'bg-slate-800 text-slate-300 border border-slate-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {item.tag}
                  </span>
                )}
              </div>

              {/* Class Title */}
              <div>
                <h3
                  className={`text-xl sm:text-2xl font-black tracking-tight leading-none ${
                    isSelected
                      ? 'text-white'
                      : isMidnight
                      ? 'text-white group-hover:text-amber-300'
                      : 'text-slate-900 group-hover:text-indigo-700'
                  }`}
                >
                  Class {item.num}
                </h3>
                <p
                  className={`text-[11px] sm:text-xs mt-1 line-clamp-1 font-medium ${
                    isSelected
                      ? 'text-orange-100'
                      : isMidnight
                      ? 'text-slate-400 group-hover:text-slate-300'
                      : 'text-slate-500'
                  }`}
                >
                  {item.label}
                </p>
              </div>

              {/* Bottom action label + arrow */}
              <div
                className={`mt-3.5 pt-2.5 flex items-center justify-between border-t text-xs font-bold ${
                  isSelected
                    ? 'border-white/20 text-white'
                    : isMidnight
                    ? 'border-slate-800 text-amber-400 group-hover:text-amber-300'
                    : 'border-slate-100 text-orange-600 group-hover:text-orange-700'
                }`}
              >
                <span>{isSelected ? 'Selected' : 'Explore'}</span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isSelected
                      ? 'rotate-90 text-white'
                      : isMidnight
                      ? 'group-hover:translate-x-1 text-amber-400'
                      : 'group-hover:translate-x-1 text-orange-500'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
