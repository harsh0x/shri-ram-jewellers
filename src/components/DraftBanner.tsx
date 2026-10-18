'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface DraftBannerProps {
  initialShow?: boolean;
}

export const DraftBanner: React.FC<DraftBannerProps> = ({ initialShow = true }) => {
  const [show, setShow] = useState(initialShow);

  if (!show) return null;

  return (
    <div className="bg-gradient-to-r from-maroon-dark to-maroon text-gold-light py-2 px-4 text-xs tracking-wide border-b border-gold/40 flex items-center justify-between z-50 relative">
      <div className="flex items-center gap-2 mx-auto text-center flex-wrap justify-center">
        <span className="bg-gold text-maroon-dark px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
          Draft Proposal
        </span>
        <span className="text-ivory-light">
          Website customer policies are proposed drafts subject to final management approval and legal review under Indian E-Commerce rules.
        </span>
        <Link href="/policies" className="underline font-semibold text-white hover:text-gold-light ml-1">
          Review Terms
        </Link>
      </div>
      <button 
        onClick={() => setShow(false)} 
        className="text-gold-light hover:text-white text-base leading-none pl-2"
        aria-label="Dismiss banner"
      >
        ✕
      </button>
    </div>
  );
};
