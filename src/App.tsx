import { useState } from 'react';
import { Activity, Database, GitMerge, Network, Cpu, LayoutDashboard, DollarSign } from 'lucide-react';
import { ArchitectureGraph } from './components/ArchitectureGraph';
import { PipelinesTable } from './components/PipelinesTable';
import { CpoSchema } from './components/CpoSchema';
import { AgentsView } from './components/AgentsView';
import { OfferEngineView } from './components/OfferEngineView';

export default function App() {
  const [activeTab, setActiveTab] = useState('graph');

  const tabs = [
    { id: 'graph', label: 'Execution Graph', icon: Network },
    { id: 'pipelines', label: 'Pipelines', icon: GitMerge },
    { id: 'cpo', label: 'CPO Schema', icon: Database },
    { id: 'agents', label: 'AI Agents', icon: Cpu },
    { id: 'offer-engine', label: 'Offer Engine', icon: DollarSign },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-300 font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 bg-[#111] flex flex-col">
        <div className="p-6 border-b border-gray-800 flex items-center gap-3">
          <Activity className="w-6 h-6 text-emerald-500" />
          <h1 className="font-mono text-sm font-bold tracking-wider text-white uppercase">REI Engine</h1>
        </div>
        
        <div className="p-4 flex-1">
          <div className="text-xs font-mono text-gray-500 mb-4 uppercase tracking-wider">Operator Views</div>
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            SYSTEM ONLINE
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-16 border-b border-gray-800 flex items-center px-6 bg-[#0a0a0a]/80 backdrop-blur-sm z-10">
          <h2 className="text-lg font-medium text-white flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-gray-500" />
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
        </header>
        
        <main className="flex-1 overflow-auto relative">
          {activeTab === 'graph' && <ArchitectureGraph />}
          {activeTab === 'pipelines' && <PipelinesTable />}
          {activeTab === 'cpo' && <CpoSchema />}
          {activeTab === 'agents' && <AgentsView />}
          {activeTab === 'offer-engine' && <OfferEngineView />}
        </main>
      </div>
    </div>
  );
}
