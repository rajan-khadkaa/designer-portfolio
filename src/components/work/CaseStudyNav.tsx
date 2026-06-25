'use client';

import React, { useEffect, useRef, useState } from 'react';

interface NavItem {
  id: string;
  text: string;
}

interface CaseStudyNavProps {
  items: NavItem[];
}

const MAX_BARS = 8;

export default function CaseStudyNav({ items }: CaseStudyNavProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    if (items.length === 0) return;

    const visibleSections = new Set<string>();
    const observers: IntersectionObserver[] = [];

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.add(id);
            } else {
              visibleSections.delete(id);
            }
            if (visibleSections.size > 0) {
              const firstVisible = items.find((item) => visibleSections.has(item.id));
              if (firstVisible) setActiveId(firstVisible.id);
            }
          });
        },
        { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  // Close popup when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  if (items.length === 0) return null;

  const activeIndex = items.findIndex((item) => item.id === activeId);

  return (
    <>
      {/* Fixed right-edge bar stack */}
      <div
        ref={containerRef}
        className="cs-nav-root fixed right-0 top-1/2 -translate-y-1/2 z-200 flex items-end flex-col"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* The popup box — appears on hover over the bars cluster */}
        {isOpen && (
          <div
            className="cs-nav-popup absolute right-7 top-1/2 -translate-y-1/2 bg-bg-2 border border-border w-[220px] overflow-y-auto"
            data-lenis-prevent
            style={{
              maxHeight: `${MAX_BARS * 38}px`,
            }}
          >
            {items.map(({ id, text }) => {
              const isActive = activeId === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  style={{
                    background: isActive ? 'var(--color-bg-3)' : 'transparent',
                  }}
                  className="cs-nav-popup-item flex items-center justify-between gap-2.5 py-[0.55rem] px-3.5 no-underline border-b border-border transition-colors duration-200"
                >
                  <span
                    style={{
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                    }}
                    className="text-[0.72rem] font-medium tracking-wide overflow-hidden text-ellipsis whitespace-nowrap flex-1"
                  >
                    {text}
                  </span>
                  {/* Matching mini bar */}
                  <span
                    style={{
                      width: isActive ? '14px' : '10px',
                      background: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                      opacity: isActive ? 1 : 0.4,
                    }}
                    className="block shrink-0 h-[2px] transition-all duration-150"
                  />
                </a>
              );
            })}
          </div>
        )}

        {/* Bar stack — the actual right-edge element */}
        <div className="flex flex-col gap-2.5 py-3 pr-2.5 pl-3.5 cursor-pointer">
          {items.map(({ id }, index) => {
            const isActive = activeId === id;
            return (
              <span
                key={id}
                onClick={() => {
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                style={{
                  width: isActive ? '14px' : '10px',
                  background: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                  opacity: isActive ? 1 : index === activeIndex - 1 || index === activeIndex + 1 ? 0.35 : 0.22,
                }}
                className="block h-[2px] shrink-0 transition-all duration-200"
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
