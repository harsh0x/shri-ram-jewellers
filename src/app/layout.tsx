import type { Metadata } from "next";
import "./globals.css";
import configData from "../data/config.json";
import { CommerceProvider } from "../context/CommerceContext";
import { CartDrawer } from "../components/cart/CartDrawer";
import { RateAdjusterModal } from "../components/RateAdjusterModal";

export const metadata: Metadata = {
  title: "Jai Sri Ram Jewellers | Heritage Fine Jewellery · Jaipur Since 1990",
  description: "Fine Jewellery. Fair Value. Generations of Trust. Handcrafted 22K Gold, Polki & certified natural Diamonds in Jaipur, Rajasthan. Heritage established 1990.",
  keywords: ["Jai Sri Ram Jewellers", "Jaipur Jewellery", "Polki Choker", "22K Gold Jewellery", "Bridal Trousseau", "Transparent Jewellery Pricing", "Bamalwa Jewellers"],
  openGraph: {
    title: "Jai Sri Ram Jewellers | Heritage Fine Jewellery · Jaipur",
    description: "Fine Jewellery. Fair Value. Generations of Trust. Est. 1990 near Bikaner, now in Jaipur.",
    url: "https://jaisriramjewellers.com",
    siteName: "Jai Sri Ram Jewellers",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JewelryStore",
              "name": configData.brandName,
              "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000",
              "telephone": configData.showroom.phone,
              "email": configData.showroom.email,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": configData.showroom.addressLine1,
                "addressLocality": configData.showroom.city,
                "addressRegion": configData.showroom.state,
                "postalCode": configData.showroom.pincode,
                "addressCountry": "IN"
              },
              "priceRange": "₹₹₹₹",
              "openingHours": "Mo-Su 11:00-20:30"
            })
          }}
        />
      </head>
      <body className="bg-ivory text-charcoal font-sans antialiased selection:bg-maroon selection:text-gold-light">
        <CommerceProvider>
          {children}
          <CartDrawer />
          <RateAdjusterModal />
        </CommerceProvider>
      </body>
    </html>
  );
}
