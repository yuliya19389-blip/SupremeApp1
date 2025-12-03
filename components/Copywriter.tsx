import React, { useState } from 'react';
import { GemService } from '../services/geminiService';
import { CopyVariant } from '../types';
import { PenTool, Send, Copy, Check, Loader2, Sparkles } from 'lucide-react';

export const Copywriter: React.FC = () => {
  const [input, setInput] = useState('');
  const [variants, setVariants] = useState<CopyVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleRewrite = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const results = await GemService.rewriteText(input);
    setVariants(results);
    setLoading(false);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6">
      {/* Input Section */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <PenTool className="text-purple-500" /> Copywriter
          </h2>
          <span className="text-xs text-slate-400">Module 13</span>
        </div>
        
        <div className="flex-1 relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your raw thoughts or draft here..."
            className="w-full h-full bg-slate-800 border border-slate-700 rounded-xl p-6 text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none font-mono text-sm leading-relaxed"
          />
          <button
            onClick={handleRewrite}
            disabled={loading || !input.trim()}
            className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
            Enhance with AI
          </button>
        </div>
      </div>

      {/* Output Section */}
      <div className="flex-1 bg-slate-900/50 rounded-xl border border-slate-800 p-4 overflow-y-auto">
        {variants.length === 0 && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-slate-600">
            <Send size={48} className="mb-4 opacity-20" />
            <p>Ready to transform your content.</p>
          </div>
        )}

        {loading && (
          <div className="h-full flex flex-col items-center justify-center text-purple-400 gap-4">
            <Loader2 className="animate-spin" size={48} />
            <p className="animate-pulse">Generating variations...</p>
          </div>
        )}

        <div className="space-y-4">
          {variants.map((variant, idx) => (
            <div key={idx} className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-purple-500/30 transition-colors group">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-700">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  {variant.type}
                </span>
                <button
                  onClick={() => handleCopy(variant.content, idx)}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  {copiedIndex === idx ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                {variant.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};