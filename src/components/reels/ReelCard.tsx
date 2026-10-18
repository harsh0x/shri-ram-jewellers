'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Reel } from '../../types/reels';
import { ReelCardUI } from './ReelCardUI';

interface ReelCardProps {
  reel: Reel;
  offset: number; // -2, -1, 0, 1, 2
  isMuted: boolean;
  isInViewport: boolean;
  onSelect: () => void;
  onNext: () => void;
  onToggleMute: (e: React.MouseEvent) => void;
  onOpenFullscreen: () => void;
  onShare: (e: React.MouseEvent) => void;
}

export const CARD_WIDTH = 386;
export const CARD_HEIGHT = Math.round(386 * (16 / 9)); // ~686px

export const ReelCard: React.FC<ReelCardProps> = ({
  reel,
  offset,
  isMuted,
  isInViewport,
  onSelect,
  onNext,
  onToggleMute,
  onOpenFullscreen,
  onShare
}) => {
  const isCenter = offset === 0;
  const isNeighbour = Math.abs(offset) === 1;
  const isOuter = Math.abs(offset) === 2;
  const isVisible = Math.abs(offset) <= 2;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [progressPercent, setProgressPercent] = useState(0);

  // Calculate exact positioning as fractions of center card width (386px)
  let translateX = 0;
  let scale = 1;
  let zIndex = 10;
  let darkOverlayOpacity = 0;

  if (isCenter) {
    translateX = 0;
    scale = 1;
    zIndex = 10;
    darkOverlayOpacity = 0;
  } else if (isNeighbour) {
    // Neighbours: +/-0.46 * width at scale 0.75
    translateX = (offset > 0 ? 0.46 : -0.46) * CARD_WIDTH; // +/-177.56px
    scale = 0.75;
    zIndex = 5;
    darkOverlayOpacity = 0.22; // 22% black overlay
  } else if (isOuter) {
    // Outer cards: +/-0.79 * width at scale 0.60
    translateX = (offset > 0 ? 0.79 : -0.79) * CARD_WIDTH; // +/-304.94px
    scale = 0.60;
    zIndex = 2;
    darkOverlayOpacity = 0.38; // 38% black overlay
  } else {
    // Far away cards
    translateX = (offset > 0 ? 1.15 : -1.15) * CARD_WIDTH;
    scale = 0.45;
    zIndex = 1;
    darkOverlayOpacity = 0.5;
  }

  // Handle active video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isCenter && isInViewport) {
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handled gracefully (autoplay policies)
        });
      }
    } else {
      video.pause();
      if (!isCenter) {
        video.currentTime = 0;
        setProgressPercent(0);
      }
    }
  }, [isCenter, isInViewport, isMuted]);

  // Handle timeupdate for progress dashes & product chip auto-scroll
  const handleTimeUpdate = () => {
    if (!videoRef.current || !isCenter) return;
    const { currentTime, duration } = videoRef.current;
    const dur = duration || reel.durationSec || 15;
    setProgressPercent(Math.min(100, (currentTime / dur) * 100));
  };

  const handleEnded = () => {
    if (isCenter) {
      setProgressPercent(100);
      onNext();
    }
  };

  const handleClick = () => {
    if (!isCenter) {
      onSelect();
    } else {
      // Clicking the centre card opens the fullscreen viewer as required by Rule 5
      onOpenFullscreen();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`,
        transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
        zIndex,
        transition: 'transform 550ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: isCenter
          ? '0 20px 50px rgba(0, 0, 0, 0.45), 0 10px 25px rgba(101, 21, 47, 0.35)'
          : '0 15px 35px rgba(0, 0, 0, 0.3)',
        opacity: 1 // Cards are ALWAYS opaque
      }}
      className="select-none bg-[#1a0510]"
      role="group"
      aria-label={`${reel.title}${isCenter ? ' (Active Reel)' : ''}`}
    >
      {/* Media: Video on Centre card, Poster on Side cards */}
      {isCenter ? (
        <video
          ref={videoRef}
          src={reel.videoSrc}
          poster={reel.posterSrc}
          playsInline
          muted={isMuted}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={reel.posterSrc}
          alt={reel.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      )}

      {/* Dark Overlay for Side Cards (22% for neighbours, 38% for outer cards) */}
      {!isCenter && (
        <div
          className="absolute inset-0 pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: `rgba(0, 0, 0, ${darkOverlayOpacity})` }}
        />
      )}

      {/* Card UI: Visible ONLY on Centre Card */}
      {isCenter && (
        <ReelCardUI
          reel={reel}
          progressPercent={progressPercent}
          isMuted={isMuted}
          onToggleMute={onToggleMute}
          onOpenFullscreen={onOpenFullscreen}
          onShare={onShare}
        />
      )}
    </div>
  );
};
