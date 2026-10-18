'use client';
import React, { useState } from 'react';
import { DraftBanner } from '../../components/DraftBanner';
import { GoldTicker } from '../../components/GoldTicker';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import configData from '../../data/config.json';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: '11:00 AM – 01:00 PM',
    type: 'showroom',
    interest: 'bridal'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <DraftBanner />
      <GoldTicker />
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-gold-dark text-xs uppercase tracking-[0.25em] font-semibold block mb-2">Hospitality & Care</span>
          <h1 className="font-serif text-3xl sm:text-5xl text-maroon">Book a Showroom Visit</h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4 mb-4" />
          <p className="text-charcoal-muted text-sm max-w-xl mx-auto">
            Reserve a private consultation salon at our flagship showroom in Jaipur, Rajasthan, or request a virtual video preview.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Showroom Details */}
          <div className="bg-white border border-gold/40 p-8 rounded-lg shadow-sm">
            <h2 className="font-serif text-2xl text-maroon mb-4">Jaipur Flagship Showroom</h2>
            <p className="text-xs text-charcoal leading-relaxed mb-6">
              Our showroom reflects Jaipur's royal palace architecture: delicate jharokha arches, warm chandeliers, and intimate consultation lounges designed for multi-generational families.
            </p>

            <div className="space-y-4 text-xs text-charcoal mb-6">
              <div className="flex items-start gap-3">
                <span className="text-maroon text-base">📍</span>
                <div>
                  <strong>Address:</strong><br />
                  {configData.showroom.name}<br />
                  {configData.showroom.addressLine1}, {configData.showroom.city}, {configData.showroom.state} {configData.showroom.pincode}, India
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-maroon text-base">🕒</span>
                <div>
                  <strong>Opening Hours:</strong><br />
                  {configData.showroom.timings}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-maroon text-base">📞</span>
                <div>
                  <strong>Concierge Phone:</strong><br />
                  {configData.showroom.phone}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-maroon text-base">💬</span>
                <div>
                  <strong>WhatsApp Concierge:</strong><br />
                  {configData.showroom.whatsapp}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gold/30">
              <a
                href={`https://wa.me/919829019900?text=Namaste%20Jai%20Sri%20Ram%20Jewellers,%20I%20would%20like%20to%20enquire%20about%20a%20showroom%20visit.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded text-xs uppercase tracking-wider font-semibold transition-all"
              >
                <span>💬 Chat on WhatsApp Directly</span>
              </a>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white border border-gold/40 p-8 rounded-lg shadow-sm">
            <h2 className="font-serif text-2xl text-maroon mb-2">Reserve an Appointment</h2>
            <p className="text-xs text-charcoal-muted mb-6">Fill out the details below and our concierge desk will confirm your private lounge time.</p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-400 p-6 rounded text-center">
                <div className="text-emerald-700 text-3xl mb-2">✓</div>
                <h3 className="font-serif text-xl text-emerald-800 font-bold mb-1">Appointment Request Received</h3>
                <p className="text-xs text-emerald-700 leading-relaxed mb-4">
                  Thank you, {formData.name}. We have reserved your appointment for {formData.date} ({formData.timeSlot}). Our Jaipur concierge will call you shortly to confirm arrangements.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs underline text-emerald-800 font-semibold"
                >
                  Book another appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-maroon font-bold uppercase tracking-wider text-[11px] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-maroon"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-maroon font-bold uppercase tracking-wider text-[11px] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-maroon"
                    />
                  </div>
                  <div>
                    <label className="block text-maroon font-bold uppercase tracking-wider text-[11px] mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-maroon"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-maroon font-bold uppercase tracking-wider text-[11px] mb-1">Consultation Type *</label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-maroon"
                    >
                      <option value="showroom">Jaipur Showroom Visit</option>
                      <option value="video">Virtual Video Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-maroon font-bold uppercase tracking-wider text-[11px] mb-1">Jewellery Interest *</label>
                    <select
                      value={formData.interest}
                      onChange={e => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-maroon"
                    >
                      <option value="bridal">Bridal Trousseau Ensembles</option>
                      <option value="polki">Kundan Polki & Jadau</option>
                      <option value="gold">22K Heritage Gold</option>
                      <option value="diamond">Certified Solitaire Diamonds</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-maroon font-bold uppercase tracking-wider text-[11px] mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-maroon"
                    />
                  </div>
                  <div>
                    <label className="block text-maroon font-bold uppercase tracking-wider text-[11px] mb-1">Time Slot *</label>
                    <select
                      value={formData.timeSlot}
                      onChange={e => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-maroon"
                    >
                      <option value="11:00 AM – 01:00 PM">11:00 AM – 01:00 PM</option>
                      <option value="02:00 PM – 04:00 PM">02:00 PM – 04:00 PM</option>
                      <option value="04:00 PM – 06:00 PM">04:00 PM – 06:00 PM</option>
                      <option value="06:00 PM – 08:00 PM">06:00 PM – 08:00 PM</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-maroon text-gold-light hover:bg-maroon-dark py-3 rounded text-xs uppercase tracking-widest font-semibold transition-all mt-2"
                >
                  Confirm Appointment Request →
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
