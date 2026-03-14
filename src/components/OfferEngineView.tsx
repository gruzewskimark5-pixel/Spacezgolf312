import { Calculator, DollarSign, FileText, Server, Zap, Globe, User, Home, AlertTriangle, Target, TrendingUp, CheckCircle2, XCircle, HelpCircle, Database } from 'lucide-react';

export function OfferEngineView() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2 font-sans tracking-tight flex items-center gap-3">
          <DollarSign className="w-6 h-6 text-orange-500" />
          Offer Engine Money Layer
        </h2>
        <p className="text-gray-400 max-w-2xl">
          Turns intelligence signals into concrete, disciplined offers. The Offer Engine Agent never "guesses" — it executes a strict protocol to determine what to offer, when to offer, where to deploy capital, and how to price risk.
        </p>
      </div>

      {/* Inputs Grid */}
      <div>
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-500" />
          Signal Inputs (From CPO)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Property Level */}
          <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-purple-400 mb-4 uppercase tracking-wider font-mono">
              <Home className="w-4 h-4" />
              Property-Level
            </h4>
            <ul className="space-y-2 text-sm text-gray-300 font-mono">
              <li>• ARV</li>
              <li>• rehab_estimate</li>
              <li>• holdingcostestimate</li>
              <li>• closingcostestimate</li>
              <li>• riskscore</li>
              <li>• targeting_flag</li>
            </ul>
          </div>

          {/* Owner Level */}
          <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-blue-400 mb-4 uppercase tracking-wider font-mono">
              <User className="w-4 h-4" />
              Owner-Level
            </h4>
            <ul className="space-y-2 text-sm text-gray-300 font-mono">
              <li>• ownerriskscore</li>
              <li>• hiddendistressscore</li>
              <li>• ownerpriorityflag</li>
            </ul>
          </div>

          {/* Geo Level */}
          <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-400 mb-4 uppercase tracking-wider font-mono">
              <Globe className="w-4 h-4" />
              Geo-Level
            </h4>
            <ul className="space-y-2 text-sm text-gray-300 font-mono">
              <li>• distresswavescore</li>
              <li>• competitionintensityscore</li>
              <li>• liquidity_score</li>
              <li>• capitalpriorityrank</li>
            </ul>
          </div>

          {/* Global Level */}
          <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-orange-400 mb-4 uppercase tracking-wider font-mono">
              <Server className="w-4 h-4" />
              Global / Fund
            </h4>
            <ul className="space-y-2 text-sm text-gray-300 font-mono">
              <li>• target_margin</li>
              <li>• maxrehabbudget</li>
              <li>• minexpectedprofit</li>
              <li>• strategy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Core Formulas */}
      <div>
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-emerald-500" />
          Core Formulas
        </h3>
        <div className="space-y-4">
          {/* Base MAO */}
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
            <h4 className="text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider font-mono">1. Base MAO</h4>
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4 font-mono text-blue-400 text-sm overflow-x-auto">
              MAO_base = (ARV × MarginTarget) - Rehab - Holding - Closing
            </div>
            <p className="text-xs text-gray-500 mt-3">MarginTarget = strategy + market dependent (e.g., 0.72 flip, 0.8 rental)</p>
          </div>

          {/* Risk Buffer */}
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>
            <h4 className="text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider font-mono">2. Risk Buffer</h4>
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4 font-mono text-orange-400 text-sm overflow-x-auto mb-3">
              RiskBuffer = f(risk_score) × ARV
              <br/><br/>
              MAO_risk_adj = MAO_base - RiskBuffer
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono text-gray-400">
              <div className="bg-[#1a1a1a] p-2 rounded">0-30 → 1-2% ARV</div>
              <div className="bg-[#1a1a1a] p-2 rounded">30-60 → 2-4% ARV</div>
              <div className="bg-[#1a1a1a] p-2 rounded">60-80 → 4-6% ARV</div>
              <div className="bg-[#1a1a1a] p-2 rounded">80-100 → 6-8% ARV</div>
            </div>
          </div>

          {/* Market Adjustment */}
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
            <h4 className="text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider font-mono">3. Liquidity & Competition Adjustment</h4>
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4 font-mono text-emerald-400 text-sm overflow-x-auto">
              MAO_market_adj = MAO_risk_adj × LiquidityFactor × CompetitionFactor
            </div>
            <p className="text-xs text-gray-500 mt-3">Factors range from [0.95, 1.05]. High liquidity + low competition = aggressive. Low liquidity + high competition = conservative.</p>
          </div>

          {/* Final Offer Band */}
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
            <h4 className="text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider font-mono">4. Final Offer Band</h4>
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4 font-mono text-purple-400 text-sm overflow-x-auto">
              Offer_low = MAO_market_adj - Δ
              <br/>
              Offer_high = MAO_market_adj + Δ
            </div>
            <p className="text-xs text-gray-500 mt-3">Δ is a small negotiation band (e.g., 3–5% of MAO).</p>
          </div>
        </div>
      </div>

      {/* Agent Protocol & Classification */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Agent Protocol
          </h3>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <ol className="space-y-6 relative border-l border-gray-800 ml-3">
              <li className="pl-6 relative">
                <div className="absolute w-3 h-3 bg-gray-800 rounded-full -left-[6.5px] top-1.5 ring-4 ring-[#111]"></div>
                <h4 className="text-sm font-bold text-white mb-1">1. Load Context</h4>
                <p className="text-xs text-gray-400">Load property, owner, geo, scores, and fund constraints.</p>
              </li>
              <li className="pl-6 relative">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-1.5 ring-4 ring-[#111]"></div>
                <h4 className="text-sm font-bold text-white mb-1">2. Compute MAO + Offer Band</h4>
                <p className="text-xs text-gray-400">Apply core formulas to determine pricing.</p>
              </li>
              <li className="pl-6 relative">
                <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[6.5px] top-1.5 ring-4 ring-[#111]"></div>
                <h4 className="text-sm font-bold text-white mb-1">3. Classify Outcome</h4>
                <p className="text-xs text-gray-400">Categorize as NO-GO, SOFT OFFER, or HARD OFFER.</p>
              </li>
              <li className="pl-6 relative">
                <div className="absolute w-3 h-3 bg-orange-500 rounded-full -left-[6.5px] top-1.5 ring-4 ring-[#111]"></div>
                <h4 className="text-sm font-bold text-white mb-1">4. Emit Offer Decision</h4>
                <p className="text-xs text-gray-400">Emit <code className="text-orange-400 bg-orange-500/10 px-1 rounded">OFFER_GENERATED</code> event with full details.</p>
              </li>
              <li className="pl-6 relative">
                <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[6.5px] top-1.5 ring-4 ring-[#111]"></div>
                <h4 className="text-sm font-bold text-white mb-1">5. Write to CPO</h4>
                <p className="text-xs text-gray-400">Store offer snapshot in deals table for learning loop.</p>
              </li>
            </ol>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-rose-500" />
            Classification & Constraints
          </h3>
          <div className="space-y-4">
            <div className="bg-[#111] border border-gray-800 rounded-xl p-5 flex items-start gap-4">
              <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-red-400 mb-1">NO-GO</h4>
                <p className="text-xs text-gray-400 mb-2">Fails constraints. Log reason, no offer generated.</p>
                <div className="text-[10px] font-mono text-gray-500 bg-[#1a1a1a] p-2 rounded">
                  IF expectedprofit &lt; minexpected_profit OR rehabestimate &gt; maxrehab_budget
                </div>
              </div>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-5 flex items-start gap-4">
              <HelpCircle className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-yellow-400 mb-1">SOFT OFFER</h4>
                <p className="text-xs text-gray-400">Borderline fit. Lower band, test seller response.</p>
              </div>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-5 flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-emerald-400 mb-1">HARD OFFER</h4>
                <p className="text-xs text-gray-400">Strong fit. Full band, prioritize outreach.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Negotiation Notes & API */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-500" />
            Auto-Generated Negotiation Notes
          </h3>
          <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-800 bg-[#161616]">
              <div className="text-xs font-mono text-blue-400">High ownerriskscore / hiddendistressscore</div>
              <p className="text-sm text-gray-300 mt-2 italic">"Emphasize speed, certainty, and solving tax/code issues."</p>
            </div>
            <div className="p-4 border-b border-gray-800 bg-[#111]">
              <div className="text-xs font-mono text-emerald-400">High distresswavescore, high liquidity</div>
              <p className="text-sm text-gray-300 mt-2 italic">"Market moving fast, comps strong — justify price with recent sales."</p>
            </div>
            <div className="p-4 bg-[#161616]">
              <div className="text-xs font-mono text-orange-400">High competitionintensityscore</div>
              <p className="text-sm text-gray-300 mt-2 italic">"Expect multiple offers, anchor lower but move quickly if engaged."</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Server className="w-5 h-5 text-purple-500" />
            API Surface
          </h3>
          <div className="space-y-4">
            <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-bold rounded font-mono">GET</span>
                <code className="text-sm text-gray-300 font-mono">/offers/suggestions?property_id=...</code>
              </div>
              <div className="text-xs text-gray-400 font-mono bg-[#1a1a1a] p-3 rounded">
                Returns:<br/>
                - offerlow, offerhigh, MAO<br/>
                - expected_profit<br/>
                - classification (NO-GO / SOFT / HARD)<br/>
                - negotiation_notes
              </div>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded font-mono">POST</span>
                <code className="text-sm text-gray-300 font-mono">/offers/lock-in</code>
              </div>
              <p className="text-xs text-gray-400">
                Locks an offer as "sent" with timestamp and terms. Feeds learning loop later (accepted / rejected / countered).
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Capital Alignment */}
      <div className="bg-gradient-to-r from-[#111] to-[#1a1a1a] border border-gray-800 rounded-xl p-8">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          Capital Alignment
        </h3>
        <p className="text-sm text-gray-300 mb-4">
          At the portfolio level, the Offer Engine Agent respects per-market capital caps, throttles offers in low-priority geos (<code className="text-emerald-400">capitalpriorityrank</code>), and prioritizes high liquidity + high distress + manageable competition.
        </p>
        <div className="text-sm font-mono text-gray-400 border-l-2 border-emerald-500 pl-4 py-1">
          "Is this the right deal for this capital, in this market, right now?"
        </div>
      </div>
    </div>
  );
}
