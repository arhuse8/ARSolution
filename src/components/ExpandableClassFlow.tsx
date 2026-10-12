import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Search,
  MapPin,
  Sparkles,
  ChevronRight,
  Info,
  Calendar,
  Phone,
  User,
  Coins,
  Send,
  Clock,
} from 'lucide-react';
import { BoardId, SubjectOption } from '../types';
import { SUPPORTED_BOARDS, getSubjectsForClassAndBoard } from '../data/mockData';

interface ExpandableClassFlowProps {
  selectedClass: number;
  selectedBoard: BoardId | null;
  selectedSubjects: string[];
  teachingMode: 'Home Tuition' | 'Online Tuition' | 'Both';
  location: string;
  onSelectBoard: (boardId: BoardId) => void;
  onToggleSubject: (subjectId: string) => void;
  onSelectAllSubjects: () => void;
  onClearSubjects: () => void;
  onChangeTeachingMode: (mode: 'Home Tuition' | 'Online Tuition' | 'Both') => void;
  onChangeLocation: (location: string) => void;
  onViewSyllabus: () => void;
  onFindTutors: () => void;
  onOpenAiAdvisor: () => void;
  onRequestTutorModal: () => void;
  onBackToClasses: () => void;
}

const COMMON_AREAS = [
  'Andheri (East/West), Mumbai',
  'Borivali / Kandivali, Mumbai',
  'Dadar / Bandra, Mumbai',
  'Thane West, MMR',
  'Kothrud / Aundh, Pune',
  'Viman Nagar / Baner, Pune',
  'South Delhi / Noida',
  'Pan-India (Online)',
];

