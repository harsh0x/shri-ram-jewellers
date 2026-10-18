'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DraftBanner } from '../components/DraftBanner';
import { GoldTicker } from '../components/GoldTicker';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import productsData from '../data/products.json';
import timelineData from '../data/timeline.json';
import configData from '../data/config.json';
import { formatINR } from '../lib/pricing';
import { Product } from '../types';
import { useCommerce } from '../context/CommerceContext';
import { ShoppableReels } from '../components/reels/ShoppableReels';

export default function HomePage() {
  const {
    calculateProductPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    gold22kRate,
    setIsRateModalOpen
  } = useCommerce();

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProducts = productsData.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  }).slice(0, 8); // Display top 8 on home

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      {/* Top Banner & Ticker */}
      <DraftBanner initialShow={configData.flags.showDraftPolicyBanner} />
      <GoldTicker />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#440D1F] via-maroon to-maroon-deep text-ivory py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle royal pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C4A46C_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 text-gold-light text-xs uppercase tracking-[0.22em] font-semibold mb-5 px-3.5 py-1.5 border border-gold/40 rounded-full bg-gold/10">
              <span>⚜</span>
              <span>Heritage Jaipur Fine Jewellery · Est. 1990</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.12] mb-6 text-ivory">
              Fine Jewellery.<br />
              <span className="text-gold-light italic">Fair Value.</span><br />
              Generations of Trust.
            </h1>
            <p className="text-ivory/80 text-base leading-relaxed mb-8 max-w-lg font-light">
              Founded in 1990 near Bikaner and anchored in Johari Bazar, Jaipur. Experience regal Kundan Polki, 22K hallmarked gold, and natural certified diamonds presented with 100% transparent formula pricing and lifetime buyback.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/collections"
                className="bg-gradient-to-r from-gold via-gold-light to-gold hover:from-gold-light hover:to-gold-light text-maroon-deep px-8 py-3.5 rounded text-xs uppercase tracking-widest font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Explore Heirlooms Vault →
              </Link>
              <button
                onClick={() => setIsRateModalOpen(true)}
                className="border border-gold text-gold-light hover:bg-gold hover:text-maroon-dark px-6 py-3.5 rounded text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2"
              >
                <span>⚙️ Adjust Live Rates</span>
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gold/30">
              <div>
                <div className="font-serif text-2xl lg:text-3xl text-gold-light font-bold">1990</div>
                <div className="text-[11px] text-ivory/70 uppercase tracking-wider">Heritage Roots</div>
              </div>
              <div className="border-l border-gold/30 pl-6">
                <div className="font-serif text-2xl lg:text-3xl text-gold-light font-bold">100%</div>
                <div className="text-[11px] text-ivory/70 uppercase tracking-wider">BIS 916 & HUID</div>
              </div>
              <div className="border-l border-gold/30 pl-6">
                <div className="font-serif text-2xl lg:text-3xl text-gold-light font-bold">14-Day</div>
                <div className="text-[11px] text-ivory/70 uppercase tracking-wider">Exchange Promise</div>
              </div>
            </div>
          </div>

          {/* Jharokha Window Frame */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md h-[480px] sm:h-[540px] rounded-t-[220px] rounded-b-xl border-2 border-gold overflow-hidden shadow-2xl bg-black/40 group">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop"
                alt="Mehrangarh Royal Polki & Emerald Choker"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-maroon-deep/95 backdrop-blur-md border border-gold p-4 rounded text-center w-[88%] shadow-2xl">
                <div className="font-serif text-lg text-gold-light font-bold">The Mehrangarh Polki Choker</div>
                <div className="text-[11px] text-ivory/70 tracking-wider mb-2">22K Gold · 18.20ct Syndicate Polki · Zambian Emeralds</div>
                <div className="flex gap-2 justify-center">
                  <Link
                    href="/product/mehrangarh-royal-polki-emerald-choker"
                    className="bg-gold hover:bg-gold-light text-maroon-deep text-[11px] uppercase tracking-wider font-bold px-3 py-1.5 rounded transition-all"
                  >
                    Inspect Details →
                  </Link>
                  <button
                    onClick={() => {
                      const p = productsData.find(item => item.slug === 'mehrangarh-royal-polki-emerald-choker');
                      if (p) addToCart(p as unknown as Product);
                    }}
                    className="bg-maroon-light hover:bg-maroon text-gold-light text-[11px] uppercase tracking-wider font-bold px-3 py-1.5 rounded transition-all"
                  >
                    + Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Pillars Strip */}
      <section className="bg-white border-b border-gold/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-maroon text-lg flex-shrink-0">🏛</div>
            <div>
              <div className="text-xs font-bold text-maroon uppercase tracking-wider">BIS Hallmarked</div>
              <div className="text-[11px] text-charcoal-muted">100% 916 & HUID Laser Inscribed</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-maroon text-lg flex-shrink-0">📜</div>
            <div>
              <div className="text-xs font-bold text-maroon uppercase tracking-wider">Formula Pricing</div>
              <div className="text-[11px] text-charcoal-muted">Net Gold × Live Bullion Rate</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-maroon text-lg flex-shrink-0">🔄</div>
            <div>
              <div className="text-xs font-bold text-maroon uppercase tracking-wider">14-Day Exchange</div>
              <div className="text-[11px] text-charcoal-muted">100% Invoice Value Replacement</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-maroon text-lg flex-shrink-0">💎</div>
            <div>
              <div className="text-xs font-bold text-maroon uppercase tracking-wider">IGI / GIA Certified</div>
              <div className="text-[11px] text-charcoal-muted">Zero Conflict Natural Diamonds</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-maroon text-lg flex-shrink-0">🛡️</div>
            <div>
              <div className="text-xs font-bold text-maroon uppercase tracking-wider">Insured Shipping</div>
              <div className="text-[11px] text-charcoal-muted">Direct Hand-off with OTP</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections Gallery */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-bold block mb-1">
              Curated Heirlooms
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-maroon font-bold">
              Signature Royal Collections
            </h2>
            <p className="text-charcoal-muted text-xs sm:text-sm mt-1">
              Prices calculate live based on active 22K rate: <strong>{formatINR(gold22kRate)}/g</strong>
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {['all', 'polki', 'gold', 'diamond', 'bridal'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold border transition-all ${
                  activeCategory === cat
                    ? 'bg-maroon text-gold-light border-maroon shadow-sm'
                    : 'bg-white text-charcoal border-gold/40 hover:border-gold'
                }`}
              >
                {cat === 'all' ? 'All Heirlooms' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(p => {
            const pricing = calculateProductPrice(p as unknown as Product);
            const saved = isInWishlist(p.id);

            return (
              <div
                key={p.id}
                className="bg-white border border-gold/30 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-64 bg-ivory overflow-hidden">
                    <Link href={`/product/${p.slug}`} className="block w-full h-full">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <span className="absolute top-2.5 left-2.5 bg-maroon text-gold-light text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow">
                      {p.tag || `${p.purity} Gold`}
                    </span>

                    <button
                      onClick={() => toggleWishlist(p as unknown as Product)}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 border border-gold/30 flex items-center justify-center text-maroon hover:text-magenta text-sm transition-all shadow hover:scale-110"
                      title={saved ? 'Remove from saved' : 'Save to wishlist'}
                    >
                      {saved ? '♥' : '♡'}
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="text-[10px] text-gold-dark uppercase tracking-widest font-semibold">
                      {p.category} · {p.subCategory}
                    </div>
                    <Link
                      href={`/product/${p.slug}`}
                      className="font-serif text-lg text-maroon font-bold line-clamp-1 mt-1 mb-1 hover:text-magenta block"
                    >
                      {p.name}
                    </Link>
                    <p className="text-xs text-charcoal-muted line-clamp-2 leading-relaxed mb-3">
                      {p.description}
                    </p>
                    <div className="text-[11px] text-charcoal/80 bg-ivory p-2 rounded border border-gold/20 mb-2 flex justify-between">
                      <span>Net Gold: <strong>{p.netGoldWeight}g</strong></span>
                      <span>Purity: <strong>{p.purity}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-gold/20 mt-2">
                  <div className="flex items-baseline justify-between py-2">
                    <span className="text-[10px] uppercase text-charcoal-muted">Formula Price:</span>
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
                      Details →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/collections"
            className="inline-block bg-maroon hover:bg-maroon-dark text-gold-light px-8 py-3.5 rounded text-xs uppercase tracking-widest font-bold shadow transition-all"
          >
            View All 24 Heirlooms in Vault →
          </Link>
        </div>
      </section>

      {/* Shoppable Reels: 3D Coverflow Video Carousel */}
      <ShoppableReels />

      {/* Heritage Timeline Milestone */}
      <section className="bg-gradient-to-b from-[#2B0814] via-maroon-deep to-[#2B0814] text-ivory py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-gold/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold-light text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
              Three Decades of Integrity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-bold">
              The Bamalwa Heritage (1990 — Present)
            </h2>
            <p className="text-ivory/70 text-xs sm:text-sm max-w-xl mx-auto mt-2 font-light">
              Originating in wholesale craftsmanship near Bikaner, flourishing in Jaipur's royal Johari Bazar, and led today by Veer Bamalwa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {timelineData.map(milestone => (
              <div key={milestone.year} className="bg-white/5 border border-gold/30 p-6 rounded-lg backdrop-blur-sm relative hover:border-gold transition-all">
                <span className="font-serif text-3xl text-gold-light font-bold block mb-2">{milestone.year}</span>
                <h3 className="font-serif text-lg text-ivory mb-2">{milestone.title}</h3>
                <p className="text-xs text-ivory/70 leading-relaxed font-light">{milestone.summary}</p>
                <div className="text-[10px] text-gold-light/60 mt-3 uppercase tracking-wider">
                  📍 {milestone.location}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/heritage"
              className="inline-block border border-gold text-gold-light hover:bg-gold hover:text-maroon-deep px-6 py-2.5 rounded text-xs uppercase tracking-widest font-semibold transition-all"
            >
              Read Full Founder Story & Vision →
            </Link>
          </div>
        </div>
      </section>

      {/* Showroom Visit CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white border-2 border-gold rounded-xl p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-bold block mb-2">
              Exclusive In-Person Consultation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-maroon font-bold mb-4">
              Visit Our Johari Bazar Showroom in Jaipur
            </h2>
            <p className="text-charcoal-muted text-sm leading-relaxed mb-6">
              Experience the weight of pure 22K gold and inspect syndicate polki diamonds through high-magnification jeweler loupes in our private VIP salon. Complimentary refreshments and personalized bridal styling consultations.
            </p>
            <div className="space-y-2 text-xs text-charcoal mb-6">
              <div>📍 <strong>Address:</strong> Johari Bazar, Near Palace Quarter, Jaipur, Rajasthan 302003</div>
              <div>⏰ <strong>Hours:</strong> Monday to Sunday · 11:00 AM – 8:30 PM IST</div>
              <div>📞 <strong>Concierge Desk:</strong> +91 141 256 7890 / +91 98290 19900</div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-maroon hover:bg-maroon-dark text-gold-light px-7 py-3 rounded text-xs uppercase tracking-widest font-semibold shadow transition-all"
              >
                Book Private Appointment
              </Link>
              <a
                href="https://wa.me/919829019900?text=Hello%20Jai%20Sri%20Ram%20Jewellers,%20I%20would%20like%20to%20plan%20a%20showroom%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-maroon text-maroon hover:bg-maroon hover:text-white px-6 py-3 rounded text-xs uppercase tracking-widest font-semibold transition-all"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden border border-gold/40 shadow-lg h-80">
            <img
              src="https://images.unsplash.com/photo-1611591475152-473559194207?q=80&w=1000&auto=format&fit=crop"
              alt="Jaipur Showroom VIP Salon"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
