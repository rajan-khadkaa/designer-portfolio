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
        className="cs-nav-root"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        style={{
          position: 'fixed',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'flex-end',
          flexDirection: 'column',
        }}
      >
        {/* The popup box — appears on hover over the bars cluster */}
        {isOpen && (
          <div
            className="cs-nav-popup"
            data-lenis-prevent
            style={{
              position: 'absolute',
              right: '28px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'var(--color-bg-2)',
              border: '1px solid var(--color-border)',
              width: '220px',
              maxHeight: `${MAX_BARS * 38}px`,
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: 'var(--color-border) transparent',
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    padding: '0.55rem 0.9rem',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--color-border)',
                    background: isActive ? 'var(--color-bg-3)' : 'transparent',
                  }}
                  className="cs-nav-popup-item"
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                      letterSpacing: '0.02em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                    }}
                  >
                    {text}
                  </span>
                  {/* Matching mini bar */}
                  <span
                    style={{
                      display: 'block',
                      flexShrink: 0,
                      height: '2px',
                      width: isActive ? '14px' : '10px',
                      background: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                      opacity: isActive ? 1 : 0.4,
                      transition: 'all 0.15s ease',
                    }}
                  />
                </a>
              );
            })}

            <style>{`
              .cs-nav-popup::-webkit-scrollbar {
                width: 4px;
              }
              .cs-nav-popup::-webkit-scrollbar-track {
                background: transparent;
              }
              .cs-nav-popup::-webkit-scrollbar-thumb {
                background: var(--color-border);
                border-radius: 4px;
              }
              .cs-nav-popup::-webkit-scrollbar-thumb:hover {
                background: var(--color-text-muted);
              }
            `}</style>
          </div>
        )}

        {/* Bar stack — the actual right-edge element */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '12px 10px 12px 14px',
            cursor: 'pointer',
          }}
        >
          {items.map(({ id }, index) => {
            const isActive = activeId === id;
            return (
              <span
                key={id}
                onClick={() => {
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                style={{
                  display: 'block',
                  height: '2px',
                  width: isActive ? '14px' : '10px',
                  background: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                  opacity: isActive ? 1 : index === activeIndex - 1 || index === activeIndex + 1 ? 0.35 : 0.22,
                  transition: 'width 0.2s ease, background 0.2s ease, opacity 0.2s ease',
                  flexShrink: 0,
                }}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .cs-nav-root { display: none !important; } }
        .cs-nav-popup-item:last-child { border-bottom: none !important; }
        .cs-nav-popup-item:hover { background: var(--color-bg-3) !important; }
        .cs-nav-popup-item:hover span:first-child { color: var(--color-text) !important; }
      `}</style>
    </>
  );
}
