'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCommerce } from '../../context/CommerceContext';
import { formatINR, estimateDeliveryByPincode } from '../../lib/pricing';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartTotals,
    cartTotalCount,
    calculateProductPrice,
    clearCart,
    gold22kRate
  } = useCommerce();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pincode: '302003', // Default Johari Bazar Jaipur
    addressLine: '',
    city: 'Jaipur',
    state: 'Rajasthan',
    giftBox: true,
    giftMessage: '',
    paymentMethod: 'upi',
    cardName: '',
    cardNumber: '',
    cardExp: '',
    cardCvv: '',
    upiId: '',
    selectedBank: 'hdfc'
  });

  const [pincodeStatus, setPincodeStatus] = useState<any>(estimateDeliveryByPincode('302003', true));
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePincodeChange = (pin: string) => {
    setFormData(prev => ({ ...prev, pincode: pin }));
    if (pin.length === 6) {
      const result = estimateDeliveryByPincode(pin, true);
      setPincodeStatus(result);
    } else {
      setPincodeStatus(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setErrorMessage('Your shopping bag is empty. Please add items before checking out.');
      return;
    }

    if (!formData.fullName || !formData.phone || !formData.addressLine || !formData.pincode) {
      setErrorMessage('Please fill in all mandatory delivery contact and address fields.');
      return;
    }

    setErrorMessage('');
    setIsProcessing(true);

    // Simulate secure Razorpay / Bank processing
    setTimeout(() => {
      const orderId = 'JSR-' + Math.floor(100000 + Math.random() * 900000);
      const orderDetails = {
        orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        customer: formData,
        cart,
        totals: cartTotals,
        appliedRate22k: gold22kRate,
        paymentMethod: formData.paymentMethod,
        estimatedDelivery: pincodeStatus?.estimate || '3-4 Business Days'
      };

      try {
        localStorage.setItem('jsr_last_order', JSON.stringify(orderDetails));
      } catch (e) {}

      clearCart();
      setIsProcessing(false);
      router.push(`/order-confirmation?orderId=${orderId}`);
    }, 2000);
  };

  if (cart.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-gold/15 border-2 border-gold flex items-center justify-center text-3xl text-maroon mb-6">
            ⚜
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-maroon font-bold mb-3">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-sm text-charcoal-muted leading-relaxed mb-8">
            You do not have any fine jewellery items ready for checkout. Explore our royal Rajasthani catalog of 22K gold, polki jadau, and certified solitaires.
          </p>
          <Link
            href="/collections"
            className="bg-maroon hover:bg-maroon-dark text-gold-light px-8 py-3 rounded text-xs uppercase tracking-widest font-semibold shadow-lg transition-all"
          >
            Explore Collections Vault →
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Header />

      {/* Checkout Trust Sub-header */}
      <div className="bg-[#2B0814] text-gold-light py-2.5 px-4 text-xs border-b border-gold/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="text-gold">🔒</span>
            <span className="font-semibold tracking-wide">256-Bit SSL Encrypted Insured Checkout</span>
          </div>
          <div className="flex items-center gap-6">
            <span>✓ 100% Transit Insurance</span>
            <span>✓ BIS 916 Hallmarked & Certified</span>
            <span>✓ 14-Day 100% Value Exchange</span>
          </div>
        </div>
      </div>

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-bold block mb-1">
            Official Checkout Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-maroon font-bold">
            Insured Order & Delivery
          </h1>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-300 text-red-800 text-xs p-4 rounded-lg mb-6 flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Delivery, Contact, Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact Information */}
            <div className="bg-white border border-gold/30 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gold/20">
                <span className="w-6 h-6 rounded-full bg-maroon text-gold-light text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h2 className="font-serif text-xl text-maroon font-semibold">
                  Customer & Contact Details
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Maharani Gayatri Devi"
                    className="w-full text-xs p-2.5 bg-ivory border border-gold/40 rounded focus:bg-white focus:outline-none focus:border-maroon"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Mobile Phone (For OTP Delivery) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98290 12345"
                    className="w-full text-xs p-2.5 bg-ivory border border-gold/40 rounded focus:bg-white focus:outline-none focus:border-maroon"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Email Address (For Tax Invoice & Hallmark Certificate) *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="w-full text-xs p-2.5 bg-ivory border border-gold/40 rounded focus:bg-white focus:outline-none focus:border-maroon"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping & Delivery Address */}
            <div className="bg-white border border-gold/30 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gold/20">
                <span className="w-6 h-6 rounded-full bg-maroon text-gold-light text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h2 className="font-serif text-xl text-maroon font-semibold">
                  Insured Delivery Address
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Postal PIN Code *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      required
                      value={formData.pincode}
                      onChange={e => handlePincodeChange(e.target.value)}
                      placeholder="e.g. 302003"
                      className="w-40 text-xs p-2.5 bg-ivory border border-gold/40 rounded focus:bg-white focus:outline-none focus:border-maroon font-mono font-bold text-maroon"
                    />
                    {pincodeStatus && pincodeStatus.valid && (
                      <div className="flex-1 bg-emerald-50 border border-emerald-300 rounded p-2 text-[11px] text-emerald-800 flex items-center gap-2">
                        <span>✓</span>
                        <span>{pincodeStatus.zone}: Delivery by <strong>{pincodeStatus.estimate}</strong></span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                    Street Address / House / Bungalow *
                  </label>
                  <input
                    type="text"
                    name="addressLine"
                    required
                    value={formData.addressLine}
                    onChange={handleInputChange}
                    placeholder="e.g. 45, Johari Bazar, Near Palace Quarter"
                    className="w-full text-xs p-2.5 bg-ivory border border-gold/40 rounded focus:bg-white focus:outline-none focus:border-maroon"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full text-xs p-2.5 bg-ivory border border-gold/40 rounded focus:bg-white focus:outline-none focus:border-maroon"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-semibold mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full text-xs p-2.5 bg-ivory border border-gold/40 rounded focus:bg-white focus:outline-none focus:border-maroon"
                  />
                </div>
              </div>

              {/* Royal Packaging Toggle */}
              <div className="mt-5 pt-4 border-t border-gold/20 bg-ivory/60 p-3.5 rounded border border-gold/30">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="giftBox"
                    checked={formData.giftBox}
                    onChange={handleInputChange}
                    className="mt-1 accent-maroon w-4 h-4"
                  />
                  <div>
                    <span className="text-xs font-bold text-maroon block">
                      🎁 Complimentary Royal Velvet Presentation Box & Certificate Folio
                    </span>
                    <span className="text-[11px] text-charcoal-muted leading-tight block mt-0.5">
                      Includes red Rajasthani velvet jewel casket, sealed HUID certificate folder, and gold-embossed presentation ribbon at zero additional charge.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 3: Payment Options (Razorpay Simulation) */}
            <div className="bg-white border border-gold/30 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gold/20">
                <span className="w-6 h-6 rounded-full bg-maroon text-gold-light text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="font-serif text-xl text-maroon font-semibold">
                  Secure Payment Method
                </h2>
              </div>

              <div className="space-y-3">
                {/* UPI Option */}
                <label
                  className={`flex items-center justify-between p-3.5 border rounded-lg cursor-pointer transition-all ${
                    formData.paymentMethod === 'upi'
                      ? 'border-maroon bg-gold/10 shadow-sm'
                      : 'border-gold/30 hover:border-gold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="accent-maroon"
                    />
                    <div>
                      <span className="text-xs font-bold text-maroon block">
                        Instant UPI / QR Code (Google Pay, PhonePe, Paytm, BHIM)
                      </span>
                      <span className="text-[11px] text-charcoal-muted">
                        Zero transaction surcharge · Instant transaction verification
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-gold-dark">UPI</span>
                </label>

                {formData.paymentMethod === 'upi' && (
                  <div className="bg-ivory p-4 rounded border border-gold/30 text-xs space-y-3 ml-6">
                    <div>
                      <label className="block text-[11px] font-semibold text-charcoal mb-1">
                        Enter UPI ID (e.g. mobile@upi / yourname@okhdfcbank)
                      </label>
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        placeholder="yourname@okaxis"
                        className="w-full p-2 bg-white border border-gold/40 rounded text-xs"
                      />
                    </div>
                    <div className="text-[11px] text-charcoal-muted flex items-center gap-2">
                      <span>📱</span>
                      <span>Or scan dynamic QR code generated at next step.</span>
                    </div>
                  </div>
                )}

                {/* Cards Option */}
                <label
                  className={`flex items-center justify-between p-3.5 border rounded-lg cursor-pointer transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-maroon bg-gold/10 shadow-sm'
                      : 'border-gold/30 hover:border-gold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="accent-maroon"
                    />
                    <div>
                      <span className="text-xs font-bold text-maroon block">
                        Credit / Debit Card (Visa, MasterCard, RuPay, Amex)
                      </span>
                      <span className="text-[11px] text-charcoal-muted">
                        Secure 3D OTP Authentication · EMI Options Available
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-gold-dark">CARDS</span>
                </label>

                {formData.paymentMethod === 'card' && (
                  <div className="bg-ivory p-4 rounded border border-gold/30 text-xs space-y-3 ml-6">
                    <div>
                      <label className="block text-[11px] font-semibold text-charcoal mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        maxLength={19}
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="4532 •••• •••• 8892"
                        className="w-full p-2 bg-white border border-gold/40 rounded text-xs font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          name="cardExp"
                          maxLength={5}
                          value={formData.cardExp}
                          onChange={handleInputChange}
                          placeholder="12/28"
                          className="w-full p-2 bg-white border border-gold/40 rounded text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-charcoal mb-1">
                          CVV / CVC
                        </label>
                        <input
                          type="password"
                          name="cardCvv"
                          maxLength={4}
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          placeholder="•••"
                          className="w-full p-2 bg-white border border-gold/40 rounded text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Net Banking */}
                <label
                  className={`flex items-center justify-between p-3.5 border rounded-lg cursor-pointer transition-all ${
                    formData.paymentMethod === 'netbanking'
                      ? 'border-maroon bg-gold/10 shadow-sm'
                      : 'border-gold/30 hover:border-gold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="netbanking"
                      checked={formData.paymentMethod === 'netbanking'}
                      onChange={handleInputChange}
                      className="accent-maroon"
                    />
                    <div>
                      <span className="text-xs font-bold text-maroon block">
                        Direct Net Banking (50+ Indian Banks)
                      </span>
                      <span className="text-[11px] text-charcoal-muted">
                        HDFC Bank, ICICI Bank, State Bank of India, Axis Bank
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-gold-dark">NETBANK</span>
                </label>

                {/* Showroom Collect / RTGS */}
                <label
                  className={`flex items-center justify-between p-3.5 border rounded-lg cursor-pointer transition-all ${
                    formData.paymentMethod === 'showroom'
                      ? 'border-maroon bg-gold/10 shadow-sm'
                      : 'border-gold/30 hover:border-gold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="showroom"
                      checked={formData.paymentMethod === 'showroom'}
                      onChange={handleInputChange}
                      className="accent-maroon"
                    />
                    <div>
                      <span className="text-xs font-bold text-maroon block">
                        VIP Showroom Collection & Payment (Johari Bazar Jaipur)
                      </span>
                      <span className="text-[11px] text-charcoal-muted">
                        Reserve piece today · Inspect purity in person · Pay via Bank RTGS or Card at showroom
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-gold-dark">SHOWROOM</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary: Order Items, Price Breakdown, Place Order Button (5 cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-5">
            <div className="bg-white border-2 border-gold rounded-lg p-6 shadow-md">
              <div className="flex justify-between items-baseline mb-4 pb-3 border-b border-gold/30">
                <h3 className="font-serif text-xl font-bold text-maroon">
                  Order Summary ({cartTotalCount} items)
                </h3>
                <span className="text-[11px] text-gold-dark font-semibold">
                  Live Rate: 22K @ {formatINR(gold22kRate)}/g
                </span>
              </div>

              {/* Item cards */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1 mb-5">
                {cart.map((item, idx) => {
                  const pricing = calculateProductPrice(item.product);
                  return (
                    <div key={`${item.product.id}-${idx}`} className="flex gap-3 items-center py-2 border-b border-gold/15">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-14 h-14 object-cover rounded border border-gold/20 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs font-bold text-maroon line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="text-[10px] text-charcoal-muted">
                          Qty: {item.quantity} · {item.product.purity} Gold ({item.product.netGoldWeight}g net)
                        </div>
                        <div className="text-xs font-bold text-gold-dark mt-0.5">
                          {formatINR(pricing.finalTotal * item.quantity)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Transparent Calculation Breakdown */}
              <div className="bg-ivory border border-gold/30 rounded p-4 text-xs space-y-2 mb-5">
                <div className="font-bold text-maroon uppercase tracking-wider text-[11px] border-b border-gold/20 pb-1">
                  100% Transparent Price Formula
                </div>
                <div className="flex justify-between text-charcoal-muted">
                  <span>Net Gold Value ({cartTotals.totalNetGoldWeight.toFixed(2)}g):</span>
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
                <div className="flex justify-between text-emerald-700 font-semibold pt-1 border-t border-gold/20">
                  <span>Tamper-proof Insured Logistics:</span>
                  <span>FREE COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-gold font-bold text-maroon">
                  <span className="text-sm">Final Net Payable:</span>
                  <span className="font-serif text-2xl text-maroon">{formatINR(cartTotals.finalTotal)}</span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-gold via-gold-light to-gold hover:from-gold-light hover:to-gold-light text-maroon-deep font-bold py-3.5 rounded text-xs uppercase tracking-widest shadow-lg hover:shadow-xl transition-all disabled:opacity-75 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-maroon border-t-transparent rounded-full animate-spin" />
                    <span>Processing Secure Gateway...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Order & Dispatch ({formatINR(cartTotals.finalTotal)}) →</span>
                  </>
                )}
              </button>

              <div className="mt-4 text-[10px] text-center text-charcoal-muted leading-relaxed">
                By placing this order, you agree to Jai Sri Ram Jewellers terms. 14-day exchange guaranteed at 100% invoice value without deduction.
              </div>
            </div>

            {/* Concierge Help Box */}
            <div className="bg-ivory border border-gold/30 rounded-lg p-4 text-xs">
              <div className="font-serif text-sm font-bold text-maroon mb-1">
                Need High-Value Order Assistance?
              </div>
              <p className="text-[11px] text-charcoal-muted mb-3">
                Speak directly with our senior jewellery consultant or showroom director for customized sizing or bank wire coordination.
              </p>
              <div className="flex gap-2">
                <a
                  href="https://wa.me/919829019900?text=Hello%20Jai%20Sri%20Ram%20Jewellers,%20I%20have%20a%20question%20regarding%20my%20online%20checkout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-emerald-700 hover:bg-emerald-800 text-white py-1.5 rounded text-[11px] font-semibold"
                >
                  💬 WhatsApp Concierge
                </a>
                <a
                  href="tel:+911412567890"
                  className="flex-1 text-center border border-maroon text-maroon hover:bg-maroon hover:text-white py-1.5 rounded text-[11px] font-semibold transition-all"
                >
                  📞 Call Showroom
                </a>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
