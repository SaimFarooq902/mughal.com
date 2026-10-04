import React, { useState } from 'react';
import { Product, QuoteRequest, Order, ProductCategory, B2BLead, CampaignLead, VideoReelItem } from '../types';
import { X, Lock, Plus, Trash2, Search, Download, MapPin, Phone, Globe, Star, Key, Calendar, Video, CheckCircle2, Bot } from 'lucide-react';
import { AutonomousCampaignConsole } from './AutonomousCampaignConsole';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  reels: VideoReelItem[];
  onAddReel: (reel: VideoReelItem) => void;
  onDeleteReel: (reelId: string) => void;
  quoteRequests: QuoteRequest[];
  orders: Order[];
  demoBookings: { id: string; clientName: string; email: string; phone: string; date: string; time: string; machineInterest: string }[];
  campaignLeads: CampaignLead[];
  onAddCampaignLeads: (leads: CampaignLead[]) => void;
  onUpdateLeadStatus: (leadId: string, status: CampaignLead['status']) => void;
  onUpdateQuoteStatus: (quoteId: string, status: QuoteRequest['status']) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  reels,
  onAddReel,
  onDeleteReel,
  quoteRequests,
  orders,
  demoBookings,
  campaignLeads,
  onAddCampaignLeads,
  onUpdateLeadStatus,
  onUpdateQuoteStatus,
  onUpdateOrderStatus
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'inventory' | 'campaigns' | 'leads' | 'reels' | 'crm' | 'orders' | 'settings'>('campaigns');

  const [mapsApiKey, setMapsApiKey] = useState(() => localStorage.getItem('mughal_gmaps_api_key') || '');
  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('mughal_gemini_api_key') || '');
  const [keySavedMessage, setKeySavedMessage] = useState(false);

  const [searchCity, setSearchCity] = useState('Gujranwala');
  const [searchCategory, setSearchCategory] = useState('Auto Parts Manufacturers');
  const [discoveredLeads, setDiscoveredLeads] = useState<B2BLead[]>([]);
  const [isSearchingLeads, setIsSearchingLeads] = useState(false);
  const [outreachCrm, setOutreachCrm] = useState<B2BLead[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('CNC Lathes');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState(45000);
  const [stockStatus, setStockStatus] = useState<Product['stockStatus']>('In Stock');
  const [stockCount, setStockCount] = useState(5);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1565043669-37f2251a3765?auto=format&fit=crop&w=1000&q=80');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');

  // Reel creator state
  const [isAddingReel, setIsAddingReel] = useState(false);
  const [reelTitle, setReelTitle] = useState('');
  const [reelVideoUrl, setReelVideoUrl] = useState('');
  const [reelThumbUrl, setReelThumbUrl] = useState('');
  const [reelMachineModel, setReelMachineModel] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode === '1632' || pinCode === 'admin') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleCreateReel = (e: React.FormEvent) => {
    e.preventDefault();
    const newReel: VideoReelItem = {
      id: `reel-${Date.now()}`,
      title: reelTitle,
      videoUrl: reelVideoUrl || 'https://assets.mixkit.co/videos/preview/mixkit-machining-process-with-a-cnc-machine-42861-large.mp4',
      thumbnailUrl: reelThumbUrl || 'https://images.unsplash.com/photo-1565043669-37f2251a3765?auto=format&fit=crop&w=600&q=80',
      viewsCount: 1,
      likesCount: 0,
      machineModel: reelMachineModel || 'Apex-X400 CNC Lathe',
      viewsLog: [{ deviceId: 'dev-admin', userName: 'Admin', timestamp: new Date().toLocaleString() }],
      likesLog: [],
      comments: []
    };
    onAddReel(newReel);
    setIsAddingReel(false);
    setReelTitle('');
    setReelVideoUrl('');
    setReelThumbUrl('');
    setReelMachineModel('');
  };

  const handleSaveApiKeys = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('mughal_gmaps_api_key', mapsApiKey.trim());
    localStorage.setItem('mughal_gemini_api_key', geminiApiKey.trim());
    setKeySavedMessage(true);
    setTimeout(() => setKeySavedMessage(false), 3000);
  };

  const handleFetchLeads = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchingLeads(true);
    try {
      const currentMapsKey = localStorage.getItem('mughal_gmaps_api_key') || '';
      const currentGeminiKey = localStorage.getItem('mughal_gemini_api_key') || '';
      const res = await fetch('/api/leads/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: searchCity, category: searchCategory, mapsApiKey: currentMapsKey, geminiApiKey: currentGeminiKey })
      });
      const data = await res.json();
      if (data.success && data.leads) {
        setDiscoveredLeads(data.leads);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setIsSearchingLeads(false);
    }
  };

  const handleAddToCrm = (lead: B2BLead) => {
    if (!outreachCrm.some(l => l.id === lead.id)) {
      setOutreachCrm(prev => [...prev, { ...lead, status: 'Contacted' }]);
    }
  };

  const handleExportCsv = () => {
    const headers = "Name,City,Address,Phone,Website,Rating,Reviews,Status\n";
    const rows = discoveredLeads.map(l => `"${l.name}","${l.city}","${l.address}","${l.phone}","${l.website}",${l.rating},${l.reviewsCount},"${l.status}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `B2B_Leads_${searchCity}_${searchCategory.replace(/\s+/g, '_')}.csv`;
    a.click();
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name,
      category,
      sku: sku || `MUGHAL-${Math.floor(1000 + Math.random() * 9000)}`,
      price,
      stockStatus,
      stockCount,
      rating: 5.0,
      reviewsCount: 1,
      image,
      gallery: [image],
      shortDescription: shortDescription || 'High performance CNC machine engineered for precision industrial manufacturing.',
      fullDescription: fullDescription || 'Heavy duty construction with advanced digital controls and laser calibration certificate.',
      specifications: {
        maxTurningDiameter: 'Ø 400 mm',
        spindleSpeed: '3,000 RPM',
        chuckSize: '10 inch',
        bedLength: '1,000 mm',
        motorPower: '15 kW',
        weight: '4,200 kg',
        controlSystem: 'Fanuc 0i-TF'
      },
      isFeatured: false
    };
    onAddProduct(newProd);
    setIsAdding(false);
    setName('');
    setSku('');
    setShortDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-6xl bg-white border border-blue-100 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        <div className="p-6 bg-slate-50 border-b border-blue-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-bold text-slate-900">Admin Portal & Autonomous Campaign Engine</h3>
              <p className="text-xs text-slate-500">Secure Administrator Session</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="p-12 max-w-md mx-auto my-auto text-center space-y-6 bg-white">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-slate-900">Restricted Administrator Access</h4>
              <p className="text-xs text-slate-500">Enter secure PIN code to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                maxLength={4}
                placeholder="••••"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full px-4 py-3.5 bg-slate-50 border border-blue-200 rounded-2xl text-center text-2xl font-mono text-slate-900 tracking-widest focus:outline-none focus:border-blue-600 shadow-inner"
              />
              {authError && <p className="text-xs text-red-500 font-bold">Invalid PIN code. Access denied.</p>}
              <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs transition-colors shadow-lg shadow-blue-600/25"
              >
                Authenticate Admin Session
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden">
            
            <div className="flex border-b border-blue-100 bg-slate-50 px-6 shrink-0 overflow-x-auto">
              <button
                onClick={() => setActiveTab('campaigns')}
                className={`py-3 px-5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'campaigns' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
              >
                Autonomous Campaigns 🤖 ({campaignLeads.length})
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`py-3 px-5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'inventory' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
              >
                Inventory Management ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('reels')}
                className={`py-3 px-5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'reels' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
              >
                Video Reels & Analytics 🎬 ({reels.length})
              </button>
              <button
                onClick={() => setActiveTab('leads')}
                className={`py-3 px-5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'leads' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
              >
                Real-Time B2B Lead Finder 🚀
              </button>
              <button
                onClick={() => setActiveTab('crm')}
                className={`py-3 px-5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'crm' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
              >
                Outreach CRM Pipeline ({outreachCrm.length})
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-3 px-5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'orders' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
              >
                Orders & Demo Calls ({quoteRequests.length + demoBookings.length})
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-3 px-5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'settings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
              >
                API Key Settings ⚙️
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
              
              {activeTab === 'campaigns' && (
                <AutonomousCampaignConsole
                  campaignLeads={campaignLeads}
                  onAddCampaignLeads={onAddCampaignLeads}
                  onUpdateLeadStatus={onUpdateLeadStatus}
                />
              )}

              {activeTab === 'reels' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">Video Reels & Real-Time Analytics</h4>
                      <p className="text-xs text-slate-500">Manage industrial video reels and inspect real-time viewer and liker telemetry logs.</p>
                    </div>
                    <button
                      onClick={() => setIsAddingReel(true)}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                    >
                      <Plus className="w-4 h-4" /> Add Video Reel
                    </button>
                  </div>

                  {isAddingReel && (
                    <form onSubmit={handleCreateReel} className="p-6 rounded-3xl bg-slate-50 border border-blue-100 space-y-4 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-sm font-bold text-slate-900">New Video Reel Details</h5>
                        <button type="button" onClick={() => setIsAddingReel(false)} className="text-slate-500 hover:text-slate-900">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-600 mb-1 font-semibold">Reel Title *</label>
                          <input
                            type="text" required
                            placeholder="Precision Turning Live Demo"
                            value={reelTitle} onChange={(e) => setReelTitle(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-xl text-xs text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-600 mb-1 font-semibold">Machine Model *</label>
                          <input
                            type="text" required
                            placeholder="Apex-X400 CNC Lathe"
                            value={reelMachineModel} onChange={(e) => setReelMachineModel(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-xl text-xs text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-slate-600 mb-1 font-semibold">Video MP4 URL *</label>
                          <input
                            type="url" required
                            placeholder="https://assets.mixkit.co/.../video.mp4"
                            value={reelVideoUrl} onChange={(e) => setReelVideoUrl(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-xl text-xs text-slate-900 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-600 mb-1 font-semibold">Thumbnail Image URL *</label>
                          <input
                            type="url" required
                            placeholder="https://images.unsplash.com/..."
                            value={reelThumbUrl} onChange={(e) => setReelThumbUrl(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-xl text-xs text-slate-900"
                          />
                        </div>
                      </div>

                      <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl text-xs shadow">
                        Publish Reel to Live Hub
                      </button>
                    </form>
                  )}

                  <div className="space-y-4">
                    {reels.map(reel => (
                      <div key={reel.id} className="p-5 rounded-3xl bg-slate-50 border border-blue-100 space-y-4 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <img src={reel.thumbnailUrl} alt={reel.title} className="w-16 h-16 object-cover rounded-2xl border border-slate-200 shrink-0" />
                            <div>
                              <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">{reel.machineModel}</span>
                              <h5 className="text-base font-bold text-slate-900 mt-1">{reel.title}</h5>
                              <p className="text-xs text-slate-500 font-mono mt-0.5">Views: {reel.viewsCount} · Likes: {reel.likesCount}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => onDeleteReel(reel.id)}
                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                            title="Delete Reel"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-blue-100 text-xs">
                          <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                            <div className="font-bold text-slate-900">👁️ Viewers Log ({reel.viewsLog?.length || 0})</div>
                            <div className="max-h-24 overflow-y-auto space-y-1 font-mono text-[11px] text-slate-600">
                              {reel.viewsLog?.map((v: { userName?: string; deviceId: string; timestamp: string }, i: number) => (
                                <div key={i} className="flex justify-between">
                                  <span>{v.userName || 'Visitor'} ({v.deviceId.substring(0, 8)})</span>
                                  <span className="text-slate-400">{v.timestamp}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                            <div className="font-bold text-slate-900">❤️ Likers Log ({reel.likesLog?.length || 0})</div>
                            <div className="max-h-24 overflow-y-auto space-y-1 font-mono text-[11px] text-slate-600">
                              {reel.likesLog?.length === 0 ? (
                                <span className="text-slate-400 italic">No likes recorded yet from devices.</span>
                              ) : (
                                reel.likesLog?.map((l: { userName?: string; deviceId: string; timestamp: string }, i: number) => (
                                  <div key={i} className="flex justify-between">
                                    <span className="text-blue-600 font-bold">{l.userName || 'User'}</span>
                                    <span className="text-slate-400">{l.timestamp}</span>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'inventory' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Machinery & Tooling Inventory</h4>
                    <button
                      onClick={() => setIsAdding(true)}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                    >
                      <Plus className="w-4 h-4" /> Add New Machinery
                    </button>
                  </div>

                  {isAdding && (
                    <form onSubmit={handleCreateProduct} className="p-6 rounded-3xl bg-slate-50 border border-blue-100 space-y-4 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-sm font-bold text-slate-900">New Machinery Specifications</h5>
                        <button type="button" onClick={() => setIsAdding(false)} className="text-slate-500 hover:text-slate-900">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs text-slate-600 mb-1 font-semibold">Machine Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Mughal-X500 Slant Bed Lathe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-xl text-xs text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-600 mb-1 font-semibold">Category *</label>
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as ProductCategory)}
                            className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-xl text-xs text-slate-900 font-bold"
                          >
                            <option value="CNC Lathes">CNC Lathes</option>
                            <option value="Turning Centers">Turning Centers</option>
                            <option value="Milling & Boring">Milling & Boring</option>
                            <option value="Tooling & Inserts">Tooling & Inserts</option>
                            <option value="Spare Parts">Spare Parts</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-slate-600 mb-1 font-semibold">SKU Code *</label>
                          <input
                            type="text"
                            required
                            placeholder="MUGHAL-X500"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-xl text-xs text-slate-900"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs text-slate-600 mb-1 font-semibold">Price ($ USD) *</label>
                          <input
                            type="number"
                            required
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-xl text-xs text-slate-900"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-600 mb-1 font-semibold">Stock Status *</label>
                          <select
                            value={stockStatus}
                            onChange={(e) => setStockStatus(e.target.value as any)}
                            className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-xl text-xs text-slate-900 font-bold"
                          >
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Made to Order">Made to Order</option>
                            <option value="Sold Out">Sold Out</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-slate-600 mb-1 font-semibold">Stock Count *</label>
                          <input
                            type="number"
                            value={stockCount}
                            onChange={(e) => setStockCount(Number(e.target.value))}
                            className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-xl text-xs text-slate-900"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-semibold">Image URL *</label>
                        <input
                          type="url"
                          required
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-xl text-xs text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-slate-600 mb-1 font-semibold">Short Description *</label>
                        <input
                          type="text"
                          required
                          value={shortDescription}
                          onChange={(e) => setShortDescription(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-xl text-xs text-slate-900"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl text-xs shadow"
                      >
                        Save & Publish Machine to Catalog
                      </button>
                    </form>
                  )}

                  <div className="rounded-2xl bg-white border border-blue-100 overflow-x-auto shadow-sm">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 uppercase font-mono border-b border-blue-100">
                        <tr>
                          <th className="p-3.5">Machine / Item</th>
                          <th className="p-3.5">SKU</th>
                          <th className="p-3.5">Category</th>
                          <th className="p-3.5">Price</th>
                          <th className="p-3.5">Stock Status</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-blue-50 text-slate-700">
                        {products.map(p => (
                          <tr key={p.id} className="hover:bg-blue-50/50">
                            <td className="p-3.5 flex items-center gap-3">
                              <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-xl border border-slate-200" />
                              <span className="font-bold text-slate-900">{p.name}</span>
                            </td>
                            <td className="p-3.5 font-mono text-blue-600 font-bold">{p.sku}</td>
                            <td className="p-3.5">{p.category}</td>
                            <td className="p-3.5 font-mono font-bold">${p.price.toLocaleString()}</td>
                            <td className="p-3.5">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {p.stockStatus} ({p.stockCount})
                              </span>
                            </td>
                            <td className="p-3.5 text-right">
                              <button
                                onClick={() => onDeleteProduct(p.id)}
                                className="p-2 text-red-500 hover:text-red-700 transition-colors"
                                title="Delete Machine"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'leads' && (
                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-slate-50 border border-blue-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-bold text-slate-900">Real-Time B2B Lead Finder & Google Places API</h4>
                        <p className="text-xs text-slate-500">Scan local manufacturing plants, auto parts makers, and precision workshops via live Places API / Gemini backend proxy.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewMode('list')}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${viewMode === 'list' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300'}`}
                        >
                          List View
                        </button>
                        <button
                          onClick={() => setViewMode('map')}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${viewMode === 'map' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300'}`}
                        >
                          Map View Simulator
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleFetchLeads} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1 font-bold">Target City</label>
                        <select
                          value={searchCity}
                          onChange={(e) => setSearchCity(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                        >
                          <option value="Gujranwala">Gujranwala</option>
                          <option value="Lahore">Lahore</option>
                          <option value="Sialkot">Sialkot</option>
                          <option value="Faisalabad">Faisalabad</option>
                          <option value="Karachi">Karachi</option>
                          <option value="Rawalpindi">Rawalpindi</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1 font-bold">Business Category</label>
                        <select
                          value={searchCategory}
                          onChange={(e) => setSearchCategory(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                        >
                          <option value="Auto Parts Manufacturers">Auto Parts Manufacturers</option>
                          <option value="Plastic Die Casting">Plastic Die Casting</option>
                          <option value="Pump Manufacturers">Pump Manufacturers</option>
                          <option value="Precision Machine Shops">Precision Machine Shops</option>
                        </select>
                      </div>

                      <div className="flex items-end">
                        <button
                          type="submit"
                          disabled={isSearchingLeads}
                          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
                        >
                          <Search className="w-4 h-4" />
                          <span>{isSearchingLeads ? 'Querying Places API...' : 'Search B2B Leads'}</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  {discoveredLeads.length > 0 && (
                    <div className="flex justify-between items-center px-2">
                      <span className="text-xs font-bold text-slate-700">Discovered <strong className="text-blue-600">{discoveredLeads.length}</strong> active industrial prospects in {searchCity}</span>
                      <button
                        onClick={handleExportCsv}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                      >
                        <Download className="w-3.5 h-3.5" /> Export Leads to CSV
                      </button>
                    </div>
                  )}

                  {viewMode === 'map' ? (
                    <div className="p-8 rounded-3xl bg-slate-900 text-white text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-blue-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30">
                        <MapPin className="w-8 h-8 animate-bounce" />
                      </div>
                      <h4 className="text-xl font-bold">Interactive Industrial Map Grid ({searchCity})</h4>
                      <p className="text-xs text-slate-400 max-w-md mx-auto">
                        Displaying {discoveredLeads.length} active GPS-pinned machine shops & manufacturing plants in {searchCity} industrial zones.
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 max-w-2xl mx-auto">
                        {discoveredLeads.map(l => (
                          <div key={l.id} className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-left">
                            <div className="text-xs font-bold text-cyan-400 truncate">{l.name}</div>
                            <div className="text-[10px] text-slate-400 truncate">{l.address}</div>
                            <div className="text-[10px] text-emerald-400 mt-1 font-mono">{l.phone}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {discoveredLeads.map(lead => (
                        <div key={lead.id} className="p-5 rounded-3xl bg-slate-50 border border-blue-100 space-y-3 shadow-sm hover:border-blue-300 transition-colors">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">{searchCategory}</span>
                              <h5 className="text-base font-bold text-slate-900 mt-1">{lead.name}</h5>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                              <span className="font-bold">{lead.rating}</span>
                              <span className="text-slate-400">({lead.reviewsCount})</span>
                            </div>
                          </div>

                          <div className="space-y-1 text-xs text-slate-600">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">{lead.address}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="font-mono font-bold text-slate-800">{lead.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <a href={lead.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate">{lead.website}</a>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-blue-100">
                            <a
                              href={`https://wa.me/9230007430652?text=Hello%20${encodeURIComponent(lead.name)},%20we%20are%20reaching%20out%20from%20Mughalstech%20CNC%20Hub%20(0300-07430652)%20regarding%20heavy%20lathe%20machines.`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs text-center shadow-sm"
                            >
                              WhatsApp Outreach (030007430652)
                            </a>
                            <button
                              onClick={() => handleAddToCrm(lead)}
                              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm"
                            >
                              Add to CRM
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'crm' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Outreach CRM Pipeline ({outreachCrm.length} queued)</h4>
                  {outreachCrm.length === 0 ? (
                    <div className="text-center py-16 text-slate-500">
                      <p className="text-sm">No leads added to CRM outreach yet.</p>
                      <p className="text-xs mt-1">Go to the B2B Lead Finder tab and click "Add to CRM" on any discovered factory.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {outreachCrm.map(lead => (
                        <div key={lead.id} className="p-4 rounded-2xl bg-slate-50 border border-blue-100 flex items-center justify-between gap-4">
                          <div>
                            <h5 className="text-sm font-bold text-slate-900">{lead.name}</h5>
                            <p className="text-xs text-slate-500">{lead.city} · {lead.phone} · {lead.website}</p>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                            Status: {lead.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Scheduled Live Video Demo & Factory Calls ({demoBookings.length})</h4>
                    {demoBookings.length === 0 ? (
                      <p className="text-xs text-slate-500">No Calendly video demo calls booked yet.</p>
                    ) : (
                      <div className="space-y-3 mb-8">
                        {demoBookings.map(b => (
                          <div key={b.id} className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 flex items-center justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">{b.id}</span>
                                <span className="text-xs font-bold text-slate-900">{b.date} at {b.time}</span>
                              </div>
                              <h5 className="text-sm font-bold text-slate-900">{b.clientName} ({b.machineInterest})</h5>
                              <p className="text-xs text-slate-600">Email: {b.email} · Phone: {b.phone}</p>
                            </div>
                            <a
                              href={`https://wa.me/9230007430652?text=Hello%20${encodeURIComponent(b.clientName)},%20confirming%20your%20video%20demo%20call%20for%20${b.machineInterest}%20on%20${b.date}%20at%20${b.time}.`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
                            >
                              <Video className="w-4 h-4" /> Join Video Call
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Incoming Web & WhatsApp Orders</h4>
                  {quoteRequests.map(q => (
                    <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-blue-100 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-blue-600 font-bold">{q.id} · {q.date}</span>
                        <select
                          value={q.status}
                          onChange={(e) => onUpdateQuoteStatus(q.id, e.target.value as any)}
                          className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs text-blue-600 font-bold"
                        >
                          <option value="Pending Quote">Pending Quote</option>
                          <option value="Quote Sent">Quote Sent</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Installed">Installed</option>
                        </select>
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">{q.productName} (Qty: {q.quantity})</h4>
                        <p className="text-xs text-slate-600 font-mono">Client: {q.clientName} ({q.companyName}, {q.city}) — Phone: {q.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-xl mx-auto py-4">
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Key className="w-5 h-5 text-blue-600" /> API Key Configuration (Google Maps & Gemini AI)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Securely store your API keys. They are saved in persistent LocalStorage and proxy securely via backend server requests for real-time B2B lead finder and AI grounding.
                    </p>
                  </div>

                  {keySavedMessage && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2 text-emerald-700 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" /> API keys saved successfully!
                    </div>
                  )}

                  <form onSubmit={handleSaveApiKeys} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1.5 font-bold">Google Maps / Places API Key</label>
                      <input
                        type="password"
                        placeholder="AIzaSy..."
                        value={mapsApiKey}
                        onChange={(e) => setMapsApiKey(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-blue-200 rounded-2xl text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-1.5 font-bold">Gemini AI API Key</label>
                      <input
                        type="password"
                        placeholder="AIzaSy... (Gemini API Key)"
                        value={geminiApiKey}
                        onChange={(e) => setGeminiApiKey(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-blue-200 rounded-2xl text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-blue-600/25"
                    >
                      Save API Keys Securely
                    </button>
                  </form>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
