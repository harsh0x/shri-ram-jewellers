'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useCommerce } from '../context/CommerceContext';
import { formatINR } from '../lib/pricing';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    cartTotalCount,
    cartTotals,
    setIsCartOpen,
    wishlist,
    gold22kRate,
    benchmark22k,
    setIsRateModalOpen
  } = useCommerce();

  const diff22k = gold22kRate - benchmark22k;

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-gold/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Mobile menu trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-maroon text-2xl p-1"
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        {/* Brand Logo */}
        <Link href="/" className="inline-flex items-center group transition-transform duration-300 hover:scale-[1.03]" title="Jai Sri Ram Jewellers · Jaipur Since 1990">
          <img 
            src="/images/logo.png" 
            alt="Jai Sri Ram Jewellers Jaipur" 
            className="h-11 sm:h-13 md:h-14 w-auto max-w-[200px] sm:max-w-[240px] object-contain filter drop-shadow-[0_2px_6px_rgba(59,10,27,0.16)] transition-all duration-300 group-hover:drop-shadow-[0_4px_12px_rgba(101,21,47,0.25)]" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link href="/collections" className="text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-maroon transition-colors py-1 relative">
            Collections Vault
          </Link>
          <Link href="/heritage" className="text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-maroon transition-colors py-1 relative">
            Heritage 1990
          </Link>
          <Link href="/quality" className="text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-maroon transition-colors py-1 relative">
            Quality Assurance
          </Link>
          <Link href="/policies" className="text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-maroon transition-colors py-1 relative">
            Policies (Draft)
          </Link>
          <Link href="/contact" className="text-xs uppercase tracking-widest font-semibold text-charcoal hover:text-maroon transition-colors py-1 relative">
            Showroom Visit
          </Link>
        </nav>

        {/* Action Controls: Live Rate Adjuster, Wishlist, Cart Drawer */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Live Rate Trigger Button */}
          <button
            onClick={() => setIsRateModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-gold/60 rounded-full bg-gold/10 text-maroon hover:bg-gold/20 transition-all text-xs"
            title="Adjust live gold & diamond market rates"
          >
            <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            <span className="text-[11px] font-semibold">
              22K: {formatINR(gold22kRate)}/g
            </span>
            <span className="text-[10px] text-gold-dark">
              {diff22k !== 0 ? (diff22k > 0 ? `▲` : `▼`) : '⚙️'}
            </span>
          </button>

          {/* Wishlist Link */}
          <Link
            href="/wishlist"
            className="relative p-2 text-maroon hover:text-magenta transition-all rounded-full hover:bg-gold/10"
            aria-label="Saved pieces"
            title="Saved Heirlooms"
          >
            <span className="text-lg">♡</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-magenta text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Bag Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-maroon text-gold-light hover:bg-maroon-dark transition-all rounded shadow-sm text-xs uppercase tracking-wider font-semibold relative"
            aria-label="Shopping bag"
          >
            <span className="text-sm">🛍</span>
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-gold text-maroon-deep text-[11px] font-bold px-1.5 py-0.2 rounded-full min-w-[20px] text-center">
              {cartTotalCount}
            </span>
            {cartTotalCount > 0 && (
              <span className="hidden md:inline font-serif text-xs font-medium pl-1 text-ivory/90 border-l border-gold/40">
                {formatINR(cartTotals.finalTotal)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-maroon-deep text-ivory px-6 py-6 border-t border-gold/30 animate-fadeIn">
          <div className="flex justify-center mb-4 pb-3 border-b border-gold/20">
            <img 
              src="/images/logo.png" 
              alt="Jai Sri Ram Jewellers" 
              className="h-10 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(196,164,108,0.35)]" 
            />
          </div>
          <div className="mb-4 pb-3 border-b border-gold/30 flex justify-between items-center">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsRateModalOpen(true);
              }}
              className="flex items-center gap-2 text-xs text-gold-light bg-gold/10 border border-gold/40 px-3 py-1.5 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Live 22K Rate: {formatINR(gold22kRate)}/g (Adjust ⚙️)</span>
            </button>

            <Link
              href="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-gold-light flex items-center gap-1"
            >
              <span>♡ Saved ({wishlist.length})</span>
            </Link>
          </div>

          <nav className="flex flex-col gap-4">
            <Link href="/collections" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-widest py-2 border-b border-gold/20 hover:text-gold-light">
              Collections Vault
            </Link>
            <Link href="/heritage" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-widest py-2 border-b border-gold/20 hover:text-gold-light">
              Our 1990 Heritage
            </Link>
            <Link href="/quality" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-widest py-2 border-b border-gold/20 hover:text-gold-light">
              Quality & Hallmark Standards
            </Link>
            <Link href="/policies" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-widest py-2 border-b border-gold/20 hover:text-gold-light">
              Customer Policies (Draft)
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-widest py-2 border-b border-gold/20 hover:text-gold-light">
              Jaipur Showroom Visit
            </Link>
            <Link href="/checkout" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-widest py-2 text-gold-light hover:underline">
              Insured Checkout
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
