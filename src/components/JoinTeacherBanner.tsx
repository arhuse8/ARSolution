import React from 'react';
import { UserPlus, Sparkles, CheckCircle2 } from 'lucide-react';

interface JoinTeacherBannerProps {
  onRegisterClick: () => void;
}

export const JoinTeacherBanner: React.FC<JoinTeacherBannerProps> = ({ onRegisterClick }) => {
  return (
    <section className="py-14 bg-gradient-to-br from-slate-900 via-indigo-950 to-orange-950 text-white relative overflow-hidden">
      {/* Decorative Warm Sunrise Ambient Blur */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-7 sm:p-11 border border-white/15 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl text-center lg:text-left space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-200 text-xs font-bold uppercase tracking-wider border border-orange-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Join India's Most Trusted Home Tutor Network</span>
            </div>

            <h2 className="text-2xl sm:text-3.5xl md:text-4xl font-black tracking-tight">
              Are You a Teacher?
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Join our teaching community and connect with students looking for personalised tuition. Teach locally in your area or online with transparent monthly payouts.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-orange-100">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Set your own hours & hourly fee
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Verified, safe student homes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Direct guaranteed monthly settlement
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto text-center">
            <button
              onClick={onRegisterClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 hover:opacity-95 text-slate-950 font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer transform active:scale-98"
            >
              <UserPlus className="w-5 h-5 text-slate-950" />
              <span>Register as a Teacher</span>
            </button>
            <p className="text-[11px] text-orange-200/80 mt-2 font-medium">
              Free registration • Verified community
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
