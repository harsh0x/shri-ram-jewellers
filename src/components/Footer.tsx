import React from 'react';
import Link from 'next/link';
import configData from '../data/config.json';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C030B] text-[#D6CEBE] border-t border-gold/40 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div>
            <Link href="/" className="inline-block mb-3 group" title="Jai Sri Ram Jewellers · Jaipur">
              <img 
                src="/images/logo.png" 
                alt="Jai Sri Ram Jewellers Jaipur" 
                className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-[0_2px_14px_rgba(196,164,108,0.35)] transition-transform duration-300 group-hover:scale-[1.02]" 
              />
            </Link>
            <p className="text-xs text-[#A99F8D] leading-relaxed mb-4 max-w-sm">
              Fine Jewellery. Fair Value. Generations of Trust.<br />
              Carrying forward the heritage established in 1990 near Bikaner, crafting timeless royal Kundan Polki, 22K hallmarked gold, and certified natural diamonds in Jaipur, Rajasthan.
            </p>
            <div className="text-xs text-gold-light space-y-1">
              <p>📍 {configData.showroom.addressLine1}, {configData.showroom.city} {configData.showroom.pincode}</p>
              <p>📞 {configData.showroom.phone}</p>
              <p>✉ {configData.showroom.email}</p>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">
              Signature Collections
            </h5>
            <ul className="space-y-2 text-xs text-[#C0B7A6]">
              <li><Link href="/collections?category=polki" className="hover:text-gold-light transition-colors">Royal Polki & Kundan Jadau</Link></li>
              <li><Link href="/collections?category=gold" className="hover:text-gold-light transition-colors">22K Heritage Gold</Link></li>
              <li><Link href="/collections?category=diamond" className="hover:text-gold-light transition-colors">Certified Natural Diamonds</Link></li>
              <li><Link href="/collections?category=bridal" className="hover:text-gold-light transition-colors">Jaipur Bridal Trousseau</Link></li>
              <li><Link href="/collections" className="hover:text-gold-light transition-colors">Full 24-Piece Vault</Link></li>
            </ul>
          </div>

          {/* Customer Policies */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">
              Customer Policies (Draft)
            </h5>
            <ul className="space-y-2 text-xs text-[#C0B7A6]">
              <li><Link href="/policies#14-day-exchange" className="hover:text-gold-light transition-colors">14-Day Exchange Promise</Link></li>
              <li><Link href="/policies#lifetime-buyback" className="hover:text-gold-light transition-colors">Lifetime Buyback Assistance</Link></li>
              <li><Link href="/policies#lifetime-maintenance" className="hover:text-gold-light transition-colors">Lifetime Maintenance & Care</Link></li>
              <li><Link href="/policies#shipping-delivery" className="hover:text-gold-light transition-colors">Insured Shipping & Delivery</Link></li>
              <li><Link href="/policies#cancellation" className="hover:text-gold-light transition-colors">Cancellation Terms</Link></li>
              <li><Link href="/policies#grievance-redressal" className="hover:text-gold-light transition-colors">Grievance Redressal Desk</Link></li>
            </ul>
          </div>

          {/* Showroom & Hours */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-gold mb-4">
              Jaipur Flagship Showroom
            </h5>
            <p className="text-xs text-[#A99F8D] leading-relaxed mb-4">
              Visit our neo-classical consultation salon near Johari Bazar for bespoke bridal appointments and private viewing.
            </p>
            <div className="bg-white/5 border border-gold/30 p-3 rounded text-xs text-gold-light mb-4">
              <p className="font-semibold text-white">Showroom Timings:</p>
              <p>{configData.showroom.timings}</p>
            </div>
            <Link 
              href="/contact" 
              className="inline-block border border-gold text-gold-light px-4 py-2 text-xs uppercase tracking-wider font-semibold hover:bg-gold hover:text-maroon-dark transition-all rounded"
            >
              Reserve Private Visit →
            </Link>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold/20 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-[#8C8270] gap-4">
          <div>
            © 2026 {configData.brandName}. All Rights Reserved. Jaipur, Rajasthan, India.
          </div>
          <div className="text-center sm:text-right">
            {configData.brandTagline} · Draft terms pending operational alignment.
          </div>
        </div>
      </div>
    </footer>
  );
};
