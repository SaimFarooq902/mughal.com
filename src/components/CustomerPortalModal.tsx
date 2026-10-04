import React, { useState } from 'react';
import { Product, QuoteRequest, Order } from '../types';
import { X, Heart, FileText, ShoppingCart, Headset, CheckCircle2, MessageSquare, Trash2 } from 'lucide-react';

interface CustomerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: string[];
  products: Product[];
  quoteRequests: QuoteRequest[];
  orders: Order[];
  onRemoveFromWishlist: (id: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const CustomerPortalModal: React.FC<CustomerPortalModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  products,
  quoteRequests,
  orders,
  onRemoveFromWishlist,
  onSelectProduct
}) => {
  const [activeTab, setActiveTab] = useState<'wishlist' | 'quotes' | 'orders' | 'support'>('wishlist');
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');

  if (!isOpen) return null;

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSupportSubmitted(true);
    setTimeout(() => {
      setSupportSubmitted(false);
      setSupportMessage('');
    }, 3000);
  };

  const handleWhatsAppSupport = () => {
    const text = encodeURIComponent("Hello Mughalstech Technical Support, I need assistance with machine calibration and spare parts.");
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white border border-blue-100 rounded-3xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[85vh]">
        
        <div className="p-6 bg-slate-50 border-b border-blue-100 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-900">B2B Customer Portal & Hub</h3>
            <p className="text-xs text-slate-500">Manage saved machinery, quotation history, and technical support</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-blue-100 bg-slate-50 px-6 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`py-3 px-5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'wishlist' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            Saved Machinery Wishlist ({wishlistedProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`py-3 px-5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'quotes' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            Quotation Requests ({quoteRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'orders' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            Order History ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`py-3 px-5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'support' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            Technical Support Drawer
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          
          {activeTab === 'wishlist' && (
            <div>
              {wishlistedProducts.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <Heart className="w-12 h-12 text-slate-300 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">Your wishlist is empty</h4>
                  <p className="text-xs text-slate-500">Click the heart icon on any CNC machine or tool to save it for review.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {wishlistedProducts.map(p => (
                    <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-blue-100 flex items-center justify-between gap-4">
                      <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-xl shrink-0 border border-slate-200" />
                      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => { onSelectProduct(p); onClose(); }}>
                        <h5 className="text-sm font-bold text-slate-900 truncate hover:text-blue-600">{p.name}</h5>
                        <p className="text-xs text-slate-500 font-mono">${p.price.toLocaleString()} · {p.stockStatus}</p>
                      </div>
                      <button
                        onClick={() => onRemoveFromWishlist(p.id)}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'quotes' && (
            <div className="space-y-4">
              {quoteRequests.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">No Proforma quotation requests yet</h4>
                  <p className="text-xs text-slate-500">Request a Proforma Invoice via the cart drawer for heavy CNC machines.</p>
                </div>
              ) : (
                quoteRequests.map(q => (
                  <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-blue-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-blue-600 font-bold">{q.id} · {q.date}</span>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">{q.status}</span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{q.productName}</h4>
                      <p className="text-xs text-slate-500 font-mono">SKU: {q.sku} · Quantity: {q.quantity} · Est. Total: ${q.totalEstimatedPrice.toLocaleString()}</p>
                    </div>
                    <div className="text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-blue-100">
                      Client: <strong>{q.clientName}</strong> ({q.companyName}, {q.city}) — Phone: {q.phone}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">No direct orders placed yet</h4>
                  <p className="text-xs text-slate-500">Spare parts and tooling orders will appear here after checkout.</p>
                </div>
              ) : (
                orders.map(o => (
                  <div key={o.id} className="p-5 rounded-2xl bg-slate-50 border border-blue-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-blue-600 font-bold">{o.id} · {o.date}</span>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{o.status}</span>
                    </div>
                    <div className="text-xs text-slate-700 font-mono">
                      Total: <strong>${o.totalAmount.toLocaleString()}</strong> ({o.paymentMethod}) · Ship to: {o.city}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'support' && (
            <div className="space-y-6 max-w-xl mx-auto py-4">
              <div className="text-center space-y-2">
                <Headset className="w-12 h-12 text-blue-600 mx-auto" />
                <h4 className="text-xl font-bold text-slate-900">Mughalstech Senior Engineering Support</h4>
                <p className="text-xs text-slate-500">Connect instantly with our mechanical and CNC control specialists.</p>
              </div>

              {supportSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="text-sm font-bold text-slate-900">Support Ticket Dispatched!</div>
                  <p className="text-xs text-slate-600">An engineer will call or WhatsApp you within 15 minutes.</p>
                </div>
              ) : (
                <form onSubmit={handleSupportSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-1 font-bold">Describe Machine or Tooling Issue</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="E.g., Fanuc alarm code SV0401 on Axis Z or spindle vibration inquiry..."
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-blue-200 rounded-2xl text-xs text-slate-900 font-medium"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs transition-colors shadow"
                    >
                      Submit Support Ticket
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsAppSupport}
                      className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs flex items-center gap-2 shadow"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Direct</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
