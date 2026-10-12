import React from 'react';
import { ArrowDown, CheckCircle, ShieldCheck, Sparkles, Users, Award, Star, Flame } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeroSectionProps {
  onExploreClassesClick: () => void;
  onJoinTeacherClick: () => void;
  onOpenAiAdvisor: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClassesClick,
  onJoinTeacherClick,
  onOpenAiAdvisor,
}) => {
  const { isMidnight } = useTheme();
  return (
    <section className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-20 bg-rising-subtle">
      {/* Decorative Warm Rising Ambient Glows */}
      <div className="absolute top-0 right-10 -mt-10 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-br from-amber-200/50 via-orange-200/40 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 -ml-16 w-72 h-72 rounded-full bg-gradient-to-tr from-indigo-200/40 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            {/* Rising Dawn Micro-Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-xs border ${
                isMidnight
                  ? 'bg-orange-500/15 border-orange-400/30 text-amber-300'
                  : 'bg-gradient-to-r from-orange-50 via-amber-50 to-indigo-50 border-orange-200/70 text-slate-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className={isMidnight ? 'text-amber-200 font-bold' : 'text-orange-950 font-bold'}>
                New Batch Academic Year 2026–27
              </span>
              <span className="text-slate-400">•</span>
              <span className={isMidnight ? 'text-indigo-300 font-medium hidden sm:inline' : 'text-indigo-800 font-medium hidden sm:inline'}>
                Classes 1 to 12
              </span>
            </div>

            {/* Main Tagline with Rising Sunset Gradient */}
            <h1
              className={`text-3.5xl sm:text-4.5xl md:text-5xl lg:text-5.5xl font-extrabold tracking-tight leading-[1.12] ${
                isMidnight ? 'text-white' : 'text-[#0F172A]'
              }`}
            >
              Find the Right Tutor <br className="hidden sm:inline" />
              <span className="text-rising-gradient font-black">
                for Your Child
              </span>
            </h1>

            {/* Supporting Description */}
            <p
              className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal ${
                isMidnight ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Explore Classes 1–12, choose your education board, discover subjects, and connect with suitable home or online tutors. Personalised 1-on-1 attention with verified teachers.
            </p>

            {/* Simplified, High-Contrast Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onExploreClassesClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-700 via-rose-600 to-orange-500 hover:opacity-95 text-white font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-2xl shadow-rising hover:shadow-rising-hover transition-all duration-200 cursor-pointer active:scale-98"
              >
                <span>Explore Classes</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              <button
                onClick={onJoinTeacherClick}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl border transition-all duration-200 cursor-pointer shadow-xs ${
                  isMidnight
                    ? 'bg-[#0F172A] hover:bg-[#162036] text-white border-slate-700 hover:border-amber-400'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-orange-300'
                }`}
              >
                <span>Join as Teacher</span>
              </button>

              <button
                onClick={onOpenAiAdvisor}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 font-bold text-xs sm:text-sm px-4.5 py-3.5 rounded-2xl border transition-all duration-200 cursor-pointer shadow-xs ${
                  isMidnight
                    ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-amber-300 border-orange-400/40 hover:bg-orange-500/30'
                    : 'bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 text-orange-900 border-orange-200/80'
                }`}
                title="AI Study & Syllabus Advisor"
              >
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>AI Study Advisor</span>
              </button>
            </div>

            {/* Reassurance Metric Badges */}
            <div
              className={`pt-4 grid grid-cols-3 gap-3 border-t max-w-lg mx-auto lg:mx-0 text-left ${
                isMidnight ? 'border-slate-800' : 'border-orange-200/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <p className={`text-xs font-bold leading-none ${isMidnight ? 'text-white' : 'text-slate-900'}`}>
                    100% Verified
                  </p>
                  <p className={`text-[11px] mt-0.5 ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
                    Police & Degree check
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className={`text-xs font-bold leading-none ${isMidnight ? 'text-white' : 'text-slate-900'}`}>
                    Free Demo
                  </p>
                  <p className={`text-[11px] mt-0.5 ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
                    45-min trial class
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-400 shrink-0" />
                <div>
                  <p className={`text-xs font-bold leading-none ${isMidnight ? 'text-white' : 'text-slate-900'}`}>
                    All Boards
                  </p>
                  <p className={`text-[11px] mt-0.5 ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
                    CBSE, ICSE, SSC
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div
                className={`rounded-3xl p-6 sm:p-7 shadow-rising relative z-10 border backdrop-blur-md ${
                  isMidnight
                    ? 'bg-[#0F172A]/90 border-orange-500/30 text-white'
                    : 'bg-white/95 border-orange-100/80 text-slate-900'
                }`}
              >
                <div
                  className={`flex items-center justify-between pb-4 border-b ${
                    isMidnight ? 'border-slate-800' : 'border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-700 via-rose-600 to-amber-400 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-orange-500/20">
                      AR
                    </div>
                    <div>
                      <h3 className={`font-bold text-base leading-snug ${isMidnight ? 'text-white' : 'text-slate-900'}`}>
                        AR Solution Home Tutor
                      </h3>
                      <p className={`text-xs ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
                        Mumbai • Pune • Thane • Delhi NCR
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-xl border ${
                      isMidnight
                        ? 'bg-amber-400/10 border-amber-400/30 text-amber-300'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold">4.9/5</span>
                  </div>
                </div>

                {/* 3 Simple Visual Highlights */}
                <div className="py-4 space-y-2.5">
                  <div
                    className={`p-3 rounded-2xl border flex items-center justify-between ${
                      isMidnight
                        ? 'bg-orange-500/10 border-orange-500/25'
                        : 'bg-gradient-to-r from-orange-50/70 to-amber-50/50 border-orange-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-extrabold text-xs">
                        10th
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${isMidnight ? 'text-white' : 'text-slate-900'}`}>
                          Secondary Board Special
                        </p>
                        <p className={`text-[11px] ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
                          CBSE, ICSE & SSC (Algebra, Science)
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        isMidnight
                          ? 'text-amber-300 bg-orange-500/20'
                          : 'text-orange-800 bg-orange-100/80'
                      }`}
                    >
                      Home & Online
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-2xl border flex items-center justify-between ${
                      isMidnight
                        ? 'bg-indigo-500/10 border-indigo-500/25'
                        : 'bg-gradient-to-r from-indigo-50/70 to-blue-50/50 border-indigo-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-xs">
                        12th
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${isMidnight ? 'text-white' : 'text-slate-900'}`}>
                          Senior Streams (Sci / Comm)
                        </p>
                        <p className={`text-[11px] ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
                          Physics, Chem, Maths, Accounts, Eco
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        isMidnight
                          ? 'text-indigo-300 bg-indigo-500/20'
                          : 'text-indigo-700 bg-indigo-100/80'
                      }`}
                    >
                      Senior Mentors
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-2xl border flex items-center justify-between ${
                      isMidnight
                        ? 'bg-emerald-500/10 border-emerald-500/25'
                        : 'bg-slate-50 border border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xs">
                        1–8
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${isMidnight ? 'text-white' : 'text-slate-900'}`}>
                          Primary & Middle School
                        </p>
                        <p className={`text-[11px] ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
                          Concept foundation, Homework support
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        isMidnight
                          ? 'text-emerald-300 bg-emerald-500/20'
                          : 'text-emerald-800 bg-emerald-100/80'
                      }`}
                    >
                      Patient Faculty
                    </span>
                  </div>
                </div>

                {/* Instant Tap to Explore */}
                <div className="pt-1">
                  <button
                    onClick={onExploreClassesClick}
                    className="w-full py-3 bg-gradient-to-r from-indigo-700 via-rose-600 to-orange-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Tap below to choose your child’s class</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Floating Verified Teachers Pill */}
              <div
                className={`hidden sm:flex absolute -bottom-4 -left-4 rounded-2xl p-3 shadow-md border items-center gap-2.5 z-20 ${
                  isMidnight
                    ? 'bg-[#0F172A] border-orange-500/30 text-white shadow-black/60'
                    : 'bg-white border-orange-100 text-slate-900'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-xs">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`text-xs font-extrabold ${isMidnight ? 'text-white' : 'text-slate-900'}`}>
                    500+ Verified Educators
                  </p>
                  <p className={`text-[10px] ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
                    Ready for instant matching
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
