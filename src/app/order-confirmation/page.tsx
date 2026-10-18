'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatINR } from '../../lib/pricing';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function OrderConfirmationPage() {
  const [orderIdParam, setOrderIdParam] = useState<string | null>(null);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setOrderIdParam(params.get('orderId'));
    }
    try {
      const saved = localStorage.getItem('jsr_last_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Unable to load order from localStorage', e);
    }
  }, []);

  const displayOrderId = order?.orderId || orderIdParam || 'JSR-884920';

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Royal Celebratory Card */}
        <div className="bg-white border-2 border-gold rounded-xl p-8 sm:p-12 shadow-xl text-center relative overflow-hidden mb-8">
          {/* Ornaments */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-gold m-3 pointer-events-none" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold m-3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-gold m-3 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-gold m-3 pointer-events-none" />

          <div className="w-20 h-20 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center text-4xl text-maroon mx-auto mb-5 shadow-inner">
            ⚜
          </div>

          <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-bold block mb-2">
            Order Confirmed & Insured
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl text-maroon font-bold mb-3">
            Thank You for Your Trust
          </h1>

          <p className="text-sm text-charcoal-muted max-w-lg mx-auto leading-relaxed mb-6">
            Your fine jewellery heirloom order has been successfully confirmed. Our master goldsmiths in Jaipur are now carefully preparing and inspecting your hallmarked piece with tamper-evident security seals.
          </p>

          <div className="inline-block bg-ivory border border-gold/40 px-6 py-3 rounded-lg font-mono text-sm sm:text-base font-bold text-maroon shadow-sm mb-6">
            Reference Order ID: <span className="text-gold-dark">{displayOrderId}</span>
          </div>

          {/* Progress Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gold/25 text-left text-xs">
            <div className="bg-emerald-50 border border-emerald-300 p-3 rounded">
              <div className="font-bold text-emerald-800">1. Confirmed</div>
              <div className="text-[10px] text-emerald-600">Payment Verified</div>
            </div>
            <div className="bg-gold/15 border border-gold p-3 rounded">
              <div className="font-bold text-maroon">2. Quality Check</div>
              <div className="text-[10px] text-charcoal-muted">HUID Purity Verified</div>
            </div>
            <div className="bg-ivory border border-gold/30 p-3 rounded">
              <div className="font-bold text-charcoal-muted">3. Insured Vault Dispatch</div>
              <div className="text-[10px] text-charcoal-muted">Tamper-proof Packaging</div>
            </div>
            <div className="bg-ivory border border-gold/30 p-3 rounded">
              <div className="font-bold text-charcoal-muted">4. OTP Delivery</div>
              <div className="text-[10px] text-charcoal-muted">Hand-off to Recipient</div>
            </div>
          </div>
        </div>

        {/* Order Details Receipt (If available) */}
        {order && (
          <div className="bg-white border border-gold/30 rounded-lg p-6 sm:p-8 shadow-sm mb-8">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gold/30">
              <div>
                <h2 className="font-serif text-2xl text-maroon font-bold">
                  Insured Consignment Details
                </h2>
                <div className="text-xs text-charcoal-muted">
                  Date: {order.date} · Delivery PIN: {order.customer.pincode} ({order.customer.city}, {order.customer.state})
                </div>
              </div>
              <button
                onClick={() => window.print()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-gold text-maroon text-xs uppercase tracking-wider font-semibold rounded hover:bg-gold/10"
              >
                🖨 Print Official Receipt
              </button>
            </div>

            {/* Recipient */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-ivory p-4 rounded border border-gold/20 mb-6">
              <div>
                <span className="text-charcoal-muted uppercase text-[10px] tracking-wider block font-semibold">Recipient:</span>
                <span className="font-bold text-maroon text-sm block">{order.customer.fullName}</span>
                <span className="text-charcoal-muted">{order.customer.addressLine}, {order.customer.city}</span>
              </div>
              <div>
                <span className="text-charcoal-muted uppercase text-[10px] tracking-wider block font-semibold">Contact & Security:</span>
                <span className="text-charcoal block">Phone: {order.customer.phone}</span>
                <span className="text-charcoal block">Email: {order.customer.email}</span>
                <span className="text-emerald-700 font-semibold mt-1 block">Expected Delivery: {order.estimatedDelivery}</span>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="border border-gold/30 rounded overflow-hidden mb-6">
              <table className="w-full text-left text-xs">
                <thead className="bg-maroon-deep text-gold-light uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">Jewellery Piece</th>
                    <th className="p-3">Purity & Net Gold</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Net Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/15">
                  {order.cart.map((item: any, idx: number) => (
                    <tr key={idx} className="hover:bg-ivory/50">
                      <td className="p-3 font-serif font-bold text-maroon">
                        {item.product.name}
                        {item.selectedSize && <span className="text-[10px] text-charcoal-muted font-sans font-normal ml-2">Size: {item.selectedSize}</span>}
                      </td>
                      <td className="p-3 text-charcoal-muted">
                        {item.product.purity} Gold · {item.product.netGoldWeight}g net
                      </td>
                      <td className="p-3 text-center font-semibold">
                        {item.quantity}
                      </td>
                      <td className="p-3 text-right font-serif font-bold text-maroon">
                        {formatINR(order.totals.finalTotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Formula Totals Breakdown */}
            <div className="bg-ivory border border-gold/30 rounded p-4 text-xs space-y-1.5 max-w-sm ml-auto">
              <div className="flex justify-between text-charcoal-muted">
                <span>Total Net Gold Value:</span>
                <span className="font-semibold text-charcoal">{formatINR(order.totals.goldValue)}</span>
              </div>
              <div className="flex justify-between text-charcoal-muted">
                <span>Artisanal Making Charges:</span>
                <span className="font-semibold text-charcoal">{formatINR(order.totals.makingCharges)}</span>
              </div>
              {order.totals.stoneValue > 0 && (
                <div className="flex justify-between text-charcoal-muted">
                  <span>Certified Diamonds / Polki:</span>
                  <span className="font-semibold text-charcoal">{formatINR(order.totals.stoneValue)}</span>
                </div>
              )}
              <div className="flex justify-between text-charcoal-muted">
                <span>Government GST (3%):</span>
                <span className="font-semibold text-charcoal">{formatINR(order.totals.gstAmount)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold pt-1 border-t border-gold/20">
                <span>Insured Courier & Tamper Box:</span>
                <span>FREE COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-maroon pt-2 border-t border-gold">
                <span>Total Paid via {order.paymentMethod.toUpperCase()}:</span>
                <span className="font-serif text-lg">{formatINR(order.totals.finalTotal)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <Link
            href="/collections"
            className="bg-maroon hover:bg-maroon-dark text-gold-light px-8 py-3 rounded text-xs uppercase tracking-widest font-semibold shadow transition-all"
          >
            ← Continue Exploring Collections
          </Link>
          <a
            href={`https://wa.me/919829019900?text=Hello%20Jai%20Sri%20Ram%20Jewellers,%20I%20have%20placed%20order%20${displayOrderId}%20and%20would%20like%20live%20dispatch%20updates.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded text-xs uppercase tracking-widest font-semibold shadow transition-all flex items-center gap-2"
          >
            <span>💬 Track via WhatsApp</span>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
