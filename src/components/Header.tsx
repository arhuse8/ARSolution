import React, { useState } from 'react';
import { GraduationCap, Menu, X, Sparkles, BookOpen, UserPlus, Search, Phone } from 'lucide-react';

interface HeaderProps {
  onFindTutorClick: () => void;
  onJoinTeacherClick: () => void;
  onOpenAiAdvisor: () => void;
  onScrollToClasses: () => void;
  onScrollToFaq: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onFindTutorClick,
  onJoinTeacherClick,
  onOpenAiAdvisor,
  onScrollToClasses,
  onScrollToFaq,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (callback: () => void) => {
    callback();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-orange-100/60 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo with warm Rising Sun icon */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-indigo-700 transition-colors">
                  AR Solution
                </span>
                <span className="bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-200/60 uppercase tracking-wider">
                  Home Tutor
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Personalised Tuition • Classes 1–12
              </p>
            </div>
          </div>

          {/* Desktop Clean Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-semibold text-slate-700 hover:text-indigo-700 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={onScrollToClasses}
              className="text-sm font-semibold text-slate-700 hover:text-indigo-700 transition-colors cursor-pointer"
            >
              Find a Tutor
            </button>
            <button
              onClick={onOpenAiAdvisor}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-700 hover:text-orange-600 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Study Plan</span>
            </button>
            <button
              onClick={onJoinTeacherClick}
              className="text-sm font-semibold text-slate-700 hover:text-indigo-700 transition-colors cursor-pointer"
            >
              Join as Teacher
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onJoinTeacherClick}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3.5 py-2 rounded-xl hover:bg-slate-100/70 transition-all cursor-pointer"
            >
              Teacher Sign Up
            </button>
            <button
              onClick={onFindTutorClick}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-700 via-indigo-600 to-orange-500 hover:opacity-95 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all cursor-pointer transform active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>Find a Tutor</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onFindTutorClick}
              className="bg-gradient-to-r from-indigo-700 to-orange-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs"
            >
              Find Tutor
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-indigo-700 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/98 px-4 pt-3 pb-6 space-y-2.5 shadow-xl animate-fade-in">
          <button
            onClick={() => handleNavClick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
            className="w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-orange-50/70 hover:text-orange-700 flex items-center gap-2.5"
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            Home
          </button>
          <button
            onClick={() => handleNavClick(onScrollToClasses)}
            className="w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-orange-50/70 hover:text-orange-700 flex items-center gap-2.5"
          >
            <Search className="w-4 h-4 text-indigo-600" />
            Choose Class & Find a Tutor
          </button>
          <button
            onClick={() => handleNavClick(onOpenAiAdvisor)}
            className="w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-semibold text-indigo-800 bg-indigo-50/60 hover:bg-indigo-100 flex items-center gap-2.5"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            AI Study Plan & Syllabus
          </button>
          <button
            onClick={() => handleNavClick(onJoinTeacherClick)}
            className="w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-orange-50/70 hover:text-orange-700 flex items-center gap-2.5"
          >
            <UserPlus className="w-4 h-4 text-indigo-600" />
            Join as Teacher
          </button>
          <button
            onClick={() => handleNavClick(onScrollToFaq)}
            className="w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-medium text-slate-800 hover:bg-orange-50/70 hover:text-orange-700 flex items-center gap-2.5"
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            Parent FAQs
          </button>
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => handleNavClick(onFindTutorClick)}
              className="w-full bg-gradient-to-r from-indigo-700 via-indigo-600 to-orange-500 text-white font-bold py-3 rounded-xl text-center text-sm shadow-md"
            >
              Get Free Demo Class
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
