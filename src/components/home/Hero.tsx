'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
  ssr: false,
});

export default function Hero() {
  const [showCanvas, setShowCanvas] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleToggle3D = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && typeof customEvent.detail.visible === 'boolean') {
        setShowCanvas(customEvent.detail.visible);
      }
    };

    window.addEventListener('toggle-3d-model', handleToggle3D);

    return () => {
      window.removeEventListener('toggle-3d-model', handleToggle3D);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} style={{ padding: 0, maxWidth: '100%' }}>
      <video
        id="sky-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/portfolio resources/sky-vid.mp4" type="video/mp4" />
      </video>
      <div id="hero-overlay" />
      <div className="hero-text-layer">
        <p className="hero-eyebrow">Hi, I am Rajan</p>
        <h1 className="hero-headline">I am a designer.</h1>
        <p className="hero-sub-text">Building thoughtful interfaces and creative experiences.</p>
      </div>

      {showCanvas && <HeroCanvas />}

      <div className="scroll-hint">
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="8" cy="7" r="2" fill="currentColor">
            <animate attributeName="cy" values="7;14;7" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0;1" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </svg>
        Scroll
      </div>
    </section>
  );
}
