import { Cpu, Network, Zap, Target, TrendingUp, Layers } from 'lucide-react';

const agents = [
  {
    name: 'CRM Agent',
    icon: Target,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    subscriptions: ['HIDDENDISTRESSUPDATED', 'OWNERRISKUPDATED'],
    actions: 'Automates outreach, schedules follow-ups'
  },
  {
    name: 'Offer Engine Agent',
    icon: Zap,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    subscriptions: ['LIQUIDITYUPDATED', 'GEOWAVEUPDATED', 'COMPETITIONUPDATED'],
    actions: 'Generates offers, pricing recommendations'
  },
  {
    name: 'Capital Agent',
    icon: TrendingUp,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    subscriptions: ['LIQUIDITYUPDATED'],
    actions: 'Reallocates funds to high-priority markets'
  },
  {
    name: 'Learning Loop Agent',
    icon: Network,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    subscriptions: ['All emitted signals'],
    actions: 'Updates model weights for scoring functions'
  },
  {
    name: 'Alpha / Executive Layer',
    icon: Layers,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    subscriptions: ['Supervisory'],
    actions: 'Supervises agent activity, defines global objectives, triggers resource allocation'
  }
];

export function AgentsView() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 font-sans tracking-tight">Event-Driven Agent Consumption</h2>
          <p className="text-gray-400">Agents perform actions based on updated intelligence, never querying raw PIG directly.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#111] border border-emerald-500/30 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-mono text-emerald-400 font-bold tracking-wider">AGENTS ONLINE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const Icon = agent.icon;
          return (
            <div key={agent.name} className={`bg-[#111] border ${agent.border} rounded-xl p-6 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
              <div className={`absolute top-0 right-0 w-32 h-32 ${agent.bg} rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl ${agent.bg} ${agent.border} border`}>
                    <Icon className={`w-6 h-6 ${agent.color}`} />
                  </div>
                  <h3 className={`text-lg font-bold text-white`}>{agent.name}</h3>
                </div>

                <div className="mb-6">
                  <h4 className="text-[10px] uppercase tracking-widest font-mono text-gray-500 mb-3">Subscriptions</h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.subscriptions.map(sub => (
                      <span key={sub} className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800 text-gray-300 text-xs font-mono">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-mono text-gray-500 mb-2">Actions</h4>
                  <p className="text-sm text-gray-300 leading-relaxed border-l-2 border-gray-800 pl-3">
                    {agent.actions}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-[#111] border border-gray-800 rounded-xl p-8">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Network className="w-5 h-5 text-blue-500" />
          Nationwide Scaling Strategy
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-bold text-gray-200 mb-4 uppercase tracking-wider font-mono">Hierarchical Market Nodes</h4>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-400">
              <span className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800">Property</span>
              <span className="text-gray-600">→</span>
              <span className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800">Block</span>
              <span className="text-gray-600">→</span>
              <span className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800">Neighborhood</span>
              <span className="text-gray-600">→</span>
              <span className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800">Zip</span>
              <span className="text-gray-600">→</span>
              <span className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800 text-blue-400 border-blue-500/30">County</span>
              <span className="text-gray-600">→</span>
              <span className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800">MSA</span>
              <span className="text-gray-600">→</span>
              <span className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800">Region</span>
              <span className="text-gray-600">→</span>
              <span className="px-2 py-1 rounded bg-[#1a1a1a] border border-gray-800 text-emerald-400 border-emerald-500/30">National</span>
            </div>
            <p className="mt-4 text-sm text-gray-400">Pipelines aggregate metrics upward: owner risk → property risk → geography / county → region → national</p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-gray-200 mb-4 uppercase tracking-wider font-mono">PIG Cross-Market Relationships</h4>
            <ul className="space-y-3 text-sm text-gray-300 font-mono">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                owner <span className="text-gray-600">→</span> properties across counties
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                investor <span className="text-gray-600">→</span> deals across counties
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                lender <span className="text-gray-600">→</span> loans across markets
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
