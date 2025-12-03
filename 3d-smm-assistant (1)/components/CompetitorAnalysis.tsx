import React, { useState } from 'react';
import { GemService } from '../services/geminiService';
import { CompetitorData } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Users, Search, Loader2, ArrowRight } from 'lucide-react';

export const CompetitorAnalysis: React.FC = () => {
  const [username, setUsername] = useState('');
  const [data, setData] = useState<CompetitorData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    setLoading(true);
    const result = await GemService.analyzeCompetitor(username);
    setData(result);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-2 flex justify-center items-center gap-3">
          <Users className="text-emerald-500" /> Competitor Spy
        </h2>
        <p className="text-slate-400">Generate deep insights on other 3D artists (Module 15)</p>
      </div>

      <form onSubmit={handleAnalyze} className="flex gap-4 mb-10 max-w-lg mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter artist name (e.g., Beeple)"
            className="w-full bg-slate-800 border border-slate-700 rounded-full py-3 pl-12 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 rounded-full font-medium transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Analyze'}
        </button>
      </form>

      {data && (
        <div className="space-y-6 animate-fade-in">
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h4 className="text-slate-400 text-xs uppercase mb-1">Target</h4>
              <p className="text-2xl font-bold text-white">{data.name}</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h4 className="text-slate-400 text-xs uppercase mb-1">Post Frequency</h4>
              <p className="text-2xl font-bold text-emerald-400">{data.postingFrequency}</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <h4 className="text-slate-400 text-xs uppercase mb-1">Winning Format</h4>
              <p className="text-2xl font-bold text-purple-400">{data.bestFormat}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-6">Engagement Analysis</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }}
                      itemStyle={{ color: '#f1f5f9' }}
                    />
                    <Bar dataKey="likes" fill="#10b981" radius={[4, 4, 0, 0]} name="Likes" />
                    <Bar dataKey="comments" fill="#6366f1" radius={[4, 4, 0, 0]} name="Comments" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg flex flex-col">
              <h3 className="text-lg font-bold text-white mb-4">Strategic Insights</h3>
              <div className="flex-1 space-y-4">
                <p className="text-slate-300 italic mb-6">"{data.summary}"</p>
                <div className="space-y-3">
                  {data.insights.map((insight, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="bg-emerald-500/10 p-2 rounded-full mt-1">
                        <ArrowRight size={14} className="text-emerald-500" />
                      </div>
                      <p className="text-slate-200 text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};