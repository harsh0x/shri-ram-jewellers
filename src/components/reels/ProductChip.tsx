'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ReelProduct } from '../../types/reels';

interface ProductChipProps {
  product: ReelProduct;
  isActive?: boolean;
}

export const ProductChip: React.FC<ProductChipProps> = ({ product, isActive = false }) => {
  const [imgSrc, setImgSrc] = useState(product.thumbnail);

  // Graceful fallback thumbnail
  const handleImageError = () => {
    setImgSrc('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=400&auto=format&fit=crop');
  };

  return (
    <Link
      href={product.href}
      onClick={(e) => {
        // Prevent clicking chip from toggling card video or fullscreen
        e.stopPropagation();
      }}
      className={`group relative flex items-center gap-3 w-[258px] h-[74px] px-3 rounded-[8px] flex-shrink-0 select-none transition-all duration-300 ${
        isActive
          ? 'bg-[#1a0510]/85 border border-[#C4A46C] shadow-[0_8px_20px_rgba(0,0,0,0.5)]'
          : 'bg-[#1a0510]/75 hover:bg-[#250516]/90 border border-[#C4A46C]/35 hover:border-[#C4A46C]'
      } backdrop-blur-md`}
      style={{ boxSizing: 'border-box' }}
      aria-label={`View ${product.name} details`}
    >
      {/* Square Thumbnail (54x54) */}
      <div className="w-[54px] h-[54px] rounded-[6px] overflow-hidden bg-black/40 border border-[#C4A46C]/30 flex-shrink-0 relative">
        <img
          src={imgSrc}
          alt={product.name}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.purityBadge && (
          <span className="absolute bottom-0 inset-x-0 bg-[#3B0A1B]/90 text-[#E3D2AE] text-[7px] text-center font-bold uppercase tracking-wider py-0.2">
            {product.purityBadge}
          </span>
        )}
      </div>

      {/* Info: 2-line name & price */}
      <div className="flex-1 min-w-0 pr-1 flex flex-col justify-center">
        <span className="text-[11px] font-semibold text-white group-hover:text-[#E3D2AE] line-clamp-2 leading-[1.3] transition-colors">
          {product.name}
        </span>
        {product.priceLabel && (
          <span className="text-[11px] font-bold text-[#C4A46C] mt-0.5 font-mono">
            {product.priceLabel}
          </span>
        )}
      </div>

      {/* Small grey circular arrow (22px) */}
      <div className="w-[22px] h-[22px] rounded-full bg-white/10 group-hover:bg-[#C4A46C] text-[#ccc] group-hover:text-[#250511] flex items-center justify-center flex-shrink-0 transition-colors">
        <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>

      {/* Gold "Shop this look" micro-label on hover */}
      <div className="absolute -top-6 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-[#3B0A1B] border border-[#C4A46C] px-2 py-0.5 rounded text-[8px] uppercase tracking-widest text-[#E3D2AE] font-bold shadow-md whitespace-nowrap z-30">
        Shop this look ⚜
      </div>
    </Link>
  );
};
