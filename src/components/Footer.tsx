import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, Heart, Shield } from 'lucide-react';

interface FooterProps {
  onJoinTeacherClick: () => void;
  onFindTutorClick: () => void;
  onScrollToFaq: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onJoinTeacherClick,
  onFindTutorClick,
  onScrollToFaq,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                AR Solution <span className="text-indigo-400 font-semibold text-sm">Home Tutor</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Personalised home and online tuition for Classes 1–12 across CBSE, ICSE, and Maharashtra State Board. Connect with background-verified teachers who help your child excel.
            </p>

            <div className="text-xs text-slate-400 space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                <span>Student & Parent Helpline: +91 98200 84721</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>support@arsolutionhometutor.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Mumbai, Pune, Thane & Delhi NCR (Pan-India Online)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Explore Tuitions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onFindTutorClick}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Classes 1–5 (Primary Foundation)
                </button>
              </li>
              <li>
                <button
                  onClick={onFindTutorClick}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Classes 6–8 (Middle School)
                </button>
              </li>
              <li>
                <button
                  onClick={onFindTutorClick}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Classes 9–10 (CBSE / SSC / ICSE)
                </button>
              </li>
              <li>
                <button
                  onClick={onFindTutorClick}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Classes 11–12 (Science & Commerce)
                </button>
              </li>
              <li>
                <button
                  onClick={onFindTutorClick}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Free Demo Class
                </button>
              </li>
            </ul>
          </div>

          {/* Boards Covered */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Boards Supported
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>CBSE Board (NCERT)</li>
              <li>ICSE / ISC Board</li>
              <li>Maharashtra State Board (SSC & HSC)</li>
              <li>English, Semi-English & Regional</li>
              <li>Upcoming: Cambridge & IB</li>
            </ul>
          </div>

          {/* Tutors & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              For Tutors & Parents
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onJoinTeacherClick}
                  className="hover:text-indigo-400 transition-colors cursor-pointer font-semibold"
                >
                  Join as Teacher
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToFaq}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={onFindTutorClick}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Request a Tutor
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & Supabase readiness note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} AR Solution Home Tutor. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>Built with secure architecture ready for Supabase persistence & authentication.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
