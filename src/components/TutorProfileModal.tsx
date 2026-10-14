import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  Calendar,
  Languages,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Award,
} from 'lucide-react';
import { Tutor, TimeSlot } from '../types';
import { TutorAvailabilityCalendar } from './TutorAvailabilityCalendar';

interface TutorProfileModalProps {
  tutor: Tutor | null;
  onClose: () => void;
  onRequestClass: (tutor: Tutor, slot?: TimeSlot) => void;
}

export const TutorProfileModal: React.FC<TutorProfileModalProps> = ({
  tutor,
  onClose,
  onRequestClass,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'schedule'>('profile');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // ESC key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Reset tab on new tutor
  useEffect(() => {
    if (tutor) {
      setActiveTab('profile');
      setSelectedSlot(null);
    }
  }, [tutor]);

  if (!tutor) return null;

  const handleBookWithSlot = (slot: TimeSlot) => {
    onClose();
    onRequestClass(tutor, slot);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutor-profile-title"
    >
      <div
        className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close tutor profile"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-5 border-b border-slate-100">
          <div className="relative shrink-0 w-22 h-22 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md">
            <img
              src={tutor.photoUrl}
              alt="Teacher photo (blurred for privacy)"
              className="w-full h-full object-cover filter blur-md scale-125 select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-black/15 pointer-events-none" />
            <div className="absolute bottom-1 left-1 right-1 text-center bg-black/60 backdrop-blur-xs text-[9px] text-white/90 px-1 py-0.5 rounded font-medium pointer-events-none">
              Photo Blurred
            </div>
            {tutor.verified && (
              <div
                className="absolute top-1 right-1 bg-emerald-500 text-white p-1 rounded-full shadow-xs"
                title="100% Background & Degree Verified"
              >
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                {tutor.badge || 'Verified Home Tutor'}
              </span>
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-amber-900">{tutor.rating}</span>
                <span className="text-[10px] text-slate-400">({tutor.reviewsCount} reviews)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-1">
              <h3 id="tutor-profile-title" className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Verified Teacher #{tutor.id.replace('tut-', '')}
              </h3>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                Name Hidden for Privacy
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-700 mt-0.5">
              {tutor.qualification}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{tutor.institution}</p>

            <div className="flex flex-wrap items-center gap-2 mt-2.5 text-xs font-medium">
              <span className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-lg">
                {tutor.experienceYears} Years Experience
              </span>
              <span className="bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-lg">
                Mode: {tutor.teachingMode}
              </span>
              <span className="bg-indigo-50 text-indigo-800 px-2.5 py-0.5 rounded-lg font-bold">
                ₹{tutor.feePerHour} / hr
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 border-b border-slate-100 pt-3 pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            About & Teaching Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schedule')}
            className={`pb-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'schedule'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Weekly Availability Calendar</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-bold">
              Slots Open
            </span>
          </button>
        </div>

        {/* Tab 1: Profile & Credentials */}
        {activeTab === 'profile' && (
          <div className="py-5 space-y-5 animate-fade-in">
            {/* Bio & Methodology */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  About the Educator
                </h4>
                <p className="leading-relaxed text-slate-700">{tutor.bio}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Teaching Methodology
                </h4>
                <p className="leading-relaxed text-slate-700">{tutor.teachingStyle}</p>
              </div>
            </div>

            {/* Curriculum Coverage Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Classes & Boards
                </span>
                <p className="font-semibold text-slate-800 text-sm">
                  Classes {Math.min(...tutor.classes)} to {Math.max(...tutor.classes)}
                </p>
                <p className="text-slate-600 mt-0.5">{tutor.boards.join(', ')}</p>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Languages Spoken
                </span>
                <div className="flex items-center gap-1.5 text-slate-800 font-semibold text-sm">
                  <Languages className="w-4 h-4 text-slate-400" />
                  <span>{tutor.languages.join(', ')}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Service Areas ({tutor.city})
                </span>
                <div className="flex items-start gap-1.5 text-slate-700">
                  <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{tutor.serviceAreas.join(', ')}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Available Days
                </span>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{tutor.availableDays.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Quick Teaser for Calendar */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-indigo-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Want to check matching hours?</p>
                  <p className="text-[11px] text-slate-500">
                    View morning & evening slots across Monday–Sunday.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('schedule')}
                className="shrink-0 text-xs font-bold text-indigo-700 bg-white hover:bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200 transition-colors cursor-pointer"
              >
                View Weekly Calendar
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Weekly Availability Calendar Component */}
        {activeTab === 'schedule' && (
          <div className="py-4 animate-fade-in">
            <TutorAvailabilityCalendar
              tutor={tutor}
              selectedSlot={selectedSlot}
              onSelectSlot={(slot) => setSelectedSlot(slot)}
              onRequestBookingWithSlot={handleBookWithSlot}
            />
          </div>
        )}

        {/* Reassurance Guarantee */}
        <div className="my-4 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3 text-xs text-indigo-900">
          <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">AR Solution 45-Minute Free Demo Class Guarantee</p>
            <p className="text-indigo-800/90 mt-0.5">
              Experience the educator's teaching style before confirming your weekly tuition schedule. If not 100% satisfied, we arrange another teacher with zero extra charge.
            </p>
          </div>
        </div>

        {/* Pricing & Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
          <div>
            <span className="text-xs text-slate-500 block">Tuition Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                ₹{tutor.feePerHour}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                / hr ({tutor.sessionDuration})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none py-3 px-5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestClass(tutor, selectedSlot || undefined);
              }}
              className="flex-1 sm:flex-none py-3 px-6 rounded-xl bg-[#4338CA] hover:bg-indigo-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all cursor-pointer text-center"
            >
              {selectedSlot ? 'Book Demo for Selected Slot' : 'Book Free Demo Class'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
