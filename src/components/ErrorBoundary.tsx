import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, MessageCircle, AlertTriangle } from 'lucide-react';
import { COORDINATOR_DISPLAY_PHONE, COORDINATOR_PHONE_RAW, getWhatsAppUrl } from '../utils/whatsapp';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in AR Solution applet:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleWhatsAppCoordinator = () => {
    const msg = `Hi ARsolution! I had an issue loading the website on my mobile device (${navigator.userAgent.slice(0, 80)}). Please connect me with a coordinator for tutor assistance.`;
    window.location.href = getWhatsAppUrl(msg);
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-orange-200 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 mx-auto flex items-center justify-center text-white shadow-lg">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                AR Solution Home Tutor
              </h1>
              <p className="text-sm text-slate-600">
                The page encountered an unexpected load error on this mobile browser.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 via-rose-600 to-amber-500 text-white font-bold py-3.5 px-5 rounded-2xl shadow-md hover:opacity-95 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Website
              </button>

              <button
                onClick={this.handleWhatsAppCoordinator}
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-5 rounded-2xl shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                Contact Coordinator on WhatsApp ({COORDINATOR_PHONE_RAW})
              </button>
            </div>

            {this.state.error && (
              <details className="text-left text-xs text-slate-400 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <summary className="cursor-pointer font-semibold text-slate-600">
                  Technical Details
                </summary>
                <p className="mt-2 font-mono break-all text-[11px] text-rose-600">
                  {this.state.error.message}
                </p>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
