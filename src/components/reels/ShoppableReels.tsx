'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Reel } from '../../types/reels';
import { seededReels } from '../../data/reels';
import { CoverflowCarousel } from './CoverflowCarousel';

interface ShoppableReelsProps {
  reels?: Reel[];
  title?: string;
  subtitle?: string;
  overline?: string;
}

export const ShoppableReels: React.FC<ShoppableReelsProps> = ({
  reels = seededReels,
  title = 'Jewellery in Motion',
  subtitle = 'Watch how our gold, diamond and polki pieces are worn for every occasion.',
  overline = 'STYLED BY TRADITION'
}) => {
  return (
    <section
      id="reels"
      className="relative bg-ivory py-16 lg:py-24 overflow-hidden border-b border-gold/30"
    >
      {/* Subtle royal Jali / Arch watermark pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#65152F_1.5px,transparent_1.5px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          {/* Small Gold Overline */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-gold-dark text-xs uppercase tracking-[0.28em] font-semibold mb-2"
          >
            <span>⚜</span>
            <span>{overline}</span>
            <span>⚜</span>
          </motion.div>

          {/* Heading (Cormorant Garamond, Large) */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-maroon font-bold tracking-tight"
          >
            {title}
          </motion.h2>

          {/* Subtext (muted) */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-charcoal-muted text-sm sm:text-base leading-relaxed mt-3 max-w-xl mx-auto font-light"
          >
            {subtitle}
          </motion.p>

          {/* Thin gold line with small arch/diamond ornament centered that draws in on scroll */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
              className="h-[1px] w-20 sm:w-28 bg-gradient-to-r from-transparent to-gold origin-right"
            />
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-4 h-4 flex items-center justify-center text-gold text-xs"
            >
              ◈
            </motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
              className="h-[1px] w-20 sm:w-28 bg-gradient-to-l from-transparent to-gold origin-left"
            />
          </div>
        </div>

        {/* 3D Coverflow Reel Carousel */}
        <CoverflowCarousel reels={reels} />
      </div>
    </section>
  );
};
