'use client';
import React from 'react';
import Link from 'next/link';
import { useCommerce } from '../../context/CommerceContext';
import { formatINR } from '../../lib/pricing';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function WishlistPage() {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    calculateProductPrice
  } = useCommerce();

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-10">
          <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
            Curated Whispers of Luxury
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-maroon font-bold">
            Saved Royal Heirlooms
          </h1>
          <p className="text-charcoal-muted text-sm max-w-md mx-auto mt-2">
            Your private treasury of fine jewellery pieces saved for special occasions and royal celebrations.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white border border-gold/30 rounded-xl p-12 text-center max-w-md mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-3xl text-maroon mx-auto mb-4">
              ♡
            </div>
            <h2 className="font-serif text-2xl text-maroon mb-2">No Saved Pieces Yet</h2>
            <p className="text-xs text-charcoal-muted mb-6 leading-relaxed">
              Click the heart icon on any jewellery piece in our vault to save it to your personal heirloom list.
            </p>
            <Link
              href="/collections"
              className="bg-maroon hover:bg-maroon-dark text-gold-light px-6 py-2.5 rounded text-xs uppercase tracking-widest font-semibold transition-all shadow"
            >
              Browse Collections Vault →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map(p => {
              const pricing = calculateProductPrice(p);
              return (
                <div
                  key={p.id}
                  className="bg-white border border-gold/30 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-60 bg-ivory overflow-hidden">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => toggleWishlist(p)}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 border border-gold/30 text-rose-700 flex items-center justify-center text-lg hover:scale-110 transition-all shadow"
                        title="Remove from saved"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="p-4">
                      <div className="text-[10px] text-gold-dark uppercase tracking-wider font-semibold">
                        {p.purity} Gold · Net: {p.netGoldWeight}g
                      </div>
                      <Link
                        href={`/product/${p.slug}`}
                        className="font-serif text-base font-bold text-maroon hover:text-magenta line-clamp-1 mt-1 block"
                      >
                        {p.name}
                      </Link>
                      <div className="font-serif text-lg font-bold text-maroon mt-2">
                        {formatINR(pricing.finalTotal)}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 space-y-2">
                    <button
                      onClick={() => {
                        addToCart(p);
                        toggleWishlist(p);
                      }}
                      className="w-full bg-maroon hover:bg-maroon-dark text-gold-light text-xs uppercase tracking-wider font-bold py-2 rounded transition-all"
                    >
                      Move to Shopping Bag →
                    </button>
                    <Link
                      href={`/product/${p.slug}`}
                      className="block text-center text-xs text-charcoal-muted hover:text-maroon py-1"
                    >
                      View Craftsmanship Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
