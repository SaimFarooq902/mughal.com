import React, { useState } from 'react';
import { CartItem, Order, QuoteRequest } from '../types';
import { X, Trash2, Plus, Minus, ShoppingCart, CheckCircle2, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onCompleteOrder: (order: Order) => void;
  onCompleteQuoteRequest: (quote: QuoteRequest) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCompleteOrder,
  onCompleteQuoteRequest
}) => {
  const [checkoutMode, setCheckoutMode] = useState<'cart' | 'proforma'>('cart');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Bank Transfer' | 'Proforma Invoice'>('Bank Transfer');
  const [customRequirements, setCustomRequirements] = useState('');

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [successDetails, setSuccessDetails] = useState<{ id: string; type: 'order' | 'quote' } | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.product.discountPrice || item.product.price) * item.quantity, 0);
  const discountAmt = (subtotal * discountPercent) / 100;
  const grandTotal = subtotal - discountAmt;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'APEX5' || couponCode.toUpperCase() === 'VIP5') {
      setDiscountPercent(5);
      setCouponApplied(true);
      setCouponError('');
    } else if (couponCode.toUpperCase() === 'VIP15') {
      setDiscountPercent(15);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try APEX5 or VIP15');
    }
  };

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (checkoutMode === 'proforma') {
      const newQuote: QuoteRequest = {
        id: `QT-${Math.floor(100000 + Math.random() * 900000)}`,
        productId: cart[0].product.id,
        productName: cart[0].product.name,
        sku: cart[0].product.sku,
        clientName,
        companyName,
        email,
        phone,
        city,
        quantity: cart[0].quantity,
        customRequirements,
        status: 'Pending Quote',
        date: new Date().toLocaleDateString(),
        totalEstimatedPrice: grandTotal
      };
      onCompleteQuoteRequest(newQuote);
      setSuccessDetails({ id: newQuote.id, type: 'quote' });
      setOrderSuccess(true);
    } else {
      const newOrder: Order = {
        id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cart],
        customerName: clientName,
        companyName,
        email,
        phone,
        address,
        city,
        paymentMethod,
        totalAmount: grandTotal,
        status: 'Pending',
        date: new Date().toLocaleDateString()
      };
      onCompleteOrder(newOrder);
      setSuccessDetails({ id: newOrder.id, type: 'order' });
      setOrderSuccess(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white border-l border-blue-100 shadow-2xl flex flex-col justify-between">
          
          <div className="p-6 bg-slate-50 border-b border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">Cart & Proforma Quotation</h3>
                <p className="text-xs text-slate-500">{cart.length} item(s) selected</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {orderSuccess ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-300">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {successDetails?.type === 'quote' ? 'Official Proforma Quote Requested!' : 'Order Placed Successfully!'}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Reference ID: <strong className="text-blue-600">{successDetails?.id}</strong>. Our engineering sales manager will contact you shortly with shipping and calibration details.
                </p>
                <button
                  onClick={() => { setOrderSuccess(false); onClose(); }}
                  className="px-6 py-3 bg-blue-600 text-white font-bold text-xs rounded-xl shadow"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Your cart or quotation list is empty</h4>
                <p className="text-xs text-slate-500">Browse our heavy CNC machinery and tooling catalog to add items.</p>
                <button onClick={onClose} className="px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow">
                  Explore Machinery
                </button>
              </div>
            ) : (
              <>
                <div className="flex rounded-2xl bg-slate-100 p-1 border border-blue-100">
                  <button
                    onClick={() => setCheckoutMode('cart')}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-colors ${checkoutMode === 'cart' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Direct Checkout (Parts & Spares)
                  </button>
                  <button
                    onClick={() => setCheckoutMode('proforma')}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-colors ${checkoutMode === 'proforma' ? 'bg-blue-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Request Official Proforma Invoice
                  </button>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Selected Items</h4>
                  {cart.map(item => {
                    const price = item.product.discountPrice || item.product.price;
                    return (
                      <div key={item.product.id} className="p-4 rounded-2xl bg-slate-50 border border-blue-100 flex items-center justify-between gap-4">
                        <img src={item.product.image} alt={item.product.name} className="w-14 h-14 object-cover rounded-xl shrink-0 border border-slate-200" />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-bold text-slate-950 truncate">{item.product.name}</h5>
                          <p className="text-xs text-slate-500 font-mono">${price.toLocaleString()} × {item.quantity}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-slate-300 rounded-xl bg-white">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1.5 text-slate-600 hover:text-slate-900"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-slate-900 font-mono">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1.5 text-slate-600 hover:text-slate-900"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. APEX5 or VIP5)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900 font-bold"
                  />
                  <button type="submit" className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold">
                    Apply
                  </button>
                </form>
                {couponApplied && <p className="text-xs text-emerald-600 font-bold">Coupon applied successfully! ({discountPercent}% OFF)</p>}
                {couponError && <p className="text-xs text-red-500 font-bold">{couponError}</p>}

                <div className="bg-slate-50 p-4 rounded-2xl border border-blue-100 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-mono text-slate-950 font-bold">${subtotal.toLocaleString()}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount ({discountPercent}%):</span>
                      <span className="font-mono">-${discountAmt.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-blue-200 flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-900">Total Estimated Amount:</span>
                    <span className="text-blue-600 font-mono text-lg font-extrabold">${grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmitCheckout} className="space-y-4 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                    {checkoutMode === 'proforma' ? 'Company & Proforma Details' : 'Delivery & Contact Details'}
                  </h4>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ing. Saim Farooq"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Company / Workshop Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Mughal Precision Works"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="saim@mughaltech.pk"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 5550199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1 font-semibold">City / Country *</label>
                      <input
                        type="text"
                        required
                        placeholder="Lahore, Pakistan"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Payment Preference</label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900 font-bold"
                      >
                        <option value="Bank Transfer">Direct Bank Wire (TT)</option>
                        <option value="Proforma Invoice">Official Proforma Invoice</option>
                        <option value="COD">Cash on Delivery (Parts)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-600 mb-1 font-semibold">Delivery Address & Special Requirements</label>
                    <textarea
                      rows={2}
                      placeholder="Specify loading dock requirements or custom tooling configurations..."
                      value={customRequirements}
                      onChange={(e) => setCustomRequirements(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
                  >
                    <span>{checkoutMode === 'proforma' ? 'Submit Official Proforma Request' : 'Complete Secure Order'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
