import React, { useState, useRef } from 'react';
import { Product } from '../types';
import { X, Sliders, Image, Sparkles, Check, Upload, Link, Video, Volume2, VolumeX, Scissors } from 'lucide-react';

interface MediaStudioModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProductMedia: (productId: string, newImageUrl: string, newVideoUrl?: string) => void;
}

export const MediaStudioModal: React.FC<MediaStudioModalProps> = ({
  product,
  isOpen,
  onClose,
  onUpdateProductMedia
}) => {
  const [activeTab, setActiveTab] = useState<'photo' | 'video'>('photo');

  // Photo editing state
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [sharpness, setSharpness] = useState(0);
  const [blur, setBlur] = useState(0);
  const [bgPreset, setBgPreset] = useState<'workshop' | 'showroom' | 'gradient' | 'blur'>('workshop');
  const [badgeType, setBadgeType] = useState<'none' | 'calibrated' | 'heavy-duty' | 'iso'>('calibrated');
  const [watermark, setWatermark] = useState(true);

  // Dual source state
  const [imageUrl, setImageUrl] = useState(product.image);
  const [videoUrlInput, setVideoUrlInput] = useState(product.videoUrl || '');
  const [isMuted, setIsMuted] = useState(true);
  const [videoBadgeText, setVideoBadgeText] = useState('Heavy Duty Lathe - Model X400');

  if (!isOpen) return null;

  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setImageUrl(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocalVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setVideoUrlInput(blobUrl);
    }
  };

  const handleSave = () => {
    onUpdateProductMedia(product.id, imageUrl, videoUrlInput);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white border border-blue-200 rounded-3xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-blue-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-bold text-slate-900">Dual Media Uploader & In-Browser Editing Studio</h3>
              <p className="text-xs text-slate-500">Editing Media for: {product.name} ({product.sku})</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Tabs */}
        <div className="flex border-b border-blue-100 bg-slate-50 px-6 shrink-0">
          <button
            onClick={() => setActiveTab('photo')}
            className={`py-3 px-6 text-xs font-bold border-b-2 transition-colors ${activeTab === 'photo' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            🖼️ Canvas Photo Studio Suite
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`py-3 px-6 text-xs font-bold border-b-2 transition-colors ${activeTab === 'video' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            🎥 Native Video Editor & Reel Manager
          </button>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Left Preview Col */}
          <div className="md:col-span-7 p-6 bg-slate-950 flex flex-col items-center justify-center relative min-h-[400px]">
            {activeTab === 'photo' ? (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 max-w-md w-full aspect-square bg-slate-900 flex items-center justify-center">
                <div className={`absolute inset-0 transition-all ${
                  bgPreset === 'workshop' ? 'bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] bg-slate-900' :
                  bgPreset === 'showroom' ? 'bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-900' :
                  bgPreset === 'gradient' ? 'bg-gradient-to-tr from-blue-900 via-indigo-950 to-slate-950' : 'backdrop-blur-md bg-slate-950/80'
                }`} />

                <img
                  src={imageUrl}
                  alt="Studio Preview"
                  style={{
                    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`
                  }}
                  className="relative z-10 w-full h-full object-cover transition-all"
                />

                {watermark && (
                  <div className="absolute bottom-4 left-4 z-20 bg-slate-950/90 backdrop-blur text-cyan-400 font-mono text-[10px] px-3 py-1.5 rounded-lg border border-cyan-500/30">
                    © MUGHALSTECH CNC HUB (0300-07430652)
                  </div>
                )}

                {badgeType !== 'none' && (
                  <div className="absolute top-4 right-4 z-20 bg-blue-600 text-white font-bold text-[10px] px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                    {badgeType === 'calibrated' ? '100% Factory Calibrated' : badgeType === 'heavy-duty' ? 'Heavy Duty Steel' : 'ISO 9001 Certified'}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 max-w-md w-full aspect-video bg-slate-900 flex items-center justify-center">
                <video
                  src={videoUrlInput}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                {videoBadgeText && (
                  <div className="absolute top-4 left-4 z-20 bg-blue-600/90 text-white font-bold text-xs px-3 py-1 rounded-lg backdrop-blur">
                    {videoBadgeText}
                  </div>
                )}

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute bottom-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-slate-900"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            )}

            <p className="text-xs text-slate-400 mt-4 font-mono">Live In-Browser Studio Preview</p>
          </div>

          {/* Right Controls Col */}
          <div className="md:col-span-5 p-6 bg-white space-y-6 flex flex-col justify-between overflow-y-auto">
            {activeTab === 'photo' ? (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-bold">Dual Input: Upload or Online URL</label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLocalImageUpload}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                    <input
                      type="url"
                      placeholder="Or paste image URL..."
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-bold">Background Backdrop Preset</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setBgPreset('workshop')}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border ${bgPreset === 'workshop' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                    >
                      Industrial Workshop
                    </button>
                    <button
                      onClick={() => setBgPreset('showroom')}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border ${bgPreset === 'showroom' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                    >
                      High-Tech Showroom
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-bold">HD Quality Badge Overlay</label>
                  <select
                    value={badgeType}
                    onChange={(e) => setBadgeType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900 font-bold"
                  >
                    <option value="none">No Badge</option>
                    <option value="calibrated">100% Factory Calibrated</option>
                    <option value="heavy-duty">Heavy Duty Steel Construction</option>
                    <option value="iso">ISO 9001 Certified</option>
                  </select>
                </div>

                <div className="space-y-3 pt-2 border-t border-blue-100">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Canvas Filters</h4>
                  
                  <div>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span>Brightness</span>
                      <span className="font-mono font-bold">{brightness}%</span>
                    </div>
                    <input
                      type="range" min="50" max="150" value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-600 mb-1">
                      <span>Contrast</span>
                      <span className="font-mono font-bold">{contrast}%</span>
                    </div>
                    <input
                      type="range" min="50" max="150" value={contrast}
                      onChange={(e) => setContrast(Number(e.target.value))}
                      className="w-full accent-blue-600"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-blue-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Company Logo Watermark</span>
                  <input
                    type="checkbox"
                    checked={watermark}
                    onChange={(e) => setWatermark(e.target.checked)}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-bold">Upload MP4 Video Reel (Local File or URL)</label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="video/mp4,video/webm"
                      onChange={handleLocalVideoUpload}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                    <input
                      type="url"
                      placeholder="Or paste MP4 / CDN video URL..."
                      value={videoUrlInput}
                      onChange={(e) => setVideoUrlInput(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-2 font-bold">Video Overlay Badge Text</label>
                  <input
                    type="text"
                    value={videoBadgeText}
                    onChange={(e) => setVideoBadgeText(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-blue-200 rounded-xl text-xs text-slate-900 font-bold"
                  />
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-900 space-y-1">
                  <div className="font-bold">🎬 Reel Manager Features:</div>
                  <p className="text-slate-600">Video clips auto-loop on the live vertical engagement feed with floating quote buttons.</p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-blue-100">
              <button
                onClick={handleSave}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Publish Studio Media to Product Catalog</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
