import { Database, Clock, AlertTriangle, Target, TrendingUp, Zap } from 'lucide-react';

const tables = [
  {
    name: 'Owners',
    icon: Database,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    fields: [
      { name: 'ownerriskscore', type: 'int', notes: '0–100', icon: AlertTriangle },
      { name: 'hiddendistressscore', type: 'int', notes: '0–100', icon: AlertTriangle },
      { name: 'ownerpriorityflag', type: 'bool', notes: 'true if any score ≥ threshold', icon: Target },
      { name: 'lastriskupdated_at', type: 'timestamp', notes: 'UTC', icon: Clock },
    ]
  },
  {
    name: 'Geographies',
    icon: Database,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    fields: [
      { name: 'distresswavescore', type: 'int', notes: '0–100', icon: TrendingUp },
      { name: 'competitionintensityscore', type: 'int', notes: '0–100', icon: TrendingUp },
      { name: 'liquidity_score', type: 'int', notes: '0–100', icon: TrendingUp },
      { name: 'capitalpriorityrank', type: 'int', notes: 'sorted rank', icon: Target },
      { name: 'lastmarketupdate_at', type: 'timestamp', notes: 'UTC', icon: Clock },
    ]
  },
  {
    name: 'Properties',
    icon: Database,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    fields: [
      { name: 'networkriskscore', type: 'int', notes: 'optional derived', icon: AlertTriangle },
      { name: 'targeting_flag', type: 'bool', notes: 'computed from owner + geography', icon: Target },
      { name: 'lastintelupdate_at', type: 'timestamp', notes: 'UTC', icon: Clock },
    ]
  }
];

export function CpoSchema() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 font-sans tracking-tight">Canonical Property Object (CPO)</h2>
        <p className="text-gray-400">Single source of truth for all property, owner, and market data. Operator-ready schema.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {tables.map((table) => {
          const Icon = table.icon;
          return (
            <div key={table.name} className={`bg-[#111] border ${table.border} rounded-xl overflow-hidden shadow-xl`}>
              <div className={`p-4 border-b ${table.border} ${table.bg} flex items-center gap-3`}>
                <Icon className={`w-5 h-5 ${table.color}`} />
                <h3 className={`font-bold ${table.color}`}>{table.name} Table</h3>
              </div>
              <div className="p-0">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#161616] text-xs uppercase font-mono text-gray-500">
                    <tr>
                      <th className="px-4 py-2 font-medium">Field</th>
                      <th className="px-4 py-2 font-medium">Type</th>
                      <th className="px-4 py-2 font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {table.fields.map((field, idx) => {
                      const FieldIcon = field.icon;
                      return (
                        <tr key={idx} className="hover:bg-[#161616] transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <FieldIcon className="w-3 h-3 text-gray-500" />
                              <span className="font-mono text-gray-200 text-xs">{field.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-400 text-[10px] font-mono">
                              {field.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-xs">
                            {field.notes}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-orange-500" />
          Score Propagation Rules
        </h3>
        
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-[#161616] border border-gray-800 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
            <h4 className="text-sm font-bold text-gray-200 mb-2 uppercase tracking-wider font-mono">Owner Priority Flag</h4>
            <code className="block p-3 rounded bg-[#0a0a0a] border border-gray-800 text-blue-400 font-mono text-sm">
              ownerriskscore ≥ 85 OR hiddendistressscore ≥ 80 → ownerpriorityflag = true
            </code>
          </div>

          <div className="p-4 rounded-lg bg-[#161616] border border-gray-800 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
            <h4 className="text-sm font-bold text-gray-200 mb-2 uppercase tracking-wider font-mono">Geography Capital Priority Rank</h4>
            <code className="block p-3 rounded bg-[#0a0a0a] border border-gray-800 text-emerald-400 font-mono text-sm">
              Rank geographies by (liquidity_score * distresswavescore / competition_intensity)
            </code>
          </div>

          <div className="p-4 rounded-lg bg-[#161616] border border-gray-800 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
            <h4 className="text-sm font-bold text-gray-200 mb-2 uppercase tracking-wider font-mono">Property Targeting Flag</h4>
            <code className="block p-3 rounded bg-[#0a0a0a] border border-gray-800 text-purple-400 font-mono text-sm">
              property.targeting_flag = true if ownerpriorityflag = true AND geography.liquidity_score ≥ threshold
            </code>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-gray-400 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          Score propagation runs as a post-processing workflow that triggers on any pipeline output update.
        </div>
      </div>
    </div>
  );
}
