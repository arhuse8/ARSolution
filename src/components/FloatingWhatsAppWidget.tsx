import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Phone, ChevronRight } from 'lucide-react';
import {
  COORDINATOR_DISPLAY_PHONE,
  COORDINATOR_PHONE_RAW,
  getWhatsAppUrl,
} from '../utils/whatsapp';

interface FloatingWhatsAppWidgetProps {
  onRequestTutorClick: () => void;
  onOpenInbox?: () => void;
}

export const FloatingWhatsAppWidget: React.FC<FloatingWhatsAppWidgetProps> = ({
  onRequestTutorClick,
  onOpenInbox,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultGreeting =
    'Hi ARsolution! I want to find a verified home/online tutor for my child. Please help me with tutor availability and a free demo.';

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Quick Chat Popover */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 rounded-3xl bg-white dark:bg-[#0F172A] border border-emerald-500/30 shadow-2xl overflow-hidden animate-scale-up text-slate-900 dark:text-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 p-4 text-white relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3.5 right-3.5 p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
              aria-label="Close widget"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 font-black">
                  AR
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-[#0F172A]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-sm">ARsolution Helpline</h4>
                  <span className="text-[10px] bg-white/25 px-1.5 py-0.2 rounded font-bold">24/7</span>
                </div>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Online • Avg reply &lt; 3 mins</span>
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 text-xs bg-slate-50 dark:bg-[#131B2E]">
            {/* Mock message bubble */}
            <div className="p-3 rounded-2xl rounded-tl-xs bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/60 shadow-xs space-y-1">
              <p className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                <span>👋 Welcome to ARsolution!</span>
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                Looking for a verified home or online tutor? WhatsApp our academic coordinator directly at{' '}
                <strong className="text-emerald-600 dark:text-emerald-400">{COORDINATOR_DISPLAY_PHONE}</strong> or book a free trial demo class.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 pt-1">
              <a
                href={getWhatsAppUrl(defaultGreeting)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-between transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Chat on WhatsApp ({COORDINATOR_PHONE_RAW})</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onRequestTutorClick();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-[#1E293B] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 flex items-center justify-between transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <span>Book Free 45-Min Trial Demo</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {onOpenInbox && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenInbox();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs border border-emerald-500/30 flex items-center justify-between transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-500 fill-current" />
                    <span>📥 View Direct Messages Inbox</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                </button>
              )}

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 pt-1">
                <Phone className="w-3 h-3 text-emerald-500" />
                <span>Call or WhatsApp:</span>
                <a
                  href={`tel:${COORDINATOR_PHONE_RAW}`}
                  className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  {COORDINATOR_DISPLAY_PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-white dark:bg-[#0F172A] border border-emerald-500/40 shadow-lg text-[11px] font-bold text-slate-800 dark:text-slate-200 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>WhatsApp Coordinator</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{COORDINATOR_PHONE_RAW}</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open WhatsApp direct chat"
          className="relative group p-3.5 sm:p-4 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-indigo-700 text-white shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6 fill-current" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-[#0F172A] text-[9px] font-black flex items-center justify-center shadow-xs">
                1
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
