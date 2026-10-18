export type JewelleryCategory = 'gold' | 'diamond' | 'polki' | 'bridal';
export type JewellerySubCategory = 'necklaces' | 'earrings' | 'rings' | 'bangles' | 'pendants';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: JewelleryCategory;
  subCategory: JewellerySubCategory;
  tag?: string;
  description: string;
  metal: string;
  purity: '24K' | '22K' | '18K' | string;
  purityFraction: number; // e.g., 0.916 for 22K, 0.750 for 18K
  grossWeight: number; // in grams
  netGoldWeight: number; // in grams (gold only, excluding stones)
  stoneDetails: string;
  stoneValue: number; // in INR
  makingChargePercent: number; // % of gold value
  hallmark: string;
  certification: string;
  images: string[];
  occasion: string;
  readyToShip: boolean;
  dispatchDays: string;
  featured?: boolean;
}

export interface PriceBreakdownResult {
  goldRatePerGram: number;
  netGoldWeight: number;
  goldValue: number;
  makingChargePercent: number;
  makingCharges: number;
  stoneValue: number;
  taxableSubtotal: number;
  gstRatePercent: number;
  gstAmount: number;
  finalTotal: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  calculatedPrice: PriceBreakdownResult;
}

export interface AppointmentBooking {
  fullName: string;
  phoneNumber: string;
  email: string;
  preferredDate: string;
  preferredTimeSlot: string;
  appointmentType: 'showroom_visit' | 'virtual_video';
  jewelleryInterest: JewelleryCategory | 'all';
  specialRequests?: string;
}

export interface PolicyTerm {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  terms: string[];
  goldComponent?: string[];
  stoneComponent?: string[];
  additionalTerms?: string[];
  proposedPromise?: string;
  operationalNote?: string;
}
