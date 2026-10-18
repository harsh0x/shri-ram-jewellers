'use client';
import React, { useRef, useEffect } from 'react';
import { Reel } from '../../types/reels';
import { ProductChip } from './ProductChip';

interface ReelCardUIProps {
  reel: Reel;
  progressPercent: number; // 0 to 100
  isMuted: boolean;
  onToggleMute: (e: React.MouseEvent) => void;
  onOpenFullscreen: (e: React.MouseEvent) => void;
  onShare: (e: React.MouseEvent) => void;
}

export const ReelCardUI: React.FC<ReelCardUIProps> = ({
  reel,
  progressPercent,
  isMuted,
  onToggleMute,
  onOpenFullscreen,
  onShare
}) => {
  const chipsScrollRef = useRef<HTMLDivElement>(null);
  const products = reel.products || [];
  const numProducts = Math.max(1, products.length);

  // Determine active product index based on progress (0% to 100%)
  const segmentFraction = 100 / numProducts;
  const activeProductIndex = Math.min(
    numProducts - 1,
    Math.floor(progressPercent / segmentFraction)
  );

  // Auto-scroll the chip strip to keep the active product visible
  useEffect(() => {
    if (chipsScrollRef.current) {
      const chipWidth = 258;
      const gap = 12;
      const targetLeft = activeProductIndex * (chipWidth + gap);
      chipsScrollRef.current.scrollTo({
        left: targetLeft,
        behavior: 'smooth'
      });
    }
  }, [activeProductIndex]);

  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-between pointer-events-none select-none">
      {/* Top Bar with Dark Gradient */}
      <div className="w-full pt-4 pb-10 px-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between pointer-events-auto">
        {/* Top-Left Title: 13px bold white, truncated */}
        <h4 className="text-[13px] font-bold text-white truncate max-w-[220px] drop-shadow-md">
          {reel.title}
        </h4>

        {/* Top-Right Mute, Share, Fullscreen Icons (No Backgrounds) */}
        <div className="flex items-center gap-3 text-white">
          {/* Mute / Unmute */}
          <button
            onClick={onToggleMute}
            className="p-1 text-white hover:text-[#C4A46C] transition-colors focus:outline-none"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
              </svg>
            ) : (
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>

          {/* Share */}
          <button
            onClick={onShare}
            className="p-1 text-white hover:text-[#C4A46C] transition-colors focus:outline-none"
            aria-label="Share reel"
            title="Share"
          >
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>

          {/* Fullscreen */}
          <button
            onClick={onOpenFullscreen}
            className="p-1 text-white hover:text-[#C4A46C] transition-colors focus:outline-none"
            aria-label="Open fullscreen"
            title="Fullscreen"
          >
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Product Section */}
      <div className="w-full pt-10 pb-4 px-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-auto flex flex-col">
        {/* Horizontally scrollable product chips (258x74), next chip peeking in */}
        <div
          ref={chipsScrollRef}
          className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth w-full pb-1"
          style={{ scrollSnapType: 'x mandatory' }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {products.map((product, idx) => (
            <div key={product.id} style={{ scrollSnapAlign: 'start' }}>
              <ProductChip product={product} isActive={idx === activeProductIndex} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
