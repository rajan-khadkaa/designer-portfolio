'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '@/lib/constants';
import SectionHeader from '../ui/SectionHeader';
import ScrollReveal from '../ui/ScrollReveal';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = gsap.utils.toArray<HTMLElement>('.process-card-stack');
    const totalCards = cards.length;

    // ─── TWEAK KNOBS ─────────────────────────────────────────────────────────
    // scrollDistanceMultiplier — scroll distance per card in vh %.
    //   Lower = faster card transitions. Range: 80 (snappy) → 200 (slow).
    const scrollDistanceMultiplier = 120;

    // gapY — pixel gap between stacked cards. Higher = more visible stack depth.
    const gapY = 28;

    // scaleStep — how much smaller each card behind is.
    const scaleStep = 0.04;

    // scrub — tightness of scroll follow. 0.1 = instant, 2 = floaty.
    // 0.4 is responsive but not jittery (matches original HTML file).
    const scrubValue = 0.4;
    // ─────────────────────────────────────────────────────────────────────────

    const ctx = gsap.context(() => {
      // Set initial stacked positions
      cards.forEach((card, index) => {
        gsap.set(card, {
          y: index * gapY,
          scale: 1 - index * scaleStep,
          rotationX: 0,
          opacity: 1,
          transformOrigin: 'bottom center',
        });
      });

      ScrollTrigger.create({
        trigger: '.process-sticky-wrap',
        start: 'top top',
        end: `+=${totalCards * scrollDistanceMultiplier}%`,
        pin: '.process-sticky-inner',
        pinSpacing: true,
        scrub: scrubValue,
        anticipatePin: 1,           // eliminates jump/stutter on entry
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // totalCards - 1 segments so all 4 cards each get one full peel
          const totalSegments = totalCards - 1;
          const globalActiveProgress = progress * totalSegments;

          cards.forEach((card, index) => {
            const cardProgress = globalActiveProgress - index;

            if (cardProgress > 0) {
              // EXIT — card peels off upward with a 3D backward tilt
              const exitProgress = Math.min(cardProgress, 1);
              const targetY = -(window.innerHeight * 1.3) * exitProgress;
              const targetRotationX = exitProgress * -30;

              gsap.set(card, {
                y: targetY,
                rotationX: targetRotationX,
                scale: 1,
                opacity: 1 - exitProgress * 0.15,
                transformOrigin: 'bottom center',
              });
            } else {
              // WAITING IN STACK — closes up seamlessly as card above exits
              const positionOffsetInStack = index - globalActiveProgress;
              gsap.set(card, {
                y: positionOffsetInStack * gapY,
                rotationX: 0,
                scale: 1 - positionOffsetInStack * scaleStep,
                opacity: 1,
                transformOrigin: 'bottom center',
              });
            }
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // const getStepIcon = (index: number) => {
  //   const props = {
  //     className: "w-6 h-6 text-text-muted transition-colors duration-300",
  //     stroke: "currentColor",
  //     strokeWidth: "2",
  //     fill: "none",
  //     strokeLinecap: "round" as const,
  //     strokeLinejoin: "round" as const,
  //   };

  //   switch (index) {
  //     case 0: // Discover
  //       return (
  //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
  //           <circle cx="11" cy="11" r="8" />
  //           <path d="m21 21-4.3-4.3" />
  //         </svg>
  //       );
  //     case 1: // Design
  //       return (
  //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
  //           <path d="M12 20h9" />
  //           <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  //         </svg>
  //       );
  //     case 2: // Test
  //       return (
  //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
  //           <circle cx="12" cy="12" r="10" />
  //           <path d="m9 12 2 2 4-4" />
  //         </svg>
  //       );
  //     case 3: // Refine
  //       return (
  //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
  //           <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
  //           <path d="M3 3v5h5" />
  //           <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
  //           <path d="M16 16h5v5" />
  //         </svg>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  const getStepIcon = (index: number) => {
    const props = {
      className: "w-6 h-6 text-text-muted transition-colors duration-300",
      stroke: "currentColor",
      strokeWidth: "2",
      fill: "none",
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const,
    };

    switch (index) {
      case 0: // Discover → Compass icon (more professional)
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <circle cx="12" cy="12" r="10" />
            <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
          </svg>
        );
      case 1: // Design → Layers2 icon (better represents design)
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <path d="M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z" />
            <path d="m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845" />
          </svg>
        );
      case 2: // Test → MessageSquareCheck icon (represents feedback/testing)
        return (
          // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
          //   <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.7.7 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
          //   <path d="m9 11 2 2 4-4" />
          // </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
          >
            <path d="M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344" />
            <path d="m9 11 3 3L22 4" />
          </svg>
        );
      case 3: // Refine → RotateCwSquare icon (represents iteration/refinement)
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
            <path d="M20 9V7a2 2 0 0 0-2-2h-6" />
            <path d="m15 2-3 3 3 3" />
            <path d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div id="process" ref={containerRef}>
      <ScrollReveal className="process-header">
        <SectionHeader
          eyebrow="How I work"
          title="From idea to product"
          body="I take a lean, iterative approach, starting with the problem, not the tool. Each project moves through discovery, design, and testing in tight feedback loops."
        />
      </ScrollReveal>

      <div className="process-sticky-wrap" id="process-sticky-wrap">
        <div className="process-sticky-inner" id="process-sticky-inner">
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.num}
              className="process-card-stack"
              id={`pcard-${index + 1}`}
            >
              <div className="pcard-left">
                <span className="pcard-icon inline-flex h-6">
                  {getStepIcon(index)}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <div className="pcard-right">
                <span className="pcard-right-label">{step.num}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
