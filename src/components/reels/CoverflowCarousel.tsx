'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Reel } from '../../types/reels';
import { ReelCard, CARD_HEIGHT } from './ReelCard';
import { FullscreenReelViewer } from './FullscreenReelViewer';

interface CoverflowCarouselProps {
  reels: Reel[];
}

export const CoverflowCarousel: React.FC<CoverflowCarouselProps> = ({ reels }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartTime = useRef<number>(0);

  // IntersectionObserver to pause off-screen playback
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % reels.length);
  }, [reels.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + reels.length) % reels.length);
  }, [reels.length]);

  // Keyboard navigation when stage is focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  // Touch Swipe on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaTime = Date.now() - touchStartTime.current;
    if (Math.abs(deltaX) > 40 && deltaTime < 400) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <div
      ref={stageRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="relative w-full focus:outline-none select-none my-6"
      style={{ overflow: 'visible' }}
      aria-label="Shoppable Reels 3D Coverflow Carousel"
    >
      {/* 40px Circular Arrow Buttons at Far Left & Right Edges, Vertically Centred */}
      <button
        onClick={handlePrev}
        style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#F7F1E8',
          border: '1px solid #C4A46C',
          color: '#65152F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.25s ease'
        }}
        className="hover:!bg-[#C4A46C] hover:!text-[#250511] active:scale-95"
        aria-label="Previous reel slide"
        title="Previous Reel"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#F7F1E8',
          border: '1px solid #C4A46C',
          color: '#65152F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.25s ease'
        }}
        className="hover:!bg-[#C4A46C] hover:!text-[#250511] active:scale-95"
        aria-label="Next reel slide"
        title="Next Reel"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Stage: Height fits 686px card height */}
      <div
        id="reels-stage-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          width: '100%',
          height: `${CARD_HEIGHT + 30}px`, // ~716px
          margin: '0 auto',
          overflow: 'hidden'
        }}
      >
        {reels.map((reel, idx) => {
          // Calculate relative offset (-2, -1, 0, 1, 2)
          // Allow wrapping calculation so the active card is always centered
          let offset = idx - activeIndex;
          const half = reels.length / 2;
          if (offset > half) offset -= reels.length;
          if (offset < -half) offset += reels.length;

          return (
            <ReelCard
              key={reel.id}
              reel={reel}
              offset={offset}
              isMuted={isMuted}
              isInViewport={isInViewport}
              onSelect={() => setActiveIndex(idx)}
              onNext={handleNext}
              onToggleMute={(e) => {
                e.stopPropagation();
                setIsMuted((prev) => !prev);
              }}
              onOpenFullscreen={() => setIsFullscreenOpen(true)}
              onShare={(e) => {
                e.stopPropagation();
                if (typeof navigator !== 'undefined' && navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.origin + '#reels');
                }
              }}
            />
          );
        })}
      </div>

      {/* Fullscreen Story Viewer */}
      <FullscreenReelViewer
        isOpen={isFullscreenOpen}
        reels={reels}
        initialIndex={activeIndex}
        onClose={() => setIsFullscreenOpen(false)}
      />
    </div>
  );
};
