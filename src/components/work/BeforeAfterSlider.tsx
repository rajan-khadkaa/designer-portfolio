'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';

interface BeforeAfterSliderProps {
  imageBefore: string;
  imageAfter: string;
  beforeLabel: string;
  afterLabel: string;
  caption?: string;
}

export default function BeforeAfterSlider({
  imageBefore,
  imageAfter,
  beforeLabel,
  afterLabel,
  caption,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50); // percentage 0–100
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragging.current = true;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      dragging.current = true;
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      updatePosition(e.clientX);
    };
    const onMouseUp = () => {
      dragging.current = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      updatePosition(e.touches[0].clientX);
    };
    const onTouchEnd = () => {
      dragging.current = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [updatePosition]);

  return (
    <figure style={{ margin: 0 }}>
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          overflow: 'hidden',
          cursor: 'ew-resize',
          userSelect: 'none',
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg-2)',
        }}
        aria-label="Before and after comparison slider"
      >
        {/* AFTER image — full width behind */}
        <img
          src={imageAfter}
          alt={afterLabel}
          draggable={false}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            pointerEvents: 'none',
          }}
        />

        {/* BEFORE image — clipped to left of divider */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: `${position}%`,
            overflow: 'hidden',
          }}
        >
          <img
            src={imageBefore}
            alt={beforeLabel}
            draggable={false}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: containerRef.current
                ? `${containerRef.current.offsetWidth}px`
                : '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Divider line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${position}%`,
            transform: 'translateX(-50%)',
            width: '2px',
            background: 'rgba(255,255,255,0.9)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Drag handle — circular exception per design system note */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: `${position}%`,
            transform: 'translate(-50%, -50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#ffffff',
            border: '2px solid rgba(0,0,0,0.12)',
            zIndex: 11,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
          }}
        >
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 6H1M1 6L3.5 3.5M1 6L3.5 8.5"
              stroke="#111114"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
            <path
              d="M13 6H17M17 6L14.5 3.5M17 6L14.5 8.5"
              stroke="#111114"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </div>

        {/* Before label */}
        <span
          style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            zIndex: 9,
            padding: '0.2rem 0.6rem',
            background: 'rgba(0,0,0,0.55)',
            color: '#ffffff',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            opacity: position > 10 ? 1 : 0,
            transition: 'opacity 0.15s ease',
          }}
        >
          {beforeLabel}
        </span>

        {/* After label */}
        <span
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            zIndex: 9,
            padding: '0.2rem 0.6rem',
            background: 'rgba(0,0,0,0.55)',
            color: '#ffffff',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            opacity: position < 90 ? 1 : 0,
            transition: 'opacity 0.15s ease',
          }}
        >
          {afterLabel}
        </span>
      </div>

      {caption && (
        <figcaption
          style={{
            marginTop: '0.6rem',
            fontSize: '0.78rem',
            color: 'var(--color-text-muted)',
            fontStyle: 'italic',
            lineHeight: 1.55,
            textAlign: 'center',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
