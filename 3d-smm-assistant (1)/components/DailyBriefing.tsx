import React, { useEffect, useState } from 'react';
import { GemService } from '../services/geminiService';
import { DailyBrief } from '../types';
import { Lightbulb, Clock, PenTool, RefreshCw } from 'lucide-react';

export const DailyBriefing: React.FC = () => {
  const [brief, setBrief] = useState<DailyBrief | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBrief = async () => {
    setLoading(true);
    const data = await GemService.getDailyBriefing();
    setBrief(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBrief();
  }, []);

  if (loading) return <div className="animate-pulse h-48 bg-slate-800 rounded-xl"></div>;

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-6 rounded-xl border border-indigo-700 shadow-lg mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Lightbulb size={120} />
      </div>
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
           Daily Briefing <span className="text-xs bg-indigo-500 px-2 py-1 rounded text-white">Module 16</span>
        </h2>
        <button onClick={fetchBrief} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <RefreshCw size={20} className="text-indigo-300" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <div className="bg-slate-800/50 p-4 rounded-lg backdrop-blur-sm border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2 text-indigo-400">
            <Lightbulb size={18} />
            <h3 className="font-semibold uppercase text-xs tracking-wider">Idea of the Day</h3>
          </div>
          <p className="text-slate-200">{brief?.idea}</p>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg backdrop-blur-sm border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2 text-emerald-400">
            <PenTool size={18} />
            <h3 className="font-semibold uppercase text-xs tracking-wider">3D Tip</h3>
          </div>
          <p className="text-slate-200">{brief?.tip}</p>
        </div>

        <div className="bg-slate-800/50 p-4 rounded-lg backdrop-blur-sm border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2 text-amber-400">
            <Clock size={18} />
            <h3 className="font-semibold uppercase text-xs tracking-wider">Posting Time</h3>
          </div>
          <p className="text-slate-200 text-xl font-mono">{brief?.bestTime}</p>
        </div>
      </div>
    </div>
  );
};