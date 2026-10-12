import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { isMidnight } = useTheme();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq-section"
      className={`py-14 scroll-mt-24 transition-colors duration-300 ${
        isMidnight ? 'bg-[#0B101D]' : 'bg-white'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${
              isMidnight
                ? 'text-amber-300 bg-orange-500/15 border-orange-400/30'
                : 'text-indigo-700 bg-indigo-50 border-indigo-100'
            }`}
          >
            Parent Questions Answered
          </span>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 ${isMidnight ? 'text-white' : 'text-slate-900'}`}>
            Frequently Asked Questions
          </h2>
          <p className={`text-xs sm:text-sm mt-1 ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
            Everything you need to know about booking, teacher verification, and demo classes.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? isMidnight
                      ? 'border-orange-500/40 bg-[#0F172A] shadow-md shadow-black/50'
                      : 'border-indigo-200 bg-white shadow-xs'
                    : isMidnight
                    ? 'border-slate-800 bg-[#131B2E] hover:bg-[#1A2640]'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-4.5 sm:p-5 text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className={`font-bold text-sm sm:text-base pr-4 leading-snug ${isMidnight ? 'text-white' : 'text-slate-900'}`}>
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-lg text-slate-400 shrink-0">
                    {isOpen ? (
                      <ChevronUp className={`w-5 h-5 ${isMidnight ? 'text-amber-400' : 'text-indigo-600'}`} />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div
                    className={`px-5 pb-5 pt-1 border-t text-xs sm:text-sm leading-relaxed animate-fade-in ${
                      isMidnight
                        ? 'border-slate-800 text-slate-300'
                        : 'border-slate-100 text-slate-600'
                    }`}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
