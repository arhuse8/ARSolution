import React from 'react';
import { ShieldCheck, Sparkles, LineChart, RefreshCw } from 'lucide-react';
import { TRUST_POINTS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

const ICON_MAP = {
  ShieldCheck: ShieldCheck,
  Sparkles: Sparkles,
  LineChart: LineChart,
  RefreshCw: RefreshCw,
};

export const TrustFeatures: React.FC = () => {
  const { isMidnight } = useTheme();

  return (
    <section
      className={`py-14 border-y transition-colors duration-300 ${
        isMidnight
          ? 'bg-[#0B101D] border-slate-800'
          : 'bg-white border-orange-100/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${
              isMidnight
                ? 'text-amber-300 bg-orange-500/15 border-orange-400/30'
                : 'text-orange-800 bg-orange-50 border-orange-200/60'
            }`}
          >
            Why Indian Parents Trust Us
          </span>
          <h2
            className={`text-2xl sm:text-3.5xl font-extrabold tracking-tight mt-2 ${
              isMidnight ? 'text-white' : 'text-slate-900'
            }`}
          >
            Safety, Quality & Peace of Mind for Your Child
          </h2>
          <p className={`text-xs sm:text-sm mt-1 ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
            Personalised home and online tuition held to the highest standard of trust.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRUST_POINTS.map((pt, i) => {
            const Icon = ICON_MAP[pt.icon as keyof typeof ICON_MAP] || ShieldCheck;
            return (
              <div
                key={i}
                className={`p-6 rounded-3xl border transition-all group ${
                  isMidnight
                    ? 'bg-[#0F172A] border-orange-500/20 hover:border-amber-400/50 shadow-lg shadow-black/50'
                    : 'bg-gradient-to-b from-white to-orange-50/20 border-slate-200/90 hover:border-orange-300 hover:shadow-rising'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all shadow-xs ${
                    isMidnight
                      ? 'bg-orange-500/20 text-amber-300 group-hover:bg-gradient-to-tr group-hover:from-indigo-600 group-hover:to-orange-500 group-hover:text-white'
                      : 'bg-orange-50 text-orange-600 group-hover:bg-gradient-to-tr group-hover:from-indigo-600 group-hover:to-orange-500 group-hover:text-white'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3
                  className={`text-base font-bold transition-colors ${
                    isMidnight ? 'text-white group-hover:text-amber-300' : 'text-slate-900 group-hover:text-indigo-700'
                  }`}
                >
                  {pt.title}
                </h3>
                <p className={`text-xs mt-1.5 leading-relaxed ${isMidnight ? 'text-slate-400' : 'text-slate-600'}`}>
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
