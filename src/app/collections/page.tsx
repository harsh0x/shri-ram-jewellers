'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { DraftBanner } from '../../components/DraftBanner';
import { GoldTicker } from '../../components/GoldTicker';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import productsData from '../../data/products.json';
import { formatINR } from '../../lib/pricing';
import { Product } from '../../types';
import { useCommerce } from '../../context/CommerceContext';

export default function CollectionsPage() {
  const {
    calculateProductPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    gold22kRate,
    setIsRateModalOpen
  } = useCommerce();

  const [category, setCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const filtered = productsData.filter(p => {
    const matchCat = category === 'all' || p.category === category;
    const matchSearch = !search || 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.stoneDetails.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sortBy === 'price-asc') {
    filtered.sort((a,b) => calculateProductPrice(a as unknown as Product).finalTotal - calculateProductPrice(b as unknown as Product).finalTotal);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a,b) => calculateProductPrice(b as unknown as Product).finalTotal - calculateProductPrice(a as unknown as Product).finalTotal);
  } else if (sortBy === 'weight-desc') {
    filtered.sort((a,b) => b.netGoldWeight - a.netGoldWeight);
  }

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <DraftBanner />
      <GoldTicker />
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
            Vault of 24 Royal Heirlooms
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-maroon font-bold">
            Fine Jewellery Collections
          </h1>
          <p className="text-charcoal-muted text-sm max-w-xl mx-auto mt-3">
            Handcrafted in Jaipur across 22K Gold, Polki Jadau, and natural diamonds. Priced transparently using active bullion market rates with 100% fair value.
          </p>

          {/* Live rate notification pill */}
          <div className="mt-4 inline-flex items-center gap-2 bg-white border border-gold/40 px-4 py-1.5 rounded-full text-xs text-charcoal shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active 22K Bullion Rate: <strong>{formatINR(gold22kRate)} / gram</strong></span>
            <button
              onClick={() => setIsRateModalOpen(true)}
              className="text-maroon font-semibold underline hover:text-magenta ml-1"
            >
              Adjust Live Rates ⚙️
            </button>
          </div>
        </div>

        {/* Filter controls */}
        <div className="bg-white border border-gold/30 p-5 rounded-lg mb-8 flex flex-wrap gap-4 items-center justify-between shadow-sm">
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'all', label: 'All Pieces (24)' },
              { id: 'polki', label: 'Royal Polki & Jadau' },
              { id: 'gold', label: '22K Heritage Gold' },
              { id: 'diamond', label: 'Fine Diamonds' },
              { id: 'bridal', label: 'Bridal High Jewellery' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCategory(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold border transition-all ${
                  category === tab.id
                    ? 'bg-maroon text-gold-light border-maroon shadow-sm'
                    : 'bg-ivory text-charcoal border-gold/40 hover:border-gold'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3 items-center flex-wrap">
            <input
              type="text"
              placeholder="Search by gem, style, design..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="px-3.5 py-1.5 text-xs border border-gold/40 rounded-full bg-ivory focus:bg-white focus:outline-none focus:border-maroon w-56"
            />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-1.5 text-xs border border-gold/40 rounded-full bg-ivory focus:outline-none text-charcoal"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="weight-desc">Gold Weight: Heaviest First</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(p => {
            const pricing = calculateProductPrice(p as unknown as Product);
            const saved = isInWishlist(p.id);

            return (
              <div 
                key={p.id} 
                id={p.id}
                className="bg-white border border-gold/25 rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container with links and quick actions */}
                  <div className="relative h-64 bg-ivory overflow-hidden">
                    <Link href={`/product/${p.slug}`} className="block w-full h-full">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Tag */}
                    <span className="absolute top-2.5 left-2.5 bg-maroon text-gold-light text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow">
                      {p.tag || `${p.purity} Gold`}
                    </span>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(p as unknown as Product)}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 border border-gold/30 flex items-center justify-center text-maroon hover:text-magenta text-sm transition-all shadow hover:scale-110"
                      title={saved ? 'Remove from saved' : 'Save to wishlist'}
                    >
                      {saved ? '♥' : '♡'}
                    </button>

                    {/* Quick View Button on hover */}
                    <button
                      onClick={() => setActiveModalProduct(p as unknown as Product)}
                      className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-maroon-deep/90 text-gold-light text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full border border-gold/40 opacity-0 group-hover:opacity-100 transition-all shadow hover:bg-maroon whitespace-nowrap"
                    >
                      🔍 Quick Formula View
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="text-[10px] text-gold-dark uppercase tracking-widest font-semibold">
                      {p.category} · {p.subCategory}
                    </div>
                    <Link
                      href={`/product/${p.slug}`}
                      className="font-serif text-lg text-maroon font-bold line-clamp-1 mt-1 mb-1.5 hover:text-magenta block"
                    >
                      {p.name}
                    </Link>
                    <p className="text-xs text-charcoal-muted line-clamp-2 leading-relaxed mb-3">
                      {p.description}
                    </p>
                    <div className="text-[11px] text-charcoal/90 bg-ivory p-2 rounded border border-gold/20 mb-2 flex justify-between">
                      <span>Net Gold: <strong>{p.netGoldWeight}g</strong></span>
                      <span>Purity: <strong>{p.purity}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions: Price and Add to Bag */}
                <div className="p-4 pt-0 border-t border-gold/20 mt-2">
                  <div className="flex items-baseline justify-between py-2">
                    <span className="text-[10px] uppercase text-charcoal-muted">Transparent Price:</span>
                    <span className="font-serif text-xl font-bold text-maroon">{formatINR(pricing.finalTotal)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      onClick={() => addToCart(p as unknown as Product)}
                      className="bg-maroon text-gold-light hover:bg-maroon-dark text-xs uppercase tracking-wider font-bold py-2 rounded transition-all shadow-sm"
                    >
                      + Add to Bag
                    </button>
                    <Link
                      href={`/product/${p.slug}`}
                      className="text-center border border-gold text-maroon hover:bg-gold/15 text-xs uppercase tracking-wider font-semibold py-2 rounded transition-all"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Quick Price Breakdown */}
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border-2 border-gold rounded-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
              <button 
                onClick={() => setActiveModalProduct(null)} 
                className="absolute top-4 right-4 text-maroon text-2xl font-bold hover:text-magenta transition-all"
              >
                ✕
              </button>

              <div className="flex gap-4 items-start mb-4 pb-4 border-b border-gold/30">
                <img
                  src={activeModalProduct.images[0]}
                  alt={activeModalProduct.name}
                  className="w-24 h-24 object-cover rounded-lg border border-gold/30 flex-shrink-0"
                />
                <div>
                  <div className="text-xs uppercase text-gold-dark tracking-widest font-bold mb-1">
                    {activeModalProduct.category} · {activeModalProduct.purity} Gold
                  </div>
                  <h2 className="font-serif text-2xl text-maroon font-bold leading-tight">
                    {activeModalProduct.name}
                  </h2>
                  <p className="text-xs text-charcoal-muted mt-1">{activeModalProduct.description}</p>
                </div>
              </div>

              {/* Price Breakdown Details */}
              {(() => {
                const pricing = calculateProductPrice(activeModalProduct);
                return (
                  <div className="bg-ivory border border-gold p-4 rounded mb-4 text-xs space-y-2">
                    <div className="font-bold text-maroon uppercase tracking-wider text-xs border-b border-gold/30 pb-1 mb-2 flex justify-between">
                      <span>100% Transparent Price Formula Engine</span>
                      <span className="text-gold-dark">Live Benchmark</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pure Gold Value ({activeModalProduct.netGoldWeight}g @ {formatINR(pricing.goldRatePerGram)}/g):</span>
                      <strong className="text-maroon">{formatINR(pricing.goldValue)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Artisanal Making Charges ({activeModalProduct.makingChargePercent}%):</span>
                      <strong className="text-maroon">{formatINR(pricing.makingCharges)}</strong>
                    </div>
                    {pricing.stoneValue > 0 && (
                      <div className="flex justify-between">
                        <span>Natural Stone Value ({activeModalProduct.stoneDetails}):</span>
                        <strong className="text-maroon">{formatINR(pricing.stoneValue)}</strong>
                      </div>
                    )}
                    <div className="flex justify-between pt-1 border-t border-gold/20">
                      <span>Taxable Subtotal:</span>
                      <span>{formatINR(pricing.taxableSubtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Government GST (3%):</span>
                      <span>{formatINR(pricing.gstAmount)}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-maroon pt-2 border-t border-gold">
                      <span>Final Net Payable Price:</span>
                      <span className="font-serif text-xl">{formatINR(pricing.finalTotal)}</span>
                    </div>
                  </div>
                );
              })()}

              <div className="text-[11px] text-charcoal-muted leading-relaxed bg-white border border-gold/30 p-3 rounded mb-5">
                <strong>Our Heritage Purity Guarantee:</strong> {activeModalProduct.hallmark} · {activeModalProduct.certification}. 14-day exchange guaranteed at 100% of invoice value without deduction.
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    addToCart(activeModalProduct);
                    setActiveModalProduct(null);
                  }}
                  className="flex-1 bg-maroon hover:bg-maroon-dark text-gold-light py-2.5 rounded text-xs uppercase tracking-wider font-bold transition-all shadow"
                >
                  🛍 Add to Shopping Bag
                </button>
                <Link
                  href={`/product/${activeModalProduct.slug}`}
                  onClick={() => setActiveModalProduct(null)}
                  className="flex-1 text-center border border-maroon text-maroon hover:bg-maroon hover:text-white py-2.5 rounded text-xs uppercase tracking-wider font-semibold transition-all"
                >
                  View Full Specifications →
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
