import React, { useState } from 'react';
import { Product } from '../types';
import { X, Download, MessageSquare, ShoppingCart, Star } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart }) => {
  const [activeImage, setActiveImage] = useState(product.image);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  const handleDownloadPdf = () => {
    setDownloadingPdf(true);
    setTimeout(() => {
      setDownloadingPdf(false);
      setPdfDownloaded(true);
      const element = document.createElement("a");
      const file = new Blob([
        `MUGHALSTECH CNC HUB\nTECHNICAL SPECIFICATION SHEET\n\nModel: ${product.name}\nSKU: ${product.sku}\nCategory: ${product.category}\nPrice: $${product.price.toLocaleString()}\n\nSpecifications:\n- Max Turning Diameter: ${product.specifications.maxTurningDiameter}\n- Spindle Speed: ${product.specifications.spindleSpeed}\n- Chuck Size: ${product.specifications.chuckSize}\n- Bed Length: ${product.specifications.bedLength}\n- Motor Power: ${product.specifications.motorPower}\n- Weight: ${product.specifications.weight}\n- Control System: ${product.specifications.controlSystem}\n\nDescription:\n${product.fullDescription}\n\nCertified Factory Calibration: PASSED (ISO 9001)`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${product.sku}-Tech-Spec.txt`;
      document.body.appendChild(element);
      element.click();
    }, 1200);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(`Hello Mughalstech CNC Hub, I would like an official quotation and stock availability for:\n\n• ${product.name}\n• SKU: ${product.sku}\n• Price: $${product.price.toLocaleString()}\n\nPlease provide freight estimate.`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white border border-blue-100 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
          
          {/* Gallery Column */}
          <div className="p-6 bg-slate-50 border-r border-blue-100 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-blue-200 shadow-inner">
                <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur text-xs font-mono text-cyan-400 px-3 py-1 rounded-lg">
                  {product.sku}
                </div>
              </div>

              {product.gallery && product.gallery.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImage === img ? 'border-blue-600 scale-105' : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Download Spec Sheet Box */}
            <div className="mt-6 p-4 rounded-2xl bg-white border border-blue-200 flex items-center justify-between shadow-sm">
              <div>
                <div className="text-xs font-bold text-slate-900 mb-0.5">Official Spec Sheet (PDF)</div>
                <div className="text-[11px] text-slate-500">Includes laser calibration report</div>
              </div>
              <button
                onClick={handleDownloadPdf}
                disabled={downloadingPdf}
                className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors border border-blue-200"
              >
                <Download className="w-4 h-4" />
                <span>{downloadingPdf ? 'Generating...' : pdfDownloaded ? 'Downloaded!' : 'Download PDF'}</span>
              </button>
            </div>
          </div>

          {/* Details & Specifications Column */}
          <div className="p-6 lg:p-8 flex flex-col justify-between space-y-6 bg-white">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-blue-600 uppercase tracking-wider font-bold">{product.category}</span>
                <div className="flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-slate-500">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900">{product.name}</h2>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-slate-900">${product.price.toLocaleString()}</span>
                {product.discountPrice && (
                  <span className="text-sm text-slate-400 line-through">${product.discountPrice.toLocaleString()}</span>
                )}
                <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                  product.stockStatus === 'In Stock' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {product.stockStatus} ({product.stockCount} units)
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Specifications Table */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Technical Specifications</h4>
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-4 rounded-2xl border border-blue-100 font-mono">
                  <div>
                    <span className="text-slate-500 block">Turning Diameter</span>
                    <span className="text-slate-900 font-bold">{product.specifications.maxTurningDiameter}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Spindle Speed</span>
                    <span className="text-slate-900 font-bold">{product.specifications.spindleSpeed}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Chuck Size</span>
                    <span className="text-slate-900 font-bold">{product.specifications.chuckSize}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Bed Length</span>
                    <span className="text-slate-900 font-bold">{product.specifications.bedLength}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Motor Power</span>
                    <span className="text-slate-900 font-bold">{product.specifications.motorPower}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Control System</span>
                    <span className="text-slate-900 font-bold">{product.specifications.controlSystem}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="space-y-3 pt-4 border-t border-blue-100">
              <button
                onClick={() => { onAddToCart(product); onClose(); }}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart / Request Proforma</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Order or Request Custom Quote via WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
