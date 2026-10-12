import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  BookOpen,
  Search,
  CheckCircle2,
  Calendar,
  Clock,
  Award,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { BoardId, Chapter, SyllabusData } from '../types';
import { SYLLABUS_DATABASE, SUPPORTED_BOARDS } from '../data/mockData';

interface SyllabusAccordionProps {
  selectedClass: number;
  selectedBoard: BoardId;
  selectedSubjects: string[];
  onFindTutorForSubject: (subjectId: string) => void;
  onRequestTutor: () => void;
  onOpenAiAdvisor: () => void;
}

export const SyllabusAccordion: React.FC<SyllabusAccordionProps> = ({
  selectedClass,
  selectedBoard,
  selectedSubjects,
  onFindTutorForSubject,
  onRequestTutor,
  onOpenAiAdvisor,
}) => {
  // If multiple subjects are selected, let parent toggle between them
  const [activeSubjectTab, setActiveSubjectTab] = useState<string>(
    selectedSubjects[0] || 'math'
  );

  // Accordion state: open chapters (set of numbers)
  const [openChapters, setOpenChapters] = useState<Record<number, boolean>>({
    1: true, // open chapter 1 by default
    2: true,
  });

  const toggleChapter = (num: number) => {
    setOpenChapters((prev) => ({
      ...prev,
      [num]: !prev[num],
    }));
  };

  const expandAll = (chapters: Chapter[]) => {
    const newState: Record<number, boolean> = {};
    chapters.forEach((c) => {
      newState[c.number] = true;
    });
    setOpenChapters(newState);
  };

  const collapseAll = () => {
    setOpenChapters({});
  };

  // Find syllabus data in the database
  const syllabusKey = `${selectedClass}-${selectedBoard}-${activeSubjectTab}`;
  const syllabusData: SyllabusData | undefined = SYLLABUS_DATABASE[syllabusKey];

  const boardName =
    SUPPORTED_BOARDS.find((b) => b.id === selectedBoard)?.name || selectedBoard.toUpperCase();

  return (
    <div
      id="syllabus-panel"
      className="mt-8 bg-white rounded-3xl p-5 sm:p-8 md:p-10 border border-orange-100 shadow-rising scroll-mt-24 transition-all duration-300 animate-fade-in"
    >
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/60 text-orange-800 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Official Curriculum & Syllabus Overview</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Class {selectedClass} • {boardName} Syllabus
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Understand key chapters, unit weightage, and learning objectives before beginning tuition.
          </p>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenAiAdvisor}
            className="inline-flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-indigo-200 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Chapter Breakdown</span>
          </button>
        </div>
      </div>

      {/* Multiple Subject Switcher Tabs (if user picked more than 1 subject) */}
      {selectedSubjects.length > 1 && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            Subject:
          </span>
          {selectedSubjects.map((subId) => (
            <button
              key={subId}
              type="button"
              onClick={() => setActiveSubjectTab(subId)}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                activeSubjectTab === subId
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {subId.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Case 1: Verified Syllabus Found */}
      {syllabusData ? (
        <div className="mt-6">
          {/* Syllabus Meta Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500">Total Units/Chapters</p>
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  {syllabusData.chapters.length} Chapters
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500">Recommended Prep</p>
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  {syllabusData.recommendedHours} Hours
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500">Academic Year</p>
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  {syllabusData.academicYear.split(' ')[0]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500">Status</p>
                <p className="text-xs sm:text-sm font-bold text-emerald-700">
                  Verified NCERT/Board
                </p>
              </div>
            </div>
          </div>

          {/* Controls: Expand/Collapse All */}
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              {syllabusData.subjectName}
            </h4>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700">
              <button
                type="button"
                onClick={() => expandAll(syllabusData.chapters)}
                className="hover:underline cursor-pointer"
              >
                Expand All
              </button>
              <span className="text-slate-300">•</span>
              <button
                type="button"
                onClick={collapseAll}
                className="hover:underline cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Chapter Accordion List */}
          <div className="space-y-3">
            {syllabusData.chapters.map((chapter) => {
              const isOpen = !!openChapters[chapter.number];

              return (
                <div
                  key={chapter.number}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-indigo-200 bg-white shadow-xs'
                      : 'border-slate-200 bg-slate-50/60 hover:bg-white'
                  }`}
                >
                  {/* Chapter Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleChapter(chapter.number)}
                    className="w-full flex items-center justify-between p-4 sm:p-4.5 text-left cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-4">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                          isOpen
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {chapter.number}
                      </div>
                      <div>
                        <h5 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          Chapter {chapter.number}: {chapter.title}
                        </h5>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                          {chapter.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {chapter.examWeightage && (
                        <span className="hidden sm:inline-block text-[11px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100">
                          {chapter.examWeightage}
                        </span>
                      )}
                      <div className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-indigo-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Chapter Expanded Body */}
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/40 text-xs sm:text-sm text-slate-700 space-y-3.5 animate-fade-in">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                          Summary & Concepts Covered
                        </p>
                        <p className="text-slate-700 leading-relaxed">{chapter.description}</p>
                      </div>

                      {chapter.learningObjectives && chapter.learningObjectives.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                            Key Learning Objectives
                          </p>
                          <ul className="space-y-1.5">
                            {chapter.learningObjectives.map((obj, i) => (
                              <li key={i} className="flex items-start gap-2 text-slate-700">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="leading-snug">{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 italic">
                          Recommended tuition time: ~6 to 8 hours with sample problems
                        </span>
                        <button
                          type="button"
                          onClick={() => onFindTutorForSubject(activeSubjectTab)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          <Search className="w-3.5 h-3.5" />
                          <span>Find Tutors for Chapter {chapter.number}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Action CTA */}
          <div className="mt-8 p-5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="text-sm font-bold text-slate-900">
                Want 1-on-1 guidance for {syllabusData.subjectName}?
              </h5>
              <p className="text-xs text-slate-600 mt-0.5">
                Our home tutors follow this exact board syllabus with weekly tests and revision drills.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onFindTutorForSubject(activeSubjectTab)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#4338CA] hover:bg-indigo-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Find a Tutor for This Subject</span>
            </button>
          </div>
        </div>
      ) : (
        /* Case 2: Verified Syllabus unavailable for this exact combo (Requirement 8) */
        <div className="mt-6 p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
            <Info className="w-6 h-6" />
          </div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900">
            Syllabus Overview in Preparation
          </h4>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            The detailed syllabus for this selection is being prepared. You can still request a suitable tutor.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onFindTutorForSubject(activeSubjectTab)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#4338CA] hover:bg-indigo-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Find Available Tutors</span>
            </button>
            <button
              type="button"
              onClick={onRequestTutor}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl border border-slate-300 transition-all cursor-pointer"
            >
              <span>Request a Custom Tutor</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
