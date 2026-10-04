import React from 'react';
import { ShieldCheck, ArrowRight, Play, Cpu, Zap, Award, Calendar } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  onSelectFeatured: (product: Product) => void;
  onOpenCalendly: () => void;
  featuredProduct: Product;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onSelectFeatured, onOpenCalendly, featuredProduct }) => {
  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(`Hello Mughalstech CNC Hub, I am interested in ordering or requesting a quotation for ${featuredProduct.name} (${featuredProduct.sku}). Please share specifications and dispatch timeline.`);
    window.open(`https://wa.me/9230007430652?text=${text}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F7FF] via-white to-slate-50 py-16 lg:py-24 border-b border-blue-100">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide">
              <Zap className="w-3.5 h-3.5 fill-blue-600" /> MUGHALSTECH PRECISION ENGINEERING & CNC HUB
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]" style={{ textWrap: 'balance' }}>
              Advanced Heavy Duty <span className="text-blue-600">CNC Lathes</span> & Machining Centers
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Engineered for uncompromising industrial performance, extreme thermal rigidity, and sub-micron repeatability across South Asia and global markets. Backed by 1-year factory warranty and rapid on-site technician deployment.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#catalog"
                onClick={onExploreClick}
                className="px-7 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm shadow-xl shadow-blue-600/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Machinery Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCalendly}
                className="px-7 py-4 bg-white hover:bg-blue-50 text-blue-700 font-bold rounded-2xl text-sm border border-blue-200 shadow-md flex items-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Schedule Live Video Demo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">100% Calibrated</div>
                  <div className="text-[11px] text-slate-500">Laser test report included</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Fanuc / Siemens</div>
                  <div className="text-[11px] text-slate-500">Advanced CNC controls</div>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">1-Year Warranty</div>
                  <div className="text-[11px] text-slate-500">Full parts & labor support</div>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-white border border-blue-100 p-6 shadow-2xl backdrop-blur group">
              
              <div className="absolute -top-3 -right-3 bg-blue-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-lg">
                FLAGSHIP MODEL
              </div>

              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-5 bg-slate-900">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-slate-900/90 backdrop-blur border border-slate-700 text-xs font-mono px-2.5 py-1 rounded text-cyan-400">
                    {featuredProduct.sku}
                  </span>
                  <span className="bg-blue-600 text-white font-bold text-sm px-3 py-1 rounded-lg shadow">
                    ${featuredProduct.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">{featuredProduct.name}</h3>
              <p className="text-xs text-slate-600 mb-6 line-clamp-2">{featuredProduct.shortDescription}</p>

              <div className="grid grid-cols-2 gap-3 mb-6 text-xs bg-slate-50 p-4 rounded-2xl border border-blue-100">
                <div>
                  <span className="text-slate-500 block">Turning Diameter</span>
                  <span className="font-bold text-slate-900">{featuredProduct.specifications.maxTurningDiameter}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Spindle Speed</span>
                  <span className="font-bold text-slate-900">{featuredProduct.specifications.spindleSpeed}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Motor Power</span>
                  <span className="font-bold text-slate-900">{featuredProduct.specifications.motorPower}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Stock Status</span>
                  <span className="font-bold text-emerald-600">{featuredProduct.stockStatus}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSelectFeatured(featuredProduct)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-xs transition-colors text-center border border-slate-200"
                >
                  Full Specs
                </button>
                <button
                  onClick={handleWhatsAppInquiry}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  <span>WhatsApp 0300-07430652</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
