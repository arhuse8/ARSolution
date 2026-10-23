import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  FileText,
  UserCheck,
  MessageCircle,
  Briefcase,
  Copy,
  ExternalLink,
  PhoneCall,
  GraduationCap,
  BookOpen,
  MapPin,
  Calendar,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ConfettiRibbonBlast } from './ConfettiRibbonBlast';
import { TeacherRegistration } from '../types';
import {
  buildTeacherWhatsAppMessage,
  sendToWhatsApp,
  copyToClipboard,
  saveTeacherSubmission,
  COORDINATOR_DISPLAY_PHONE,
  COORDINATOR_PHONE_RAW,
} from '../utils/whatsapp';

interface TeacherRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (applicationId: string) => void;
}

const INITIAL_FORM: TeacherRegistration = {
  fullName: '',
  mobileNumber: '',
  email: '',
  city: 'Mumbai',
  areaOrPinCode: '',
  highestQualification: '',
  teachingExperience: '3–5 Years',
  classesTaught: [9, 10],
  boardsTaught: ['CBSE', 'Maharashtra State Board'],
  subjectsTaught: ['Mathematics', 'Science'],
  teachingLanguages: ['English', 'Hindi'],
  teachingMode: 'Both',
  availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  preferredHours: 'Evening (4:00 PM – 8:30 PM)',
  serviceArea: '',
  feePerSession: 600,
  sessionDuration: '60 minutes',
  agreedToTerms: false,
};

const COMMON_SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Science (General)',
  'English Grammar & Lit',
  'Social Science / History',
  'Computer Science / Coding',
  'Accountancy',
  'Economics',
  'Business Studies',
  'Hindi / Marathi',
];

