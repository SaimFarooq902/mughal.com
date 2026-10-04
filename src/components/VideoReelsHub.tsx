import React, { useState } from 'react';
import { VideoReelItem } from '../types';
import { Play, Heart, MessageSquare, Eye, Send, Share2, Radio } from 'lucide-react';

interface VideoReelsHubProps {
  reels: VideoReelItem[];
  onLikeReel: (reelId: string) => void;
  onAddComment: (reelId: string, text: string) => void;
}

export const VideoReelsHub: React.FC<VideoReelsHubProps> = ({ reels, onLikeReel, onAddComment }) => {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [commentInput, setCommentInput] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [liveStreamActive, setLiveStreamActive] = useState(true);

  const currentReel = reels[activeReelIndex] || reels[0];

  if (!currentReel) return null;

  const handleWhatsAppQuote = () => {
    const text = encodeURIComponent(`Hello Mughalstech CNC Hub (0300-07430652), I watched the video reel for ${currentReel.machineModel} and would like an official price quotation.`);
    window.open(`https://wa.me/9230007430652?text=${text}`, '_blank');
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(currentReel.id, commentInput.trim());
    setCommentInput('');
  };

  return (
    <section id="reels" className="py-20 bg-white border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Section Header with Live Stream Status */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-mono text-xs uppercase tracking-wider font-bold mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" /> VIRTUAL FACTORY LIVE STREAM & VIDEO REELS HUB
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              CNC Lathe Operations & Live Virtual Tours
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiveStreamActive(!liveStreamActive)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border flex items-center gap-2 shadow-sm ${
                liveStreamActive ? 'bg-red-50 border-red-300 text-red-700' : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>{liveStreamActive ? 'Live Factory Stream: ON' : 'Stream Paused'}</span>
            </button>
          </div>
        </div>

        {/* Live Stream Showcase & Vertical Reels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Vertical Video Reel TikTok/Reels Style Player */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden bg-slate-950 border border-blue-100 shadow-2xl group flex items-center justify-center aspect-[9/16] sm:aspect-[4/3] max-h-[600px]">
            <video
              key={currentReel.id}
              src={currentReel.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

            {/* Top Overlay Badge */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                LIVE REEL
              </span>
              <span className="bg-slate-900/80 backdrop-blur text-cyan-400 text-xs font-mono px-3 py-1 rounded-xl border border-slate-800">
                {currentReel.machineModel}
              </span>
            </div>

            {/* Right Vertical Action Stack */}
            <div className="absolute right-6 bottom-24 flex flex-col items-center gap-4 z-20">
              <button
                onClick={() => onLikeReel(currentReel.id)}
                className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur border border-slate-700 text-red-500 flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <Heart className="w-6 h-6 fill-red-500" />
                <span className="text-[10px] font-bold text-white font-mono">{currentReel.likesCount}</span>
              </button>

              <button
                onClick={() => setShowComments(!showComments)}
                className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur border border-slate-700 text-white flex flex-col items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <span className="text-[10px] font-bold text-white font-mono">{currentReel.comments.length}</span>
              </button>

              <div className="w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur border border-slate-700 text-white flex flex-col items-center justify-center shadow-lg">
                <Eye className="w-5 h-5 text-cyan-400" />
                <span className="text-[10px] font-bold text-white font-mono">{currentReel.viewsCount}</span>
              </div>
            </div>

            {/* Bottom Info & Buy / Quote Overlay */}
            <div className="absolute bottom-6 left-6 right-20 flex flex-col gap-3">
              <h3 className="text-lg sm:text-xl font-bold text-white">{currentReel.title}</h3>
              
              <button
                onClick={handleWhatsAppQuote}
                className="py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 w-fit"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Request Quote via WhatsApp (0300-07430652)</span>
              </button>
            </div>

            {/* Comments Drawer / Modal Overlay */}
            {showComments && (
              <div className="absolute inset-y-0 right-0 w-80 bg-slate-900/95 backdrop-blur-md border-l border-slate-800 p-5 flex flex-col justify-between z-30 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="text-sm font-bold text-white">Reel Comments ({currentReel.comments.length})</h4>
                  <button onClick={() => setShowComments(false)} className="text-slate-400 hover:text-white">
                    ✕
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-3 space-y-3">
                  {currentReel.comments.map(c => (
                    <div key={c.id} className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs">
                      <div className="flex justify-between font-bold text-cyan-400 mb-1">
                        <span>{c.user}</span>
                        <span className="text-[10px] text-slate-400">{c.time}</span>
                      </div>
                      <p className="text-slate-200">{c.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handlePostComment} className="flex gap-2 pt-3 border-t border-slate-800">
                  <input
                    type="text"
                    placeholder="Write feedback..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                  />
                  <button type="submit" className="p-2.5 bg-blue-600 text-white rounded-xl">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

          </div>

          {/* Playlist Selector Column */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-2">Select Active Operations Reel</h4>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {reels.map((reel, idx) => {
                const isActive = idx === activeReelIndex;
                return (
                  <div
                    key={reel.id}
                    onClick={() => setActiveReelIndex(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                      isActive
                        ? 'bg-blue-50/80 border-blue-500 shadow-md shadow-blue-500/10'
                        : 'bg-white border-blue-100 hover:border-blue-300'
                    }`}
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-900 shadow-inner">
                      <img src={reel.thumbnailUrl} alt={reel.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className={`w-5 h-5 ${isActive ? 'text-blue-400 fill-blue-400' : 'text-white'}`} />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-blue-600 uppercase font-bold">{reel.machineModel}</span>
                        <span className="text-[11px] text-slate-500 font-mono">{reel.viewsCount} views</span>
                      </div>
                      <h5 className="text-sm font-bold text-slate-900 truncate">{reel.title}</h5>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
