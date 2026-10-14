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
  Sparkles,
  MessageCircle,
  ExternalLink,
  Copy,
  Check,
  Eye,
  EyeOff,
  Flame,
  Zap,
} from 'lucide-react';
import { Tutor, TutorRequest, TimeSlot } from '../types';
import {
  buildParentWhatsAppMessage,
  getWhatsAppUrl,
  sendToWhatsApp,
  copyToClipboard,
  COORDINATOR_DISPLAY_PHONE,
  COORDINATOR_PHONE_RAW,
} from '../utils/whatsapp';

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
    preferredDate: new Date().toISOString().split('T')[0],
    expectedFees: '₹5,000 – ₹8,000 / month',
    preferredTime: prefillSlot
      ? `${prefillSlot.day}, ${prefillSlot.startTime} – ${prefillSlot.endTime}`
      : 'Evening (5:00 PM – 8:00 PM)',
    additionalRequirements: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [whatsappMsg, setWhatsappMsg] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Sync prefill on open
  useEffect(() => {
    if (isOpen) {
      setSubmittedId(null);
      setErrors({});
      setCopied(false);
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
          ? `Requested specifically for Verified Teacher #${prefillTutor.id.replace('tut-', '')} (${prefillTutor.qualification}).${
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
    if (!formData.parentName.trim()) errs.parentName = 'Parent or Student Name is required.';
    const cleanPhone = formData.mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) errs.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    if (!formData.studentClass) errs.studentClass = 'Select a class.';
    if (!formData.board) errs.board = 'Select a board.';
    if (formData.teachingMode !== 'Online Tuition' && !formData.areaPinCode?.trim()) {
      errs.areaPinCode = 'Please enter your locality, area or PIN code.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCopyMessage = async (msgToCopy: string) => {
    const success = await copyToClipboard(msgToCopy);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    const generatedId = `REQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const tutorInfo = prefillTutor
      ? `Verified Teacher #${prefillTutor.id.replace('tut-', '')} (${prefillTutor.qualification})`
      : undefined;

    // Compile all typed info into clean WhatsApp message (no broken unicode characters)
    const message = buildParentWhatsAppMessage({
      requestId: generatedId,
      parentName: formData.parentName,
      mobileNumber: formData.mobileNumber,
      studentClass: formData.studentClass,
      board: formData.board,
      subjects: formData.subjects,
      teachingMode: formData.teachingMode,
      areaPinCode: formData.areaPinCode,
      preferredDate: formData.preferredDate,
      expectedFees: formData.expectedFees,
      preferredTime: formData.preferredTime,
      additionalRequirements: formData.additionalRequirements,
      selectedTeacherInfo: tutorInfo,
    });

    setWhatsappMsg(message);

    // Immediately trigger WhatsApp direct message to 9112768872
    sendToWhatsApp(message);

    try {
      const res = await fetch('/api/request-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, requestId: generatedId, whatsappMessage: message }),
      });

      const data = await res.json();
      const reqId = data.requestId || generatedId;
      setSubmittedId(reqId);
      onSuccess(reqId);
    } catch {
      setSubmittedId(generatedId);
      onSuccess(generatedId);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Live preview message
  const currentPreviewMessage = buildParentWhatsAppMessage({
    requestId: 'REQ-PREVIEW',
    parentName: formData.parentName || 'Parent Name',
    mobileNumber: formData.mobileNumber || '9112768872',
    studentClass: formData.studentClass,
    board: formData.board,
    subjects: formData.subjects,
    teachingMode: formData.teachingMode,
    areaPinCode: formData.areaPinCode || 'Local Area',
    preferredDate: formData.preferredDate,
    expectedFees: formData.expectedFees,
    preferredTime: formData.preferredTime,
    additionalRequirements: formData.additionalRequirements,
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutor-request-title"
    >
      <div
        className="bg-white dark:bg-[#0F172A] rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 relative animate-scale-up text-slate-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedId ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Header with Gen Z Badges */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-indigo-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-[11px] font-extrabold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  <span>Instant Tutor Match</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 text-[11px] font-bold">
                  <Flame className="w-3 h-3" />
                  <span>Free 45-Min Trial Demo</span>
                </span>
              </div>

              <h3 id="tutor-request-title" className="text-xl sm:text-2xl font-black tracking-tight">
                {prefillTutor
                  ? `Book Verified Teacher #${prefillTutor.id.replace('tut-', '')}`
                  : 'Find Your Personal Tutor'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Fill details below. When you tap submit, everything is dispatched instantly to coordinator WhatsApp{' '}
                <strong className="text-emerald-600 dark:text-emerald-400">{COORDINATOR_DISPLAY_PHONE}</strong>.
              </p>
            </div>

            {/* Quick Class Selector Chips (Gen Z UX) */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Class / Grade *
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFormData({ ...formData, studentClass: c })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      Number(formData.studentClass) === c
                        ? 'bg-gradient-to-r from-indigo-600 to-rose-600 text-white shadow-md scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {c}th
                  </button>
                ))}
              </div>
            </div>

            {/* Parent Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Parent / Student Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="e.g. Sunil Patil"
                    className="w-full bg-slate-50 dark:bg-[#131B2E] border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:bg-white dark:focus:bg-[#162036] focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                {errors.parentName && <p className="text-xs text-rose-500 mt-1">{errors.parentName}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  WhatsApp / Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    placeholder="e.g. 9820012345"
                    className="w-full bg-slate-50 dark:bg-[#131B2E] border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:bg-white dark:focus:bg-[#162036] focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                {errors.mobileNumber && <p className="text-xs text-rose-500 mt-1">{errors.mobileNumber}</p>}
              </div>
            </div>

            {/* Board & Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Education Board *
                </label>
                <select
                  value={formData.board}
                  onChange={(e) => setFormData({ ...formData, board: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-[#131B2E] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm focus:bg-white dark:focus:bg-[#162036] focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="CBSE">CBSE (Central Board)</option>
                  <option value="ICSE">ICSE / ISC</option>
                  <option value="Maharashtra State Board">Maharashtra State Board (SSC/HSC)</option>
                  <option value="IB / Cambridge">IB / Cambridge (IGCSE)</option>
                  <option value="Other Board">Other Board</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Teaching Mode *
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['Home Tuition', 'Online Tuition', 'Both'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setFormData({ ...formData, teachingMode: m })}
                      className={`py-2 px-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer text-center ${
                        formData.teachingMode === m
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 dark:bg-[#131B2E] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                      }`}
                    >
                      {m === 'Home Tuition' ? '🏡 Home' : m === 'Online Tuition' ? '💻 Online' : '⚡ Both'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Area / PIN Code */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                Area / City / PIN Code {formData.teachingMode === 'Online Tuition' ? '(Optional)' : '*'}
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={formData.areaPinCode || ''}
                  onChange={(e) => setFormData({ ...formData, areaPinCode: e.target.value })}
                  placeholder="e.g. Bandra West, Mumbai • 400050"
                  className="w-full bg-slate-50 dark:bg-[#131B2E] border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:bg-white dark:focus:bg-[#162036] focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              {errors.areaPinCode && <p className="text-xs text-rose-500 mt-1">{errors.areaPinCode}</p>}
            </div>

            {/* Budget Presets (Gen Z UX) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Expected Fees / Budget
                </label>
                <span className="text-[10px] text-slate-400">Tap quick preset:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {[
                  '₹3,000–₹5,000/mo',
                  '₹5,000–₹8,000/mo',
                  '₹8,000–₹12,000/mo',
                  '₹500/hr',
                  'Flexible',
                ].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFormData({ ...formData, expectedFees: f })}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
                      formData.expectedFees === f
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-[#131B2E] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={formData.expectedFees || ''}
                onChange={(e) => setFormData({ ...formData, expectedFees: e.target.value })}
                placeholder="Or custom budget: e.g. ₹6,000/month"
                className="w-full bg-slate-50 dark:bg-[#131B2E] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs focus:bg-white dark:focus:bg-[#162036] focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Time Slot Presets */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Preferred Time Slot
                </label>
                <span className="text-[10px] text-slate-400">Tap preset:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {[
                  '🌅 Morning (8–11 AM)',
                  '☀️ Afternoon (2–5 PM)',
                  '🌆 Evening (5–8 PM)',
                  '🌙 Night (8–9:30 PM)',
                  '📅 Weekends Only',
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setFormData({ ...formData, preferredTime: slot })}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-all cursor-pointer ${
                      formData.preferredTime === slot
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-[#131B2E] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={formData.preferredTime || ''}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                placeholder="Custom time: e.g. Tue/Thu/Sat 6 PM"
                className="w-full bg-slate-50 dark:bg-[#131B2E] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs focus:bg-white dark:focus:bg-[#162036] focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Live WhatsApp Preview Toggle */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowLivePreview(!showLivePreview)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Preview WhatsApp Message to {COORDINATOR_PHONE_RAW}</span>
                </span>
                {showLivePreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>

              {showLivePreview && (
                <div className="mt-2 p-3 rounded-2xl bg-slate-100 dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed animate-fade-in shadow-inner">
                  {currentPreviewMessage}
                </div>
              )}
            </div>

            {/* Submit Action with WhatsApp indicator */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 hover:opacity-95 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 active:scale-98"
              >
                {isSubmitting ? (
                  <span>Dispatching to WhatsApp...</span>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Submit & Send to WhatsApp ({COORDINATOR_PHONE_RAW})</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 text-center mt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Direct transmission to Coordinator:</span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{COORDINATOR_DISPLAY_PHONE}</strong>
              </div>
            </div>
          </form>
        ) : (
          /* SUCCESS SCREEN - High-Fidelity Gen Z Visual */
          <div className="py-4 text-center space-y-4 animate-scale-up">
            <div className="relative inline-block mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <span className="absolute -top-1 -right-1 text-lg">⚡</span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-500/20">
                Request ID: {submittedId}
              </span>
              <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Tuition Request Dispatched!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                All details have been compiled and sent to academic coordinator on WhatsApp.
              </p>
            </div>

            {/* Glowing WhatsApp Action Card */}
            <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-indigo-500/10 border-2 border-emerald-500/40 text-left space-y-3 max-w-md mx-auto shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                      WhatsApp Coordinator: {COORDINATOR_DISPLAY_PHONE}
                    </h4>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                      Tap below to open chat or copy your details
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href={getWhatsAppUrl(whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:opacity-95 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/30 active:scale-98 cursor-pointer ring-2 ring-emerald-400/50"
                >
                  <MessageCircle className="w-4 h-4 fill-current shrink-0" />
                  <span>👉 SEND DIRECT MESSAGE TO WHATSAPP ({COORDINATOR_PHONE_RAW})</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={`https://wa.me/91${COORDINATOR_PHONE_RAW}?text=${encodeURIComponent(whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Open in wa.me</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyMessage(whatsappMsg)}
                    className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-[#1E293B] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied! ✨</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>Copy Message Text</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center">
                Tap the big green button above to open WhatsApp directly with all your details.
              </p>
            </div>

            {/* Clean Message Bubble Preview (No broken glyphs) */}
            <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 text-left text-xs space-y-1.5 max-w-md mx-auto">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                  <MessageCircle className="w-3 h-3 text-emerald-500" /> Message Sent to {COORDINATOR_PHONE_RAW}:
                </span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-bold">
                  Verified Format
                </span>
              </div>
              <pre className="font-mono text-[11px] text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                {whatsappMsg}
              </pre>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
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