const AVAILABLE_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const TeacherRegistrationModal: React.FC<TeacherRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { isMidnight } = useTheme();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<TeacherRegistration>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApplicationId, setSubmittedApplicationId] = useState<string | null>(null);
  const [generatedWhatsappMessage, setGeneratedWhatsappMessage] = useState<string>('');
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);

  // ESC key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Validation per step
  const validateStep = (s: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (s === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
      const cleanPhone = formData.mobileNumber.replace(/\D/g, '');
      if (cleanPhone.length < 10) newErrors.mobileNumber = 'Enter a valid 10-digit mobile number.';
      if (!formData.email.trim() || !formData.email.includes('@')) {
        newErrors.email = 'Enter a valid email address.';
      }
      if (!formData.city.trim()) newErrors.city = 'City is required.';
      if (!formData.areaOrPinCode.trim()) newErrors.areaOrPinCode = 'Locality or PIN code is required.';
    }

    if (s === 2) {
      if (!formData.highestQualification.trim()) {
        newErrors.highestQualification = 'Highest qualification (e.g., M.Sc. Math, B.Ed, B.Tech) is required.';
      }
      if (formData.classesTaught.length === 0) {
        newErrors.classesTaught = 'Please select at least one class you can teach.';
      }
      if (formData.boardsTaught.length === 0) {
        newErrors.boardsTaught = 'Please select at least one education board.';
      }
      if (formData.subjectsTaught.length === 0) {
        newErrors.subjectsTaught = 'Please select at least one subject.';
      }
    }

    if (s === 3) {
      if (!formData.serviceArea.trim()) {
        newErrors.serviceArea = 'Please enter your preferred service localities / areas.';
      }
      if (formData.availableDays.length === 0) {
        newErrors.availableDays = 'Select at least one available teaching day.';
      }
      if (formData.feePerSession <= 0) {
        newErrors.feePerSession = 'Enter a valid session fee (e.g. ₹500).';
      }
    }

    if (s === 4) {
      if (!formData.agreedToTerms) {
        newErrors.agreedToTerms = 'You must agree to the educator terms and verification declaration.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(4, prev + 1) as any);
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1) as any);
  };

  const toggleClass = (c: number) => {
    setFormData((prev) => ({
      ...prev,
      classesTaught: prev.classesTaught.includes(c)
        ? prev.classesTaught.filter((item) => item !== c)
        : [...prev.classesTaught, c].sort((a, b) => a - b),
    }));
  };

  const toggleBoard = (b: string) => {
    setFormData((prev) => ({
      ...prev,
      boardsTaught: prev.boardsTaught.includes(b)
        ? prev.boardsTaught.filter((item) => item !== b)
        : [...prev.boardsTaught, b],
    }));
  };

  const toggleSubject = (s: string) => {
    setFormData((prev) => ({
      ...prev,
      subjectsTaught: prev.subjectsTaught.includes(s)
        ? prev.subjectsTaught.filter((item) => item !== s)
        : [...prev.subjectsTaught, s],
    }));
  };

  const toggleDay = (d: string) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(d)
        ? prev.availableDays.filter((item) => item !== d)
        : [...prev.availableDays, d],
    }));
  };

  const handleCopy = async () => {
    if (!generatedWhatsappMessage) return;
    const ok = await copyToClipboard(generatedWhatsappMessage);
    if (ok) {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4) || isSubmitting) return;

    setIsSubmitting(true);
    let appId = `TCHR-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      const response = await fetch('/api/register-teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.applicationId) {
          appId = data.applicationId;
        }
      }
    } catch {
      // In case server is offline or deployed as static site (e.g. GitHub Pages), fallback gracefully
      console.info('Operating in client/static mode for teacher registration');
    }

    // 1. Build formatted WhatsApp message with complete teacher information
    const whatsappMsg = buildTeacherWhatsAppMessage(formData, appId);
    setGeneratedWhatsappMessage(whatsappMsg);
    setSubmittedApplicationId(appId);

    // 2. Persist locally for offline & GitHub Pages support
    saveTeacherSubmission({
      id: appId,
      ...formData,
      status: 'UNDER_ADMIN_REVIEW',
      createdAt: new Date().toISOString(),
      whatsappMessage: whatsappMsg,
      whatsappNumber: COORDINATOR_PHONE_RAW,
    });

    // 3. Immediately redirect / launch WhatsApp to coordinator +91 91127 68872 like parents flow!
    sendToWhatsApp(whatsappMsg);

    onSuccess(appId);
    setIsSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="teacher-modal-title"
    >
      <div
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 relative animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close registration modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        {!submittedApplicationId ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                Teacher Community
              </span>
              <span className="text-xs text-slate-400">• Step {step} of 4</span>
            </div>
            <h3 id="teacher-modal-title" className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Register as an AR Solution Home Tutor
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Connect with motivated students in your locality for verified home and online tuition.
            </p>

            {/* Stepper Indicator */}
            <div className="grid grid-cols-4 gap-2 my-5">
              {[
                { s: 1, name: 'Basic Info' },
                { s: 2, name: 'Academic' },
                { s: 3, name: 'Preferences' },
                { s: 4, name: 'Review' },
              ].map((item) => (
                <div key={item.s} className="space-y-1">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      step >= item.s ? 'bg-indigo-600' : 'bg-slate-200'
                    }`}
                  />
                  <span
                    className={`text-[10px] block font-semibold truncate ${
                      step === item.s ? 'text-indigo-700' : 'text-slate-400'
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>

            {/* STEP 1: BASIC INFORMATION */}
            {step === 1 && (
              <div className="space-y-4 py-2 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Chandra Sharma"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                  {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      placeholder="e.g. 9820012345"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                    {errors.mobileNumber && (
                      <p className="text-xs text-rose-600 mt-1">{errors.mobileNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ramesh.tutor@gmail.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                    {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Mumbai / Pune / Thane"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                    {errors.city && <p className="text-xs text-rose-600 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Locality, Area or PIN Code *
                    </label>
                    <input
                      type="text"
                      value={formData.areaOrPinCode}
                      onChange={(e) => setFormData({ ...formData, areaOrPinCode: e.target.value })}
                      placeholder="e.g. Borivali West / 400092"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                    {errors.areaOrPinCode && (
                      <p className="text-xs text-rose-600 mt-1">{errors.areaOrPinCode}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: TEACHING INFORMATION */}
            {step === 2 && (
              <div className="space-y-4 py-2 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Highest Qualification *
                    </label>
                    <input
                      type="text"
                      value={formData.highestQualification}
                      onChange={(e) =>
                        setFormData({ ...formData, highestQualification: e.target.value })
                      }
                      placeholder="e.g. M.Sc. Mathematics, B.Ed, B.Tech"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                    {errors.highestQualification && (
                      <p className="text-xs text-rose-600 mt-1">{errors.highestQualification}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Teaching Experience *
                    </label>
                    <select
                      value={formData.teachingExperience}
                      onChange={(e) =>
                        setFormData({ ...formData, teachingExperience: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    >
                      <option value="1–2 Years">1–2 Years</option>
                      <option value="3–5 Years">3–5 Years</option>
                      <option value="6–10 Years">6–10 Years</option>
                      <option value="10+ Years">10+ Years (Senior Faculty)</option>
                    </select>
                  </div>
                </div>

                {/* Classes Taught (Multi-select 1-12) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Classes You Can Teach *
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((c) => {
                      const isSelected = formData.classesTaught.includes(c);
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => toggleClass(c)}
                          className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          Cl {c}
                        </button>
                      );
                    })}
                  </div>
                  {errors.classesTaught && (
                    <p className="text-xs text-rose-600 mt-1">{errors.classesTaught}</p>
                  )}
                </div>

                {/* Boards Taught */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Boards Covered *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['CBSE', 'ICSE', 'Maharashtra State Board', 'Other Boards'].map((b) => {
                      const isSelected = formData.boardsTaught.includes(b);
                      return (
                        <button
                          key={b}
                          type="button"
                          onClick={() => toggleBoard(b)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-50 border-indigo-600 text-indigo-700'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                          {b}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Subjects Taught */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Subjects Taught *
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {COMMON_SUBJECTS.map((s) => {
                      const isSelected = formData.subjectsTaught.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSubject(s)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                  {errors.subjectsTaught && (
                    <p className="text-xs text-rose-600 mt-1">{errors.subjectsTaught}</p>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: TEACHING PREFERENCES */}
            {step === 3 && (
              <div className="space-y-4 py-2 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Teaching Mode *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Home Tuition', 'Online Tuition', 'Both'] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setFormData({ ...formData, teachingMode: m })}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          formData.teachingMode === m
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Your Service Locality / Areas *
                    </label>
                    <input
                      type="text"
                      value={formData.serviceArea}
                      onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value })}
                      placeholder="e.g. Andheri, Vile Parle, Powai"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                    {errors.serviceArea && (
                      <p className="text-xs text-rose-600 mt-1">{errors.serviceArea}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Expected Fee per Hour (₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.feePerSession}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          feePerSession: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="e.g. 600"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Available Days */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Available Days *
                  </label>
                  <div className="grid grid-cols-7 gap-1.5">
                    {AVAILABLE_DAYS.map((d) => {
                      const isSelected = formData.availableDays.includes(d);
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => toggleDay(d)}
                          className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preferred Time Slots
                  </label>
                  <input
                    type="text"
                    value={formData.preferredHours}
                    onChange={(e) => setFormData({ ...formData, preferredHours: e.target.value })}
                    placeholder="e.g. 5:00 PM – 8:30 PM (Weekdays)"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW AND SUBMIT */}
            {step === 4 && (
              <div className="space-y-4 py-2 animate-fade-in text-xs sm:text-sm">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Educator Name:</span>
                    <span className="font-bold text-slate-900">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Contact:</span>
                    <span className="font-bold text-slate-900">
                      {formData.mobileNumber} ({formData.city})
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Qualification & Exp:</span>
                    <span className="font-bold text-slate-900">
                      {formData.highestQualification} • {formData.teachingExperience}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Classes & Boards:</span>
                    <span className="font-bold text-slate-900">
                      Cl {formData.classesTaught.join(', ')} • {formData.boardsTaught.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Subjects:</span>
                    <span className="font-bold text-slate-900">
                      {formData.subjectsTaught.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Mode & Fee:</span>
                    <span className="font-bold text-indigo-700">
                      {formData.teachingMode} • ₹{formData.feePerSession}/hr
                    </span>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreedToTerms}
                      onChange={(e) =>
                        setFormData({ ...formData, agreedToTerms: e.target.checked })
                      }
                      className="mt-0.5 w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                    />
                    <span className="text-xs text-slate-700 leading-relaxed">
                      I declare that all submitted academic qualifications and details are authentic. I agree to undergo ID/address verification and respect AR Solution Home Tutor student safety guidelines.
                    </span>
                  </label>
                  {errors.agreedToTerms && (
                    <p className="text-xs text-rose-600 mt-2 font-medium">{errors.agreedToTerms}</p>
                  )}
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#4338CA] hover:bg-indigo-800 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Submit Teacher Registration</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Confirmation Screen after Submission with Direct WhatsApp Flow */
          <div className="py-6 space-y-5 animate-scale-up text-left relative">
            {/* Canvas Celebration Ribbon & Confetti Blast */}
            <ConfettiRibbonBlast />

            <div className="text-center space-y-3">
              <div className="relative inline-block mx-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xl ring-4 ring-emerald-500/25">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>
                <span className="absolute -top-1 -right-1 text-2xl animate-bounce">🎉</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-300 dark:border-emerald-700">
                  Application ID: #{submittedApplicationId}
                </span>
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500 fill-current" />
                  Sent to WhatsApp
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Congratulations! Welcome to AR Solution!
              </h3>

              {/* 24-Hour Assignment Guarantee Callout */}
              <div className="p-4 rounded-3xl bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-emerald-500/15 border-2 border-indigo-500/40 text-center space-y-1.5 max-w-lg mx-auto shadow-md">
                <div className="inline-flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-black text-sm sm:text-base">
                  <Briefcase className="w-5 h-5 animate-bounce text-indigo-600 dark:text-indigo-400" />
                  <span>Congratulations! You Will Get an Assignment Within 24 Hours!</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                  Our academic panel is reviewing your qualifications ({formData.highestQualification}) and will reach out to you on{' '}
                  <strong className="text-indigo-600 dark:text-indigo-400 font-extrabold">{formData.mobileNumber}</strong>{' '}
                  within <strong>24 hours</strong> with student tuition assignments in your area ({formData.city}).
                </p>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2.5 max-w-md mx-auto">
              <button
                type="button"
                onClick={() => sendToWhatsApp(generatedWhatsappMessage)}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-500/20 cursor-pointer transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Open WhatsApp Chat with Coordinator</span>
                <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
              </button>
            </div>

            {/* Quick Summary Grid */}
            <div className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm space-y-3 ${
              isMidnight
                ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-indigo-500" />
                  Educator Profile Summary
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Ready for Verification
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Educator Name</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Contact & WhatsApp</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formData.mobileNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Location</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.city} ({formData.areaOrPinCode})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Qualification & Experience</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.highestQualification} • {formData.teachingExperience}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-[11px]">Classes & Boards</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Classes {formData.classesTaught.join(', ')} ({formData.boardsTaught.join(', ')})
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-[11px]">Subjects</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.subjectsTaught.join(', ')}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Mode</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.teachingMode}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Expected Fee</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-bold">
                    ₹{formData.feePerSession} / session ({formData.sessionDuration})
                  </span>
                </div>
              </div>
            </div>

            {/* Verification Notice */}
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Next Step: Verification & Interview</p>
                <p className="text-amber-800 dark:text-amber-400/90 mt-0.5">
                  Our academic coordinator will reach out on WhatsApp/Phone at {formData.mobileNumber} within 24–48 hours for degree check and a short 15-minute demonstration session.
                </p>
              </div>
            </div>

            {/* Coordinator Helpline Pill */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                Direct Helpline Coordinator:{' '}
                <a
                  href={`tel:${COORDINATOR_PHONE_RAW}`}
                  className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {COORDINATOR_DISPLAY_PHONE}
                </a>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
              >
                Done / Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
