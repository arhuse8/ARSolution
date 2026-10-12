import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  Info,
  ChevronRight,
  Sun,
  Sunset,
  Moon,
  MapPin,
  Globe,
} from 'lucide-react';
import { Tutor, TimeSlot, DayOfWeek, SlotPeriod } from '../types';

interface TutorAvailabilityCalendarProps {
  tutor: Tutor;
  selectedSlot?: TimeSlot | null;
  onSelectSlot?: (slot: TimeSlot) => void;
  onRequestBookingWithSlot?: (slot: TimeSlot) => void;
  compact?: boolean;
}

const DAYS_OF_WEEK: { key: DayOfWeek; label: string; full: string }[] = [
  { key: 'Mon', label: 'Mon', full: 'Monday' },
  { key: 'Tue', label: 'Tue', full: 'Tuesday' },
  { key: 'Wed', label: 'Wed', full: 'Wednesday' },
  { key: 'Thu', label: 'Thu', full: 'Thursday' },
  { key: 'Fri', label: 'Fri', full: 'Friday' },
  { key: 'Sat', label: 'Sat', full: 'Saturday' },
  { key: 'Sun', label: 'Sun', full: 'Sunday' },
];

// Helper to generate deterministic realistic schedule for any tutor
export const generateTutorSchedule = (tutor: Tutor): TimeSlot[] => {
  if (tutor.schedule && tutor.schedule.length > 0) {
    return tutor.schedule;
  }

  const slots: TimeSlot[] = [];
  const activeDays = tutor.availableDays.length > 0 ? tutor.availableDays : ['Mon', 'Wed', 'Fri'];

  DAYS_OF_WEEK.forEach((d, dayIndex) => {
    const isDayActive = activeDays.some(
      (ad) => ad.toLowerCase().includes(d.key.toLowerCase()) || d.key.toLowerCase().includes(ad.toLowerCase())
    );

    // Standard slot templates
    // Weekend slots
    if (d.key === 'Sat' || d.key === 'Sun') {
      if (isDayActive) {
        slots.push({
          id: `${tutor.id}-${d.key}-1`,
          day: d.key,
          startTime: '09:00 AM',
          endTime: '10:30 AM',
          period: 'Morning',
          status: (dayIndex + 1) % 3 === 0 ? 'booked' : 'available',
          mode: tutor.teachingMode === 'Both' ? 'Home Tuition' : tutor.teachingMode,
        });
        slots.push({
          id: `${tutor.id}-${d.key}-2`,
          day: d.key,
          startTime: '11:00 AM',
          endTime: '12:30 PM',
          period: 'Morning',
          status: 'available',
          mode: tutor.teachingMode === 'Both' ? 'Online Tuition' : tutor.teachingMode,
        });
        slots.push({
          id: `${tutor.id}-${d.key}-3`,
          day: d.key,
          startTime: '04:00 PM',
          endTime: '05:30 PM',
          period: 'Evening',
          status: 'available',
          mode: tutor.teachingMode,
        });
      }
    } else {
      // Weekday slots (After-school hours are peak in India: 4:00 PM to 8:30 PM)
      if (isDayActive) {
        slots.push({
          id: `${tutor.id}-${d.key}-1`,
          day: d.key,
          startTime: '04:00 PM',
          endTime: '05:30 PM',
          period: 'Evening',
          status: (dayIndex % 2 === 0) ? 'booked' : 'available',
          mode: tutor.teachingMode === 'Both' ? 'Home Tuition' : tutor.teachingMode,
        });
        slots.push({
          id: `${tutor.id}-${d.key}-2`,
          day: d.key,
          startTime: '05:45 PM',
          endTime: '07:15 PM',
          period: 'Evening',
          status: 'available',
          mode: tutor.teachingMode,
        });
        slots.push({
          id: `${tutor.id}-${d.key}-3`,
          day: d.key,
          startTime: '07:30 PM',
          endTime: '09:00 PM',
          period: 'Evening',
          status: (dayIndex === 1 || dayIndex === 4) ? 'booked' : 'available',
          mode: tutor.teachingMode === 'Both' ? 'Online Tuition' : tutor.teachingMode,
        });
      }
    }
  });

  return slots;
};

