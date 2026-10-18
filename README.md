# Jai Sri Ram Jewellers — Luxury E-Commerce Platform

> **Fine Jewellery. Fair Value. Generations of Trust.**  
> *Jaipur, Rajasthan, India · Heritage Established in 1990*

---

## 🏛 1. Brand & Creative Direction

**Jai Sri Ram Jewellers** is a family-led fine jewellery house rooted in decades of wholesale mastery and customer trust. Originating in 1990 near Bikaner with Shri Jai Hanuman Bamalwa, moving to Jaipur in 2001, and opening its premier retail showroom in 2014, the brand is today led by Veer Bamalwa carrying the legacy forward.

- **Creative Direction**: **Neo-Classical Indian Luxury**. Architectural jharokha arches, symmetry, restrained antique gold linework, and Jaipur palace aesthetics.
- **Brand Palette**:
  - **Royal Maroon** (`#65152F`) — Storytelling canvas, heritage timeline, and primary accents.
  - **Rich Magenta** (`#A21E58`) — Royal highlights, micro-badges, and CTA accents.
  - **Antique Gold** (`#C4A46C`) — Hairline dividers, architectural jharokha borders, and shimmer effects.
  - **Warm Ivory** (`#F7F1E8`) — High-contrast canvas for product browsing.
- **Typography**:
  - Headings & Display: *Cormorant Garamond* (or *Playfair Display*).
  - Body & Navigation: *Montserrat* / *Lato*.

---

## 💎 2. Features & Foundational Trust Architecture

1. **Cinematic Preloader & Jharokha Hero Window**:
   - SVG path drawing of the royal monogram and classical Rajasthani arch.
   - 60fps subtle gold particle dust canvas.
