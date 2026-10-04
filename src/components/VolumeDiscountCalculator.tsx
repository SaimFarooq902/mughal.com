import React, { useState } from 'react';
import { Calculator, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';

interface VolumeDiscountCalculatorProps {
  products: Product[];
  onAddToCartWithQty: (product: Product, qty: number) => void;
}

export const VolumeDiscountCalculator: React.FC<VolumeDiscountCalculatorProps> = ({ products, onAddToCartWithQty }) => {
  const spareParts = products.filter(p => p.category === 'Tooling & Inserts' || p.category === 'Spare Parts');
  const [selectedPartId, setSelectedPartId] = useState(spareParts[0]?.id || products[0]?.id);
  const [quantity, setQuantity] = useState(15);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const selectedProduct = products.find(p => p.id === selectedPartId) || products[0];

  let discountPercent = 0;
  if (quantity >= 25) discountPercent = 20;
  else if (quantity >= 10) discountPercent = 15;
  else if (quantity >= 5) discountPercent = 10;

  const unitPrice = selectedProduct.price;
  const subtotal = unitPrice * quantity;
  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = subtotal - discountAmount;

  const handleAddBulkToCart = () => {
    onAddToCartWithQty(selectedProduct, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  return (
    <section id="calculator" className="py-20 bg-slate-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold">
              <Calculator className="w-3.5 h-3.5" /> B2B BULK TOOLING & SPARES SAVINGS
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Bulk Volume Discount Calculator for Workshops & Factories
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Stock up your CNC tool magazine with premium carbide inserts and hydraulic chuck spares. Enjoy automated tier discounts calculated instantly on bulk orders.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">✓</div>
                <span><strong>5+ units:</strong> 10% Instant Workshop Discount</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">✓</div>
                <span><strong>10+ units:</strong> 15% Bulk Fleet Discount</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0">✓</div>
                <span><strong>25+ units:</strong> 20% Enterprise Distributor Rate</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-white border border-blue-100 shadow-2xl space-y-6">
              
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-bold">Select Spare Part or Tooling</label>
                <select
                  value={selectedPartId}
                  onChange={(e) => setSelectedPartId(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-blue-200 rounded-2xl text-sm text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                >
                  {spareParts.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (${p.price.toLocaleString()} / unit)</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Order Quantity</label>
                  <span className="text-lg font-extrabold text-blue-600 font-mono">{quantity} Units</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                  <span>1 unit</span>
                  <span>10 (15% Off)</span>
                  <span>25+ (20% Off)</span>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-blue-100 space-y-3">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Base Unit Price:</span>
                  <span className="font-mono text-slate-900 font-bold">${unitPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Subtotal ({quantity} units):</span>
                  <span className="font-mono text-slate-900 font-bold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-emerald-700 font-bold">
                  <span>Bulk Discount Applied ({discountPercent}%):</span>
                  <span className="font-mono">-${discountAmount.toLocaleString()}</span>
                </div>
                <div className="pt-3 border-t border-blue-100 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">Total Estimated Cost:</span>
                  <span className="text-xl font-extrabold text-blue-600 font-mono">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleAddBulkToCart}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm transition-all shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span>Added {quantity} Units to Cart with {discountPercent}% Discount!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add Bulk Order to Cart ($ {finalTotal.toLocaleString()})</span>
                  </>
                )}
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
