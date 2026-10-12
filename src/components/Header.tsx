import React, { useState } from 'react';
import {
  GraduationCap,
  Menu,
  X,
  Sparkles,
  BookOpen,
  UserPlus,
  Search,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
  const { theme, toggleTheme, isMidnight } = useTheme();

  const handleNavClick = (callback: () => void) => {
    callback();
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md transition-colors duration-300 border-b ${
        isMidnight
          ? 'bg-[#070A13]/92 border-orange-500/25 shadow-lg shadow-black/40'
          : 'bg-white/92 border-orange-100/70 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo with warm Rising Sun icon */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-rose-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-black text-lg sm:text-xl tracking-tight transition-colors ${
                    isMidnight ? 'text-white group-hover:text-amber-400' : 'text-slate-900 group-hover:text-indigo-700'
                  }`}
                >
                  AR Solution
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                    isMidnight
                      ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-amber-300 border-orange-400/40'
                      : 'bg-gradient-to-r from-orange-50 to-amber-50 text-orange-800 border-orange-200/80'
                  }`}
                >
                  Home Tutor
                </span>
              </div>
              <p
                className={`text-[11px] hidden sm:block font-medium ${
                  isMidnight ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Personalised Tuition • Classes 1–12
              </p>
            </div>
          </div>

          {/* Desktop Clean Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                isMidnight ? 'text-slate-200 hover:text-amber-400' : 'text-slate-700 hover:text-indigo-700'
              }`}
            >
              Home
            </button>
            <button
              onClick={onScrollToClasses}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                isMidnight ? 'text-slate-200 hover:text-amber-400' : 'text-slate-700 hover:text-indigo-700'
              }`}
            >
              Find a Tutor
            </button>
            <button
              onClick={onOpenAiAdvisor}
              className={`inline-flex items-center gap-1.5 text-sm font-bold transition-colors cursor-pointer ${
                isMidnight ? 'text-amber-300 hover:text-amber-200' : 'text-indigo-700 hover:text-orange-600'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Study Plan</span>
            </button>
            <button
              onClick={onJoinTeacherClick}
              className={`text-sm font-semibold transition-colors cursor-pointer ${
                isMidnight ? 'text-slate-200 hover:text-amber-400' : 'text-slate-700 hover:text-indigo-700'
              }`}
            >
              Join as Teacher
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* High-Contrast Midnight Theme Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isMidnight
                  ? 'bg-[#151E32] text-amber-300 border-amber-400/40 hover:bg-[#1E2942] hover:border-amber-300 shadow-xs'
                  : 'bg-orange-50/80 text-slate-800 border-orange-200 hover:bg-orange-100 hover:border-orange-300'
              }`}
              title={isMidnight ? 'Switch to Dawn Mode (Light)' : 'Switch to High-Contrast Midnight Mode'}
              aria-label="Toggle theme mode"
            >
              {isMidnight ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Dawn Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Midnight</span>
                </>
              )}
            </button>

            <button
              onClick={onJoinTeacherClick}
              className={`text-xs font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                isMidnight ? 'text-slate-300 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Teacher Sign Up
            </button>

            <button
              onClick={onFindTutorClick}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-700 via-rose-600 to-amber-500 hover:opacity-95 text-white text-xs sm:text-sm font-extrabold px-5 py-2.5 rounded-xl shadow-rising hover:shadow-rising-hover transition-all cursor-pointer transform active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>Find a Tutor</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-colors ${
                isMidnight
                  ? 'bg-[#151E32] text-amber-400 border-amber-400/40'
                  : 'bg-orange-50 text-slate-700 border-orange-200'
              }`}
              aria-label="Toggle midnight mode"
            >
              {isMidnight ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-700" />}
            </button>

            <button
              onClick={onFindTutorClick}
              className="bg-gradient-to-r from-indigo-700 via-rose-600 to-amber-500 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xs"
            >
              Find Tutor
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl transition-colors ${
                isMidnight ? 'text-slate-200 hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-t px-4 pt-3 pb-6 space-y-2.5 shadow-xl animate-fade-in ${
            isMidnight ? 'bg-[#090D18] border-orange-500/20 text-white' : 'bg-white border-slate-100 text-slate-900'
          }`}
        >
          <button
            onClick={() => handleNavClick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
            className={`w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-medium flex items-center gap-2.5 ${
              isMidnight ? 'hover:bg-white/10 text-slate-200' : 'hover:bg-orange-50/70 text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4 text-orange-500" />
            Home
          </button>
          <button
            onClick={() => handleNavClick(onScrollToClasses)}
            className={`w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-medium flex items-center gap-2.5 ${
              isMidnight ? 'hover:bg-white/10 text-slate-200' : 'hover:bg-orange-50/70 text-slate-800'
            }`}
          >
            <Search className="w-4 h-4 text-orange-500" />
            Choose Class & Find a Tutor
          </button>
          <button
            onClick={() => handleNavClick(onOpenAiAdvisor)}
            className={`w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-bold flex items-center gap-2.5 ${
              isMidnight ? 'bg-orange-500/20 text-amber-300' : 'bg-indigo-50 text-indigo-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            AI Study Plan & Syllabus
          </button>
          <button
            onClick={() => handleNavClick(onJoinTeacherClick)}
            className={`w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-medium flex items-center gap-2.5 ${
              isMidnight ? 'hover:bg-white/10 text-slate-200' : 'hover:bg-orange-50/70 text-slate-800'
            }`}
          >
            <UserPlus className="w-4 h-4 text-orange-500" />
            Join as Teacher
          </button>
          <button
            onClick={() => handleNavClick(onScrollToFaq)}
            className={`w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-medium flex items-center gap-2.5 ${
              isMidnight ? 'hover:bg-white/10 text-slate-200' : 'hover:bg-orange-50/70 text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4 text-orange-500" />
            Parent FAQs
          </button>

          {/* Mobile Theme Toggle Button */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-200/40">
            <span className="text-xs font-semibold">Theme Mode</span>
            <button
              onClick={toggleTheme}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${
                isMidnight
                  ? 'bg-[#151E32] text-amber-300 border-amber-400/40'
                  : 'bg-orange-50 text-slate-800 border-orange-200'
              }`}
            >
              {isMidnight ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-700" />}
              <span>{isMidnight ? 'Dawn Mode' : 'Midnight Mode'}</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleNavClick(onFindTutorClick)}
              className="w-full bg-gradient-to-r from-indigo-700 via-rose-600 to-amber-500 text-white font-black py-3 rounded-xl text-center text-sm shadow-md"
            >
              Get Free Demo Class
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
