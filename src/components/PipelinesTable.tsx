import { GitMerge, Zap, Database, Network, Cpu } from 'lucide-react';

const pipelines = [
  {
    name: 'ownerriskpipeline',
    triggers: ['OWNER_UPDATED', 'DISTRESSEVENTCREATED'],
    tasks: 'load_owner_context → compute_owner_risk → write_owner_risk',
    writeBack: 'owners.ownerriskscore, ownerpriorityflag',
    emission: 'OWNERRISKUPDATED',
    consumers: ['Offer', 'CRM']
  },
  {
    name: 'hiddendistresspipeline',
    triggers: ['OWNER_UPDATED', 'REFI_RECORDED', 'TAX_DELINQUENCYRECORDED'],
    tasks: 'load_owner_signals → compute_hidden_distress_score → write_hidden_distress_to_CPO',
    writeBack: 'owners.hiddendistressscore, ownerpriorityflag',
    emission: 'HIDDENDISTRESSUPDATED',
    consumers: ['Offer', 'CRM']
  },
  {
    name: 'foreclosurewavepipeline',
    triggers: ['SCHEDULED_DAILY'],
    tasks: 'load_geo_events → compute_wave_score → write_wave_to_CPO',
    writeBack: 'geographies.distresswavescore',
    emission: 'GEOWAVEUPDATED',
    consumers: ['Offer', 'Capital', 'Learning']
  },
  {
    name: 'competitionintensitypipeline',
    triggers: ['DEAL_RECORDED', 'SCHEDULED_WEEKLY'],
    tasks: 'load_geo_deals → compute_competition_intensity → write_competition_to_CPO',
    writeBack: 'geographies.competitionintensityscore',
    emission: 'COMPETITIONUPDATED',
    consumers: ['Offer', 'Learning']
  },
  {
    name: 'liquidityopportunitypipeline',
    triggers: ['SCHEDULED_WEEKLY'],
    tasks: 'load_geo_scores → compute_liquidity_score → write_liquidity_to_CPO',
    writeBack: 'geographies.liquidity_score, geographies.capitalpriorityrank',
    emission: 'LIQUIDITYUPDATED',
    consumers: ['Capital', 'Offer']
  }
];

export function PipelinesTable() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2 font-sans tracking-tight">Pipelines & Workflows</h2>
        <p className="text-gray-400">Task Graph Engine orchestrates pipelines, manages dependencies, and executes tasks in parallel via Temporal / Ray / LangGraph.</p>
      </div>

      <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1a1a1a] border-b border-gray-800 text-xs uppercase font-mono text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Workflow</th>
                <th className="px-6 py-4 font-medium">Trigger(s)</th>
                <th className="px-6 py-4 font-medium">Tasks</th>
                <th className="px-6 py-4 font-medium">CPO Write-Back</th>
                <th className="px-6 py-4 font-medium">Event Emission</th>
                <th className="px-6 py-4 font-medium">Agents Consuming</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {pipelines.map((pipeline, idx) => (
                <tr key={idx} className="hover:bg-[#161616] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <GitMerge className="w-4 h-4 text-blue-500" />
                      <span className="font-mono text-blue-400 font-medium">{pipeline.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {pipeline.triggers.map(t => (
                        <span key={t} className="px-2 py-1 rounded bg-orange-500/10 text-orange-400 text-[10px] font-mono border border-orange-500/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300 font-mono text-xs max-w-xs truncate group-hover:whitespace-normal group-hover:break-words">
                    {pipeline.tasks}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Database className="w-3 h-3 text-gray-500" />
                      <span className="text-gray-300 font-mono text-xs">{pipeline.writeBack}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-mono border border-purple-500/20">
                      {pipeline.emission}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {pipeline.consumers.map(c => (
                        <span key={c} className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                          <Cpu className="w-3 h-3" />
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Network className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="font-medium text-white">Event-Driven</h3>
          </div>
          <p className="text-sm text-gray-400">All pipelines subscribe to their triggers on the event bus. Execution is fully decoupled from the triggering source.</p>
        </div>
        <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Zap className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="font-medium text-white">Parallel Execution</h3>
          </div>
          <p className="text-sm text-gray-400">Pipelines can run in parallel per owner or geography, scaling horizontally across hundreds of counties.</p>
        </div>
        <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Database className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="font-medium text-white">Idempotent Tasks</h3>
          </div>
          <p className="text-sm text-gray-400">Each task is idempotent and deterministic, ensuring safe retries and consistent CPO write-backs.</p>
        </div>
      </div>
    </div>
  );
}
