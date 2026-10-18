'use client';
import React, { useState } from 'react';
import { Reel } from '../../types/reels';
import { ProductChip } from './ProductChip';

interface ReelOverlayUIProps {
  reel: Reel;
  reelsCount: number;
  activeIndex: number;
  progress: number; // 0 to 100
  isMuted: boolean;
  isPlaying: boolean;
  onToggleMute: (e: React.MouseEvent) => void;
  onOpenFullscreen: (e: React.MouseEvent) => void;
  onShare: (e: React.MouseEvent) => void;
  isFullscreen?: boolean;
}

export const ReelOverlayUI: React.FC<ReelOverlayUIProps> = ({
  reel,
  reelsCount,
  activeIndex,
  progress,
  isMuted,
  isPlaying,
  onToggleMute,
  onOpenFullscreen,
  onShare,
  isFullscreen = false
}) => {
  const [copiedToast, setCopiedToast] = useState(false);

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare(e);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '#reels');
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2000);
    }
  };

  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-between p-3.5 sm:p-4 pointer-events-none select-none">
      {/* Top Gradient Shadow & Controls */}
      <div className="pointer-events-auto bg-gradient-to-b from-black/80 via-black/40 to-transparent -mx-3.5 -mt-3.5 sm:-mx-4 sm:-mt-4 p-3.5 sm:p-4 rounded-t-[100px]">
        {/* Instagram-story segmented progress bars */}
        <div className="flex items-center gap-1.5 w-full mb-3 px-1">
          {Array.from({ length: reelsCount }).map((_, idx) => {
            const isCompleted = idx < activeIndex;
            const isCurrent = idx === activeIndex;
            const widthPercent = isCompleted ? 100 : isCurrent ? progress : 0;

            return (
              <div
                key={idx}
                className="h-1 flex-1 bg-white/25 rounded-full overflow-hidden backdrop-blur-sm"
              >
                <div
                  className="h-full bg-gradient-to-r from-gold via-gold-light to-gold transition-all duration-100 ease-linear rounded-full"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-2">
          {/* Reel Title & Occasion */}
          <div className="min-w-0 pr-2">
            {reel.occasionTag && (
              <span className="inline-block text-[8px] font-bold uppercase tracking-widest text-gold bg-black/50 border border-gold/40 px-2 py-0.5 rounded-full mb-0.5">
                {reel.occasionTag}
              </span>
            )}
            <h4 className="font-serif text-sm sm:text-base font-bold text-ivory truncate drop-shadow-md">
              {reel.title}
            </h4>
          </div>

          {/* Action Icons: Mute, Share, Fullscreen */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Mute / Unmute Button */}
            <button
              onClick={onToggleMute}
              className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-gold/40 text-ivory flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <svg className="w-4 h-4 text-ivory" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gold-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>

            {/* Share Button */}
            <button
              onClick={handleShareClick}
              className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-gold/40 text-ivory flex items-center justify-center transition-all hover:scale-105 active:scale-95 relative"
              aria-label="Share this reel"
              title="Share Reel link"
            >
              <svg className="w-4 h-4 text-ivory" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              {copiedToast && (
                <span className="absolute -bottom-7 right-0 bg-maroon-deep text-gold-light border border-gold text-[9px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>

            {/* Fullscreen Button (shown when not already in fullscreen) */}
            {!isFullscreen && (
              <button
                onClick={onOpenFullscreen}
                className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-gold/40 text-ivory flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                aria-label="Open fullscreen story viewer"
                title="Watch Fullscreen Story"
              >
                <svg className="w-4 h-4 text-gold-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Middle Pause Indicator if paused */}
      {!isPlaying && (
        <div className="self-center w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-gold/50 flex items-center justify-center text-gold-light shadow-2xl animate-pulse pointer-events-none">
          <svg className="w-6 h-6 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      )}

      {/* Bottom Gradient Shadow & Product Chips Strip */}
      <div className="pointer-events-auto bg-gradient-to-t from-black/90 via-black/50 to-transparent -mx-3.5 -mb-3.5 sm:-mx-4 sm:-mb-4 p-3.5 sm:p-4 rounded-b-xl">
        <div className="flex items-center justify-between text-[10px] text-ivory/80 uppercase tracking-widest font-semibold mb-2">
          <span className="flex items-center gap-1 text-gold-light">
            <span>⚜</span>
            <span>Featured in this Look</span>
          </span>
          <span className="text-[9px] text-ivory/60 font-mono">
            {reel.products.length} {reel.products.length === 1 ? 'piece' : 'pieces'}
          </span>
        </div>

        {/* Horizontally scrollable product chip strip */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {reel.products.map((product) => (
            <ProductChip key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