export const TutorAvailabilityCalendar: React.FC<TutorAvailabilityCalendarProps> = ({
  tutor,
  selectedSlot,
  onSelectSlot,
  onRequestBookingWithSlot,
  compact = false,
}) => {
  const allSlots = React.useMemo(() => generateTutorSchedule(tutor), [tutor]);

  // Find first active day with available slots
  const firstActiveDay = React.useMemo(() => {
    const withAvailable = DAYS_OF_WEEK.find((d) =>
      allSlots.some((s) => s.day === d.key && s.status === 'available')
    );
    return withAvailable ? withAvailable.key : 'Mon';
  }, [allSlots]);

  const [activeDay, setActiveDay] = useState<DayOfWeek>(firstActiveDay);
  const [periodFilter, setPeriodFilter] = useState<'All' | SlotPeriod>('All');
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  // Slots for current day
  const currentDaySlots = React.useMemo(() => {
    return allSlots
      .filter((s) => s.day === activeDay)
      .filter((s) => (periodFilter === 'All' ? true : s.period === periodFilter));
  }, [allSlots, activeDay, periodFilter]);

  // Total available slots count for the tutor
  const totalAvailableCount = React.useMemo(() => {
    return allSlots.filter((s) => s.status === 'available').length;
  }, [allSlots]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
      {/* Header Bar with Rising Sunrise gradient */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-orange-50/80 via-amber-50/50 to-indigo-50/50 border-b border-orange-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-orange-600" />
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
              Weekly Availability Schedule
            </h4>
            <span className="text-[11px] font-extrabold text-orange-800 bg-orange-100/80 px-2.5 py-0.5 rounded-full border border-orange-200">
              {totalAvailableCount} Open Slots
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Select a convenient time slot for your child's 45-minute introductory demo class.
          </p>
        </div>

        {/* View switcher & IST indicator */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            All times in IST (UTC+5:30)
          </span>
          <div className="flex bg-slate-200/70 p-0.5 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                viewMode === 'day'
                  ? 'bg-white text-orange-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Day View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                viewMode === 'week'
                  ? 'bg-white text-orange-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Week Grid
            </button>
          </div>
        </div>
      </div>

      {/* DAY VIEW */}
      {viewMode === 'day' ? (
        <div className="p-4 sm:p-5">
          {/* Day Selector Pill Tabs */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-5">
            {DAYS_OF_WEEK.map((d) => {
              const isSelected = activeDay === d.key;
              const daySlots = allSlots.filter((s) => s.day === d.key);
              const availableInDay = daySlots.filter((s) => s.status === 'available').length;

              return (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setActiveDay(d.key)}
                  className={`flex flex-col items-center py-2 sm:py-2.5 px-1 rounded-xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-gradient-to-br from-indigo-700 via-indigo-600 to-orange-500 text-white border-orange-500 shadow-sm ring-2 ring-orange-500/30'
                      : availableInDay > 0
                      ? 'bg-white hover:bg-orange-50/40 text-slate-700 border-slate-200'
                      : 'bg-slate-50/50 text-slate-400 border-slate-100 opacity-60'
                  }`}
                >
                  <span className="text-xs font-bold leading-tight">{d.label}</span>
                  <span
                    className={`text-[10px] mt-1 font-semibold ${
                      isSelected
                        ? 'text-orange-100'
                        : availableInDay > 0
                        ? 'text-orange-600 font-bold'
                        : 'text-slate-400'
                    }`}
                  >
                    {availableInDay > 0 ? `${availableInDay} open` : 'Off'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Time of Day Filter (Morning / Afternoon / Evening) */}
          <div className="flex items-center gap-1.5 mb-4 text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Filter:
            </span>
            {(['All', 'Morning', 'Evening'] as const).map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => setPeriodFilter(period)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  periodFilter === period
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {period === 'Morning' && <Sun className="w-3 h-3 inline mr-1 text-amber-500" />}
                {period === 'Evening' && <Sunset className="w-3 h-3 inline mr-1 text-indigo-500" />}
                {period}
              </button>
            ))}
          </div>

          {/* Slots List for Selected Day */}
          {currentDaySlots.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {currentDaySlots.map((slot) => {
                const isAvailable = slot.status === 'available';
                const isSelected = selectedSlot?.id === slot.id;

                return (
                  <div
                    key={slot.id}
                    onClick={() => {
                      if (isAvailable && onSelectSlot) onSelectSlot(slot);
                    }}
                    className={`relative p-3.5 rounded-xl border transition-all text-left ${
                      isSelected
                        ? 'bg-indigo-50/90 border-indigo-600 ring-2 ring-indigo-600 shadow-sm cursor-pointer'
                        : isAvailable
                        ? 'bg-white hover:bg-indigo-50/40 border-slate-200/90 hover:border-indigo-300 shadow-xs cursor-pointer group'
                        : 'bg-slate-50 border-slate-200 text-slate-400 opacity-70 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-900">
                        <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                        <span>
                          {slot.startTime} – {slot.endTime}
                        </span>
                      </div>
                      {isSelected ? (
                        <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                      ) : isAvailable ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                          Available
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded">
                          Booked
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                      <span className="font-medium text-slate-600">
                        {slot.period} Session ({tutor.sessionDuration})
                      </span>
                      {slot.mode && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                          {slot.mode === 'Home Tuition' ? (
                            <MapPin className="w-2.5 h-2.5" />
                          ) : (
                            <Globe className="w-2.5 h-2.5" />
                          )}
                          {slot.mode}
                        </span>
                      )}
                    </div>

                    {isAvailable && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 group-hover:text-indigo-600 font-medium">
                          {isSelected ? 'Selected for Demo' : 'Click to select this slot'}
                        </span>
                        <span className="font-bold text-slate-900">₹{tutor.feePerHour}/hr</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200">
              <CalendarIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs sm:text-sm font-bold text-slate-700">
                No slots open on {DAYS_OF_WEEK.find((d) => d.key === activeDay)?.full}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {tutor.name} is available on {tutor.availableDays.join(', ')}. Please choose another day above.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* FULL WEEK GRID VIEW */
        <div className="p-4 sm:p-5 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
                <th className="py-2 px-3 font-bold">Day</th>
                <th className="py-2 px-3 font-bold">Timing</th>
                <th className="py-2 px-3 font-bold">Teaching Mode</th>
                <th className="py-2 px-3 font-bold">Status</th>
                <th className="py-2 px-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allSlots.map((slot) => {
                const isAvailable = slot.status === 'available';
                const isSelected = selectedSlot?.id === slot.id;

                return (
                  <tr
                    key={slot.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isSelected ? 'bg-indigo-50/70 font-semibold' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-slate-900">
                      {DAYS_OF_WEEK.find((d) => d.key === slot.day)?.full}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">
                      <span className="font-semibold text-slate-900">{slot.startTime}</span> – {slot.endTime}
                      <span className="text-[10px] text-slate-400 ml-1.5 font-normal">({slot.period})</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {slot.mode || tutor.teachingMode}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      {isAvailable ? (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          Available
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                          Booked
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {isAvailable ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (onSelectSlot) onSelectSlot(slot);
                            if (onRequestBookingWithSlot) onRequestBookingWithSlot(slot);
                          }}
                          className={`text-xs px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Book Demo'}
                        </button>
                      ) : (
                        <span className="text-slate-300 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Selected Slot Callout Footer */}
      {selectedSlot && (
        <div className="p-4 bg-indigo-50/90 border-t border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-950">
                Selected Slot:{' '}
                <span className="text-indigo-700">
                  {DAYS_OF_WEEK.find((d) => d.key === selectedSlot.day)?.full}, {selectedSlot.startTime} – {selectedSlot.endTime}
                </span>
              </p>
              <p className="text-[11px] text-indigo-800/80">
                Free 45-minute demo class with {tutor.name} (Rate: ₹{tutor.feePerHour}/hr)
              </p>
            </div>
          </div>

          {onRequestBookingWithSlot && (
            <button
              type="button"
              onClick={() => onRequestBookingWithSlot(selectedSlot)}
              className="w-full sm:w-auto px-4 py-2 bg-[#4338CA] hover:bg-indigo-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Confirm & Book Free Demo
            </button>
          )}
        </div>
      )}

      {/* Reassurance Legend Bar */}
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Available for Trial</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span>Booked with student</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <span>Selected by you</span>
          </span>
        </div>
        <span className="italic text-slate-400">
          Tutor timings can be adjusted post-demo upon mutual agreement
        </span>
      </div>
    </div>
  );
};
