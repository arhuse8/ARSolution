import React from 'react';
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  Calendar,
  Languages,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { Tutor } from '../types';
import { useTheme } from '../context/ThemeContext';

interface TutorCardProps {
  tutor: Tutor;
  onViewProfile: (tutor: Tutor) => void;
  onRequestClass: (tutor: Tutor) => void;
}

export const TutorCard: React.FC<TutorCardProps> = ({
  tutor,
  onViewProfile,
  onRequestClass,
}) => {
  const { isMidnight } = useTheme();
  return (
    <div
      className={`rounded-3xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between group ${
        isMidnight
          ? 'bg-[#0F172A] border-orange-500/25 hover:border-amber-400/60 shadow-xl shadow-black/70 hover:shadow-orange-500/10'
          : 'bg-white border-slate-200/80 hover:border-orange-300 shadow-sm hover:shadow-rising'
      }`}
    >
      <div>
        {/* Top Header: Photo, Name, Verification, Rating */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={tutor.photoUrl}
              alt={tutor.name}
              className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 shadow-xs ${
                isMidnight ? 'border-slate-700' : 'border-slate-100'
              }`}
              loading="lazy"
            />
            {tutor.verified && (
              <div
                className="absolute -bottom-1 -right-1 bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white p-1 rounded-full shadow-xs"
                title="Identity & Degree Verified"
              >
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <h4
                className={`text-base sm:text-lg font-bold transition-colors truncate ${
                  isMidnight ? 'text-white group-hover:text-amber-300' : 'text-slate-900 group-hover:text-indigo-700'
                }`}
              >
                {tutor.name}
              </h4>
              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border ${
                  isMidnight
                    ? 'bg-amber-400/10 border-amber-400/30 text-amber-300'
                    : 'bg-amber-50 border-amber-200/60 text-amber-950'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold">{tutor.rating}</span>
                <span className={`text-[10px] ${isMidnight ? 'text-slate-400' : 'text-slate-400'}`}>
                  ({tutor.reviewsCount})
                </span>
              </div>
            </div>

            <p
              className={`text-xs font-semibold mt-0.5 line-clamp-1 ${
                isMidnight ? 'text-indigo-300' : 'text-indigo-700'
              }`}
            >
              {tutor.qualification}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[11px] font-medium">
              <span
                className={`px-2 py-0.5 rounded-md font-semibold ${
                  isMidnight ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-800'
                }`}
              >
                {tutor.experienceYears}+ Yrs Exp
              </span>
              <span
                className={`px-2 py-0.5 rounded-md font-semibold border ${
                  isMidnight
                    ? 'bg-orange-500/20 text-amber-300 border-orange-400/40'
                    : 'bg-orange-50 text-orange-700 border-orange-200/50'
                }`}
              >
                {tutor.teachingMode}
              </span>
            </div>
          </div>
        </div>

        {/* Verification & Demo Badges */}
        <div
          className={`mt-3.5 pt-3 border-t flex flex-wrap items-center gap-2 text-xs ${
            isMidnight ? 'border-slate-800' : 'border-slate-100'
          }`}
        >
          {tutor.verified && (
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                isMidnight
                  ? 'text-emerald-300 bg-emerald-500/20 border border-emerald-500/30'
                  : 'text-emerald-800 bg-emerald-50'
              }`}
            >
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              Verified Background
            </span>
          )}
          {tutor.demoAvailable && (
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                isMidnight
                  ? 'text-amber-300 bg-orange-500/20 border-orange-400/40'
                  : 'text-orange-800 bg-orange-50 border-orange-200/60'
              }`}
            >
              <Sparkles className="w-3 h-3 text-orange-400" />
              Free Demo Available
            </span>
          )}
        </div>

        {/* Classes, Boards & Subjects */}
        <div className="mt-3.5 space-y-2 text-xs">
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block ${isMidnight ? 'text-slate-400' : 'text-slate-400'}`}>
              Classes & Boards
            </span>
            <p className={`font-semibold mt-0.5 ${isMidnight ? 'text-slate-200' : 'text-slate-800'}`}>
              Classes {Math.min(...tutor.classes)}–{Math.max(...tutor.classes)} •{' '}
              {tutor.boards.join(', ')}
            </p>
          </div>

          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block ${isMidnight ? 'text-slate-400' : 'text-slate-400'}`}>
              Core Subjects
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {tutor.subjects.slice(0, 4).map((s, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] px-2 py-0.5 rounded-md capitalize ${
                    isMidnight
                      ? 'bg-slate-800 text-slate-200 border border-slate-700'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {s.replace('_', ' ')}
                </span>
              ))}
              {tutor.subjects.length > 4 && (
                <span className={`text-[11px] font-medium self-center ${isMidnight ? 'text-slate-400' : 'text-slate-400'}`}>
                  +{tutor.subjects.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Location & Languages */}
          <div className={`pt-1.5 flex flex-col gap-1 text-[11px] ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">
                {tutor.city}: {tutor.serviceAreas.slice(0, 3).join(', ')}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Speaks: {tutor.languages.join(', ')}</span>
            </div>

            {/* Quick interactive availability schedule indicator */}
            <div
              onClick={() => onViewProfile(tutor)}
              className={`mt-1 flex items-center justify-between p-2 rounded-xl text-[11px] cursor-pointer transition-colors border ${
                isMidnight
                  ? 'bg-orange-500/15 border-orange-500/30 text-amber-200 hover:bg-orange-500/25'
                  : 'bg-orange-50/70 border-orange-200/60 text-orange-950 hover:bg-orange-100/70'
              }`}
              title="Click to view weekly calendar slots"
            >
              <div className="flex items-center gap-1.5 font-bold">
                <Calendar className="w-3.5 h-3.5 text-orange-500" />
                <span>Slots: {tutor.availableDays.slice(0, 3).join(', ')} (4–8 PM)</span>
              </div>
              <span className={`text-[10px] font-extrabold underline ${isMidnight ? 'text-amber-300' : 'text-orange-700'}`}>
                View Slots
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fee & Action Row */}
      <div className={`mt-4 pt-4 border-t ${isMidnight ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className={`text-xl sm:text-2xl font-black tracking-tight ${isMidnight ? 'text-white' : 'text-slate-900'}`}>
              ₹{tutor.feePerHour}
            </span>
            <span className={`text-xs ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}> / hour</span>
          </div>
          <span className={`text-[11px] font-medium flex items-center gap-1 ${isMidnight ? 'text-slate-400' : 'text-slate-500'}`}>
            <Clock className="w-3 h-3" />
            {tutor.sessionDuration} session
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onViewProfile(tutor)}
            className={`w-full py-2.5 px-3 rounded-xl border font-bold text-xs transition-all text-center cursor-pointer ${
              isMidnight
                ? 'bg-[#131B2E] border-slate-700 text-slate-200 hover:bg-[#1A2640] hover:text-amber-300'
                : 'bg-white border-slate-200 hover:border-orange-300 text-slate-700 hover:text-indigo-700'
            }`}
          >
            View Profile
          </button>
          <button
            type="button"
            onClick={() => onRequestClass(tutor)}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-700 via-rose-600 to-orange-500 hover:opacity-95 text-white font-extrabold text-xs shadow-xs hover:shadow-rising transition-all text-center cursor-pointer transform active:scale-95"
          >
            Request a Class
          </button>
        </div>
      </div>
    </div>
  );
};
