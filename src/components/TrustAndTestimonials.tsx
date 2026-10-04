import React from 'react';
import { INITIAL_TESTIMONIALS } from '../data/mockData';
import { ShieldCheck, Truck, Wrench, Award, Star, Quote } from 'lucide-react';

export const TrustAndTestimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-white border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Trust Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          
          <div className="p-6 rounded-3xl bg-slate-50 border border-blue-100 flex items-start gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">100% Factory Calibrated</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Laser interferometer tested for sub-micron geometric precision before dispatch.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-blue-100 flex items-start gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">1-Year Industrial Warranty</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Comprehensive coverage on spindles, servomotors, ball screws, and electrical cabinets.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-blue-100 flex items-start gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">On-Site Installation Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Certified Mughalstech engineers dispatched for machine leveling, commissioning, and staff training.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-blue-100 flex items-start gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Fast Regional & Global Freight</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Secure container shipping with real-time tracking and crane-assisted offloading guidance.</p>
            </div>
          </div>

        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="text-blue-600 font-mono text-xs uppercase tracking-wider font-bold">VERIFIED INDUSTRIAL CLIENT PROOF</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Trusted by Precision Machinists & Factory Owners Worldwide
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_TESTIMONIALS.map(t => (
            <div key={t.id} className="p-8 rounded-3xl bg-slate-50 border border-blue-100 flex flex-col justify-between relative shadow-sm">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-200" />
              
              <div className="space-y-4 mb-6 relative z-10">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{t.comment}"
                </p>
                <div className="text-xs font-mono text-blue-700 bg-blue-50 inline-block px-3 py-1 rounded-lg border border-blue-200 font-bold">
                  Machine: {t.machineUsed}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-blue-100">
                <img src={t.avatar} alt={t.clientName} className="w-12 h-12 rounded-full object-cover border border-blue-200" />
                <div>
                  <div className="text-sm font-bold text-slate-900">{t.clientName}</div>
                  <div className="text-xs text-slate-600">{t.role} · {t.company}</div>
                  <div className="text-[11px] text-slate-400">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
