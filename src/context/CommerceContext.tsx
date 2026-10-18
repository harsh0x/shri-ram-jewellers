'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PriceBreakdownResult } from '../types';
import productsData from '../data/products.json';
import goldRatesData from '../data/goldRates.json';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

interface CommerceContextType {
  // Rates
  gold24kRate: number;
  gold22kRate: number;
  gold18kRate: number;
  diamondMultiplier: number;
  benchmark24k: number;
  benchmark22k: number;
  benchmark18k: number;
  adjustGoldRate: (purity: '24k' | '22k' | '18k', delta: number) => void;
  setGoldRate: (purity: '24k' | '22k' | '18k', rate: number) => void;
  setDiamondMultiplier: (multiplier: number) => void;
  resetRates: () => void;
  calculateProductPrice: (product: Product) => PriceBreakdownResult;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartTotals: {
    goldValue: number;
    makingCharges: number;
    stoneValue: number;
    taxableSubtotal: number;
    gstAmount: number;
    finalTotal: number;
    totalNetGoldWeight: number;
  };
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Rate Adjuster Modal
  isRateModalOpen: boolean;
  setIsRateModalOpen: (open: boolean) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CommerceContext = createContext<CommerceContextType | undefined>(undefined);

const BENCHMARK_24K = goldRatesData.rates.gold24k.ratePerGram;
const BENCHMARK_22K = goldRatesData.rates.gold22k.ratePerGram;
const BENCHMARK_18K = goldRatesData.rates.gold18k.ratePerGram;

export const CommerceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Live rates state
  const [gold24kRate, setGold24kRate] = useState<number>(BENCHMARK_24K);
  const [gold22kRate, setGold22kRate] = useState<number>(BENCHMARK_22K);
  const [gold18kRate, setGold18kRate] = useState<number>(BENCHMARK_18K);
  const [diamondMultiplier, setDiamondMultiplier] = useState<number>(1.0);

  // Cart and Wishlist
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('jsr_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('jsr_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedRates = localStorage.getItem('jsr_custom_rates');
      if (savedRates) {
        const rates = JSON.parse(savedRates);
        if (rates.gold24k) setGold24kRate(rates.gold24k);
        if (rates.gold22k) setGold22kRate(rates.gold22k);
        if (rates.gold18k) setGold18kRate(rates.gold18k);
        if (rates.diamondMultiplier) setDiamondMultiplier(rates.diamondMultiplier);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem('jsr_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('jsr_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(
        'jsr_custom_rates',
        JSON.stringify({
          gold24k: gold24kRate,
          gold22k: gold22kRate,
          gold18k: gold18kRate,
          diamondMultiplier
        })
      );
    } catch (e) {}
  }, [gold24kRate, gold22kRate, gold18kRate, diamondMultiplier]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  };

  const adjustGoldRate = (purity: '24k' | '22k' | '18k', delta: number) => {
    if (purity === '24k') setGold24kRate(prev => Math.max(1000, prev + delta));
    if (purity === '22k') setGold22kRate(prev => Math.max(1000, prev + delta));
    if (purity === '18k') setGold18kRate(prev => Math.max(1000, prev + delta));
    showToast(`Updated ${purity.toUpperCase()} Gold Rate by ${delta > 0 ? '+' : ''}₹${delta}/g`);
  };

  const setGoldRate = (purity: '24k' | '22k' | '18k', rate: number) => {
    const val = Math.max(1000, rate);
    if (purity === '24k') setGold24kRate(val);
    if (purity === '22k') setGold22kRate(val);
    if (purity === '18k') setGold18kRate(val);
  };

  const resetRates = () => {
    setGold24kRate(BENCHMARK_24K);
    setGold22kRate(BENCHMARK_22K);
    setGold18kRate(BENCHMARK_18K);
    setDiamondMultiplier(1.0);
    showToast('Reset rates to official Jaipur Bullion Association benchmark');
  };

  const calculateProductPrice = (product: Product): PriceBreakdownResult => {
    let ratePerGram = gold22kRate;
    if (product.purity.includes('24K') || product.purity.includes('999')) {
      ratePerGram = gold24kRate;
    } else if (product.purity.includes('18K') || product.purity.includes('750')) {
      ratePerGram = gold18kRate;
    } else {
      ratePerGram = gold22kRate;
    }

    const netGoldWeight = Number(product.netGoldWeight) || 0;
    const goldValue = Math.round(netGoldWeight * ratePerGram);

    const makingChargePercent = Number(product.makingChargePercent) || 12;
    const makingCharges = Math.round(goldValue * (makingChargePercent / 100));

    const baseStoneValue = Math.round(Number(product.stoneValue) || 0);
    const stoneValue = Math.round(baseStoneValue * diamondMultiplier);

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
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedSize?: string) => {
    setCart(prev => {
      const idx = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === selectedSize
      );
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantity += quantity;
        return copy;
      }
      return [...prev, { product, quantity, selectedSize }];
    });
    showToast(`Added "${product.name}" to your Shopping Bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from your Shopping Bag');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart totals calculation
  const cartTotals = cart.reduce(
    (acc, item) => {
      const price = calculateProductPrice(item.product);
      acc.goldValue += price.goldValue * item.quantity;
      acc.makingCharges += price.makingCharges * item.quantity;
      acc.stoneValue += price.stoneValue * item.quantity;
      acc.taxableSubtotal += price.taxableSubtotal * item.quantity;
      acc.gstAmount += price.gstAmount * item.quantity;
      acc.finalTotal += price.finalTotal * item.quantity;
      acc.totalNetGoldWeight += (Number(item.product.netGoldWeight) || 0) * item.quantity;
      return acc;
    },
    {
      goldValue: 0,
      makingCharges: 0,
      stoneValue: 0,
      taxableSubtotal: 0,
      gstAmount: 0,
      finalTotal: 0,
      totalNetGoldWeight: 0
    }
  );

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from Saved Heirlooms`);
        return prev.filter(p => p.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to your Wishlist`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  return (
    <CommerceContext.Provider
      value={{
        gold24kRate,
        gold22kRate,
        gold18kRate,
        diamondMultiplier,
        benchmark24k: BENCHMARK_24K,
        benchmark22k: BENCHMARK_22K,
        benchmark18k: BENCHMARK_18K,
        adjustGoldRate,
        setGoldRate,
        setDiamondMultiplier,
        resetRates,
        calculateProductPrice,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalCount,
        cartTotals,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isRateModalOpen,
        setIsRateModalOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[100] max-w-sm bg-maroon-deep text-gold-light border border-gold px-5 py-3 rounded-md shadow-2xl flex items-center gap-3 transition-all animate-bounce">
          <span className="text-gold text-lg">⚜</span>
          <span className="text-xs font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}
    </CommerceContext.Provider>
  );
};

export const useCommerce = () => {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error('useCommerce must be used within a CommerceProvider');
  }
  return context;
};
