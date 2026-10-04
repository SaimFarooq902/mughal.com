import React from 'react';
import { Wrench, ShieldCheck, PhoneCall, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <Wrench className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight text-white block leading-tight">
                  MUGHALSTECH <span className="text-blue-400">CNC HUB</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider font-mono uppercase block">Precision Heavy Machinery</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Global manufacturer of heavy-duty slant bed CNC lathes, vertical machining centers, and precision tooling. ISO 9001:2015 certified with round-the-clock engineering support.
            </p>

            <div className="flex items-center gap-2 text-xs text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Laser Calibration & On-Site Installation</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">Heavy Machinery</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#catalog" className="hover:text-cyan-400 transition-colors">Slant Bed CNC Lathes</a></li>
              <li><a href="#catalog" className="hover:text-cyan-400 transition-colors">Ultra-Precision Turning Centers</a></li>
              <li><a href="#catalog" className="hover:text-cyan-400 transition-colors">Vertical Milling Centers (VMC)</a></li>
              <li><a href="#catalog" className="hover:text-cyan-400 transition-colors">Micro Benchtop Lathes</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">Tooling & Spares</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#catalog" className="hover:text-cyan-400 transition-colors">Carbide Turning Inserts</a></li>
              <li><a href="#catalog" className="hover:text-cyan-400 transition-colors">Hydraulic 3-Jaw Chucks</a></li>
              <li><a href="#calculator" className="hover:text-cyan-400 transition-colors">Bulk Volume Discount Tooling</a></li>
              <li><a href="#catalog" className="hover:text-cyan-400 transition-colors">Servo Turrets & Spindles</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">Global Offices</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Lahore Industrial Estate, Pakistan</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Stuttgart Engineering Hub, Germany</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>+92 42 3588 MUGHAL</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>sales@mughalstech-cnc.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Mughalstech CNC Hub & Precision Engineering. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Industrial Supply</a>
            <a href="#" className="hover:text-slate-300">ISO 9001 Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
