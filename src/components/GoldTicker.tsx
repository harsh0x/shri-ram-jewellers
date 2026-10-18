'use client';
import React from 'react';
import { useCommerce } from '../context/CommerceContext';
import { formatINR } from '../lib/pricing';

export const GoldTicker: React.FC = () => {
  const {
    gold24kRate,
    gold22kRate,
    gold18kRate,
    benchmark24k,
    benchmark22k,
    benchmark18k,
    setIsRateModalOpen
  } = useCommerce();

  const diff24k = gold24kRate - benchmark24k;
  const diff22k = gold22kRate - benchmark22k;
  const diff18k = gold18kRate - benchmark18k;

  return (
    <div className="bg-maroon-deep text-ivory/80 text-xs py-2 px-4 border-b border-gold/25 flex items-center justify-between overflow-x-auto whitespace-nowrap">
      <div className="flex items-center gap-5 sm:gap-7 mx-auto max-w-7xl w-full justify-between">
        <div className="flex items-center gap-2 text-gold-light">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <strong className="font-semibold tracking-wider text-[11px] uppercase">Jaipur Bullion Market Live:</strong>
        </div>

        <div className="flex items-center gap-5 overflow-x-auto py-0.5">
          {/* 24K */}
          <div className="flex items-center gap-1.5">
            <span className="text-ivory/60 text-[11px]">24K Pure:</span>
            <span className="text-white font-bold">{formatINR(gold24kRate)}/g</span>
            <span className={`text-[10px] font-semibold ${diff24k >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {diff24k !== 0 ? (diff24k > 0 ? `+₹${diff24k}` : `-₹${Math.abs(diff24k)}`) : '+₹240'}
            </span>
          </div>

          {/* 22K BIS Hallmarked */}
          <div className="flex items-center gap-1.5 bg-gold/15 px-2.5 py-0.5 rounded border border-gold/30">
            <span className="text-gold-light font-medium text-[11px]">22K (916):</span>
            <span className="text-white font-bold">{formatINR(gold22kRate)}/g</span>
            <span className={`text-[10px] font-semibold ${diff22k >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
              {diff22k !== 0 ? (diff22k > 0 ? `+₹${diff22k}` : `-₹${Math.abs(diff22k)}`) : '+₹220'}
            </span>
          </div>

          {/* 18K Diamond Setting */}
          <div className="flex items-center gap-1.5">
            <span className="text-ivory/60 text-[11px]">18K Diamond:</span>
            <span className="text-white font-bold">{formatINR(gold18kRate)}/g</span>
            <span className={`text-[10px] font-semibold ${diff18k >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {diff18k !== 0 ? (diff18k > 0 ? `+₹${diff18k}` : `-₹${Math.abs(diff18k)}`) : '+₹180'}
            </span>
          </div>
        </div>

        {/* Adjust Rates Trigger */}
        <button
          onClick={() => setIsRateModalOpen(true)}
          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-gold to-[#9F7F3B] hover:from-gold-light hover:to-gold text-maroon-deep font-bold px-3 py-1 rounded text-[10px] uppercase tracking-wider transition-all shadow-sm flex-shrink-0"
        >
          <span>⚙️ Adjust Rates</span>
        </button>
      </div>
    </div>
  );
};
