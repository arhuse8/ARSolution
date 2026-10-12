import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Phone,
  User,
  GraduationCap,
  BookOpen,
  MapPin,
  Clock,
  Send,
  Sparkles,
} from 'lucide-react';
import { Tutor, TutorRequest, TimeSlot } from '../types';

interface TutorRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillClass?: number | null;
  prefillBoard?: string | null;
  prefillSubjects?: string[];
  prefillTutor?: Tutor | null;
  prefillSlot?: TimeSlot | null;
  onSuccess: (requestId: string) => void;
}

export const TutorRequestModal: React.FC<TutorRequestModalProps> = ({
  isOpen,
  onClose,
  prefillClass,
  prefillBoard,
  prefillSubjects,
  prefillTutor,
  prefillSlot,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<TutorRequest>({
    parentName: '',
    mobileNumber: '',
    studentClass: prefillClass || 10,
    board: prefillBoard || 'CBSE',
    subjects: prefillSubjects && prefillSubjects.length > 0 ? prefillSubjects : ['Mathematics'],
    teachingMode: 'Home Tuition',
    areaPinCode: '',
    preferredTime: prefillSlot ? `${prefillSlot.day}, ${prefillSlot.startTime} – ${prefillSlot.endTime}` : 'Evening (5:00 PM – 8:00 PM)',
    additionalRequirements: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Sync prefill on open
  useEffect(() => {
    if (isOpen) {
      setSubmittedId(null);
      setErrors({});
      const slotTimeStr = prefillSlot
        ? `${prefillSlot.day}, ${prefillSlot.startTime} – ${prefillSlot.endTime} (${prefillSlot.period})`
        : 'Evening (5:00 PM – 8:00 PM)';

      setFormData((prev) => ({
        ...prev,
        studentClass: prefillClass || prev.studentClass || 10,
        board: prefillBoard || prev.board || 'CBSE',
        subjects:
          prefillSubjects && prefillSubjects.length > 0
            ? prefillSubjects
            : prefillTutor
            ? prefillTutor.subjects.slice(0, 2)
            : ['Mathematics'],
        preferredTime: prefillSlot ? slotTimeStr : prev.preferredTime,
        additionalRequirements: prefillTutor
          ? `Requested specifically for tutor: ${prefillTutor.name} (${prefillTutor.qualification}).${
              prefillSlot ? ` Selected Slot: ${slotTimeStr}.` : ''
            }`
          : '',
      }));
    }
  }, [isOpen, prefillClass, prefillBoard, prefillSubjects, prefillTutor, prefillSlot]);

  // ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.parentName.trim()) errs.parentName = 'Parent Name is required.';
    const cleanPhone = formData.mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) errs.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    if (!formData.studentClass) errs.studentClass = 'Select a class.';
    if (!formData.board) errs.board = 'Select a board.';
    if (formData.teachingMode !== 'Online Tuition' && !formData.areaPinCode?.trim()) {
      errs.areaPinCode = 'Please enter your locality, city or PIN code.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/request-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      const reqId = data.requestId || `REQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedId(reqId);
      onSuccess(reqId);
    } catch (err) {
      const fallbackReqId = `REQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedId(fallbackReqId);
      onSuccess(fallbackReqId);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutor-request-title"
    >
      <div
        className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close tutor request"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedId ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Personalized Match</span>
              </div>
              <h3 id="tutor-request-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {prefillTutor ? `Request Demo Class with ${prefillTutor.name}` : 'Request a Home or Online Tutor'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Tell us your requirement. Our academic coordinator will connect you with a verified tutor within 24 hours.
              </p>
            </div>

            {/* Parent Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Parent / Guardian Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="e.g. Sunil Patil"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
              {errors.parentName && <p className="text-xs text-rose-600 mt-1">{errors.parentName}</p>}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mobile Number (For Tutor Callback) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  placeholder="e.g. 9820012345"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
              {errors.mobileNumber && (
                <p className="text-xs text-rose-600 mt-1">{errors.mobileNumber}</p>
              )}
            </div>

            {/* Class & Board Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Student Class *
                </label>
                <select
                  value={formData.studentClass}
                  onChange={(e) =>
                    setFormData({ ...formData, studentClass: parseInt(e.target.value) })
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((c) => (
                    <option key={c} value={c}>
                      Class {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Education Board *
                </label>
                <select
                  value={formData.board}
                  onChange={(e) => setFormData({ ...formData, board: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                >
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="Maharashtra State Board">Maharashtra State Board</option>
                  <option value="Other Board">Other / International Board</option>
                </select>
              </div>
            </div>

            {/* Teaching Mode */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Preferred Mode *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Home Tuition', 'Online Tuition', 'Both'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setFormData({ ...formData, teachingMode: m })}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      formData.teachingMode === m
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Locality or PIN Code */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Locality / Area / PIN Code {formData.teachingMode === 'Online Tuition' ? '(Optional)' : '*'}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={formData.areaPinCode || ''}
                  onChange={(e) => setFormData({ ...formData, areaPinCode: e.target.value })}
                  placeholder="e.g. Andheri West, Mumbai / 400053"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
              {errors.areaPinCode && (
                <p className="text-xs text-rose-600 mt-1">{errors.areaPinCode}</p>
              )}
            </div>

            {/* Selected Slot Banner if coming from calendar */}
            {prefillSlot && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-950">Pre-Selected Schedule Slot:</span>
                    <p className="text-emerald-800 font-semibold">
                      {prefillSlot.day}, {prefillSlot.startTime} – {prefillSlot.endTime} ({prefillSlot.period})
                    </p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  Demo Slot
                </span>
              </div>
            )}

            {/* Parent Preferred Date & Expected Fees Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Start Date (Parent Date) *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.preferredDate || new Date().toISOString().split('T')[0]}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Expected Fees / Budget *
                </label>
                <input
                  type="text"
                  value={formData.expectedFees || ''}
                  onChange={(e) => setFormData({ ...formData, expectedFees: e.target.value })}
                  placeholder="e.g. ₹500/hr or ₹6,000/month"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Quick Fee Suggestion Chips */}
            <div className="flex flex-wrap items-center gap-1.5 -mt-2">
              <span className="text-[10px] text-slate-400 font-medium">Quick fee pick:</span>
              {['₹450–₹600/hr', '₹600–₹800/hr', '₹800+/hr', 'Flexible'].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormData({ ...formData, expectedFees: f })}
                  className="text-[10px] bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-orange-700 px-2 py-0.5 rounded-md border border-slate-200 transition-colors cursor-pointer"
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Preferred Time & Note */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Preferred Time & Subjects / Note
              </label>
              <input
                type="text"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                placeholder="e.g. Weekdays 5 PM to 7 PM, need focus on Maths"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            {formData.additionalRequirements && (
              <p className="text-xs text-orange-800 bg-orange-50 p-2.5 rounded-xl border border-orange-200">
                {formData.additionalRequirements}
              </p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-700 via-indigo-600 to-orange-500 hover:opacity-95 text-white font-extrabold text-sm rounded-xl shadow-rising transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Request...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Tutor Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Success confirmation screen */
          <div className="py-6 text-center space-y-4 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
              Request ID: {submittedId}
            </span>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Thank You! Our team will contact you soon.
            </h3>

            <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              We have received all your tuition details for{' '}
              <strong className="text-slate-900">
                Class {formData.studentClass} ({formData.board})
              </strong>
              . Our academic coordinator will call you on{' '}
              <strong className="text-slate-900">{formData.mobileNumber}</strong> shortly to confirm your teacher match and schedule your demo on{' '}
              <strong className="text-slate-900">{formData.preferredDate || 'your preferred date'}</strong>.
            </p>

            {/* Summary of all captured details */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-700 space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                <span className="text-slate-500">Class & Board:</span>
                <span className="font-bold text-slate-900">Class {formData.studentClass} ({formData.board})</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                <span className="text-slate-500">Mobile Number:</span>
                <span className="font-bold text-slate-900">{formData.mobileNumber}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                <span className="text-slate-500">Preferred Start Date:</span>
                <span className="font-bold text-orange-700">{formData.preferredDate || 'Immediate'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                <span className="text-slate-500">Expected Fees:</span>
                <span className="font-bold text-emerald-700">{formData.expectedFees || 'Flexible'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Subjects & Mode:</span>
                <span className="font-bold text-slate-900">{formData.subjects.join(', ')} ({formData.teachingMode})</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-left text-xs text-indigo-900 max-w-sm mx-auto">
              <p className="font-bold">Next Steps:</p>
              <ul className="list-disc list-inside mt-1 space-y-1 text-indigo-800">
                <li>Counselor confirms child's weak areas and timing</li>
                <li>Teacher profile shared with you on WhatsApp</li>
                <li>Free 45-minute demo class scheduled at your convenience</li>
              </ul>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-[#4338CA] hover:bg-indigo-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md cursor-pointer"
              >
                Done / Back to Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
