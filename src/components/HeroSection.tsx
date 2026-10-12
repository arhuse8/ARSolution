import React from 'react';
import { ArrowDown, CheckCircle, ShieldCheck, Sparkles, Users, Award, Star, Flame } from 'lucide-react';

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-50 via-amber-50 to-indigo-50 border border-orange-200/70 text-slate-800 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-orange-950 font-bold">New Batch Academic Year 2026–27</span>
              <span className="text-slate-400">•</span>
              <span className="text-indigo-800 font-medium hidden sm:inline">Classes 1 to 12</span>
            </div>

            {/* Main Tagline with Rising Sunset Gradient */}
            <h1 className="text-3.5xl sm:text-4.5xl md:text-5xl lg:text-5.5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.12]">
              Find the Right Tutor <br className="hidden sm:inline" />
              <span className="text-rising-gradient font-black">
                for Your Child
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Explore Classes 1–12, choose your education board, discover subjects, and connect with suitable home or online tutors. Personalised 1-on-1 attention with verified teachers.
            </p>

            {/* Simplified, High-Contrast Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onExploreClassesClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-700 via-indigo-600 to-orange-500 hover:opacity-95 text-white font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-2xl shadow-rising hover:shadow-rising-hover transition-all duration-200 cursor-pointer active:scale-98"
              >
                <span>Explore Classes</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              <button
                onClick={onJoinTeacherClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl border border-slate-200 shadow-xs hover:border-orange-300 transition-all duration-200 cursor-pointer"
              >
                <span>Join as Teacher</span>
              </button>

              <button
                onClick={onOpenAiAdvisor}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 text-orange-900 font-bold text-xs sm:text-sm px-4.5 py-3.5 rounded-2xl border border-orange-200/80 transition-all duration-200 cursor-pointer shadow-xs"
                title="AI Study & Syllabus Advisor"
              >
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>AI Study Advisor</span>
              </button>
            </div>

            {/* Reassurance Metric Badges */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-orange-200/40 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-none">100% Verified</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Police & Degree check</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-none">Free Demo</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">45-min trial class</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-none">All Boards</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">CBSE, ICSE, SSC</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-rising border border-orange-100/80 relative z-10">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-700 to-orange-500 text-white font-extrabold text-xl flex items-center justify-center shadow-md shadow-orange-500/20">
                      AR
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base leading-snug">AR Solution Home Tutor</h3>
                      <p className="text-xs text-slate-500">Mumbai • Pune • Thane • Delhi NCR</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-xl">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-amber-900">4.9/5</span>
                  </div>
                </div>

                {/* 3 Simple Visual Highlights */}
                <div className="py-4 space-y-2.5">
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-50/70 to-amber-50/50 border border-orange-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-extrabold text-xs">
                        10th
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Secondary Board Special</p>
                        <p className="text-[11px] text-slate-500">CBSE, ICSE & SSC (Algebra, Science)</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-orange-800 bg-orange-100/80 px-2 py-0.5 rounded-md">
                      Home & Online
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-50/70 to-blue-50/50 border border-indigo-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-xs">
                        12th
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Senior Streams (Sci / Comm)</p>
                        <p className="text-[11px] text-slate-500">Physics, Chem, Maths, Accounts, Eco</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-md">
                      Senior Mentors
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xs">
                        1–8
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Primary & Middle School</p>
                        <p className="text-[11px] text-slate-500">Concept foundation, Homework support</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                      Patient Faculty
                    </span>
                  </div>
                </div>

                {/* Instant Tap to Explore */}
                <div className="pt-1">
                  <button
                    onClick={onExploreClassesClick}
                    className="w-full py-3 bg-gradient-to-r from-indigo-700 via-indigo-600 to-orange-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Tap below to choose your child’s class</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Floating Verified Teachers Pill */}
              <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-white rounded-2xl p-3 shadow-md border border-orange-100 items-center gap-2.5 z-20">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-xs">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">500+ Verified Educators</p>
                  <p className="text-[10px] text-slate-500">Ready for instant matching</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
