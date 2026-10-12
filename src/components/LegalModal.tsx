import React, { useEffect } from 'react';
import { X, Shield, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && type) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-3xl w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 relative animate-scale-up text-xs sm:text-sm text-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'privacy' ? (
          <div>
            <div className="flex items-center gap-2 mb-3 text-indigo-700">
              <Shield className="w-5 h-5" />
              <h3 className="text-xl font-extrabold text-slate-900">Privacy Policy</h3>
            </div>
            <div className="space-y-3 leading-relaxed text-slate-600">
              <p>
                At <strong>AR Solution Home Tutor</strong>, safeguarding the privacy and personal security of our students, parents, and educator partners is our fundamental responsibility.
              </p>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                1. Information We Collect
              </h4>
              <p>
                We collect essential contact information (parent name, mobile number, child's grade, locality, syllabus preferences) strictly for matching students with qualified educators and scheduling introductory demo classes.
              </p>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                2. Teacher Background Data
              </h4>
              <p>
                Educator identification documents, academic degrees, and police verification reports are held in encrypted storage and never exposed publicly on the web.
              </p>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                3. Zero Third-Party Sale
              </h4>
              <p>
                We never sell, lease, or monetize user data with third-party marketing companies. All data handling complies with Indian data protection norms.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-3 text-indigo-700">
              <FileText className="w-5 h-5" />
              <h3 className="text-xl font-extrabold text-slate-900">Terms & Conditions</h3>
            </div>
            <div className="space-y-3 leading-relaxed text-slate-600">
              <p>
                Welcome to <strong>AR Solution Home Tutor</strong>. By using our platform to search for home or online tuition, or by registering as an educator, you agree to these terms:
              </p>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                1. 45-Minute Introductory Demo
              </h4>
              <p>
                Parents are entitled to an initial demo class with prospective tutors to assess teaching methodology before confirming a weekly tuition schedule.
              </p>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                2. Safe Learning Environment
              </h4>
              <p>
                Parents guarantee a safe, respectful home environment during in-person visits. Educators must strictly maintain professional conduct and punctuality.
              </p>
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                3. Replacement Guarantee
              </h4>
              <p>
                If either party finds the pedagogical match unsuitable, AR Solution will provide an alternate tutor within 48 hours without administrative penalty.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
};