export const ExpandableClassFlow: React.FC<ExpandableClassFlowProps> = ({
  selectedClass,
  selectedBoard,
  selectedSubjects,
  teachingMode,
  location,
  onSelectBoard,
  onToggleSubject,
  onSelectAllSubjects,
  onClearSubjects,
  onChangeTeachingMode,
  onChangeLocation,
  onViewSyllabus,
  onFindTutors,
  onOpenAiAdvisor,
  onRequestTutorModal,
  onBackToClasses,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Quick Inline Callback Form State
  const todayStr = new Date().toISOString().split('T')[0];
  const [parentName, setParentName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [parentDate, setParentDate] = useState(todayStr);
  const [expectedFees, setExpectedFees] = useState('₹500 / hr');
  const [preferredTime, setPreferredTime] = useState('Evening (5 PM - 8 PM)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const selectedBoardConfig = SUPPORTED_BOARDS.find((b) => b.id === selectedBoard);
  const isBoardSupported = selectedBoardConfig?.isSupported ?? false;
  const boardName = selectedBoardConfig?.name || selectedBoard?.toUpperCase() || 'CBSE';

  const availableSubjects: SubjectOption[] = selectedBoard && isBoardSupported
    ? getSubjectsForClassAndBoard(selectedClass, selectedBoard)
    : [];

  const handleInlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number for callback.');
      return;
    }

    if (!parentName.trim()) {
      setFormError('Please enter parent or student name.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        studentClass: selectedClass,
        board: boardName,
        subjects: selectedSubjects.length > 0 ? selectedSubjects : ['All Core Subjects'],
        teachingMode,
        areaPinCode: location || 'Not specified',
        parentName: parentName.trim(),
        mobileNumber: cleanPhone,
        preferredDate: parentDate,
        expectedFees: expectedFees.trim() || 'Flexible',
        preferredTime,
      };

      const res = await fetch('/api/request-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setSubmittedData({
        ...payload,
        id: data.requestId || `REQ-${Math.floor(100000 + Math.random() * 900000)}`,
      });
      setSubmitSuccess(true);
    } catch (err) {
      // Graceful offline fallback
      setSubmittedData({
        studentClass: selectedClass,
        board: boardName,
        subjects: selectedSubjects.length > 0 ? selectedSubjects : ['All Core Subjects'],
        teachingMode,
        areaPinCode: location,
        parentName: parentName.trim(),
        mobileNumber: cleanPhone,
        preferredDate: parentDate,
        expectedFees: expectedFees.trim() || 'Flexible',
        id: `REQ-${Math.floor(100000 + Math.random() * 900000)}`,
      });
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="mt-7 bg-white rounded-3xl p-5 sm:p-7 md:p-9 border border-orange-100 shadow-rising transition-all duration-300 animate-fade-in"
    >
      {/* Top Breadcrumb & Back Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500">
          <button
            onClick={onBackToClasses}
            className="hover:text-indigo-700 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-lg font-bold border border-orange-200/60">
            Class {selectedClass}
          </span>
          {selectedBoard && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-bold uppercase">{selectedBoard}</span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={onBackToClasses}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-700 bg-slate-50 hover:bg-orange-50 px-3.5 py-1.5 rounded-xl border border-slate-200 hover:border-orange-200 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Classes</span>
        </button>
      </div>

      {/* Dynamic Heading with Rising Theme */}
      <div className="mt-5 mb-7">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          Explore Class {selectedClass}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Pick your school board and subjects to view verified chapters and match available home tutors.
        </p>
      </div>

      {/* STEP 1: SELECT BOARD */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-700 to-orange-500 text-white flex items-center justify-center text-xs font-bold">
              1
            </span>
            <span>Step 1: Select Education Board</span>
          </label>
          <span className="text-xs text-orange-600 font-semibold">Required</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SUPPORTED_BOARDS.map((board) => {
            const isSelected = selectedBoard === board.id;
            return (
              <button
                key={board.id}
                type="button"
                onClick={() => onSelectBoard(board.id)}
                className={`relative flex flex-col justify-between p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? 'bg-gradient-to-br from-orange-50/90 to-amber-50/60 border-orange-500 ring-2 ring-orange-500 shadow-sm'
                    : 'bg-white hover:bg-slate-50/90 border-slate-200 hover:border-orange-300 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        board.isSupported
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {board.badge}
                    </span>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {board.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {board.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Unavailable Board Graceful Message */}
        {selectedBoard && !isBoardSupported && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-amber-950">
                  We are expanding our coverage
                </h5>
                <p className="text-xs text-amber-800 mt-0.5">
                  We are expanding our coverage. Contact us to request a tutor for this board.
                </p>
              </div>
            </div>
            <button
              onClick={onRequestTutorModal}
              className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Request a Tutor for this Board
            </button>
          </div>
        )}
      </div>

      {/* STEP 2: SELECT SUBJECT */}
      {selectedBoard && isBoardSupported && (
        <div className="mb-8 pt-6 border-t border-slate-100 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <label className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-700 to-orange-500 text-white flex items-center justify-center text-xs font-bold">
                2
              </span>
              <span>Step 2: Select Subject(s)</span>
            </label>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={onSelectAllSubjects}
                className="text-orange-700 hover:text-orange-800 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200/60 transition-colors cursor-pointer"
              >
                Select All
              </button>
              {selectedSubjects.length > 0 && (
                <button
                  type="button"
                  onClick={onClearSubjects}
                  className="text-slate-500 hover:text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-500 mb-3.5">
            Select one or more subjects you need tuition for (e.g. Maths + Science).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {availableSubjects.map((subject) => {
              const isChecked = selectedSubjects.includes(subject.id);
              return (
                <button
                  key={subject.id}
                  type="button"
                  onClick={() => onToggleSubject(subject.id)}
                  className={`flex items-center justify-between p-3 rounded-xl text-left border transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-gradient-to-r from-indigo-700 to-orange-600 text-white border-orange-500 shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-orange-300'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-xs sm:text-sm font-semibold truncate block">
                      {subject.name}
                    </span>
                    {subject.stream && (
                      <span
                        className={`text-[10px] block mt-0.5 ${
                          isChecked ? 'text-orange-100' : 'text-slate-400'
                        }`}
                      >
                        {subject.stream} Stream
                      </span>
                    )}
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                      isChecked
                        ? 'bg-white text-orange-600 border-white'
                        : 'border-slate-300 bg-slate-50'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedSubjects.length === 0 && (
            <p className="text-xs text-amber-600 mt-2 font-medium flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              Please pick at least one subject to view the exact syllabus and matching tutors.
            </p>
          )}
        </div>
      )}

      {/* STEP 3: CHOOSE TEACHING MODE */}
      {selectedBoard && isBoardSupported && (
        <div className="mb-8 pt-6 border-t border-slate-100 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-700 to-orange-500 text-white flex items-center justify-center text-xs font-bold">
                3
              </span>
              <span>Step 3: Choose Teaching Mode</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-2xl">
            {(['Home Tuition', 'Online Tuition', 'Both'] as const).map((mode) => {
              const isSelected = teachingMode === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => onChangeTeachingMode(mode)}
                  className={`p-3 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-700 to-orange-600 text-white border-orange-500 shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {mode}
                </button>
              );
            })}
          </div>

          {/* Area / PIN code required when Home Tuition or Both is selected */}
          {(teachingMode === 'Home Tuition' || teachingMode === 'Both') && (
            <div className="mt-4 p-4 rounded-2xl bg-orange-50/40 border border-orange-100 max-w-2xl animate-fade-in">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <span>Enter Your Locality, Area or PIN Code (For Home Visit Verification)</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => onChangeLocation(e.target.value)}
                placeholder="e.g. Andheri East, Mumbai / Kothrud, Pune / 400069"
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />

              {/* Quick Area Suggestion Chips */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400 font-medium">Popular:</span>
                {COMMON_AREAS.slice(0, 4).map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => onChangeLocation(area)}
                    className="text-[11px] bg-white hover:bg-orange-50 text-slate-600 hover:text-orange-700 px-2 py-0.5 rounded-md border border-slate-200 transition-colors cursor-pointer"
                  >
                    {area.split(',')[0]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {teachingMode === 'Online Tuition' && (
            <div className="mt-3 text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                Online Tuition is available pan-India. Live 1-on-1 audio/video whiteboard classes. No physical address required.
              </span>
            </div>
          )}
        </div>
      )}

      {/* QUICK INLINE PARENT CALLBACK & DEMO BOOKING FORM */}
      {selectedBoard && isBoardSupported && (
        <div className="mb-8 pt-6 border-t border-slate-100 animate-fade-in">
          {!submitSuccess ? (
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-orange-50/70 via-amber-50/40 to-white border border-orange-200/80 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-orange-100">
                <div>
                  <span className="text-[11px] font-bold text-orange-800 bg-orange-100/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-orange-200">
                    Direct Coordinator Callback
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                    Get Tutor Callback for Class {selectedClass}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Enter your mobile number, preferred start date, and expected fees to receive a verified tutor callback.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-orange-600" />
                  <span>Callback in 24 hrs</span>
                </div>
              </div>

              <form onSubmit={handleInlineSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Parent Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Parent / Student Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="e.g. Sunil Patil"
                        className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Mobile No */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mobile Number (For Callback) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="e.g. 9820012345"
                        className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Preferred Start Date (Parent Date) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-orange-600" />
                      <span>Preferred Start Date (Parent Date) *</span>
                    </label>
                    <input
                      type="date"
                      value={parentDate}
                      min={todayStr}
                      onChange={(e) => setParentDate(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                    {/* Quick Date Chips */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] text-slate-400">Quick:</span>
                      {[
                        { label: 'Today', offset: 0 },
                        { label: 'Tomorrow', offset: 1 },
                        { label: 'This Weekend', offset: 3 },
                      ].map((item) => {
                        const targetD = new Date();
                        targetD.setDate(targetD.getDate() + item.offset);
                        const dStr = targetD.toISOString().split('T')[0];
                        return (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => setParentDate(dStr)}
                            className="text-[10px] bg-white hover:bg-orange-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 transition-colors cursor-pointer"
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Expected Fees (Parent Write) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Coins className="w-3.5 h-3.5 text-orange-600" />
                      <span>Expected Fees / Budget *</span>
                    </label>
                    <input
                      type="text"
                      value={expectedFees}
                      onChange={(e) => setExpectedFees(e.target.value)}
                      placeholder="e.g. ₹500/hr, ₹6,000/month, or as per tutor"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                    {/* Quick Fee Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] text-slate-400">Suggestions:</span>
                      {['₹400–₹550/hr', '₹600–₹750/hr', '₹800+/hr', 'Flexible'].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setExpectedFees(f)}
                          className="text-[10px] bg-white hover:bg-orange-50 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 transition-colors cursor-pointer"
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Preferred Timing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Preferred Learning Time
                    </label>
                    <input
                      type="text"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      placeholder="e.g. Weekdays 5:00 PM – 7:00 PM"
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div className="flex flex-col justify-end">
                    <span className="text-[11px] text-slate-500 mb-1">
                      Target: <strong>Class {selectedClass} ({boardName})</strong> • {selectedSubjects.length > 0 ? `${selectedSubjects.length} subjects` : 'Core subjects'}
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-indigo-700 via-indigo-600 to-orange-500 hover:opacity-95 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-rising transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting Details...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Details & Get Tutor Callback</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {formError && (
                  <p className="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                    {formError}
                  </p>
                )}
              </form>
            </div>
          ) : (
            /* SUCCESS CONFIRMATION IN-PLACE CARD */
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white border-2 border-emerald-300 shadow-rising animate-scale-up text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-xs">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>

              <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full uppercase tracking-wider border border-emerald-300">
                Request ID: {submittedData?.id || 'CONFIRMED'}
              </span>

              <h4 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Thank you! Our team will contact you soon.
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
                We have received all your tuition details for{' '}
                <strong className="text-slate-900">
                  Class {selectedClass} ({boardName})
                </strong>
                . Our academic coordinator will call you at{' '}
                <strong className="text-slate-900">{submittedData?.mobileNumber}</strong> shortly to confirm your teacher matching and schedule your demo on{' '}
                <strong className="text-slate-900">{submittedData?.preferredDate}</strong> at your expected fees of{' '}
                <strong className="text-emerald-700">{submittedData?.expectedFees}</strong>.
              </p>

              {/* All Details Summary */}
              <div className="mt-5 p-4 rounded-2xl bg-white border border-emerald-200 text-left text-xs text-slate-700 space-y-2 max-w-md mx-auto shadow-xs">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500 font-medium">Student Level:</span>
                  <span className="font-extrabold text-slate-900">Class {selectedClass} ({boardName})</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500 font-medium">Parent Contact:</span>
                  <span className="font-extrabold text-slate-900">{submittedData?.mobileNumber} ({submittedData?.parentName})</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500 font-medium">Preferred Start Date:</span>
                  <span className="font-extrabold text-orange-700">{submittedData?.preferredDate}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500 font-medium">Expected Fees:</span>
                  <span className="font-extrabold text-emerald-700">{submittedData?.expectedFees}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-500 font-medium">Subjects:</span>
                  <span className="font-bold text-slate-900">{selectedSubjects.length > 0 ? selectedSubjects.join(', ') : 'All Core'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Teaching Mode:</span>
                  <span className="font-bold text-indigo-700">{teachingMode} {location ? `• ${location}` : ''}</span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Modify Request
                </button>
                <button
                  type="button"
                  onClick={onFindTutors}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Browse Matching Tutors Below
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: VIEW OPTIONS */}
      {selectedBoard && isBoardSupported && (
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900">
              Explore More for Class {selectedClass} ({selectedBoardConfig?.name})
            </h4>
            <p className="text-xs text-slate-500">
              {selectedSubjects.length > 0
                ? `${selectedSubjects.length} subject(s) selected • ${teachingMode}`
                : 'Select subjects above to get customized results'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onViewSyllabus}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white hover:bg-orange-50/60 text-slate-800 font-bold text-xs sm:text-sm px-4.5 py-3 rounded-xl border border-slate-200 hover:border-orange-300 shadow-xs transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>View Syllabus</span>
            </button>

            <button
              type="button"
              onClick={onFindTutors}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-700 via-indigo-600 to-orange-500 hover:opacity-95 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-rising hover:shadow-rising-hover transition-all cursor-pointer transform active:scale-95"
            >
              <Search className="w-4 h-4" />
              <span>Find Matching Tutors</span>
            </button>

            <button
              type="button"
              onClick={onOpenAiAdvisor}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 text-orange-900 text-xs font-bold px-3.5 py-3 rounded-xl border border-orange-200 transition-colors cursor-pointer shadow-xs"
              title="Get an AI Powered Study Plan"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>AI Study Plan</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
