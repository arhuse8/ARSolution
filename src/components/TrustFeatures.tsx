import React from 'react';
import { ShieldCheck, Sparkles, LineChart, RefreshCw } from 'lucide-react';
import { TRUST_POINTS } from '../data/mockData';

const ICON_MAP = {
  ShieldCheck: ShieldCheck,
  Sparkles: Sparkles,
  LineChart: LineChart,
  RefreshCw: RefreshCw,
};

export const TrustFeatures: React.FC = () => {
  return (
    <section className="py-14 bg-white border-y border-orange-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-orange-800 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-wider border border-orange-200/60">
            Why Indian Parents Trust Us
          </span>
          <h2 className="text-2xl sm:text-3.5xl font-extrabold text-slate-900 tracking-tight mt-2">
            Safety, Quality & Peace of Mind for Your Child
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Personalised home and online tuition held to the highest standard of trust.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TRUST_POINTS.map((pt, i) => {
            const Icon = ICON_MAP[pt.icon as keyof typeof ICON_MAP] || ShieldCheck;
            return (
              <div
                key={i}
                className="p-6 rounded-3xl bg-gradient-to-b from-white to-orange-50/20 border border-slate-200/90 hover:border-orange-300 hover:shadow-rising transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4 group-hover:bg-gradient-to-tr group-hover:from-indigo-600 group-hover:to-orange-500 group-hover:text-white transition-all shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                  {pt.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
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
