import React from 'react';
import Link from 'next/link';
import { DraftBanner } from '../../components/DraftBanner';
import { GoldTicker } from '../../components/GoldTicker';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function QualityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <DraftBanner />
      <GoldTicker />
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold block mb-2">Substantiated Purity</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-maroon">Quality & Authenticity Assurance</h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4 mb-4" />
          <p className="text-charcoal-muted text-sm max-w-xl mx-auto">
            At Jai Sri Ram Jewellers, every claim is verifiable. We provide government-mandated hallmarking, certified natural diamonds, and full transparency.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white border border-gold/40 p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold flex items-center justify-center text-maroon text-2xl mb-4">
              🔍
            </div>
            <h3 className="font-serif text-2xl text-maroon mb-2">BIS Hallmark with 6-Digit HUID</h3>
            <p className="text-xs text-charcoal leading-relaxed mb-3">
              100% of our gold jewellery is engraved with the official Bureau of Indian Standards hallmark and a unique 6-digit alphanumeric HUID (Hallmark Unique Identification) code.
            </p>
            <div className="bg-ivory p-3 rounded border border-gold/20 text-xs text-maroon">
              <strong>Check on App:</strong> You can verify the exact purity, centre of assaying, and date of hallmarking using the official <em>BIS Care</em> mobile app before taking delivery.
            </div>
          </div>

          <div className="bg-white border border-gold/40 p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold flex items-center justify-center text-maroon text-2xl mb-4">
              💎
            </div>
            <h3 className="font-serif text-2xl text-maroon mb-2">100% Natural Certified Diamonds</h3>
            <p className="text-xs text-charcoal leading-relaxed mb-3">
              We exclusively use natural diamonds mined ethically from the earth. Every solitaire diamond carries international dossiers from GIA (Gemological Institute of America) or IGI (International Gemological Institute).
            </p>
            <div className="bg-ivory p-3 rounded border border-gold/20 text-xs text-maroon">
              <strong>Grading Standards:</strong> We focus on D-F Colour, VVS-VS Clarity, and Triple Excellent Cut with zero undisclosed lab-grown stones.
            </div>
          </div>

          <div className="bg-white border border-gold/40 p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold flex items-center justify-center text-maroon text-2xl mb-4">
              👑
            </div>
            <h3 className="font-serif text-2xl text-maroon mb-2">Syndicate Polki & Jadau</h3>
            <p className="text-xs text-charcoal leading-relaxed mb-3">
              Authentic Polki represents uncut natural diamonds set in 24K pure gold foil (Daak). We do not use glass (kundan imitation), synthetic composite stones, or low-grade crystal pastes.
            </p>
            <div className="bg-ivory p-3 rounded border border-gold/20 text-xs text-maroon">
              <strong>Jaipur Mastercraft:</strong> The back of each polki piece is detailed with traditional Meenakari enamel, sealing the gold and ensuring heirloom durability.
            </div>
          </div>

          <div className="bg-white border border-gold/40 p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold flex items-center justify-center text-maroon text-2xl mb-4">
              ⚖
            </div>
            <h3 className="font-serif text-2xl text-maroon mb-2">Exact Weight & Price Transparency</h3>
            <p className="text-xs text-charcoal leading-relaxed mb-3">
              We separate gross weight from net metal weight on all documentation. You will never pay gold bullion rates on stone weights, wax, or enamel.
            </p>
            <div className="bg-ivory p-3 rounded border border-gold/20 text-xs text-maroon">
              <strong>Itemised Tax Invoice:</strong> Detailed breakdown of Gold Weight, Making Charges, Stone Values, and 3% GST.
            </div>
          </div>
        </div>

        {/* Know Your Jewellery Mini Guide */}
        <div className="bg-maroon-deep text-ivory border border-gold rounded-lg p-8 mb-12">
          <span className="text-gold-light text-xs uppercase tracking-[0.2em] font-semibold block mb-2">Consumer Empowerment</span>
          <h2 className="font-serif text-3xl text-gold-light mb-4">"Know Your Jewellery" Mini Guide</h2>
          <div className="space-y-4 text-xs text-ivory/80 leading-relaxed">
            <p>
              1. <strong>Never Buy Gold Without HUID:</strong> Under Indian law, 6-digit HUID hallmarking is mandatory. It ensures you receive exactly 91.6% (22K) or 75.0% (18K) pure gold.
            </p>
            <p>
              2. <strong>Understand Net vs Gross:</strong> If a piece weighs 80 grams and has 20 grams of uncut polki and pearls, the gold rate must only apply to 60 grams. Always check the net weight.
            </p>
            <p>
              3. <strong>Retain Purchase Invoices:</strong> Authentic hallmarked jewellers maintain permanent record archives. Your invoice ensures hassle-free lifetime buyback and complimentary ultrasonic maintenance.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/collections" className="bg-maroon text-gold-light px-8 py-3 rounded text-xs uppercase tracking-widest font-semibold hover:bg-maroon-dark transition-all">
            Browse Our Hallmarked Collections →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
