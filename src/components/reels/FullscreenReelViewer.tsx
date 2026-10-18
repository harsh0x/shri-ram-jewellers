'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Reel } from '../../types/reels';
import { ProductChip } from './ProductChip';

interface FullscreenReelViewerProps {
  isOpen: boolean;
  reels: Reel[];
  initialIndex: number;
  onClose: () => void;
}

export const FullscreenReelViewer: React.FC<FullscreenReelViewerProps> = ({
  isOpen,
  reels,
  initialIndex,
  onClose
}) => {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showPlayIconBriefly, setShowPlayIconBriefly] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const chipsScrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const wheelLockRef = useRef<boolean>(false);
  const playIconTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeReel = reels[currentIndex] || reels[0];
  const products = activeReel?.products || [];
  const numProducts = Math.max(1, products.length);
  const segmentFraction = 100 / numProducts;
  const activeProductIndex = Math.min(
    numProducts - 1,
    Math.floor(progressPercent / segmentFraction)
  );

  // Mount check for createPortal SSR safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync index when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setProgressPercent(0);
    }
  }, [initialIndex, isOpen]);

  // Lock body scroll and guarantee navbar is hidden while fullscreen is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.body.classList.add('reels-fullscreen-active');
      containerRef.current?.focus();

      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.classList.remove('reels-fullscreen-active');
      };
    }
  }, [isOpen]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reels.length);
    setProgressPercent(0);
  }, [reels.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length);
    setProgressPercent(0);
  }, [reels.length]);

  // Toggle play/pause
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }

    setShowPlayIconBriefly(true);
    if (playIconTimerRef.current) clearTimeout(playIconTimerRef.current);
    playIconTimerRef.current = setTimeout(() => {
      setShowPlayIconBriefly(false);
    }, 600);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'm' || e.key === 'M') {
        setIsMuted((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Mouse wheel changes reels (throttled)
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelLockRef.current) return;
    if (Math.abs(e.deltaY) > 30) {
      wheelLockRef.current = true;
      if (e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 600);
    }
  };

  // Video playback initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isOpen) return;

    video.currentTime = 0;
    video.muted = isMuted;
    const p = video.play();
    if (p !== undefined) {
      p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [currentIndex, isOpen, isMuted]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    const dur = duration || activeReel.durationSec || 15;
    setProgressPercent(Math.min(100, (currentTime / dur) * 100));
  };

  const handleEnded = () => {
    handleNext();
  };

  // Auto-scroll product chips
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

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (deltaY < -60) {
      handleNext();
    } else if (deltaY > 60) {
      handlePrev();
    }
  };

  // Click on background backdrop closes modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current) {
      onClose();
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      ref={containerRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Fullscreen Story Viewer: ${activeReel?.title}`}
      onClick={handleBackdropClick}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999999,
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
        overflow: 'hidden'
      }}
      className="select-none backdrop-blur-md"
    >
      {/* Viewport Top-Right Luxury Minimal Close Button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          zIndex: 10000002,
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          backgroundColor: 'rgba(26, 5, 16, 0.85)',
          border: '1px solid rgba(196, 164, 108, 0.65)',
          color: '#F7F1E8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)',
          transition: 'all 0.25s ease'
        }}
        className="hover:!bg-[#65152F] hover:!border-[#C4A46C] hover:scale-105 active:scale-95 group"
        aria-label="Close fullscreen viewer (Esc)"
        title="Close (Esc)"
      >
        <svg
          className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Up/Down Chevrons on Right Edge (Desktop) */}
      <div
        style={{
          position: 'absolute',
          right: '28px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10000001,
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
        className="hidden md:flex"
      >
        <button
          onClick={handlePrev}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(26, 5, 16, 0.75)',
            border: '1px solid rgba(196, 164, 108, 0.5)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(8px)'
          }}
          className="hover:!bg-[#C4A46C] hover:!text-[#250511] active:scale-95"
          aria-label="Previous reel (Up arrow)"
          title="Previous (Up)"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'rgba(26, 5, 16, 0.75)',
            border: '1px solid rgba(196, 164, 108, 0.5)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(8px)'
          }}
          className="hover:!bg-[#C4A46C] hover:!text-[#250511] active:scale-95"
          aria-label="Next reel (Down arrow)"
          title="Next (Down)"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Video Column: Centered, Full Viewport Height, Width = 62.5% of height, No radius, No cropping */}
      <div
        id="fullscreen-player-column"
        onClick={togglePlayPause}
        style={{
          position: 'relative',
          height: '100vh',
          maxHeight: '100vh',
          width: 'min(calc(100vh * 0.625), 94vw)',
          borderRadius: 0,
          overflow: 'hidden',
          backgroundColor: '#0a0206',
          cursor: 'pointer',
          boxShadow: '0 0 100px rgba(0, 0, 0, 0.95)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {/* Ambient Subtle Blurred Glow Backdrop (Eliminates harsh black letterboxing without zooming video) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${activeReel?.posterSrc})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            filter: 'blur(36px) brightness(0.35)',
            transform: 'scale(1.2)',
            zIndex: 1
          }}
        />

        {/* Minimal Floating Top Header Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: '16px 18px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
            zIndex: 25,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Reel Occasion & Title */}
          <div className="flex items-center gap-2 max-w-[70%]">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E3D2AE] bg-[#3B0A1B]/80 border border-[#C4A46C]/40 px-2 py-0.5 rounded">
              {activeReel?.occasionTag || 'Royal Jewellery'}
            </span>
            <span className="text-xs font-semibold text-white/90 truncate drop-shadow">
              {activeReel?.title}
            </span>
          </div>

          {/* Quick Sound & In-Card Close Actions */}
          <div className="flex items-center gap-2">
            {/* Mute Toggle */}
            <button
              onClick={() => setIsMuted((prev) => !prev)}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(196, 164, 108, 0.4)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              className="hover:border-[#C4A46C] hover:text-[#C4A46C] transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>

            {/* In-Card Close Button */}
            <button
              onClick={onClose}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(196, 164, 108, 0.4)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              className="hover:!bg-[#65152F] hover:border-[#C4A46C] transition-all"
              aria-label="Close"
              title="Close"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Fullscreen Video: object-fit contain so it is NEVER over-zoomed or cropped */}
        <video
          ref={videoRef}
          src={activeReel?.videoSrc}
          poster={activeReel?.posterSrc}
          playsInline
          muted={isMuted}
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />

        {/* Brief Pause / Play Icon Indicator on Tap */}
        {showPlayIconBriefly && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.65)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              zIndex: 30,
              pointerEvents: 'none',
              transition: 'opacity 0.2s'
            }}
          >
            {isPlaying ? (
              <svg className="w-8 h-8 ml-1" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            ) : (
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            )}
          </div>
        )}

        {/* Bottom Overlays: Chips & Edge-to-Edge Thin Dashes */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px 16px 14px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)',
            zIndex: 20
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Horizontally scrollable product chips (258x74), next chip peeking in */}
          <div
            ref={chipsScrollRef}
            className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth w-full"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {products.map((product, idx) => (
              <div key={product.id} style={{ scrollSnapAlign: 'start' }}>
                <ProductChip product={product} isActive={idx === activeProductIndex} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
