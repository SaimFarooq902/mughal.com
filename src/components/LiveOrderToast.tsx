import React, { useState, useEffect } from 'react';
import { INITIAL_LIVE_TOASTS } from '../data/mockData';
import { Bell, X } from 'lucide-react';

export const LiveOrderToast: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % INITIAL_LIVE_TOASTS.length);
        setVisible(true);
      }, 500);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentToast = INITIAL_LIVE_TOASTS[currentIndex];

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm bg-white/95 backdrop-blur-md border border-blue-200 p-4 rounded-2xl shadow-2xl flex items-start gap-3 animate-fadeIn">
      <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
        <Bell className="w-4 h-4 animate-bounce" />
      </div>

      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-blue-600 font-bold uppercase">Live Industrial Activity</span>
          <span className="text-[10px] text-slate-400">{currentToast.timeAgo}</span>
        </div>
        <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">
          {currentToast.text}
        </p>
      </div>

      <button onClick={() => setVisible(false)} className="text-slate-400 hover:text-slate-700">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
