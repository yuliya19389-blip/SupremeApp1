import React, { useState } from 'react';
import { View } from './types';
import { TrendScanner } from './components/TrendScanner';
import { Copywriter } from './components/Copywriter';
import { CompetitorAnalysis } from './components/CompetitorAnalysis';
import { DailyBriefing } from './components/DailyBriefing';
import { LayoutDashboard, TrendingUp, PenTool, Users, Box } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.DASHBOARD);

  const renderContent = () => {
    switch (activeView) {
      case View.DASHBOARD:
        return (
          <div className="animate-fade-in">
             <DailyBriefing />
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <div 
                 onClick={() => setActiveView(View.TRENDS)}
                 className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-pink-500 cursor-pointer transition-all hover:-translate-y-1 group"
               >
                 <div className="bg-pink-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-500/20">
                   <TrendingUp className="text-pink-500" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Trend Scanner</h3>
                 <p className="text-slate-400 text-sm">Find the hottest 3D & Tech topics from Google Search.</p>
               </div>

               <div 
                 onClick={() => setActiveView(View.COPYWRITER)}
                 className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-purple-500 cursor-pointer transition-all hover:-translate-y-1 group"
               >
                 <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20">
                   <PenTool className="text-purple-500" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">AI Copywriter</h3>
                 <p className="text-slate-400 text-sm">Draft, rewrite, and optimize posts for X, Threads & LinkedIn.</p>
               </div>

               <div 
                 onClick={() => setActiveView(View.COMPETITORS)}
                 className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-500 cursor-pointer transition-all hover:-translate-y-1 group"
               >
                 <div className="bg-emerald-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500/20">
                   <Users className="text-emerald-500" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Competitor Spy</h3>
                 <p className="text-slate-400 text-sm">Analyze other artists and steal their winning strategies.</p>
               </div>
             </div>
          </div>
        );
      case View.TRENDS:
        return <TrendScanner />;
      case View.COPYWRITER:
        return <Copywriter />;
      case View.COMPETITORS:
        return <CompetitorAnalysis />;
      default:
        return <div className="text-white">Select a module</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Box size={24} className="text-white" />
          </div>
          <span className="font-bold text-xl text-white hidden lg:block tracking-tight">3D SMM</span>
        </div>

        <nav className="flex-1 py-6 space-y-2 px-3">
          <NavButton 
            active={activeView === View.DASHBOARD} 
            onClick={() => setActiveView(View.DASHBOARD)} 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
          />
          <NavButton 
            active={activeView === View.TRENDS} 
            onClick={() => setActiveView(View.TRENDS)} 
            icon={<TrendingUp size={20} />} 
            label="Trend Scanner" 
          />
          <NavButton 
            active={activeView === View.COPYWRITER} 
            onClick={() => setActiveView(View.COPYWRITER)} 
            icon={<PenTool size={20} />} 
            label="Copywriter" 
          />
          <NavButton 
            active={activeView === View.COMPETITORS} 
            onClick={() => setActiveView(View.COMPETITORS)} 
            icon={<Users size={20} />} 
            label="Competitors" 
          />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-lg p-3 text-xs text-slate-500 hidden lg:block">
            <p className="font-semibold text-slate-400 mb-1">Status: Online</p>
            <p>Gemini 2.5 Active</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 lg:ml-64 p-6 lg:p-10 relative">
        <div className="max-w-7xl mx-auto h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <span className={active ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'}>
      {icon}
    </span>
    <span className="hidden lg:block font-medium">{label}</span>
  </button>
);

export default App;