'use client';
import React, { useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import productsData from '../../../data/products.json';
import { Product } from '../../../types';
import { useCommerce } from '../../../context/CommerceContext';
import { formatINR, estimateDeliveryByPincode } from '../../../lib/pricing';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const product = productsData.find(p => p.slug === params.slug) as Product | undefined;

  if (!product) {
    notFound();
  }

  const {
    calculateProductPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    gold22kRate,
    gold18kRate,
    gold24kRate,
    setIsRateModalOpen
  } = useCommerce();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [is360Mode, setIs360Mode] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.category === 'polki' || product.subCategory === 'rings' ? '14 (Indian Standard)' : 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('302003');
  const [pincodeInfo, setPincodeInfo] = useState<any>(estimateDeliveryByPincode('302003', product.readyToShip));
  const [activeAccordion, setActiveAccordion] = useState<string | null>('breakdown');

  // Custom slider rate for this product specifically to experiment
  const defaultRate = product.purity.includes('18K') ? gold18kRate : gold22kRate;
  const [interactiveRate, setInteractiveRate] = useState<number>(defaultRate);

  const pricing = calculateProductPrice(product);

  const handlePincodeCheck = () => {
    const res = estimateDeliveryByPincode(pincode, product.readyToShip);
    setPincodeInfo(res);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize);
    router.push('/checkout');
  };

  const isSaved = isInWishlist(product.id);

  // Recommendations: Other pieces in same category
  const recommendations = productsData
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="bg-ivory border-b border-gold/25 py-2.5 px-4 sm:px-6 lg:px-8 text-xs text-charcoal-muted">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link href="/" className="hover:text-maroon">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-maroon">Collections</Link>
          <span>/</span>
          <span className="uppercase tracking-wider font-semibold text-gold-dark">{product.category}</span>
          <span>/</span>
          <span className="text-maroon font-serif font-bold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Image Gallery & 360 View (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative bg-white border-2 border-gold/40 rounded-xl overflow-hidden shadow-lg h-[440px] sm:h-[540px] flex items-center justify-center p-4">
              {/* Product Badge */}
              <span className="absolute top-4 left-4 z-10 bg-maroon text-gold-light text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow">
                {product.tag || `${product.purity} Gold`}
              </span>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gold/40 flex items-center justify-center text-xl text-maroon hover:text-magenta transition-all shadow hover:scale-105"
                title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                {isSaved ? '♥' : '♡'}
              </button>

              {/* Main Image or 360 View */}
              {is360Mode ? (
                <div className="w-full h-full flex flex-col items-center justify-center relative select-none">
                  <img
                    src={product.images[activeImageIdx]}
                    alt={product.name}
                    className="max-h-[85%] object-contain transition-transform duration-75"
                    style={{ transform: `rotate(${rotationAngle}deg)` }}
                  />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 max-w-xs bg-black/60 backdrop-blur-md text-ivory text-xs px-4 py-2 rounded-full border border-gold/40 flex items-center justify-between">
                    <span className="text-[10px] text-gold-light">⟲ Rotate 360°</span>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={rotationAngle}
                      onChange={e => setRotationAngle(Number(e.target.value))}
                      className="accent-gold w-32 cursor-ew-resize"
                    />
                    <span className="text-[10px] font-mono">{rotationAngle}°</span>
                  </div>
                </div>
              ) : (
                <img
                  src={product.images[activeImageIdx]}
                  alt={product.name}
                  className="w-full h-full object-cover sm:object-contain rounded transition-all duration-500 hover:scale-105 cursor-zoom-in"
                />
              )}

              {/* 360 view toggle pill */}
              <button
                onClick={() => setIs360Mode(!is360Mode)}
                className="absolute bottom-4 right-4 bg-maroon-deep/90 text-gold-light text-[10px] uppercase tracking-wider font-semibold px-3 py-1.5 rounded-full border border-gold/50 hover:bg-maroon transition-all shadow"
              >
                {is360Mode ? 'Standard Photos' : '🔄 360° Rotation View'}
              </button>
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImageIdx(idx);
                    setIs360Mode(false);
                  }}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 bg-white ${
                    activeImageIdx === idx && !is360Mode
                      ? 'border-maroon shadow-md scale-105'
                      : 'border-gold/30 hover:border-gold opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Trust Assurance Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gold/30 text-center text-xs">
              <div className="bg-white border border-gold/30 p-3 rounded-lg">
                <div className="text-maroon text-base mb-1">🏛️</div>
                <div className="font-serif font-bold text-maroon text-sm">BIS 916 Hallmark</div>
                <div className="text-[10px] text-charcoal-muted">Govt. Certified HUID</div>
              </div>
              <div className="bg-white border border-gold/30 p-3 rounded-lg">
                <div className="text-maroon text-base mb-1">🔄</div>
                <div className="font-serif font-bold text-maroon text-sm">14-Day Exchange</div>
                <div className="text-[10px] text-charcoal-muted">100% Value Adjust</div>
              </div>
              <div className="bg-white border border-gold/30 p-3 rounded-lg">
                <div className="text-maroon text-base mb-1">🛡️</div>
                <div className="font-serif font-bold text-maroon text-sm">100% Insured Transit</div>
                <div className="text-[10px] text-charcoal-muted">Tamper-proof Box</div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Transparent Pricing, Sizing, CTA (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-gold-dark text-[10px] uppercase tracking-[0.25em] font-bold mb-2">
                <span>⚜</span>
                <span>{product.category} · {product.subCategory}</span>
                <span>⚜</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-maroon font-bold leading-tight mb-2">
                {product.name}
              </h1>
              <p className="text-xs text-charcoal-muted leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Dynamic Price Display */}
              <div className="bg-white border-2 border-gold rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-charcoal-muted block">
                      100% Transparent Price:
                    </span>
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-maroon">
                      {formatINR(pricing.finalTotal)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-300 font-semibold px-2 py-0.5 rounded block mb-1">
                      Inclusive of 3% GST
                    </span>
                    <span className="text-[10px] text-charcoal-muted">
                      Net Gold: {product.netGoldWeight}g · {product.purity}
                    </span>
                  </div>
                </div>

                {/* Live rate notification pill */}
                <div className="flex items-center justify-between text-[11px] bg-ivory border border-gold/30 rounded p-2 text-charcoal mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Based on Live Rate: <strong>{formatINR(pricing.goldRatePerGram)}/g</strong></span>
                  </div>
                  <button
                    onClick={() => setIsRateModalOpen(true)}
                    className="text-maroon underline font-semibold hover:text-magenta text-[10px]"
                  >
                    Adjust Rate ⚙️
                  </button>
                </div>
              </div>
            </div>

            {/* Sizing & Quantity selector */}
            <div className="bg-white border border-gold/30 rounded-lg p-4 space-y-4">
              {/* Ring / Bangle / Length sizes */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-charcoal mb-2">
                  Select Size / Dimensions:
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Standard', '12 (2.4)', '14 (2.6)', '16 (2.8)', '18 (Standard Necklace)'].map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-xs rounded border transition-all ${
                        selectedSize === sz
                          ? 'bg-maroon text-gold-light border-maroon font-bold'
                          : 'bg-ivory text-charcoal border-gold/40 hover:border-gold'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between pt-3 border-t border-gold/20">
                <span className="text-xs uppercase tracking-wider font-semibold text-charcoal">
                  Quantity:
                </span>
                <div className="flex items-center border border-gold/40 rounded bg-ivory">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm text-maroon hover:bg-gold/20 font-bold"
                  >
                    −
                  </button>
                  <span className="px-4 py-1 text-xs font-bold text-charcoal">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm text-maroon hover:bg-gold/20 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons: Add to Bag & Buy Now */}
            <div className="space-y-2.5">
              <button
                onClick={handleAddToCart}
                className="w-full bg-maroon hover:bg-maroon-dark text-gold-light py-3.5 rounded-lg text-xs uppercase tracking-widest font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>🛍 Add to Shopping Bag</span>
                <span>·</span>
                <span>{formatINR(pricing.finalTotal * quantity)}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-gold via-gold-light to-gold hover:from-gold-light hover:to-gold-light text-maroon-deep py-3.5 rounded-lg text-xs uppercase tracking-widest font-bold shadow-md hover:shadow-lg transition-all"
              >
                ⚡ Instant Buy Now (Insured Checkout) →
              </button>
            </div>

            {/* Pincode Delivery Estimator */}
            <div className="bg-white border border-gold/30 rounded-lg p-4 text-xs">
              <span className="block uppercase tracking-wider font-semibold text-charcoal mb-2">
                Check Insured Delivery Timeline:
              </span>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  placeholder="Enter 6-digit PIN code"
                  className="flex-1 p-2 bg-ivory border border-gold/40 rounded text-xs font-mono"
                />
                <button
                  onClick={handlePincodeCheck}
                  className="bg-gold text-maroon-deep hover:bg-gold-light px-4 py-2 rounded font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Check
                </button>
              </div>

              {pincodeInfo && pincodeInfo.valid ? (
                <div className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-300 p-2.5 rounded leading-relaxed">
                  ✓ <strong>{pincodeInfo.zone}:</strong> Estimated delivery by <strong>{pincodeInfo.estimate}</strong>. Sealed in tamper-proof security box.
                </div>
              ) : pincodeInfo ? (
                <div className="text-[11px] text-red-700 bg-red-50 p-2 rounded">
                  {pincodeInfo.message}
                </div>
              ) : null}
            </div>

            {/* Transparent Breakdown Table Accordion */}
            <div className="bg-white border border-gold/30 rounded-lg overflow-hidden text-xs">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'breakdown' ? null : 'breakdown')}
                className="w-full p-4 flex justify-between items-center bg-ivory font-bold text-maroon border-b border-gold/20"
              >
                <span>📜 Transparent Price Formula Breakdown</span>
                <span>{activeAccordion === 'breakdown' ? '▲' : '▼'}</span>
              </button>

              {activeAccordion === 'breakdown' && (
                <div className="p-4 space-y-2 bg-white">
                  <div className="flex justify-between text-charcoal-muted">
                    <span>Pure Gold ({product.netGoldWeight}g @ {formatINR(pricing.goldRatePerGram)}/g):</span>
                    <span className="font-semibold text-charcoal">{formatINR(pricing.goldValue)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-muted">
                    <span>Artisanal Making ({product.makingChargePercent}%):</span>
                    <span className="font-semibold text-charcoal">{formatINR(pricing.makingCharges)}</span>
                  </div>
                  {pricing.stoneValue > 0 && (
                    <div className="flex justify-between text-charcoal-muted">
                      <span>Natural Stone / Polki Value:</span>
                      <span className="font-semibold text-charcoal">{formatINR(pricing.stoneValue)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-charcoal-muted">
                    <span>Taxable Value:</span>
                    <span className="font-semibold text-charcoal">{formatINR(pricing.taxableSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-muted">
                    <span>Government GST (3%):</span>
                    <span className="font-semibold text-charcoal">{formatINR(pricing.gstAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-maroon pt-2 border-t border-gold">
                    <span>Final Net Price:</span>
                    <span className="font-serif text-lg">{formatINR(pricing.finalTotal)}</span>
                  </div>
                </div>
              )}

              {/* Specifications Accordion */}
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'specs' ? null : 'specs')}
                className="w-full p-4 flex justify-between items-center bg-ivory font-bold text-maroon border-t border-b border-gold/20"
              >
                <span>🔍 Detailed Craftsmanship Specifications</span>
                <span>{activeAccordion === 'specs' ? '▲' : '▼'}</span>
              </button>

              {activeAccordion === 'specs' && (
                <div className="p-4 space-y-2 bg-white">
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="text-charcoal-muted">Gross Total Weight:</div>
                    <div className="font-semibold text-charcoal">{product.grossWeight} grams</div>

                    <div className="text-charcoal-muted">Net Pure Gold Weight:</div>
                    <div className="font-semibold text-charcoal">{product.netGoldWeight} grams</div>

                    <div className="text-charcoal-muted">Metal & Purity:</div>
                    <div className="font-semibold text-charcoal">{product.purity} Gold ({product.metal})</div>

                    <div className="text-charcoal-muted">Government Hallmark:</div>
                    <div className="font-semibold text-maroon">{product.hallmark}</div>

                    <div className="text-charcoal-muted">Stone Details:</div>
                    <div className="font-semibold text-charcoal">{product.stoneDetails}</div>

                    <div className="text-charcoal-muted">Certification Laboratory:</div>
                    <div className="font-semibold text-maroon">{product.certification}</div>

                    <div className="text-charcoal-muted">Production Status:</div>
                    <div className="font-semibold text-charcoal">
                      {product.readyToShip ? 'Ready to Ship' : 'Made to Order Artisanal'}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Inquire on WhatsApp */}
            <div className="pt-2">
              <a
                href={`https://wa.me/919829019900?text=Hello%20Jai%20Sri%20Ram%20Jewellers,%20I%20am%20viewing%20${encodeURIComponent(product.name)}%20(SKU:%20${product.id})%20priced%20at%20${formatINR(pricing.finalTotal)}.%20Please%20share%20further%20details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-lg text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 shadow"
              >
                <span>💬 Chat with Jaipur Showroom Specialist on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Curated Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gold/30">
            <div className="text-center mb-8">
              <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold block mb-1">
                Complementary Pieces
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-maroon font-bold">
                Pair with Matching Heirlooms
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendations.map(rec => {
                const recProduct = rec as unknown as Product;
                const recPricing = calculateProductPrice(recProduct);
                return (
                  <div key={rec.id} className="bg-white border border-gold/30 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <Link href={`/product/${rec.slug}`} className="block h-52 bg-ivory overflow-hidden">
                        <img src={rec.images[0]} alt={rec.name} className="w-full h-full object-cover hover:scale-105 transition-all duration-500" />
                      </Link>
                      <div className="p-4">
                        <div className="text-[10px] text-gold-dark uppercase tracking-wider font-semibold">{rec.purity} Gold</div>
                        <Link href={`/product/${rec.slug}`} className="font-serif text-base font-bold text-maroon hover:text-magenta line-clamp-1 mt-1">
                          {rec.name}
                        </Link>
                        <div className="font-serif text-base font-bold text-gold-dark mt-2">
                          {formatINR(recPricing.finalTotal)}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 pt-0">
                      <button
                        onClick={() => addToCart(recProduct)}
                        className="w-full bg-maroon text-gold-light hover:bg-maroon-dark text-xs uppercase tracking-wider font-semibold py-2 rounded transition-all"
                      >
                        + Add to Bag
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
