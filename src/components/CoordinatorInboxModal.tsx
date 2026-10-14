import React, { useState, useEffect } from 'react';
import {
  X,
  MessageCircle,
  Phone,
  RefreshCw,
  ExternalLink,
  Copy,
  Check,
  Calendar,
  MapPin,
  Clock,
  User,
  GraduationCap,
  Sparkles,
  Search,
} from 'lucide-react';
import {
  COORDINATOR_DISPLAY_PHONE,
  COORDINATOR_PHONE_RAW,
  getWhatsAppUrl,
  copyToClipboard,
  buildParentWhatsAppMessage,
  getLocalParentSubmissions,
  saveParentSubmission,
} from '../utils/whatsapp';
import { useTheme } from '../context/ThemeContext';

interface CoordinatorInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CoordinatorInboxModal: React.FC<CoordinatorInboxModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isMidnight } = useTheme();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRequests = async () => {
    setLoading(true);
    // 1. Instantly load local submissions (works on GitHub Pages / offline / serverless)
    const local = getLocalParentSubmissions();
    setRequests(local);

    // 2. Attempt fetching from backend server if running
    try {
      const res = await fetch('/api/tutor-requests');
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success' && Array.isArray(data.requests)) {
          // Merge server requests with local requests avoiding duplicates by ID
          const combined = [...data.requests];
          local.forEach((locItem) => {
            if (!combined.some((srv) => srv.id === locItem.id)) {
              combined.unshift(locItem);
            }
          });
          setRequests(combined);
        }
      }
    } catch {
      // In static hosting environments like GitHub Pages, seamlessly fallback to local records
      setRequests(local);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchRequests();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = async (id: string, text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const filteredRequests = requests.filter((r) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.parentName?.toLowerCase().includes(q) ||
      r.mobileNumber?.includes(q) ||
      r.studentClass?.toString().includes(q) ||
      r.board?.toLowerCase().includes(q) ||
      r.id?.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inbox-title"
    >
      <div
        className={`rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border relative animate-scale-up ${
          isMidnight
            ? 'bg-[#0F172A] border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-700 text-white flex items-center justify-center shadow-md">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="inbox-title" className="text-lg sm:text-xl font-black tracking-tight">
                  Coordinator Direct Messages Inbox
                </h3>
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  {requests.length} Received
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Connected WhatsApp Number: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{COORDINATOR_DISPLAY_PHONE}</strong> ({COORDINATOR_PHONE_RAW})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchRequests}
              disabled={loading}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isMidnight
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title="Refresh requests"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Notice Bar */}
        <div className="px-5 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#131B2E] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, phone, class..."
              className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All forms submitted by parents route directly to <strong>{COORDINATOR_PHONE_RAW}</strong></span>
          </div>
        </div>

        {/* Messages List */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filteredRequests.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <MessageCircle className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
              <p className="font-semibold text-sm">No tutor requests found.</p>
              <p className="text-xs text-slate-500 mt-1">
                When parents submit a tuition inquiry, it appears here immediately and sends to WhatsApp {COORDINATOR_PHONE_RAW}.
              </p>
            </div>
          ) : (
            filteredRequests.map((req) => {
              const formattedMessage = req.whatsappMessage || buildParentWhatsAppMessage({
                requestId: req.id,
                parentName: req.parentName,
                mobileNumber: req.mobileNumber,
                studentClass: req.studentClass,
                board: req.board,
                subjects: req.subjects,
                teachingMode: req.teachingMode,
                areaPinCode: req.areaPinCode,
                preferredDate: req.preferredDate,
                expectedFees: req.expectedFees,
                preferredTime: req.preferredTime,
                additionalRequirements: req.additionalRequirements,
              });

              const isCopied = copiedId === req.id;

              return (
                <div
                  key={req.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                    isMidnight
                      ? 'bg-[#131B2E] border-slate-700/80 hover:border-emerald-500/40'
                      : 'bg-white border-slate-200 hover:border-emerald-300 shadow-xs'
                  }`}
                >
                  {/* Top line with ID & Timestamp */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200/60 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                        #{req.id}
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Class {req.studentClass} ({req.board})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400">
                        {req.createdAt ? new Date(req.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 uppercase">
                        {req.status || 'NEW INQUIRY'}
                      </span>
                    </div>
                  </div>

                  {/* Core Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 py-3 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Parent / Student:</span>
                      <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                        <User className="w-3.5 h-3.5 text-indigo-500" />
                        {req.parentName}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Mobile Phone:</span>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3.5 h-3.5" />
                        +91 {req.mobileNumber}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Teaching Mode:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300 block mt-0.5">
                        {req.teachingMode} {req.areaPinCode ? `• ${req.areaPinCode}` : ''}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Subjects:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block mt-0.5">
                        {Array.isArray(req.subjects) ? req.subjects.join(', ') : req.subjects}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Budget / Fees:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                        {req.expectedFees || 'Flexible'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Preferred Time:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300 block mt-0.5">
                        {req.preferredTime}
                      </span>
                    </div>
                  </div>

                  {/* Formatted WhatsApp Message Preview */}
                  <div className="mt-2 p-3 rounded-xl bg-slate-50 dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 text-[11px] font-mono whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300">
                    {formattedMessage}
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                    <a
                      href={getWhatsAppUrl(formattedMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Send to Coordinator WhatsApp ({COORDINATOR_PHONE_RAW})</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <a
                      href={`https://wa.me/91${req.mobileNumber}?text=Hi%20${encodeURIComponent(req.parentName)}%2C%20this%20is%20ARsolution%20academic%20coordinator%20regarding%20your%20tuition%20request%20%23${req.id}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Chat with Parent</span>
                    </a>

                    <a
                      href={`tel:${req.mobileNumber}`}
                      className={`px-3 py-1.5 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isMidnight
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                      }`}
                    >
                      <Phone className="w-3 h-3 text-emerald-500" />
                      <span>Call Parent</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopy(req.id, formattedMessage)}
                      className={`px-3 py-1.5 rounded-xl border font-bold text-xs flex items-center gap-1.5 ml-auto transition-colors cursor-pointer ${
                        isMidnight
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-500">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131B2E] rounded-b-3xl flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Helpline Coordinator Phone: <strong className="text-emerald-600 dark:text-emerald-400">{COORDINATOR_DISPLAY_PHONE}</strong>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
