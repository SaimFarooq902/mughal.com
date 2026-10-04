import React, { useState, useEffect } from 'react';
import { Product, CartItem, QuoteRequest, Order, CampaignLead, VideoReelItem } from './types';
import { INITIAL_PRODUCTS, INITIAL_VIDEO_REELS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroCarousel } from './components/HeroCarousel';
import { VideoReelsHub } from './components/VideoReelsHub';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { MediaStudioModal } from './components/MediaStudioModal';
import { CalendlyModal } from './components/CalendlyModal';
import { TrustAndTestimonials } from './components/TrustAndTestimonials';
import { VolumeDiscountCalculator } from './components/VolumeDiscountCalculator';
import { CartDrawer } from './components/CartDrawer';
import { CustomerPortalModal } from './components/CustomerPortalModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ExitIntentModal } from './components/ExitIntentModal';
import { LiveOrderToast } from './components/LiveOrderToast';
import { Footer } from './components/Footer';

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mughal_cnc_products_v4');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [reels, setReels] = useState<VideoReelItem[]>(() => {
    const saved = localStorage.getItem('mughal_cnc_reels_v4');
    return saved ? JSON.parse(saved) : INITIAL_VIDEO_REELS;
  });

  const [deviceId] = useState(() => {
    let id = localStorage.getItem('mughal_device_id');
    if (!id) {
      id = `dev-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('mughal_device_id', id);
    }
    return id;
  });

  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = localStorage.getItem('mughal_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mughal_cnc_cart_v4');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('mughal_cnc_wishlist_v4');
    return saved ? JSON.parse(saved) : [];
  });

  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>(() => {
    const saved = localStorage.getItem('mughal_cnc_quotes_v4');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('mughal_cnc_orders_v4');
    return saved ? JSON.parse(saved) : [];
  });

  const [demoBookings, setDemoBookings] = useState<any[]>(() => {
    const saved = localStorage.getItem('mughal_cnc_bookings_v4');
    return saved ? JSON.parse(saved) : [];
  });

  const [campaignLeads, setCampaignLeads] = useState<CampaignLead[]>(() => {
    const saved = localStorage.getItem('mughal_cnc_campaigns_v4');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mediaStudioProduct, setMediaStudioProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('mughal_cnc_products_v4', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('mughal_cnc_reels_v4', JSON.stringify(reels));
  }, [reels]);

  useEffect(() => {
    localStorage.setItem('mughal_cnc_cart_v4', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mughal_cnc_wishlist_v4', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('mughal_cnc_quotes_v4', JSON.stringify(quoteRequests));
  }, [quoteRequests]);

  useEffect(() => {
    localStorage.setItem('mughal_cnc_orders_v4', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('mughal_cnc_bookings_v4', JSON.stringify(demoBookings));
  }, [demoBookings]);

  useEffect(() => {
    localStorage.setItem('mughal_cnc_campaigns_v4', JSON.stringify(campaignLeads));
  }, [campaignLeads]);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleAddToCartWithQty = (product: Product, qty: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { product, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: qty } : item));
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleUpdateProductMedia = (productId: string, newImageUrl: string, newVideoUrl?: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, image: newImageUrl, videoUrl: newVideoUrl || p.videoUrl } : p));
  };

  const handleLikeReel = (reelId: string) => {
    let user = currentUser;
    if (!user) {
      const name = prompt("Please enter your name & company to sign up / log in and like video reels:");
      if (!name) return;
      user = { name, email: `${name.toLowerCase().replace(/\s+/g, '')}@factory.com` };
      setCurrentUser(user);
      localStorage.setItem('mughal_current_user', JSON.stringify(user));
    }

    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        const alreadyLiked = r.likesLog?.some(l => l.deviceId === deviceId);
        if (alreadyLiked) {
          alert("You have already liked this video from this device.");
          return r;
        }
        const newLike = { deviceId, userName: user?.name || 'Industrial Visitor', timestamp: new Date().toLocaleString() };
        return {
          ...r,
          likesCount: r.likesCount + 1,
          likesLog: [newLike, ...(r.likesLog || [])]
        };
      }
      return r;
    }));
  };

  const handleAddReel = (newReel: VideoReelItem) => {
    setReels(prev => [newReel, ...prev]);
  };

  const handleDeleteReel = (reelId: string) => {
    setReels(prev => prev.filter(r => r.id !== reelId));
  };

  const handleAddComment = (reelId: string, text: string) => {
    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        const newComment = { id: `comm-${Date.now()}`, user: 'Industrial Visitor', text, time: 'Just now' };
        return { ...r, comments: [newComment, ...r.comments] };
      }
      return r;
    }));
  };

  const handleAddCampaignLeads = (newLeads: CampaignLead[]) => {
    setCampaignLeads(prev => [...newLeads, ...prev]);
  };

  const handleUpdateLeadStatus = (leadId: string, status: CampaignLead['status']) => {
    setCampaignLeads(prev => prev.map(l => l.id === leadId ? { ...l, status } : l));
  };

  const handleUpdateQuoteStatus = (quoteId: string, status: QuoteRequest['status']) => {
    setQuoteRequests(prev => prev.map(q => q.id === quoteId ? { ...q, status } : q));
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const flagshipProduct = products[0] || INITIAL_PRODUCTS[0];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      
      <Navbar
        cart={cart}
        wishlist={wishlist}
        products={products}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsPortalOpen(true)}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenCalendly={() => setIsCalendlyOpen(true)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <HeroCarousel
        products={products}
        onExploreClick={() => {}}
        onOpenCalendly={() => setIsCalendlyOpen(true)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <VideoReelsHub
        reels={reels}
        onLikeReel={handleLikeReel}
        onAddComment={handleAddComment}
      />

      <ProductCatalog
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onOpenMediaStudio={(p) => setMediaStudioProduct(p)}
        wishlist={wishlist}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <VolumeDiscountCalculator
        products={products}
        onAddToCartWithQty={handleAddToCartWithQty}
      />

      <TrustAndTestimonials />

      <Footer />

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {mediaStudioProduct && (
        <MediaStudioModal
          product={mediaStudioProduct}
          isOpen={!!mediaStudioProduct}
          onClose={() => setMediaStudioProduct(null)}
          onUpdateProductMedia={handleUpdateProductMedia}
        />
      )}

      <CalendlyModal
        isOpen={isCalendlyOpen}
        onClose={() => setIsCalendlyOpen(false)}
        onBookDemo={(booking) => {
          setDemoBookings(prev => [booking, ...prev]);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCompleteOrder={(order) => {
          setOrders(prev => [order, ...prev]);
          setCart([]);
        }}
        onCompleteQuoteRequest={(quote) => {
          setQuoteRequests(prev => [quote, ...prev]);
          setCart([]);
        }}
      />

      <CustomerPortalModal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        wishlist={wishlist}
        products={products}
        quoteRequests={quoteRequests}
        orders={orders}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        reels={reels}
        onAddReel={handleAddReel}
        onDeleteReel={handleDeleteReel}
        quoteRequests={quoteRequests}
        orders={orders}
        demoBookings={demoBookings}
        campaignLeads={campaignLeads}
        onAddCampaignLeads={handleAddCampaignLeads}
        onUpdateLeadStatus={handleUpdateLeadStatus}
        onUpdateQuoteStatus={handleUpdateQuoteStatus}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      <ExitIntentModal />
      <LiveOrderToast />

    </div>
  );
}
