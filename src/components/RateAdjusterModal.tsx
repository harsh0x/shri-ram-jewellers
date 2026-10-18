'use client';
import React from 'react';
import { useCommerce } from '../context/CommerceContext';
import { formatINR } from '../lib/pricing';

export const RateAdjusterModal: React.FC = () => {
  const {
    gold24kRate,
    gold22kRate,
    gold18kRate,
    diamondMultiplier,
    benchmark24k,
    benchmark22k,
    benchmark18k,
    adjustGoldRate,
    setGoldRate,
    setDiamondMultiplier,
    resetRates,
    isRateModalOpen,
    setIsRateModalOpen
  } = useCommerce();

  if (!isRateModalOpen) return null;

  const diff22k = gold22kRate - benchmark22k;
  const diffPercent = ((diff22k / benchmark22k) * 100).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border-2 border-gold rounded-xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Architectural corner ornaments */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold m-2 pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold m-2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold m-2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold m-2 pointer-events-none" />

        <button
          onClick={() => setIsRateModalOpen(false)}
          className="absolute top-4 right-4 text-maroon hover:text-magenta text-2xl font-bold transition-all z-10"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-gold-dark text-[11px] uppercase tracking-[0.25em] font-bold mb-2">
            <span>⚜</span>
            <span>Jaipur Bullion Market Live Engine</span>
            <span>⚜</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-maroon font-bold">
            Live Gold & Diamond Rate Adjuster
          </h2>
          <p className="text-xs text-charcoal-muted mt-2 max-w-md mx-auto leading-relaxed">
            Adjust bullion rates to simulate price fluctuations. Every piece across our catalog and shopping bag recalculates transparently using exact pure gold gram weight.
          </p>
        </div>

        {/* Current status pill */}
        <div className="bg-ivory border border-gold/40 rounded-lg p-3.5 mb-6 flex items-center justify-between text-xs">
          <div>
            <span className="text-charcoal-muted uppercase text-[10px] tracking-wider block">Active 22K (916) Purity:</span>
            <span className="font-serif text-lg font-bold text-maroon">{formatINR(gold22kRate)} / gram</span>
          </div>
          <div className="text-right">
            <span className="text-charcoal-muted uppercase text-[10px] tracking-wider block">Variance vs Jaipur Benchmark:</span>
            <span
              className={`font-semibold inline-flex items-center gap-1 ${
                diff22k > 0 ? 'text-green-700' : diff22k < 0 ? 'text-red-700' : 'text-charcoal'
              }`}
            >
              {diff22k > 0 ? `▲ +${formatINR(diff22k)} (+${diffPercent}%)` : diff22k < 0 ? `▼ -${formatINR(Math.abs(diff22k))} (${diffPercent}%)` : '● At Official Benchmark'}
            </span>
          </div>
        </div>

        {/* Adjusters */}
        <div className="space-y-5">
          {/* 22K Gold (Primary) */}
          <div className="border border-gold/30 rounded-lg p-4 bg-white hover:border-gold transition-all">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="font-serif text-base font-bold text-maroon">22K Gold (916 Hallmarked)</span>
                <span className="text-[11px] text-charcoal-muted block">Used in Polki, Bridal & Heritage Gold</span>
              </div>
              <div className="text-right">
                <span className="font-serif text-xl font-bold text-gold-dark">{formatINR(gold22kRate)}</span>
                <span className="text-[10px] text-charcoal-muted block">per gram</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => adjustGoldRate('22k', -100)}
                className="flex-1 bg-ivory hover:bg-gold/20 text-maroon border border-gold/40 text-xs py-1.5 rounded font-semibold transition-all"
              >
                - ₹100
              </button>
              <button
                onClick={() => adjustGoldRate('22k', -50)}
                className="flex-1 bg-ivory hover:bg-gold/20 text-maroon border border-gold/40 text-xs py-1.5 rounded font-semibold transition-all"
              >
                - ₹50
              </button>
              <button
                onClick={() => adjustGoldRate('22k', +50)}
                className="flex-1 bg-ivory hover:bg-gold/20 text-maroon border border-gold/40 text-xs py-1.5 rounded font-semibold transition-all"
              >
                + ₹50
              </button>
              <button
                onClick={() => adjustGoldRate('22k', +100)}
                className="flex-1 bg-ivory hover:bg-gold/20 text-maroon border border-gold/40 text-xs py-1.5 rounded font-semibold transition-all"
              >
                + ₹100
              </button>
            </div>
          </div>

          {/* 18K Gold */}
          <div className="border border-gold/30 rounded-lg p-4 bg-white hover:border-gold transition-all">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="font-serif text-base font-bold text-maroon">18K Gold (750 Purity)</span>
                <span className="text-[11px] text-charcoal-muted block">Standard for Natural Diamonds & Solitaires</span>
              </div>
              <div className="text-right">
                <span className="font-serif text-xl font-bold text-gold-dark">{formatINR(gold18kRate)}</span>
                <span className="text-[10px] text-charcoal-muted block">per gram</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => adjustGoldRate('18k', -100)}
                className="flex-1 bg-ivory hover:bg-gold/20 text-maroon border border-gold/40 text-xs py-1.5 rounded font-semibold transition-all"
              >
                - ₹100
              </button>
              <button
                onClick={() => adjustGoldRate('18k', -50)}
                className="flex-1 bg-ivory hover:bg-gold/20 text-maroon border border-gold/40 text-xs py-1.5 rounded font-semibold transition-all"
              >
                - ₹50
              </button>
              <button
                onClick={() => adjustGoldRate('18k', +50)}
                className="flex-1 bg-ivory hover:bg-gold/20 text-maroon border border-gold/40 text-xs py-1.5 rounded font-semibold transition-all"
              >
                + ₹50
              </button>
              <button
                onClick={() => adjustGoldRate('18k', +100)}
                className="flex-1 bg-ivory hover:bg-gold/20 text-maroon border border-gold/40 text-xs py-1.5 rounded font-semibold transition-all"
              >
                + ₹100
              </button>
            </div>
          </div>

          {/* 24K Pure Gold */}
          <div className="border border-gold/30 rounded-lg p-4 bg-white hover:border-gold transition-all">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="font-serif text-base font-bold text-maroon">24K Gold (999 Pure Bullion)</span>
                <span className="text-[11px] text-charcoal-muted block">Coins, Bars & Base Benchmark</span>
              </div>
              <div className="text-right">
                <span className="font-serif text-xl font-bold text-gold-dark">{formatINR(gold24kRate)}</span>
                <span className="text-[10px] text-charcoal-muted block">per gram</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => adjustGoldRate('24k', -100)}
                className="flex-1 bg-ivory hover:bg-gold/20 text-maroon border border-gold/40 text-xs py-1.5 rounded font-semibold transition-all"
              >
                - ₹100
              </button>
              <button
                onClick={() => adjustGoldRate('24k', -50)}
                className="flex-1 bg-ivory hover:bg-gold/20 text-maroon border border-gold/40 text-xs py-1.5 rounded font-semibold transition-all"
              >
                - ₹50
              </button>
              <button
                onClick={() => adjustGoldRate('24k', +50)}
                className="flex-1 bg-ivory hover:bg-gold/20 text-maroon border border-gold/40 text-xs py-1.5 rounded font-semibold transition-all"
              >
                + ₹50
              </button>
              <button
                onClick={() => adjustGoldRate('24k', +100)}
                className="flex-1 bg-ivory hover:bg-gold/20 text-maroon border border-gold/40 text-xs py-1.5 rounded font-semibold transition-all"
              >
                + ₹100
              </button>
            </div>
          </div>

          {/* Natural Diamond / Polki Index */}
          <div className="border border-gold/30 rounded-lg p-4 bg-white hover:border-gold transition-all">
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="font-serif text-base font-bold text-maroon">Natural Diamond & Polki Index</span>
                <span className="text-[11px] text-charcoal-muted block">IGI / GIA Certified Solitaire & Gemstone index</span>
              </div>
              <div className="text-right">
                <span className="font-serif text-base font-bold text-gold-dark">
                  {Math.round(diamondMultiplier * 100)}%
                </span>
                <span className="text-[10px] text-charcoal-muted block">
                  {diamondMultiplier > 1 ? `+${Math.round((diamondMultiplier - 1) * 100)}% premium` : diamondMultiplier < 1 ? `-${Math.round((1 - diamondMultiplier) * 100)}% market off` : 'Standard index'}
                </span>
              </div>
            </div>

            <input
              type="range"
              min="0.8"
              max="1.3"
              step="0.05"
              value={diamondMultiplier}
              onChange={e => setDiamondMultiplier(parseFloat(e.target.value))}
              className="w-full accent-maroon cursor-pointer mt-2"
            />
            <div className="flex justify-between text-[10px] text-charcoal-muted mt-1">
              <span>-20% Dip</span>
              <span>Benchmark (100%)</span>
              <span>+30% Premium</span>
            </div>
          </div>
        </div>

        {/* Quick Presets & Actions */}
        <div className="mt-6 pt-5 border-t border-gold/30 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => {
                adjustGoldRate('22k', -200);
                adjustGoldRate('18k', -150);
              }}
              className="px-3 py-1.5 bg-ivory text-maroon hover:bg-gold/20 border border-gold/40 text-[11px] rounded font-semibold"
            >
              📉 Market Dip (-₹200)
            </button>
            <button
              onClick={() => {
                adjustGoldRate('22k', +250);
                adjustGoldRate('18k', +200);
              }}
              className="px-3 py-1.5 bg-ivory text-maroon hover:bg-gold/20 border border-gold/40 text-[11px] rounded font-semibold"
            >
              📈 Bullion Surge (+₹250)
            </button>
            <button
              onClick={resetRates}
              className="px-3 py-1.5 bg-ivory text-charcoal-muted hover:text-maroon border border-gray-300 text-[11px] rounded font-medium"
            >
              ↺ Reset Benchmark
            </button>
          </div>

          <button
            onClick={() => setIsRateModalOpen(false)}
            className="bg-maroon hover:bg-maroon-dark text-gold-light px-6 py-2 rounded text-xs uppercase tracking-wider font-bold transition-all shadow"
          >
            Apply & View Catalog
          </button>
        </div>
      </div>
    </div>
  );
};
