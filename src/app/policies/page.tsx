'use client';
import React, { useState } from 'react';
import { DraftBanner } from '../../components/DraftBanner';
import { GoldTicker } from '../../components/GoldTicker';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import policiesData from '../../data/policies.json';

export default function PoliciesPage() {
  const [activePolicyId, setActivePolicyId] = useState<string>('14-day-exchange');
  const activePolicy = policiesData.policies.find(p => p.id === activePolicyId) || policiesData.policies[0];

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <DraftBanner initialShow={true} />
      <GoldTicker />
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="text-center mb-10">
          <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold block mb-2">Governance & Integrity</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-maroon">Customer Policies</h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4 mb-4" />
          <p className="text-charcoal-muted text-sm max-w-xl mx-auto">
            Clear, transparent commitments designed for mutual confidence. Proposed draft terms pending management approval and legal review under applicable Indian regulations.
          </p>
        </div>

        {/* Draft Disclaimer Notice Callout */}
        <div className="bg-gradient-to-r from-maroon-dark to-maroon text-gold-light border border-gold p-5 rounded-md mb-8 shadow-sm">
          <div className="flex items-center gap-2 mb-2 font-serif text-lg font-bold text-white">
            <span>⚠️</span>
            <span>{policiesData.draftNotice.title}</span>
          </div>
          <p className="text-xs text-ivory/90 leading-relaxed">
            {policiesData.draftNotice.message}
          </p>
          <div className="text-[11px] text-gold-light/80 mt-2 font-mono">
            Status: {policiesData.draftNotice.effectiveDate} · Internal Flag: SHOW_DRAFT_POLICY_BANNER = true
          </div>
        </div>

        {/* Tabbed Policy Hub */}
        <div className="bg-white border border-gold/30 rounded-lg overflow-hidden shadow-sm">
          <div className="flex border-b border-gold/25 overflow-x-auto bg-ivory/60">
            {policiesData.policies.map(p => (
              <button
                key={p.id}
                onClick={() => setActivePolicyId(p.id)}
                className={`px-5 py-3 text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all border-b-2 ${
                  activePolicyId === p.id
                    ? 'border-maroon text-maroon bg-white'
                    : 'border-transparent text-charcoal-muted hover:text-maroon'
                }`}
              >
                {p.title.split('Policy')[0]}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-maroon mb-1">{activePolicy.title}</h2>
            <div className="text-xs text-magenta font-semibold tracking-wider uppercase mb-4">{activePolicy.tagline}</div>
            
            {activePolicy.proposedPromise && (
              <div className="bg-ivory border-l-4 border-gold p-4 rounded text-xs text-maroon font-medium mb-6">
                <strong>Proposed Promise:</strong> "{activePolicy.proposedPromise}"
              </div>
            )}

            {/* Terms List */}
            {activePolicy.terms && (
              <ol className="list-decimal pl-5 space-y-3 text-xs sm:text-sm text-charcoal leading-relaxed mb-6">
                {activePolicy.terms.map((term, idx) => (
                  <li key={idx}>{term}</li>
                ))}
              </ol>
            )}

            {/* Gold and Stone Component Breakdowns for Buyback */}
            {activePolicy.goldComponent && (
              <div className="mb-6 space-y-4 text-xs sm:text-sm">
                <div className="bg-ivory border border-gold/30 p-4 rounded">
                  <h4 className="font-bold text-maroon uppercase tracking-wider text-xs mb-2">Gold Component Valuation:</h4>
                  <ul className="list-disc pl-4 space-y-1.5 text-charcoal">
                    {activePolicy.goldComponent.map((gc, i) => <li key={i}>{gc}</li>)}
                  </ul>
                </div>

                {activePolicy.stoneComponent && (
                  <div className="bg-ivory border border-gold/30 p-4 rounded">
                    <h4 className="font-bold text-maroon uppercase tracking-wider text-xs mb-2">Diamond, Polki & Precious Stone Valuation:</h4>
                    <ul className="list-disc pl-4 space-y-1.5 text-charcoal">
                      {activePolicy.stoneComponent.map((sc, i) => <li key={i}>{sc}</li>)}
                    </ul>
                  </div>
                )}

                {activePolicy.additionalTerms && (
                  <div className="bg-ivory border border-gold/30 p-4 rounded">
                    <h4 className="font-bold text-maroon uppercase tracking-wider text-xs mb-2">General Valuation & Buyback Rules:</h4>
                    <ul className="list-disc pl-4 space-y-1.5 text-charcoal">
                      {activePolicy.additionalTerms.map((at, i) => <li key={i}>{at}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activePolicy.operationalNote && (
              <div className="bg-magenta/5 border-l-3 border-magenta p-3 text-xs text-maroon rounded">
                <strong>Operational Alignment:</strong> {activePolicy.operationalNote}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
