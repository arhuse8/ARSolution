import React, { useEffect } from 'react';
import {
  X,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Target,
  Award,
  Phone,
  Mail,
  MapPin,
  HeartHandshake,
  BookOpen,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFindTutor: () => void;
  onJoinTeacher: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onFindTutor,
  onJoinTeacher,
}) => {
  const { isMidnight } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border relative animate-scale-up text-xs sm:text-sm ${
          isMidnight
            ? 'bg-[#0B101D] border-orange-500/30 text-slate-200'
            : 'bg-white border-slate-200 text-slate-700'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close Button */}
        <div
          className={`sticky top-0 z-10 p-5 sm:p-6 border-b flex items-center justify-between backdrop-blur-md ${
            isMidnight
              ? 'bg-[#0B101D]/90 border-slate-800'
              : 'bg-white/90 border-slate-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-rose-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className={`text-lg sm:text-xl font-black tracking-tight ${
                    isMidnight ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  About ARsolution
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-600 border border-orange-400/30">
                  Home & Online Tutor
                </span>
              </div>
              <p
                className={`text-xs ${
                  isMidnight ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Connecting Indian students with premier 1-on-1 verified educators
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isMidnight
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 sm:space-y-8">
          {/* Hero Banner inside modal */}
          <div
            className={`p-6 rounded-2xl border ${
              isMidnight
                ? 'bg-[#0F172A] border-orange-500/20'
                : 'bg-gradient-to-r from-orange-50 to-amber-50/50 border-orange-200/80'
            }`}
          >
            <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Our Core Philosophy</span>
            </div>
            <h4
              className={`text-base sm:text-lg font-black mb-2 ${
                isMidnight ? 'text-white' : 'text-slate-900'
              }`}
            >
              Every student learns differently. We bring the classroom to your pace.
            </h4>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isMidnight ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              <strong>ARsolution</strong> was established to bridge the gap between rigorous institutional
              curriculums (CBSE, ICSE, SSC, HSC) and individual student understanding. We provide verified,
              empathetic educators who focus on concept clarity, regular practice, and stress-free academic growth.
            </p>
          </div>

          {/* Detailed sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={`p-4 sm:p-5 rounded-2xl border ${
                isMidnight
                  ? 'bg-[#151E32] border-slate-800'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <Target className="w-5 h-5 text-orange-500" />
                <h5
                  className={`font-bold text-sm ${
                    isMidnight ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Our Mission
                </h5>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isMidnight ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                To provide accessible, high-standard personal tutoring that inspires self-belief and
                ignites intellectual curiosity in every child, ensuring no student is left behind in
                crowded classrooms.
              </p>
            </div>

            <div
              className={`p-4 sm:p-5 rounded-2xl border ${
                isMidnight
                  ? 'bg-[#151E32] border-slate-800'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <h5
                  className={`font-bold text-sm ${
                    isMidnight ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Strict Safety & Trust
                </h5>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isMidnight ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Every home and online educator is verified through official ID authentication, educational
                degree reviews, demo lectures, and residential background checks for complete parent reassurance.
              </p>
            </div>
          </div>

          {/* Academic Highlights */}
          <div className="space-y-3">
            <h5
              className={`font-extrabold text-sm uppercase tracking-wider ${
                isMidnight ? 'text-amber-300' : 'text-slate-900'
              }`}
            >
              What Makes ARsolution Unique
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  title: 'Classes 1–12 Complete Coverage',
                  desc: 'From foundational phonics and math in primary school to advanced calculus and physics in Class 12.',
                },
                {
                  title: 'Multi-Board Expertise',
                  desc: 'Specialized syllabus tracking for CBSE (NCERT), ICSE/ISC, and Maharashtra State Board (SSC/HSC).',
                },
                {
                  title: 'Transparent Progress Tracking',
                  desc: 'Weekly milestone tracking and continuous communication with parents on weak areas and test scores.',
                },
                {
                  title: 'Free Zero-Risk Demo',
                  desc: 'Experience the teaching style firsthand before confirming tutor booking and schedule.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
                    isMidnight
                      ? 'bg-[#0F172A] border-slate-800/80'
                      : 'bg-slate-50 border-slate-200/80'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <h6
                      className={`text-xs font-bold ${
                        isMidnight ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </h6>
                    <p
                      className={`text-[11px] mt-0.5 ${
                        isMidnight ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Support Section */}
          <div
            className={`p-5 rounded-2xl border space-y-3 ${
              isMidnight
                ? 'bg-[#151E32] border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            <h5
              className={`font-bold text-xs uppercase tracking-wider ${
                isMidnight ? 'text-slate-300' : 'text-slate-800'
              }`}
            >
              ARsolution Academic Counseling & Inquiries
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <a
                  href="https://wa.me/919112768872"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  +91 91127 68872 (Call / WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>support@arsolutionhometutor.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>Pan-India Online & Major Hubs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div
          className={`sticky bottom-0 p-4 sm:p-5 border-t flex flex-wrap items-center justify-between gap-3 backdrop-blur-md ${
            isMidnight
              ? 'bg-[#0B101D]/95 border-slate-800'
              : 'bg-slate-50/95 border-slate-200'
          }`}
        >
          <button
            onClick={onClose}
            className={`text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer ${
              isMidnight
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onJoinTeacher();
              }}
              className={`text-xs font-bold px-4 py-2 rounded-xl border transition-colors cursor-pointer ${
                isMidnight
                  ? 'border-slate-700 text-slate-200 hover:border-amber-400'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Join as Teacher
            </button>
            <button
              onClick={() => {
                onClose();
                onFindTutor();
              }}
              className="text-xs font-extrabold px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-700 via-rose-600 to-orange-500 hover:opacity-95 text-white shadow-md transition-all cursor-pointer"
            >
              Find a Tutor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