2. **Transparent Price Breakdown Formula Engine**:
   - Every product displays an itemized formula:
     $$\text{Total Price} = (\text{Net Gold Weight} \times \text{Day's Benchmark Rate}) + \text{Making Charges} + \text{Stone Value} + 3\%\text{ GST}$$
   - Customers never pay gold rates for stone weights.
   - Interactive gold rate slider allows customers to simulate live price movements.
3. **Live Gold & Silver Rates Ticker**:
   - 24K Gold, 22K Hallmarked Gold, 18K Diamond Setting, and Silver 999 benchmark rates.
   - Admin control panel allows instant benchmark updates with real-time catalog price recalculation.
4. **Draft Policy Governance Hub (9 Policies Strictly Implemented)**:
   - Configurable internal flag: `SHOW_DRAFT_POLICY_BANNER = true`.
   - Visible top notice banner until legal review is completed.
   - Verbatim coverage of 14-Day Exchange (100% invoice value without deduction), Lifetime Buyback (gold valued at day's rate on net weight; stones valued by documented methodology), Lifetime Maintenance (complimentary inspection/cleaning vs approved chargeable repairs), Insured Shipping, Cancellation, Damaged Orders, Quality & Authenticity, Privacy & Payments, and Jaipur Grievance Redressal Officer.
5. **Full 24-Piece Realistic Catalog**:
   - Categorized into Royal Polki & Kundan Jadau, 22K Heritage Gold, Certified Natural Diamonds, and Bridal Trousseau Sets.
   - Detailed gross weights, net gold weights, stone carats, BIS 916 HUID codes, and IGI/GIA certificate details.
6. **Interactive Showroom Appointment Booking**:
   - Jaipur showroom visit vs virtual video consultation scheduler.
   - Instant booking confirmation and direct WhatsApp concierge integration (`+91 98290 19900`).
7. **Shopping Bag & Razorpay Payment Simulation**:
   - Slide-over bag drawer with line-item management and insured delivery badges.
   - High-fidelity Razorpay test mode payment modal with UPI, Cards, and Netbanking.
   - Order confirmation receipt with order ID and WhatsApp notification template preview.

---

## 📁 3. Repository Architecture

```
c:/Users/seoha/Desktop/shri ram jewellers/
├── index.html                     # MASTER INTERACTIVE STANDALONE APPLICATION
│                                  # (Double-click to open immediately in any browser)
├── src/
│   ├── app/                       # Next.js 14 App Router
│   │   ├── layout.tsx             # Root layout with fonts, SEO schema, metadata
│   │   ├── page.tsx               # Home page
│   │   ├── collections/page.tsx   # Catalog with multi-filter, search, and breakdown modal
│   │   ├── policies/page.tsx      # Comprehensive policy hub with draft disclaimer
│   │   ├── heritage/page.tsx      # 1990 journey, founder profile, Veer Bamalwa vision
│   │   ├── quality/page.tsx       # BIS Hallmark, HUID guide, 4Cs, Polki Jadau guide
│   │   ├── contact/page.tsx       # Showroom appointment booking, map, Jaipur address
│   │   └── globals.css            # Design tokens, Jharokha arch classes, scrollbars
│   ├── components/                # Modular React Components
│   │   ├── Header.tsx             # Responsive header with branding and navigation
│   │   ├── Footer.tsx             # Rich footer with showroom hours and links
│   │   ├── DraftBanner.tsx        # Top draft disclaimer banner
│   │   └── GoldTicker.tsx         # Live bullion benchmark ticker bar
│   ├── data/                      # CMS-Ready Local Data Layer
│   │   ├── products.json          # 24 realistic fine jewellery pieces
│   │   ├── policies.json          # Full draft customer policy texts
│   │   ├── timeline.json          # 1990 to present milestones
│   │   ├── goldRates.json         # Benchmark bullion rates
│   │   └── config.json            # Store address, contact, and system flags
│   ├── lib/
│   │   └── pricing.ts             # Transparent pricing calculation engine
│   └── types/
│       └── index.ts               # Full TypeScript type definitions
├── tailwind.config.ts             # Tailwind configuration with strict brand colors
├── tsconfig.json                  # TypeScript compiler options
├── postcss.config.js              # PostCSS plugins
├── package.json                   # Dependencies (Next.js 14, React 18, Tailwind)
└── README.md                      # Comprehensive documentation
```

---

## 🚀 4. How to Run & Preview

### Option A: Instant Live Interactive Experience (No Node.js Required)
Simply double-click:
👉 **`c:\Users\seoha\Desktop\shri ram jewellers\index.html`**  
or right-click $\rightarrow$ **Open with Chrome / Edge / Firefox**.
- Works 100% offline and standalone.
- Includes the full preloader, Jharokha hero, live gold ticker, 24 products catalog, transparent price calculator slider, cart, Razorpay simulation, policy hub, and showroom appointment booking!

### Option B: Next.js 14 Development Server
If you have Node.js 18+ installed on your system:
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

### Option C: Production Deployment (Vercel)
The codebase is structured for zero-configuration deployment to [Vercel](https://vercel.com):
```bash
npm run build
npm start
```

---

## 📋 5. Pre-Launch Approval Checklist (For Client Handoff)

Before going live with the public storefront, the client should complete the following verification steps:

- [ ] **Final Logo & Colour Palette**: Confirm vector monogram crest and high-res vector files.
- [ ] **Founder Biographies**: Review Shri Jai Hanuman Bamalwa profile and Veer Bamalwa quotes.
- [ ] **Product Photography**: Swap the seeded Unsplash luxury photography URLs in `src/data/products.json` with professional Jaipur showroom catalog photos.
- [ ] **Gold Rate Source Integration**: Decide whether to maintain rates via the built-in Admin Rate Controller or connect to a live bullion API (e.g., GoldAPI / IBJA).
- [ ] **14-Day Exchange Terms**: Finalize operational categories and exclusions (custom/engraved orders).
- [ ] **Lifetime Buyback Methodology**: Finalize internal deduction matrices and verification assay guidelines.
- [ ] **Lifetime Maintenance Scope**: Review complimentary services list vs chargeable repairs.
- [ ] **Payment Gateway Production Keys**: Replace `rzp_test_...` with active Razorpay merchant key in `src/data/config.json`.
- [ ] **Draft Banner Deactivation**: Once legal counsel approves all policies, set `showDraftPolicyBanner: false` in `src/data/config.json`.
