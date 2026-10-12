import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-14 bg-rising-subtle border-b border-orange-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-orange-800 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-wider border border-orange-200/60">
            Parent Stories
          </span>
          <h2 className="text-2xl sm:text-3.5xl font-extrabold text-slate-900 tracking-tight mt-2">
            Real Academic Transformations
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Hear from parents across Mumbai, Pune, and Thane whose children excelled with our tutors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-white border border-orange-100/80 shadow-xs hover:shadow-rising transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-orange-200" />
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900">{t.parentName}</h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-0.5">
                  <span className="font-semibold text-orange-700">{t.studentInfo}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {t.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
