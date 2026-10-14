import React, { useState } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Target,
  Sparkles,
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  HeartHandshake,
  Compass,
  FileCheck,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AboutSectionProps {
  onFindTutorClick: () => void;
  onJoinTeacherClick: () => void;
  onOpenFullStory?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onFindTutorClick,
  onJoinTeacherClick,
  onOpenFullStory,
}) => {
  const { isMidnight } = useTheme();
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      icon: Target,
      title: 'Concept-First Learning',
      short: 'Deep conceptual clarity over rote memorization',
      desc: 'At ARsolution, we believe true academic performance stems from understanding first principles. Our educators break down complex science, math, and humanities topics into intuitive, relatable building blocks tailored to every student.',
    },
    {
      icon: ShieldCheck,
      title: 'Vetted & Verified Educators',
      short: 'Rigorous 4-step background & skill screening',
      desc: 'Every teacher on ARsolution undergoes academic degree validation, identity checks, pedagogical demonstration, and background screening before being matched with your family.',
    },
    {
      icon: Compass,
      title: 'Personalised 1-on-1 Pace',
      short: 'Custom study plans for Classes 1 to 12',
      desc: 'No student learns at the exact same rhythm. ARsolution customizes the syllabus timeline, practice worksheets, and revision schedule to match your child’s school curriculum (CBSE, ICSE, State Boards).',
    },
    {
      icon: HeartHandshake,
      title: 'Parent Partnership & Reports',
      short: 'Transparent weekly progress & feedback loops',
      desc: 'Stay informed with structured feedback after every module, regular parent-tutor check-ins, and proactive academic counseling to ensure zero learning gaps.',
    },
  ];

  const milestones = [
    { label: 'Active Students Mentored', value: '3,500+' },
    { label: 'Verified Tutors in Network', value: '1,200+' },
    { label: 'Parent Satisfaction Score', value: '98.6%' },
    { label: 'Syllabus Boards Supported', value: 'CBSE, ICSE & SSC' },
  ];

  return (
    <section
      id="about-arsolution"
      className={`py-16 sm:py-20 border-t transition-colors duration-300 relative overflow-hidden ${
        isMidnight ? 'bg-[#090E1A] border-slate-800' : 'bg-gradient-to-b from-white via-orange-50/20 to-white border-orange-100/70'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-orange-400/10 via-amber-300/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-500/10 via-rose-400/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Badge & Tagline */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-xs mb-3 ${
              isMidnight
                ? 'bg-orange-500/15 border-orange-400/30 text-amber-300'
                : 'bg-orange-50 border-orange-200/80 text-orange-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>About ARsolution</span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl md:text-4.5xl font-extrabold tracking-tight leading-tight ${
              isMidnight ? 'text-white' : 'text-slate-900'
            }`}
          >
            Empowering Every Student With{' '}
            <span className="text-rising-gradient font-black">Personalised 1-on-1 Guidance</span>
          </h2>

          <p
            className={`mt-4 text-sm sm:text-base leading-relaxed ${
              isMidnight ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <strong>ARsolution</strong> was founded to solve a simple yet critical problem: in crowded
            classrooms and oversized coaching batches, individual questions go unanswered. We connect
            families with passionate, background-verified educators for home and online tuition across
            Classes 1–12.
          </p>
        </div>

        {/* Narrative & Mission Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-6 space-y-5">
            <div
              className={`p-7 sm:p-8 rounded-3xl border transition-all ${
                isMidnight
                  ? 'bg-[#0F172A] border-orange-500/25 shadow-xl shadow-black/40'
                  : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-rose-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/25">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3
                    className={`font-black text-xl tracking-tight ${
                      isMidnight ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    The ARsolution Mission
                  </h3>
                  <p className="text-xs text-amber-500 font-semibold">
                    Academic Excellence • Integrity • Student Mentorship
                  </p>
                </div>
              </div>

              <div
                className={`space-y-3.5 text-xs sm:text-sm leading-relaxed ${
                  isMidnight ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                <p>
                  At <strong>ARsolution</strong>, we believe every child possesses innate capability.
                  With the right mentor, academic fear turns into genuine curiosity, and struggle transforms
                  into confidence.
                </p>
                <p>
                  We handpick teachers who are not just subject-matter experts, but patient mentors who
                  diagnose foundational gaps, adapt to the student’s learning style, and inspire continuous
                  improvement.
                </p>
              </div>

              {/* Guarantees Checklist */}
              <div className="mt-6 pt-5 border-t border-slate-200/40 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  '100% Free Demo Session',
                  'Background-Verified Tutors',
                  'Flexible In-Home & Online Slots',
                  'Zero-Hassle Tutor Replacement',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span
                      className={`text-xs font-semibold ${
                        isMidnight ? 'text-slate-200' : 'text-slate-700'
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Pillars of Excellence */}
          <div className="lg:col-span-6 space-y-3">
            <h3
              className={`text-lg font-bold mb-3 ${
                isMidnight ? 'text-amber-300' : 'text-slate-900'
              }`}
            >
              The 4 Pillars of the ARsolution Experience
            </h3>

            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const isActive = activePillar === index;
              return (
                <div
                  key={index}
                  onClick={() => setActivePillar(index)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? isMidnight
                        ? 'bg-[#151E32] border-amber-400/60 shadow-lg'
                        : 'bg-white border-orange-400 shadow-md'
                      : isMidnight
                      ? 'bg-[#0F172A]/70 border-slate-800 hover:border-slate-700'
                      : 'bg-white/70 border-slate-200/80 hover:border-orange-200'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-gradient-to-tr from-indigo-600 to-rose-500 text-white shadow-xs'
                          : isMidnight
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-orange-50 text-orange-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-sm sm:text-base font-bold ${
                            isActive
                              ? isMidnight
                                ? 'text-white'
                                : 'text-slate-900'
                              : isMidnight
                              ? 'text-slate-300'
                              : 'text-slate-700'
                          }`}
                        >
                          {pillar.title}
                        </h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-orange-500 text-white'
                              : isMidnight
                              ? 'text-slate-500'
                              : 'text-slate-400'
                          }`}
                        >
                          Pillar {index + 1}
                        </span>
                      </div>
                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          isMidnight ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {isActive ? pillar.desc : pillar.short}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestone Statistics Bar */}
        <div
          className={`rounded-3xl border p-6 sm:p-8 mb-12 shadow-sm ${
            isMidnight
              ? 'bg-[#0F172A] border-orange-500/20'
              : 'bg-gradient-to-r from-orange-50 via-white to-amber-50 border-orange-200/70'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {milestones.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-2xl sm:text-3.5xl font-black text-rising-gradient tracking-tight">
                  {m.value}
                </p>
                <p
                  className={`text-xs sm:text-sm font-semibold ${
                    isMidnight ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How ARsolution Works: 3 Simple Steps */}
        <div className="mb-14">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3
              className={`text-xl sm:text-2xl font-black ${
                isMidnight ? 'text-white' : 'text-slate-900'
              }`}
            >
              How ARsolution Connects You with the Right Tutor
            </h3>
            <p className={`text-xs sm:text-sm mt-1 ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
              Seamless 3-step process designed for busy parents and curious students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                step: '01',
                title: 'Tell Us Your Needs',
                desc: 'Select child’s class (1–12), education board (CBSE, ICSE, SSC), specific subjects, and preferred mode (home or online).',
                icon: BookOpen,
              },
              {
                step: '02',
                title: 'Free Introductory Demo',
                desc: 'We match you with an experienced teacher nearby. Schedule a 45-minute zero-commitment demo session to assess chemistry and teaching style.',
                icon: FileCheck,
              },
              {
                step: '03',
                title: 'Personalised Regular Classes',
                desc: 'Finalize regular schedule, track progress with periodic assessments, and watch your child’s conceptual understanding soar.',
                icon: Award,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`p-6 rounded-2xl border transition-all ${
                    isMidnight
                      ? 'bg-[#0F172A] border-slate-800'
                      : 'bg-white border-slate-200/90 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-orange-500 opacity-80">
                      {item.step}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isMidnight ? 'bg-slate-800 text-amber-400' : 'bg-orange-50 text-indigo-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4
                    className={`text-base font-bold mb-1.5 ${
                      isMidnight ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {item.title}
                  </h4>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isMidnight ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-6 ${
            isMidnight
              ? 'bg-gradient-to-r from-[#111827] to-[#1F2937] border-orange-500/30'
              : 'bg-gradient-to-r from-indigo-900 via-indigo-800 to-rose-900 text-white border-transparent shadow-lg'
          }`}
        >
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-black text-white">
              Ready to Experience the ARsolution Difference?
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
              Book a free trial class for your child or apply to join our verified educator network today.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {onOpenFullStory && (
              <button
                onClick={onOpenFullStory}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
              >
                Read Full Story
              </button>
            )}
            <button
              onClick={onFindTutorClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 shadow-md transition-all cursor-pointer transform active:scale-95"
            >
              <span>Find a Tutor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onJoinTeacherClick}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
            >
              Join as Teacher
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
