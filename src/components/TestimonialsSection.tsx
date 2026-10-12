import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export const TestimonialsSection: React.FC = () => {
  const { isMidnight } = useTheme();

  return (
    <section
      className={`py-14 border-b transition-colors duration-300 ${
        isMidnight ? 'bg-[#070A13] border-slate-800' : 'bg-rising-subtle border-orange-100/60'
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
            Parent Stories
          </span>
          <h2
            className={`text-2xl sm:text-3.5xl font-extrabold tracking-tight mt-2 ${
              isMidnight ? 'text-white' : 'text-slate-900'
            }`}
          >
            Real Academic Transformations
          </h2>
          <p className={`text-xs sm:text-sm mt-1 ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
            Hear from parents across Mumbai, Pune, and Thane whose children excelled with our tutors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                isMidnight
                  ? 'bg-[#0F172A] border-orange-500/20 shadow-lg shadow-black/50 text-white'
                  : 'bg-white border-orange-100/80 shadow-xs hover:shadow-rising'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className={`w-6 h-6 ${isMidnight ? 'text-orange-500/30' : 'text-orange-200'}`} />
                </div>
                <p
                  className={`text-xs sm:text-sm leading-relaxed italic ${
                    isMidnight ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  "{t.quote}"
                </p>
              </div>

              <div className={`mt-6 pt-4 border-t ${isMidnight ? 'border-slate-800' : 'border-slate-100'}`}>
                <h4 className={`text-sm font-bold ${isMidnight ? 'text-white' : 'text-slate-900'}`}>
                  {t.parentName}
                </h4>
                <div className={`flex items-center justify-between text-[11px] mt-0.5 ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
                  <span className={`font-semibold ${isMidnight ? 'text-amber-300' : 'text-orange-700'}`}>
                    {t.studentInfo}
                  </span>
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
