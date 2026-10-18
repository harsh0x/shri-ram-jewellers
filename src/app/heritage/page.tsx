import React from 'react';
import Link from 'next/link';
import { DraftBanner } from '../../components/DraftBanner';
import { GoldTicker } from '../../components/GoldTicker';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import timelineData from '../../data/timeline.json';

export default function HeritagePage() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <DraftBanner />
      <GoldTicker />
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-[#3E0A1B] via-maroon to-maroon-deep text-ivory py-16 lg:py-24 px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="max-w-4xl mx-auto">
            <span className="text-gold-light text-xs uppercase tracking-[0.25em] font-semibold block mb-3">Our Heritage Since 1990</span>
            <h1 className="font-serif text-4xl sm:text-6xl text-ivory mb-6">Fine Jewellery. Fair Value. Generations of Trust.</h1>
            <p className="text-ivory/80 text-base leading-relaxed max-w-2xl mx-auto font-light">
              A family journey spanning more than three decades—from wholesale jewellery near Bikaner to our prestigious retail showroom in the Pink City of Jaipur.
            </p>
          </div>
        </section>

        {/* Founder & Vision */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-white border border-gold/40 p-8 rounded-lg shadow-sm">
              <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">1990 Founder</span>
              <h2 className="font-serif text-3xl text-maroon mt-1 mb-4">Shri Jai Hanuman Bamalwa</h2>
              <p className="text-xs text-charcoal leading-relaxed mb-4">
                The founder of the business, Shri Jai Hanuman Bamalwa, began the family's jewellery journey in 1990 as a wholesaler near Bikaner. His experience and the relationships developed over the years laid the foundation for the business that exists today.
              </p>
              <p className="text-xs text-charcoal leading-relaxed mb-4">
                His legacy represents integrity, experience, fair dealing and lasting customer relationships. He established our golden rule: <em>"Integrity is the only metal that never tarnishes."</em>
              </p>
              <div className="border-t border-gold/25 pt-4 text-xs font-serif italic text-maroon">
                Founder & Master Craftsman · Roots in Bikaner, Rajasthan
              </div>
            </div>

            <div className="bg-white border border-gold/40 p-8 rounded-lg shadow-sm">
              <span className="text-xs uppercase tracking-widest text-gold-dark font-bold">Carrying The Legacy Forward</span>
              <h2 className="font-serif text-3xl text-maroon mt-1 mb-4">Veer Bamalwa</h2>
              <p className="text-xs text-charcoal leading-relaxed mb-4">
                Veer Bamalwa represents the next chapter of Jai Sri Ram Jewellers. Building on his father's bedrock, his vision is to transform a respected family business into a modern jewellery brand.
              </p>
              <p className="text-xs text-charcoal leading-relaxed mb-4">
                His focus is on combining the experience and values of a family business with contemporary design, verified BIS hallmarking, transparent pricing formulas, and an elevated customer experience.
              </p>
              <div className="border-t border-gold/25 pt-4 text-xs font-serif italic text-maroon">
                Managing Director · Modern Luxury Vision
              </div>
            </div>
          </div>
        </section>

        {/* Milestone Timeline */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-gold/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold block mb-2">Decades of Craft</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-maroon">The Milestones</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {timelineData.map(node => (
                <div key={node.year} className="bg-ivory border border-gold/30 p-6 rounded-md">
                  <div className="font-serif text-3xl font-bold text-maroon mb-1">{node.year}</div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-gold-dark mb-2">{node.location}</div>
                  <h4 className="font-serif text-lg font-semibold text-maroon mb-2">{node.title}</h4>
                  <p className="text-xs text-charcoal-muted leading-relaxed mb-4">{node.summary}</p>
                  <div className="text-[11px] font-serif italic text-magenta border-t border-gold/20 pt-2">
                    "{node.quote}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showroom CTA */}
        <section className="py-16 text-center px-4 max-w-4xl mx-auto">
          <h3 className="font-serif text-3xl text-maroon mb-4">Experience Our Showroom in Jaipur</h3>
          <p className="text-xs text-charcoal-muted leading-relaxed max-w-xl mx-auto mb-6">
            Located near Johari Bazar & M.I. Road, our showroom is designed to welcome you into an atmosphere of royal hospitality and transparent fine jewellery.
          </p>
          <Link href="/contact" className="inline-block bg-maroon text-gold-light px-8 py-3 rounded text-xs uppercase tracking-widest font-semibold hover:bg-maroon-dark transition-all">
            Schedule a Private Visit →
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
