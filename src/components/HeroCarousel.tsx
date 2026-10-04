import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, ShieldCheck, Cpu, Award } from 'lucide-react';
import { Product } from '../types';

interface HeroCarouselProps {
  products: Product[];
  onExploreClick: () => void;
  onOpenCalendly: () => void;
  onSelectProduct: (product: Product) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  products,
  onExploreClick,
  onOpenCalendly,
  onSelectProduct
}) => {
  const featured = products.slice(0, 3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featured.length]);

  const currentProduct = featured[currentIndex] || featured[0];

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hello Mughalstech CNC Hub (0300-07430652), I am interested in ${currentProduct.name} (${currentProduct.sku}). Please share specifications.`);
    window.open(`https://wa.me/9230007430652?text=${text}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F7FF] via-white to-slate-50 py-16 lg:py-24 border-b border-blue-100">
      
      {/* Metallic Particle / Grid Canvas Effect */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#2563eb_1.5px,transparent_1.5px)] [background-size:32px_32px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Col */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" /> MUGHALSTECH CNC & PRECISION ENGINEERING
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]" style={{ textWrap: 'balance' }}>
              High-Precision <span className="text-blue-600">CNC Lathes</span> & Heavy Machinery Hub
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Enterprise-grade automated manufacturing solutions equipped with Siemens & Fanuc controls, laser-calibrated precision, and round-the-clock engineering support across South Asia.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#catalog"
                onClick={onExploreClick}
                className="px-7 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm shadow-xl shadow-blue-600/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Machines</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCalendly}
                className="px-7 py-4 bg-white hover:bg-blue-50 text-blue-700 font-bold rounded-2xl text-sm border border-blue-200 shadow-md flex items-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Watch Live Demo & Book Call</span>
              </button>
            </div>

            {/* Glassmorphic Floating Highlight Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8 border-t border-blue-100">
              <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur border border-blue-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">100% Calibrated</div>
                  <div className="text-[10px] text-slate-500">Laser certified</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur border border-blue-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Digital CNC</div>
                  <div className="text-[10px] text-slate-500">Fanuc / Siemens</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur border border-blue-100 shadow-sm flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">1-Year Warranty</div>
                  <div className="text-[10px] text-slate-500">Full on-site support</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Carousel Card Col */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-white border border-blue-100 p-6 shadow-2xl backdrop-blur group">
              
              <div className="absolute -top-3 -right-3 bg-blue-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-lg z-20">
                FEATURED SHOWCASE {currentIndex + 1} / {featured.length}
              </div>

              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-5 bg-slate-900 shadow-inner">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-slate-900/90 backdrop-blur border border-slate-700 text-xs font-mono px-2.5 py-1 rounded text-cyan-400">
                    {currentProduct.sku}
                  </span>
                  <span className="bg-blue-600 text-white font-bold text-sm px-3 py-1 rounded-lg shadow">
                    ${currentProduct.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">{currentProduct.name}</h3>
              <p className="text-xs text-slate-600 mb-6 line-clamp-2">{currentProduct.shortDescription}</p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSelectProduct(currentProduct)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-xs transition-colors text-center border border-slate-200"
                >
                  Full Technical Specs
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  <span>WhatsApp 0300-07430652</span>
                </button>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {featured.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${currentIndex === idx ? 'bg-blue-600 w-6' : 'bg-slate-200'}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
