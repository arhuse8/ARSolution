import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Brain,
  Send,
  Loader2,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Target,
  GraduationCap,
  Users,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { BoardId } from '../types';

interface AiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillClass?: number | null;
  prefillBoard?: BoardId | null;
  prefillSubject?: string;
  onRequestTutor: () => void;
}

export const AiAdvisorModal: React.FC<AiAdvisorModalProps> = ({
  isOpen,
  onClose,
  prefillClass,
  prefillBoard,
  prefillSubject,
  onRequestTutor,
}) => {
  const [studentClass, setStudentClass] = useState<number>(prefillClass || 10);
  const [board, setBoard] = useState<string>(prefillBoard || 'CBSE');
  const [subject, setSubject] = useState<string>(prefillSubject || 'Mathematics');
  const [difficultyAreas, setDifficultyAreas] = useState<string>(
    'Struggling with conceptual numericals, formula application, and time management in school unit tests.'
  );
  const [targetGoals, setTargetGoals] = useState<string>(
    'Score 90%+ in board exams and build strong foundation for entrance exams.'
  );
  const [parentQuery, setParentQuery] = useState<string>(
    'How many home tuition sessions per week are recommended, and what chapter order should we follow?'
  );

  const [isLoading, setIsLoading] = useState(false);
  const [planResult, setPlanResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync prefill on open
  useEffect(() => {
    if (isOpen) {
      if (prefillClass) setStudentClass(prefillClass);
      if (prefillBoard) setBoard(prefillBoard);
      if (prefillSubject) setSubject(prefillSubject);
    }
  }, [isOpen, prefillClass, prefillBoard, prefillSubject]);

  // ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setPlanResult(null);

    try {
      const response = await fetch('/api/ai-academic-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentClass,
          board,
          subject,
          difficultyAreas,
          targetGoals,
          availableStudyHours: '4 to 6 hours per week',
          parentQuery,
        }),
      });

      const data = await response.json();
      if (data.status === 'success' && data.studyPlan) {
        setPlanResult(data.studyPlan);
      } else {
        throw new Error(data.message || 'Failed to generate plan.');
      }
    } catch (err: any) {
      console.warn('Backend unavailable, generating client curriculum-aligned academic plan:', err);
      // Fallback response for static hosting environments like GitHub Pages
      setPlanResult({
        title: `Comprehensive Academic Roadmap for Class ${studentClass} (${board}) - ${subject}`,
        executiveSummary: `Targeted 1-on-1 pedagogical strategy designed to resolve conceptual bottlenecks, instill daily revision discipline, and master ${board} exam problem formats.`,
        recommendedWeeklyTuitionHours: '3 sessions x 1.5 hours (4.5 hrs/week)',
        weeklyPlan: [
          {
            week: 'Phase 1 (Weeks 1–2)',
            focus: 'Diagnostic Assessment & Core Fundamentals',
            actionItems: [
              'Administer diagnostic test on foundational formulas, definitions, and theorems',
              'Identify recurring calculation, sign-convention, and conceptual misunderstandings',
              'Create a student-maintained Formula & Reaction Formula Register',
            ],
          },
          {
            week: 'Phase 2 (Weeks 3–4)',
            focus: 'High-Weightage Chapters & Guided Problem Solving',
            actionItems: [
              'Solve all standard NCERT / State board textbook exercise questions step-by-step',
              'Work through exemplar problem sets with tutor intervention on tricky applications',
              'Conduct 45-minute timed unit test at the end of each completed chapter',
            ],
          },
          {
            week: 'Phase 3 (Weeks 5–8)',
            focus: 'Past 5-Year Board Questions & Speed Drills',
            actionItems: [
              'Solve past 5 to 10 years board examination papers under real exam timing',
              'Drill step-by-step marking scheme presentation to minimize careless deductions',
              'Conduct bi-weekly review meetings with parents regarding progress metrics',
            ],
          },
        ],
        highWeightageChaptersToPrioritize: [
          `Class ${studentClass} ${subject} Core Units (High marks weightage in ${board})`,
          'Fundamental Algebra & Geometry / Mechanics & Optics derivations',
          'Application-based word problems and case study questions',
        ],
        recommendedTutorProfile: `Request a senior educator with at least 5+ years of experience in ${board} evaluation patterns who conducts weekly diagnostic tests and provides individual whiteboard clarity.`,
        parentGuidance: 'Ensure a quiet, distraction-free study space for 1-on-1 home sessions. Review weekly test scores and verify homework completion without creating exam anxiety.',
        keyExamTips: [
          'Never leave questions unattempted in board papers; write formula and given data for partial step marks.',
          'Highlight final numerical answers with appropriate units.',
          'Maintain a neat margin and clean diagrams drawn with sharp pencil and ruler.',
        ],
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-advisor-title"
    >
      <div
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close AI Advisor"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3.5 pb-5 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-700 via-blue-600 to-indigo-900 text-white flex items-center justify-center shadow-md shadow-indigo-300 shrink-0">
            <Brain className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Gemini 3.1 Pro Preview • High Reasoning
              </span>
            </div>
            <h3 id="ai-advisor-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              AI Academic & Tuition Strategy Advisor
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Deep curriculum reasoning tailored to Indian CBSE, ICSE, and Maharashtra State Board syllabi.
            </p>
          </div>
        </div>

        {/* Form Input if no plan yet */}
        {!planResult && (
          <form onSubmit={handleGeneratePlan} className="py-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Student Class
                </label>
                <select
                  value={studentClass}
                  onChange={(e) => setStudentClass(parseInt(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((c) => (
                    <option key={c} value={c}>
                      Class {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Board
                </label>
                <select
                  value={board}
                  onChange={(e) => setBoard(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="CBSE">CBSE (NCERT)</option>
                  <option value="ICSE">ICSE / ISC</option>
                  <option value="Maharashtra State Board">Maharashtra State Board (SSC/HSC)</option>
                  <option value="Other Board">Other State / Cambridge / IB</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Subject(s)
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Mathematics & Science"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Child's Current Weak Areas / Academic Challenges
              </label>
              <textarea
                rows={2}
                value={difficultyAreas}
                onChange={(e) => setDifficultyAreas(e.target.value)}
                placeholder="e.g. Forgets formulas, struggles in word problems, lacks regular daily practice..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target Goal
                </label>
                <input
                  type="text"
                  value={targetGoals}
                  onChange={(e) => setTargetGoals(e.target.value)}
                  placeholder="e.g. Score 90%+ in Term & Board Exams"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Specific Question / Parent Concern
                </label>
                <input
                  type="text"
                  value={parentQuery}
                  onChange={(e) => setParentQuery(e.target.value)}
                  placeholder="e.g. How many hours per week? What tutor profile?"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs border border-rose-200">
                {errorMsg}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-700 to-blue-600 hover:from-indigo-800 hover:to-blue-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Curriculum with High Reasoning...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate In-Depth Study & Tuition Plan</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Loading state indicator */}
        {isLoading && (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto text-indigo-700 animate-pulse">
              <Brain className="w-8 h-8 text-indigo-600" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Gemini 3.1 Pro Preview is Thinking deeply...
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              Evaluating Class {studentClass} ({board}) board exam weightage, pedagogical sequences, cognitive retention methods, and ideal teacher profile requirements.
            </p>
          </div>
        )}

        {/* Plan Result Display */}
        {planResult && (
          <div className="py-4 space-y-6 animate-fade-in text-xs sm:text-sm">
            {/* Title & Summary */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 via-blue-50/40 to-white border border-indigo-100">
              <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                Custom Academic Strategy
              </span>
              <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                {planResult.title || `Academic Strategy for Class ${studentClass} (${board})`}
              </h4>
              <p className="text-slate-700 mt-2 leading-relaxed">
                {planResult.executiveSummary}
              </p>
              {planResult.recommendedWeeklyTuitionHours && (
                <div className="mt-3 inline-flex items-center gap-2 bg-indigo-100/70 text-indigo-900 font-bold px-3 py-1.5 rounded-lg text-xs">
                  <Clock className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Recommended: {planResult.recommendedWeeklyTuitionHours}</span>
                </div>
              )}
            </div>

            {/* Weekly Phase Breakdown */}
            {planResult.weeklyPlan && planResult.weeklyPlan.length > 0 && (
              <div>
                <h5 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span>Phase-Wise Syllabus Execution Roadmap</span>
                </h5>
                <div className="space-y-3">
                  {planResult.weeklyPlan.map((phase: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/70"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-extrabold text-indigo-700 text-xs sm:text-sm">
                          {phase.week}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {phase.focus}
                        </span>
                      </div>
                      {phase.actionItems && (
                        <ul className="mt-2 space-y-1 text-slate-700 text-xs">
                          {phase.actionItems.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* High Weightage Chapters */}
            {planResult.highWeightageChaptersToPrioritize && (
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950">
                <h5 className="font-bold text-xs uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-amber-600" />
                  <span>High-Weightage Chapters to Prioritize First</span>
                </h5>
                <ul className="space-y-1 text-xs">
                  {planResult.highWeightageChaptersToPrioritize.map((ch: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-amber-700">•</span>
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended Tutor Profile */}
            {planResult.recommendedTutorProfile && (
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950">
                <h5 className="font-bold text-xs uppercase tracking-wider text-indigo-800 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>What Kind of Home Tutor to Request</span>
                </h5>
                <p className="text-xs text-indigo-900 leading-relaxed">
                  {planResult.recommendedTutorProfile}
                </p>
              </div>
            )}

            {/* Parent Guidance */}
            {planResult.parentGuidance && (
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-800">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Guidance for Parents</span>
                </h5>
                <p className="text-xs leading-relaxed text-slate-700">
                  {planResult.parentGuidance}
                </p>
              </div>
            )}

            {/* Exam Tips */}
            {planResult.keyExamTips && (
              <div>
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  Key Board Exam Strategies
                </h5>
                <ul className="space-y-1 text-xs text-slate-700">
                  {planResult.keyExamTips.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-indigo-600 font-bold">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setPlanResult(null)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Modify Query & Re-analyze
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRequestTutor();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#4338CA] hover:bg-indigo-800 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer text-center"
              >
                Request a Tutor Based on this Plan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
