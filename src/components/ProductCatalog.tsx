import React, { useState } from 'react';
import { Product, ProductCategory } from '../types';
import { Search, ShoppingCart, Heart, MessageSquare, Eye, Check, AlertCircle, Sparkles } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  onOpenMediaStudio: (product: Product) => void;
  wishlist: string[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  onOpenMediaStudio,
  wishlist,
  searchQuery,
  setSearchQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [stockFilter, setStockFilter] = useState<'All' | 'In Stock'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'CNC Lathes',
    'Turning Centers',
    'Milling & Boring',
    'Tooling & Inserts',
    'Spare Parts'
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStock = stockFilter === 'All' || p.stockStatus === 'In Stock';
    return matchesCategory && matchesSearch && matchesStock;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  const handleWhatsAppOrder = (p: Product) => {
    const text = encodeURIComponent(`Hello Mughalstech CNC Sales (0300-07430652), I want to order / request an official quotation for:\n\n• Model: ${p.name}\n• SKU: ${p.sku}\n• Price: $${p.price.toLocaleString()}\n• Stock Status: ${p.stockStatus}\n\nPlease confirm delivery timeline.`);
    window.open(`https://wa.me/9230007430652?text=${text}`, '_blank');
  };

  return (
    <section id="catalog" className="py-20 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="text-blue-600 font-mono text-xs uppercase tracking-wider font-bold">INDUSTRIAL MACHINERY & PRECISION TOOLING</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Complete Industrial Catalog & Inventory
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Engineered for high-volume manufacturing with certified factory inspection. Purchase spare parts directly or request official Proforma Invoices for heavy CNC machinery.
          </p>
        </div>

        <div className="bg-white border border-blue-100 rounded-3xl p-4 lg:p-6 mb-10 shadow-xl space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-blue-50">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Filter by keyword, SKU, model..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 shadow-inner"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => setStockFilter(stockFilter === 'All' ? 'In Stock' : 'All')}
                className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition-colors flex items-center gap-1.5 ${
                  stockFilter === 'In Stock'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Check className="w-3.5 h-3.5" /> Ready in Stock Only
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2.5 bg-slate-50 border border-blue-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-600"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-blue-100 shadow-sm">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">No machinery or tooling matches your filter</h3>
            <p className="text-xs text-slate-500 mb-4">Try clearing search terms or switching categories.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setStockFilter('All'); }}
              className="px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => {
              const isWishlisted = wishlist.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="rounded-3xl bg-white border border-blue-100 hover:border-blue-300 shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  <div className="relative h-60 bg-slate-900 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      <span className="bg-slate-950/90 backdrop-blur border border-slate-800 text-[11px] font-mono px-2.5 py-1 rounded-lg text-cyan-400 font-bold">
                        {product.sku}
                      </span>
                      {product.stockStatus === 'In Stock' ? (
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow">
                          Ready in Stock ({product.stockCount})
                        </span>
                      ) : (
                        <span className="bg-amber-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow">
                          {product.stockStatus}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); onOpenMediaStudio(product); }}
                        className="p-2.5 rounded-xl bg-slate-950/80 text-cyan-400 hover:bg-slate-900 transition-colors shadow"
                        title="AI Image Studio / Media Editor"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                        className={`p-2.5 rounded-xl backdrop-blur transition-colors ${
                          isWishlisted ? 'bg-blue-600 text-white' : 'bg-slate-950/80 text-white hover:bg-slate-900'
                        }`}
                        title="Save to Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-slate-950/90 backdrop-blur px-3.5 py-2 rounded-xl border border-slate-800 text-xs">
                      <span className="text-slate-300">{product.category}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-white font-extrabold text-sm">${product.price.toLocaleString()}</span>
                        {product.discountPrice && (
                          <span className="text-xs text-slate-400 line-through">${product.discountPrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="text-lg font-bold text-slate-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors line-clamp-1"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {product.shortDescription}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-50 p-3.5 rounded-2xl border border-blue-100">
                        <div>
                          <span className="text-slate-500 block">Turning / Table</span>
                          <span className="text-slate-900 font-bold">{product.specifications.maxTurningDiameter}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Spindle</span>
                          <span className="text-slate-900 font-bold">{product.specifications.spindleSpeed}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t border-blue-50">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
                        >
                          <Eye className="w-3.5 h-3.5" /> Specs & Gallery
                        </button>

                        <button
                          onClick={() => onAddToCart(product)}
                          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                          title="Add to Cart / Proforma"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" /> Add
                        </button>
                      </div>

                      <button
                        onClick={() => handleWhatsAppOrder(product)}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Order / Request Quote via WhatsApp</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
