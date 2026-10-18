export interface ReelProduct {
  id: string;
  name: string;
  thumbnail: string;
  href: string;
  priceLabel?: string;
  purityBadge?: string;
}

export interface Reel {
  id: string;
  title: string;
  subtitle?: string;
  videoSrc: string;
  posterSrc: string;
  durationSec?: number;
  occasionTag?: string;
  products: ReelProduct[];
}
