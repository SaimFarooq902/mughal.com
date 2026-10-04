import React, { useState, useEffect } from 'react';
import { X, Download, CheckCircle2 } from 'lucide-react';

export const ExitIntentModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !localStorage.getItem('mughal_exit_shown')) {
        setIsOpen(true);
        localStorage.setItem('mughal_exit_shown', 'true');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    setClaimed(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-blue-200 rounded-3xl shadow-2xl p-8 text-center space-y-6">
        
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto">
          <Download className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-blue-600 uppercase tracking-wider font-bold">EXCLUSIVE VIP INDUSTRIAL OFFER</span>
          <h3 className="text-2xl font-bold text-slate-900">Claim 5% Off Any CNC Machine + Full Spec Catalog</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Don't leave empty-handed. Claim your VIP discount voucher code <strong className="text-blue-600 font-mono">VIP5</strong> instantly and download our complete 2026 heavy machinery price catalog.
          </p>
        </div>

        {claimed ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <div className="text-sm font-bold text-slate-900">Voucher Claimed! Use Coupon: <strong className="text-blue-600 font-mono">VIP5</strong></div>
            <p className="text-xs text-slate-600">Catalog has been sent to your email.</p>
          </div>
        ) : (
          <form onSubmit={handleClaim} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Enter your work email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 bg-slate-50 border border-blue-200 rounded-2xl text-xs text-slate-900 text-center font-medium focus:outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-blue-600/25"
            >
              Get VIP 5% Discount Code & Catalog
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
