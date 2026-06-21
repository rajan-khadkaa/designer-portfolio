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
              const exitProgress    = Math.min(cardProgress, 1);
              const targetY         = -(window.innerHeight * 1.3) * exitProgress;
              const targetRotationX = exitProgress * -30;

              gsap.set(card, {
                y:         targetY,
                rotationX: targetRotationX,
                scale:     1,
                opacity:   1 - exitProgress * 0.15,
                transformOrigin: 'bottom center',
              });
            } else {
              // WAITING IN STACK — closes up seamlessly as card above exits
              const positionOffsetInStack = index - globalActiveProgress;
              gsap.set(card, {
                y:         positionOffsetInStack * gapY,
                rotationX: 0,
                scale:     1 - positionOffsetInStack * scaleStep,
                opacity:   1,
                transformOrigin: 'bottom center',
              });
            }
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
                <span className="pcard-num">{step.num}</span>
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
