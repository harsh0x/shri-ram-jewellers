import { Product, PriceBreakdownResult } from '../types';
import goldRatesData from '../data/goldRates.json';

/**
 * Calculates the exact transparent price breakdown for any jewellery piece
 * Formula:
 * 1. Gold Component = Net Gold Weight (g) * Purity Gold Rate per gram
 * 2. Making Charges = Gold Component * (Making Charge % / 100)
 * 3. Stone Component = Specified value of natural diamonds, polki, pearls, gems
 * 4. GST = 3% government tax applied on (Gold + Making + Stone)
 * 5. Final Total = Subtotal + GST
 */
export function calculateJewelleryPrice(
  product: Product,
  customGoldRatePerGram?: number
): PriceBreakdownResult {
  let ratePerGram: number;

  if (customGoldRatePerGram && customGoldRatePerGram > 0) {
    ratePerGram = customGoldRatePerGram;
  } else {
    // Select benchmark based on purity
    if (product.purity.includes('22K') || product.purity.includes('916')) {
      ratePerGram = goldRatesData.rates.gold22k.ratePerGram;
    } else if (product.purity.includes('18K') || product.purity.includes('750')) {
      ratePerGram = goldRatesData.rates.gold18k.ratePerGram;
    } else {
      ratePerGram = goldRatesData.rates.gold24k.ratePerGram;
    }
  }

  const netGoldWeight = Number(product.netGoldWeight) || 0;
  const goldValue = Math.round(netGoldWeight * ratePerGram);

  const makingChargePercent = Number(product.makingChargePercent) || 12;
  const makingCharges = Math.round(goldValue * (makingChargePercent / 100));

  const stoneValue = Math.round(Number(product.stoneValue) || 0);

  const taxableSubtotal = goldValue + makingCharges + stoneValue;
  const gstRatePercent = 3;
  const gstAmount = Math.round(taxableSubtotal * (gstRatePercent / 100));

  const finalTotal = taxableSubtotal + gstAmount;

  return {
    goldRatePerGram: ratePerGram,
    netGoldWeight,
    goldValue,
    makingChargePercent,
    makingCharges,
    stoneValue,
    taxableSubtotal,
    gstRatePercent,
    gstAmount,
    finalTotal
  };
}

/**
 * Format currency into Indian Rupee standard format (e.g., ₹ 1,45,200)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return '₹' + amount.toLocaleString('en-IN');
}

/**
 * Estimates delivery date based on Indian 6-digit Pincode
 */
export function estimateDeliveryByPincode(pincode: string, readyToShip: boolean) {
  const cleanPin = pincode.trim();
  if (!/^\d{6}$/.test(cleanPin)) {
    return {
      valid: false,
      message: 'Please enter a valid 6-digit Indian PIN code.'
    };
  }

  const prefix = cleanPin.substring(0, 2);
  let daysMin = readyToShip ? 2 : 14;
  let daysMax = readyToShip ? 4 : 21;

  // Local Rajasthan pincodes (30 - 34) get fastest delivery
  if (['30', '31', '32', '33', '34'].includes(prefix)) {
    daysMin = readyToShip ? 1 : 12;
    daysMax = readyToShip ? 3 : 18;
  }

  const now = new Date();
  const minDate = new Date(now.setDate(now.getDate() + daysMin));
  const maxDate = new Date(now.setDate(now.getDate() + (daysMax - daysMin)));

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', weekday: 'short' };
  const minFormatted = minDate.toLocaleDateString('en-IN', options);
  const maxFormatted = maxDate.toLocaleDateString('en-IN', options);

  return {
    valid: true,
    zone: ['30', '31', '32', '33', '34'].includes(prefix) ? 'Rajasthan Express' : 'All-India Insured Priority',
    estimate: `${minFormatted} – ${maxFormatted}`,
    insured: true,
    message: readyToShip
      ? `Ready to ship: Estimated delivery by ${maxFormatted} with 100% transit insurance.`
      : `Bespoke Handcrafted: Hand-crafted and delivered by ${maxFormatted} with insured courier.`
  };
}
