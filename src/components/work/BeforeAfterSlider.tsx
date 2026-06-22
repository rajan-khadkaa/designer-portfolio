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
    <figure className="m-0">
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        className="relative w-full aspect-video overflow-hidden cursor-ew-resize select-none border border-[var(--color-border)] bg-[var(--color-bg-2)]"
        aria-label="Before and after comparison slider"
      >
        {/* AFTER image — full width behind */}
        <img
          src={imageAfter}
          alt={afterLabel}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover block pointer-events-none"
        />

        {/* BEFORE image — clipped to left of divider */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            width: `${position}%`,
          }}
        >
          <img
            src={imageBefore}
            alt={beforeLabel}
            draggable={false}
            className="absolute top-0 left-0 h-full object-cover block pointer-events-none"
            style={{
              width: containerRef.current
                ? `${containerRef.current.offsetWidth}px`
                : '100%',
            }}
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 -translate-x-1/2 w-[2px] bg-white/90 z-10 pointer-events-none"
          style={{
            left: `${position}%`,
          }}
        />

        {/* Drag handle — circular exception per design system note */}
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-2 border-black/12 z-11 flex items-center justify-center pointer-events-none shadow-[0_2px_12px_rgba(0,0,0,0.18)]"
          style={{
            left: `${position}%`,
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
          className="absolute top-3 left-3 z-9 px-2 py-1 bg-black/55 text-white text-[0.7rem] font-semibold tracking-wider uppercase pointer-events-none transition-opacity duration-150"
          style={{
            opacity: position > 10 ? 1 : 0,
          }}
        >
          {beforeLabel}
        </span>

        {/* After label */}
        <span
          className="absolute top-3 right-3 z-9 px-2 py-1 bg-black/55 text-white text-[0.7rem] font-semibold tracking-wider uppercase pointer-events-none transition-opacity duration-150"
          style={{
            opacity: position < 90 ? 1 : 0,
          }}
        >
          {afterLabel}
        </span>
      </div>

      {caption && (
        <figcaption className="mt-2.5 text-[0.78rem] text-[var(--color-text-muted)] italic leading-relaxed text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
