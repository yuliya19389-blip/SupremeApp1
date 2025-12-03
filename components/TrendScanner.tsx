import React, { useState, useEffect } from 'react';
import { GemService } from '../services/geminiService';
import { TrendItem } from '../types';
import { TrendingUp, ExternalLink, Loader2, Copy } from 'lucide-react';

export const TrendScanner: React.FC = () => {
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTrends = async () => {
    setLoading(true);
    const data = await GemService.fetchTrends();
    setTrends(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTrends();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-3xl font-bold text-white flex items-center gap-3">
             <TrendingUp className="text-pink-500" /> Trend Scanner
           </h2>
           <p className="text-slate-400 mt-1">Scans Google Search for top 3D/Tech trends (Module 4)</p>
        </div>
        <button 
          onClick={loadTrends}
          disabled={loading}
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 className="animate-spin" size={20}/> : 'Scan Now'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {trends.map((trend, idx) => (
          <div key={idx} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-pink-500/50 transition-colors shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{trend.topic}</h3>
              <span className="bg-pink-500/20 text-pink-300 text-xs px-2 py-1 rounded-full border border-pink-500/30">
                {trend.relevance}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm text-slate-400 uppercase font-semibold mb-2">Adaptation Strategy</h4>
                <p className="text-slate-200 text-sm leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                  {trend.adaptation}
                </p>
                {trend.sourceUrl && (
                  <a href={trend.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-400 mt-2 hover:text-blue-300">
                    <ExternalLink size={12} /> View Source
                  </a>
                )}
              </div>

              <div>
                <h4 className="text-sm text-slate-400 uppercase font-semibold mb-2 flex justify-between items-center">
                  Example Post
                  <button onClick={() => navigator.clipboard.writeText(trend.postDraft)} className="text-slate-500 hover:text-white" title="Copy">
                    <Copy size={14} />
                  </button>
                </h4>
                <div className="bg-slate-900 p-3 rounded-lg border-l-4 border-pink-500 text-slate-300 text-sm italic">
                  "{trend.postDraft}"
                </div>
              </div>
            </div>
          </div>
        ))}

        {!loading && trends.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            Press "Scan Now" to fetch the latest global trends using Gemini.
          </div>
        )}
      </div>
    </div>
  );
};