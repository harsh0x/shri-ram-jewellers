'use client';
import React from 'react';
import Link from 'next/link';
import { useCommerce } from '../../context/CommerceContext';
import { formatINR } from '../../lib/pricing';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotals,
    cartTotalCount,
    calculateProductPrice
  } = useCommerce();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory border-l-2 border-gold shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="bg-gradient-to-r from-maroon-deep via-maroon to-maroon text-ivory p-5 border-b border-gold/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-gold text-lg">🛍</span>
              <h2 className="font-serif text-xl tracking-wider text-gold-light">
                Your Shopping Bag
              </h2>
              <span className="bg-gold/20 text-gold-light text-xs font-bold px-2 py-0.5 rounded-full border border-gold/30">
                {cartTotalCount} {cartTotalCount === 1 ? 'piece' : 'pieces'}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="text-ivory/80 hover:text-gold-light text-2xl font-bold p-1 transition-all"
              aria-label="Close bag"
            >
              ✕
            </button>
          </div>

          {/* Insured Delivery Banner */}
          <div className="bg-[#2B0814] text-gold-light text-[11px] py-2 px-4 border-b border-gold/30 flex items-center justify-center gap-2">
            <span>🛡️</span>
            <span>100% Insured Direct Hand-off · Tamper-evident Packaging</span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-2xl text-maroon mb-4">
                  ⚜
                </div>
                <h3 className="font-serif text-2xl text-maroon mb-2">Your Bag is Empty</h3>
                <p className="text-xs text-charcoal-muted max-w-xs mb-6 leading-relaxed">
                  Discover 24 masterfully handcrafted Rajasthani heirlooms in 22K gold, uncut polki, and certified fine diamonds.
                </p>
                <Link
                  href="/collections"
                  onClick={() => setIsCartOpen(false)}
                  className="bg-maroon hover:bg-maroon-dark text-gold-light px-6 py-2.5 rounded text-xs uppercase tracking-widest font-semibold transition-all shadow"
                >
                  Explore Vault →
                </Link>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center text-xs text-charcoal-muted pb-2 border-b border-gold/20">
                  <span>Selected Heirlooms ({cart.length})</span>
                  <button
                    onClick={clearCart}
                    className="text-red-700 hover:text-red-900 text-[11px] underline"
                  >
                    Clear Bag
                  </button>
                </div>

                {cart.map((item, index) => {
                  const pricing = calculateProductPrice(item.product);
                  const itemTotalPrice = pricing.finalTotal * item.quantity;

                  return (
                    <div
                      key={`${item.product.id}-${index}`}
                      className="bg-white border border-gold/30 rounded-lg p-3.5 shadow-sm hover:shadow transition-all flex gap-3.5 relative"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-20 bg-ivory rounded overflow-hidden flex-shrink-0 border border-gold/20">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <Link
                            href={`/product/${item.product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="font-serif text-sm font-bold text-maroon hover:text-magenta line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-charcoal-muted hover:text-red-700 text-sm ml-1"
                            title="Remove item"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="text-[10px] text-gold-dark font-semibold mt-0.5">
                          {item.product.purity} Gold · Net: {item.product.netGoldWeight}g
                        </div>

                        {item.selectedSize && (
                          <span className="inline-block bg-ivory text-[10px] text-charcoal px-2 py-0.5 rounded border border-gold/30 mt-1">
                            Size: {item.selectedSize}
                          </span>
                        )}

                        <div className="flex justify-between items-center mt-3 pt-2 border-t border-gold/15">
                          {/* Quantity control */}
                          <div className="flex items-center border border-gold/40 rounded bg-ivory">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-0.5 text-xs text-maroon hover:bg-gold/20 transition-all font-bold"
                            >
                              −
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-semibold text-charcoal">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs text-maroon hover:bg-gold/20 transition-all font-bold"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="font-serif text-sm font-bold text-maroon">
                              {formatINR(itemTotalPrice)}
                            </div>
                            <div className="text-[9px] text-charcoal-muted">
                              ({formatINR(pricing.finalTotal)} / piece)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Drawer Footer with Price Summary & Checkout button */}
          {cart.length > 0 && (
            <div className="bg-white border-t-2 border-gold/40 p-5 shadow-lg space-y-3">
              {/* Formula details */}
              <div className="bg-ivory border border-gold/30 rounded p-3 text-xs space-y-1.5">
                <div className="flex justify-between text-charcoal-muted">
                  <span>Pure Gold Value ({cartTotals.totalNetGoldWeight.toFixed(2)}g net):</span>
                  <span className="font-medium text-charcoal">{formatINR(cartTotals.goldValue)}</span>
                </div>
                <div className="flex justify-between text-charcoal-muted">
                  <span>Artisanal Making Charges:</span>
                  <span className="font-medium text-charcoal">{formatINR(cartTotals.makingCharges)}</span>
                </div>
                {cartTotals.stoneValue > 0 && (
                  <div className="flex justify-between text-charcoal-muted">
                    <span>Certified Diamonds / Polki:</span>
                    <span className="font-medium text-charcoal">{formatINR(cartTotals.stoneValue)}</span>
                  </div>
                )}
                <div className="flex justify-between text-charcoal-muted">
                  <span>Government GST (3%):</span>
                  <span className="font-medium text-charcoal">{formatINR(cartTotals.gstAmount)}</span>
                </div>
                <div className="flex justify-between text-green-700 text-[11px] font-semibold pt-1 border-t border-gold/20">
                  <span>All-India Insured Transit:</span>
                  <span>FREE COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between items-baseline text-base font-bold text-maroon pt-2 border-t border-gold">
                  <span>Final Net Payable:</span>
                  <span className="font-serif text-xl text-maroon">{formatINR(cartTotals.finalTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-gold via-gold-light to-gold hover:from-gold-light hover:to-gold-light text-maroon-deep py-3 rounded text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all"
                >
                  Proceed to Secure Checkout →
                </Link>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center text-xs text-charcoal-muted hover:text-maroon py-1 transition-colors"
                >
                  or Continue Browsing Heirlooms
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gold/20 text-center text-[9px] text-charcoal-muted">
                <div>✓ 14-Day Exchange</div>
                <div>✓ BIS 916 Hallmark</div>
                <div>✓ Lifetime Buyback</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
