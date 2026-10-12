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
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 hover:border-orange-300 shadow-sm hover:shadow-rising transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Top Header: Photo, Name, Verification, Rating */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={tutor.photoUrl}
              alt={tutor.name}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-xs"
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
              <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors truncate">
                {tutor.name}
              </h4>
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-amber-950">{tutor.rating}</span>
                <span className="text-[10px] text-slate-400">({tutor.reviewsCount})</span>
              </div>
            </div>

            <p className="text-xs font-semibold text-indigo-700 mt-0.5 line-clamp-1">
              {tutor.qualification}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[11px] text-slate-600 font-medium">
              <span className="bg-slate-100 px-2 py-0.5 rounded-md text-slate-800 font-semibold">
                {tutor.experienceYears}+ Yrs Exp
              </span>
              <span className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded-md font-semibold border border-orange-200/50">
                {tutor.teachingMode}
              </span>
            </div>
          </div>
        </div>

        {/* Verification & Demo Badges */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          {tutor.verified && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
              Verified Background
            </span>
          )}
          {tutor.demoAvailable && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-800 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/60">
              <Sparkles className="w-3 h-3 text-orange-600" />
              Free Demo Available
            </span>
          )}
        </div>

        {/* Classes, Boards & Subjects */}
        <div className="mt-3.5 space-y-2 text-xs text-slate-700">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Classes & Boards
            </span>
            <p className="font-semibold text-slate-800 mt-0.5">
              Classes {Math.min(...tutor.classes)}–{Math.max(...tutor.classes)} •{' '}
              {tutor.boards.join(', ')}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Core Subjects
            </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {tutor.subjects.slice(0, 4).map((s, idx) => (
                <span
                  key={idx}
                  className="bg-slate-100 text-slate-800 text-[11px] px-2 py-0.5 rounded-md capitalize"
                >
                  {s.replace('_', ' ')}
                </span>
              ))}
              {tutor.subjects.length > 4 && (
                <span className="text-[11px] text-slate-400 font-medium self-center">
                  +{tutor.subjects.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Location & Languages */}
          <div className="pt-1.5 flex flex-col gap-1 text-[11px] text-slate-500">
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
              className="mt-1 flex items-center justify-between p-2 rounded-xl bg-orange-50/70 border border-orange-200/60 text-[11px] text-orange-950 cursor-pointer hover:bg-orange-100/70 transition-colors"
              title="Click to view weekly calendar slots"
            >
              <div className="flex items-center gap-1.5 font-bold">
                <Calendar className="w-3.5 h-3.5 text-orange-600" />
                <span>Slots: {tutor.availableDays.slice(0, 3).join(', ')} (4–8 PM)</span>
              </div>
              <span className="text-[10px] font-extrabold text-orange-700 underline">View Slots</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fee & Action Row */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              ₹{tutor.feePerHour}
            </span>
            <span className="text-xs text-slate-500"> / hour</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {tutor.sessionDuration} session
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onViewProfile(tutor)}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-orange-300 text-slate-700 hover:text-indigo-700 font-bold text-xs transition-all text-center cursor-pointer"
          >
            View Profile
          </button>
          <button
            type="button"
            onClick={() => onRequestClass(tutor)}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-orange-500 hover:opacity-95 text-white font-extrabold text-xs shadow-xs hover:shadow-rising transition-all text-center cursor-pointer transform active:scale-95"
          >
            Request a Class
          </button>
        </div>
      </div>
    </div>
  );
};
