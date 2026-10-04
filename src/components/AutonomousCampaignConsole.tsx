import React, { useState } from 'react';
import { CampaignLead } from '../types';
import { Bot, Send, CheckCircle2, Globe, AlertCircle, Play, Sparkles, Filter, RefreshCw } from 'lucide-react';

interface AutonomousCampaignConsoleProps {
  campaignLeads: CampaignLead[];
  onAddCampaignLeads: (leads: CampaignLead[]) => void;
  onUpdateLeadStatus: (leadId: string, status: CampaignLead['status']) => void;
}

export const AutonomousCampaignConsole: React.FC<AutonomousCampaignConsoleProps> = ({
  campaignLeads,
  onAddCampaignLeads,
  onUpdateLeadStatus
}) => {
  const [targetCity, setTargetCity] = useState('Gujranwala');
  const [targetCategory, setTargetCategory] = useState('Auto Parts Manufacturers');
  const [dailyLimit, setDailyLimit] = useState(20);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLeadForPreview, setSelectedLeadForPreview] = useState<CampaignLead | null>(null);

  const demoVideoUrl = "https://assets.mixkit.co/videos/preview/mixkit-machining-process-with-a-cnc-machine-42861-large.mp4";

  const handleRunAutonomousCampaign = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated: CampaignLead[] = [
        {
          id: `CAMP-${Date.now()}-1`,
          companyName: `${targetCity} Precision Auto Foundry`,
          city: targetCity,
          category: targetCategory,
          website: '',
          hasWebsite: false,
          machineryNeed: 'High',
          phone: '+9230007430652',
          generatedPitch: `Assalam-o-Alaikum from Mughalstech CNC Hub (0300-07430652). We noticed ${targetCity} Precision Auto Foundry specializes in ${targetCategory} without an active digital portal. Our Apex-X400 Heavy Duty CNC Lathe can double your turning precision and speed up cycle times by 30%. Watch our live demo: ${demoVideoUrl}. Shall we dispatch a quotation?`,
          status: 'Queued',
          date: new Date().toLocaleDateString()
        },
        {
          id: `CAMP-${Date.now()}-2`,
          companyName: `Chenab ${targetCategory} Works`,
          city: targetCity,
          category: targetCategory,
          website: 'https://www.chenab-auto.pk',
          hasWebsite: true,
          machineryNeed: 'Medium',
          phone: '+9230007430652',
          generatedPitch: `Hello team at Chenab Works, Mughalstech CNC Hub here (0300-07430652). We supply ISO-9001 calibrated Titan-T600 Turning Centers ideal for your ${targetCategory} production line. Check out our high-speed cutting demo: ${demoVideoUrl}. Let us know if you need spare tooling or a proforma quote.`,
          status: 'Queued',
          date: new Date().toLocaleDateString()
        },
        {
          id: `CAMP-${Date.now()}-3`,
          companyName: `Al-Madina Die Casting & Spares`,
          city: targetCity,
          category: targetCategory,
          website: '',
          hasWebsite: false,
          machineryNeed: 'High',
          phone: '+9230007430652',
          generatedPitch: `Dear Al-Madina Management, Mughalstech CNC Hub (0300-07430652). Your die casting works in ${targetCity} can significantly benefit from our Micro-Turn 250 benchtop and slant bed CNC lathes for automated finishing. Watch 30s reel: ${demoVideoUrl}. Reply for instant factory pricing.`,
          status: 'Queued',
          date: new Date().toLocaleDateString()
        }
      ];

      onAddCampaignLeads(generated);
      setIsGenerating(false);
    }, 1500);
  };

  const handleSendWhatsAppPitch = (lead: CampaignLead) => {
    const encoded = encodeURIComponent(lead.generatedPitch);
    window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encoded}`, '_blank');
    onUpdateLeadStatus(lead.id, 'Pitch Sent');
  };

  return (
    <div className="space-y-6">
      
      {/* Campaign Scheduler Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold">Autonomous Daily Lead Campaign & AI Requirement Pitcher</h3>
              <p className="text-xs text-slate-300">Automated factory extraction, web presence check, machinery need scoring, and AI proposal generator.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">Target Industrial City</label>
              <select
                value={targetCity}
                onChange={(e) => setTargetCity(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-bold focus:outline-none focus:border-cyan-400"
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
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">Target Factory Category</label>
              <select
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-bold focus:outline-none focus:border-cyan-400"
              >
                <option value="Auto Parts Manufacturers">Auto Parts Manufacturers</option>
                <option value="Plastic Die Casting Works">Plastic Die Casting Works</option>
                <option value="Pump Manufacturers">Pump Manufacturers</option>
                <option value="Precision Machine Shops">Precision Machine Shops</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">Daily Extraction Limit</label>
              <input
                type="number"
                min="5"
                max="100"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(Number(e.target.value))}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white font-bold"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleRunAutonomousCampaign}
              disabled={isGenerating}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-slate-950 font-bold rounded-2xl text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Running AI Autonomous Campaign...' : `Run Daily Campaign (${dailyLimit} Leads in ${targetCity})`}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Campaign Leads Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Extracted Factory Leads & AI Requirement Pitcher ({campaignLeads.length})</h4>
          <span className="text-xs text-slate-500 font-mono">Primary WhatsApp: 0300-07430652</span>
        </div>

        {campaignLeads.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-blue-100">
            <Bot className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h5 className="text-base font-bold text-slate-900">No active campaign leads found</h5>
            <p className="text-xs text-slate-500 mb-4">Click "Run Daily Campaign" above to extract and score industrial prospects automatically.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaignLeads.map(lead => (
              <div key={lead.id} className="p-6 rounded-3xl bg-white border border-blue-100 shadow-xl space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">{lead.category}</span>
                      <h5 className="text-base font-bold text-slate-900 mt-1">{lead.companyName}</h5>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      lead.machineryNeed === 'High' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      Need: {lead.machineryNeed} CNC Lathe
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-blue-100 font-mono">
                    <div>
                      <span className="text-slate-400 block">City</span>
                      <span className="font-bold text-slate-900">{lead.city}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Web Presence</span>
                      <span className={`font-bold ${lead.hasWebsite ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {lead.hasWebsite ? 'Active Website' : 'No Website (Upgrade Needed)'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">AI Generated Proposal & Video Demo Pitch</span>
                    <p className="text-xs text-slate-700 bg-blue-50/50 p-3.5 rounded-xl border border-blue-100 leading-relaxed italic">
                      "{lead.generatedPitch}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-blue-100">
                  <button
                    onClick={() => handleSendWhatsAppPitch(lead)}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Pitch via WhatsApp (0300-07430652)</span>
                  </button>
                  <span className={`px-3 py-3 rounded-xl text-xs font-bold text-center ${
                    lead.status === 'Pitch Sent' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {lead.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
