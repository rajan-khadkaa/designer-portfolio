'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../ui/SectionHeader';
import ScrollReveal from '../ui/ScrollReveal';
import { WORKS } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);



export default function Works() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll('.works-scroll-item');

    const ctx = gsap.context(() => {
      items.forEach((item) => {
        const frame = item.querySelector('.works-img-frame');
        const characters = item.querySelectorAll('.works-char-inner');

        if (frame) {
          // Clip-path timeline: entry wipe → hold → exit wipe
          const clipTl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          clipTl
            .to(frame, {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
              ease: 'none',
            })
            .to({}, { duration: 0.5 })
            .to(frame, {
              clipPath: 'polygon(0% 0%, 100% 0%, 88% 100%, 12% 100%)',
              ease: 'none',
            });
        }

        // Character slide-up animation
        characters.forEach((char, index) => {
          const startOffset = index * 1.5;
          const endOffset = 28 + index * 1.5;

          gsap.to(char, {
            transform: 'translateY(0%)',
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: `top+=${startOffset}% bottom`,
              end: `top+=${endOffset}% center`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitTitle = (title: string) => {
    return [...title].map((char, index) => (
      <span key={index} className="works-char-outer">
        <span
          className="works-char-inner"
          dangerouslySetInnerHTML={{ __html: char === ' ' ? '&nbsp;' : char }}
        />
      </span>
    ));
  };

  return (
    <div id="works" ref={containerRef}>
      {/* Header in normal flow */}
      <ScrollReveal className="works-header">
        <SectionHeader
          eyebrow="Case Studies"
          title="Things I've designed."
          body="Two end-to-end product design case studies, from research and user interviews through wireframes, testing, and iteration."
        />
      </ScrollReveal>

      {/* Scroll-animated project items */}
      <div className="works-scroll-list">
        {WORKS.map((project) => (
          <div key={project.slug} className="works-scroll-item">
            <div className="works-img-frame">
              <img src={project.image} alt={project.title} />
              <span className="works-item-tag">{project.tag}</span>
              <div className="works-info">
                <div className="works-info-left">
                  <span className="works-item-num">{project.num}</span>
                  <h3 className="works-item-title">{splitTitle(project.title)}</h3>
                </div>
                <div className="works-info-right">
                  <p className="works-item-desc">{project.description}</p>
                  <Link href={`/work/${project.slug}`} className="works-item-link" target="_blank">
                    Case study →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
