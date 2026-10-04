import React, { useState } from 'react';
import { Wrench, ShoppingCart, Heart, ShieldCheck, PhoneCall, Search, Menu, X, UserCheck, Lock, Calendar, Sparkles } from 'lucide-react';
import { CartItem, Product } from '../types';

interface NavbarProps {
  cart: CartItem[];
  wishlist: string[];
  products: Product[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenPortal: () => void;
  onOpenAdmin: () => void;
  onOpenCalendly: () => void;
  onSelectProduct: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cart,
  wishlist,
  products,
  onOpenCart,
  onOpenWishlist,
  onOpenPortal,
  onOpenAdmin,
  onOpenCalendly,
  onSelectProduct,
  searchQuery,
  setSearchQuery
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filteredSearchProducts = searchQuery.trim()
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleWhatsAppGlobal = () => {
    const text = encodeURIComponent("Hello Mughalstech CNC Hub Sales Team (0300-07430652), I would like to inquire about industrial CNC machinery and custom quotations.");
    window.open(`https://wa.me/9230007430652?text=${text}`, '_blank');
  };

  return (
    <>
      <div className="bg-slate-900 border-b border-slate-800 text-xs text-slate-300 px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
            <ShieldCheck className="w-4 h-4" /> ISO 9001:2015 Certified Factory Calibration
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-300">24/7 Global Engineering & On-Site Installation Support</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:030007430652" className="hover:text-cyan-400 transition-colors flex items-center gap-1 font-mono font-bold">
            <PhoneCall className="w-3.5 h-3.5" /> 0300-07430652
          </a>
          <button 
            onClick={onOpenAdmin}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs font-semibold transition-all shadow-sm"
          >
            <Lock className="w-3 h-3" /> Admin Portal
          </button>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900 block leading-tight">
                MUGHALSTECH <span className="text-blue-600">CNC HUB</span>
              </span>
              <span className="text-[10px] text-slate-500 tracking-wider font-mono uppercase block">Heavy Industrial Engineering</span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <a href="#catalog" className="hover:text-blue-600 transition-colors">Machinery</a>
            <a href="#reels" className="hover:text-blue-600 transition-colors">Video Reels</a>
            <a href="#calculator" className="hover:text-blue-600 transition-colors">Bulk Calculator</a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">Client Proof</a>
            <button onClick={onOpenCalendly} className="text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 font-bold">
              <Calendar className="w-4 h-4" /> Book Demo Call
            </button>
            <button onClick={onOpenPortal} className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-blue-600" /> Customer Hub
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block w-48 lg:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search lathe, spindle..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-blue-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 transition-colors shadow-inner"
              />

              {showSearchDropdown && filteredSearchProducts.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-blue-100 rounded-xl shadow-2xl py-2 z-50 max-h-80 overflow-y-auto">
                  {filteredSearchProducts.map(product => (
                    <button
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        setShowSearchDropdown(false);
                        setSearchQuery('');
                      }}
                      className="w-full px-4 py-2.5 text-left hover:bg-blue-50 flex items-center gap-3 transition-colors"
                    >
                      <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg border border-slate-200" />
                      <div className="overflow-hidden">
                        <div className="text-sm font-bold text-slate-900 truncate">{product.name}</div>
                        <div className="text-xs text-slate-500">{product.category} · ${product.price.toLocaleString()}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl bg-slate-50 border border-blue-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-sm"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-600 text-white font-bold text-xs rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-slate-50 border border-blue-200 text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-sm flex items-center gap-2"
              title="Shopping Cart & Proforma"
            >
              <ShoppingCart className="w-5 h-5 text-blue-600" />
              <span className="hidden sm:inline font-bold text-sm">Cart</span>
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-600 text-white font-bold text-xs rounded-full flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>

            <button
              onClick={handleWhatsAppGlobal}
              className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition-all whitespace-nowrap"
            >
              <span>WhatsApp 0300-07430652</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-50 border border-blue-200 text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-blue-100 flex flex-col gap-3 animate-fadeIn bg-white p-4 rounded-2xl shadow-xl">
            <div className="relative w-full mb-2">
              <input
                type="text"
                placeholder="Search machinery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-blue-200 rounded-xl text-sm text-slate-900"
              />
            </div>
            <a href="#catalog" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-blue-50 text-sm font-semibold">Machinery & Tooling</a>
            <a href="#reels" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-blue-50 text-sm font-semibold">Video Reels</a>
            <button onClick={() => { onOpenCalendly(); setMobileMenuOpen(false); }} className="px-3 py-2 text-left rounded-lg hover:bg-blue-50 text-sm font-bold text-blue-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Schedule Live Demo Call
            </button>
            <button onClick={() => { onOpenPortal(); setMobileMenuOpen(false); }} className="px-3 py-2 text-left rounded-lg hover:bg-blue-50 text-sm font-semibold flex items-center gap-2 text-blue-600">
              <UserCheck className="w-4 h-4" /> Customer Hub
            </button>
            <button onClick={handleWhatsAppGlobal} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold text-center">
              WhatsApp: 0300-07430652
            </button>
          </div>
        )}
      </header>
    </>
  );
};
