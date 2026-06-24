'use client';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CaseStudy,
  CaseStudySection,
  SectionHeading,
  SectionText,
  SectionImage,
  SectionList,
  SectionBeforeAfter,
  SectionPrinciple,
  SectionReflection,
} from '@/lib/case-studies';
import MetadataBlock from '@/components/work/MetadataBlock';
import CaseStudyNav from '@/components/work/CaseStudyNav';

import RelatedStudies from '@/components/work/RelatedStudies';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Divider from '@/components/ui/Divider';

// ─── SECTION RENDERERS ──────────────────────────────────────────────────────

function RenderHeading({ section }: { section: SectionHeading }) {
  return (
    <ScrollReveal>
      <h2
        id={section.id}
        className="font-display font-extrabold text-[clamp(1.25rem,2.8vw,1.75rem)] tracking-tight text-(--color-text) mt-14 mb-5 leading-[1.15] scroll-mt-20"
      >
        {section.text}
      </h2>
    </ScrollReveal>
  );
}

function RenderText({ section }: { section: SectionText }) {
  const paragraphs = section.content.split('\n\n').filter(Boolean);
  return (
    <ScrollReveal>
      <div className="flex flex-col gap-4">
        {paragraphs.map((para, i) => (
          <div
            key={i}
            className="case-study-html-content text-text-muted leading-[1.8] text-[0.97rem] m-0"
            dangerouslySetInnerHTML={{ __html: para }}
          />
        ))}
      </div>
    </ScrollReveal>
  );
}

function RenderImage({ section, onImageClick }: { section: SectionImage; onImageClick: (src: string) => void }) {
  if (!section.src) {
    return (
      <figure className="my-2">
        <div className="w-full aspect-video bg-bg-3 border border-dashed border-border flex items-center justify-center">
          <span className="italic text-text-muted text-[0.85rem] text-center p-4">
            {section.caption}
          </span>
        </div>
      </figure>
    );
  }

  return (
    <figure className="my-2">
      <div
        className="w-full border border-border bg-bg-2 cursor-zoom-in"
        onClick={() => onImageClick(section.src)}
      >
        <img
          src={section.src}
          alt={section.alt}
          className="w-full h-auto block"
        />
      </div>
      {section.caption && (
        <figcaption className="mt-2.5 text-[0.78rem] text-text-muted italic leading-relaxed text-center">
          {section.caption}
        </figcaption>
      )}
    </figure>
  );
}

function RenderList({ section }: { section: SectionList }) {
  const Tag = section.listType === 'ordered' ? 'ol' : 'ul';
  return (
    <Tag className="pl-6 m-0 flex flex-col gap-2.5">
      {section.items.map((item, i) => (
        <li
          key={i}
          className="text-text-muted leading-[1.75] text-[0.97rem]"
          dangerouslySetInnerHTML={{ __html: item }}
        />
      ))}
    </Tag>
  );
}

function RenderBeforeAfter({ section, onImageClick }: { section: SectionBeforeAfter; onImageClick: (src: string) => void }) {
  return (
    <figure className="my-2 flex flex-col gap-4">
      {/* Before/Old Mockup */}
      <div
        className="relative w-full border border-border bg-bg-2 cursor-zoom-in"
        onClick={() => onImageClick(section.imageBefore)}
      >
        <img
          src={section.imageBefore}
          alt={section.beforeLabel}
          className="w-full h-auto block"
        />
        <span className="absolute top-3 left-3 px-3 py-1 bg-black/70 text-white text-[0.7rem] font-bold tracking-wider uppercase">
          {section.beforeLabel}
        </span>
      </div>

      {/* After/Iterated New Mockup */}
      <div
        className="relative w-full border border-border bg-bg-2 cursor-zoom-in"
        onClick={() => onImageClick(section.imageAfter)}
      >
        <img
          src={section.imageAfter}
          alt={section.afterLabel}
          className="w-full h-auto block"
        />
        <span className="absolute top-3 left-3 px-3 py-1 bg-black/70 text-white text-[0.7rem] font-bold tracking-wider uppercase">
          {section.afterLabel}
        </span>
      </div>

      {section.caption && (
        <figcaption className="mt-1 text-[0.78rem] text-text-muted italic leading-relaxed text-center">
          {section.caption}
        </figcaption>
      )}
    </figure>
  );
}

function RenderPrinciple({ section }: { section: SectionPrinciple }) {
  return (
    <div className="py-5 px-6 bg-bg-2 border border-border border-l-3 border-l-(--color-text) flex flex-col gap-1.5">
      <span className="text-[0.78rem] font-bold tracking-wider text-(--color-text) uppercase">
        {section.label}
      </span>
      <div
        className="case-study-html-content text-text-muted leading-[1.75] text-[0.9rem] m-0"
        dangerouslySetInnerHTML={{ __html: section.content }}
      />
    </div>
  );
}

function RenderReflection({ section }: { section: SectionReflection }) {
  return (
    <div className="border-l-2 border-border pl-6 flex flex-col gap-7 mt-2">
      <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-text-muted m-0">
        Reflection
      </p>

      {section.items.map((item, i) => (
        <div key={i} className="flex gap-4 items-start">
          <span className="font-display font-extrabold text-[1.1rem] text-text-muted opacity-40 shrink-0 leading-[1.3] min-w-[1.5rem]">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="flex flex-col gap-1.5">
            <p className="font-semibold text-[0.92rem] text-(--color-text) m-0 leading-[1.4]">
              {item.title}
            </p>
            <div
              className="case-study-html-content text-text-muted leading-[1.75] text-[0.9rem] m-0"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function RenderSection({ section, onImageClick }: { section: CaseStudySection; onImageClick: (src: string) => void }) {
  switch (section.type) {
    case 'heading':
      return <RenderHeading section={section} />;
    case 'text':
      return <RenderText section={section} />;
    case 'image':
      return <RenderImage section={section} onImageClick={onImageClick} />;
    case 'list':
      return <RenderList section={section} />;
    case 'before-after':
      return <RenderBeforeAfter section={section} onImageClick={onImageClick} />;
    case 'principle':
      return <RenderPrinciple section={section} />;
    case 'reflection':
      return <RenderReflection section={section} />;
    default:
      return null;
  }
}

// ─── IMAGE EXPAND MODAL ─────────────────────────────────────────────────────

interface ImageModalProps {
  src: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

function ImageModal({ src, onClose, onPrev, onNext, hasPrev, hasNext }: ImageModalProps) {
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const hasDraggedRef = useRef(false);

  const getClampedOffsets = useCallback((x: number, y: number, currentZoom: number) => {
    const container = containerRef.current;
    if (!container) return { x, y };

    const img = container.querySelector('img');
    const imgW = img ? img.offsetWidth : container.offsetWidth;
    const imgH = img ? img.offsetHeight : container.offsetHeight;
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    const scaledW = imgW * currentZoom;
    const scaledH = imgH * currentZoom;

    // Adjust this ratio (0.0 to 1.0) to control how much of the image must remain in the viewport:
    // - A HIGHER value (e.g., 0.7) keeps MORE of the image in the viewport (less empty space allowed).
    // - A LOWER value (e.g., 0.3) allows the image to be dragged FURTHER off-screen (more empty space allowed).
    // Let's set it to 0.65 as the default so only 35% empty space is allowed on any side.
    const limitRatio = 0.75;

    const minX = -viewportW * (0.5 - limitRatio) - (scaledW / 2);
    const maxX = viewportW * (0.5 - limitRatio) + (scaledW / 2);

    const minY = -viewportH * (0.5 - limitRatio) - (scaledH / 2);
    const maxY = viewportH * (0.5 - limitRatio) + (scaledH / 2);

    return {
      x: Math.max(minX, Math.min(maxX, x)),
      y: Math.max(minY, Math.min(maxY, y)),
    };
  }, []);

  // Clamp offsets when zoom changes
  useEffect(() => {
    if (zoom <= 1) {
      setPanOffset({ x: 0, y: 0 });
    } else {
      setPanOffset((prev) => getClampedOffsets(prev.x, prev.y, zoom));
    }
  }, [zoom, getClampedOffsets]);

  const handleZoomIn = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoom((z) => Math.min(z + 0.25, 4));
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoom((z) => {
      const newZoom = Math.max(z - 0.25, 0.75);
      if (newZoom <= 1) {
        setPanOffset({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const handleResetZoom = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext && hasNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  // Reset zoom and pan when image source changes
  useEffect(() => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  }, [src]);

  // Drag-to-pan mouse events
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasDraggedRef.current = true;
      }

      const targetX = panStartRef.current.x + dx;
      const targetY = panStartRef.current.y + dy;

      setPanOffset(getClampedOffsets(targetX, targetY, zoom));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, zoom, getClampedOffsets]);

  // Wheel and Pinch touchpad listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheelEvent = (e: WheelEvent) => {
      e.preventDefault();
      // deltaY is negative when scrolling up / pinching out (zoom in)
      const factor = e.deltaY < 0 ? 0.08 : -0.08;
      setZoom((z) => {
        const newZoom = Math.min(Math.max(z + factor, 0.75), 4);
        if (newZoom <= 1) {
          setPanOffset({ x: 0, y: 0 });
        }
        return newZoom;
      });
    };

    container.addEventListener('wheel', handleWheelEvent, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheelEvent);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Left click only
    e.preventDefault();
    hasDraggedRef.current = false;
    if (zoom > 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      panStartRef.current = { ...panOffset };
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex flex-col justify-between bg-black/95 text-white select-none"
      onClick={onClose}
    >
      {/* Top bar with Close button - Floats in fixed/absolute position */}
      <div className="absolute top-0 left-0 right-0 z-50 flex justify-end p-4 md:p-6 pointer-events-none">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="pointer-events-auto w-10 h-10 flex items-center justify-center border border-white/20 bg-black/40 hover:bg-white/10 hover:border-white transition-colors cursor-pointer"
          title="Close (Esc)"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Main image container */}
      <div
        className="w-full h-full flex items-center justify-center p-2 pt-[60px] pb-[80px] overflow-hidden cursor-default"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          ref={containerRef}
          className={`relative max-w-full max-h-full select-none ${isDragging ? '' : 'transition-transform duration-200 ease-out'}`}
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
            cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
          }}
          onMouseDown={handleMouseDown}
          onClick={(e) => {
            e.stopPropagation();
            if (hasDraggedRef.current) {
              hasDraggedRef.current = false;
              return;
            }
            setZoom((z) => {
              if (z > 1) {
                setPanOffset({ x: 0, y: 0 });
                return 1;
              } else {
                return 1.75;
              }
            });
          }}
        >
          <img
            src={src}
            alt="Modal view"
            className="max-w-[95vw] max-h-[calc(100vh-140px)] md:max-h-[calc(100vh-160px)] object-contain pointer-events-none"
          />
        </div>
      </div>

      {/* Bottom control bar - Floats in fixed/absolute position */}
      <div className="absolute bottom-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
        <div className="flex items-center gap-3 bg-[#18181c] border border-white/10 p-2 pointer-events-auto">
          {/* Navigation Controls */}
          <div className="flex items-center border-r border-white/10 pr-2 gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev?.();
              }}
              disabled={!hasPrev}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              title="Previous Image (Left Arrow)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext?.();
              }}
              disabled={!hasNext}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              title="Next Image (Right Arrow)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/10 cursor-pointer"
              title="Zoom Out"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>

            <button
              onClick={handleResetZoom}
              className="px-2 h-8 flex items-center justify-center hover:bg-white/10 font-mono text-[0.75rem] cursor-pointer"
              title="Reset Zoom"
            >
              {Math.round(zoom * 100)}%
            </button>

            <button
              onClick={handleZoomIn}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/10 cursor-pointer"
              title="Zoom In"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN CLIENT COMPONENT ──────────────────────────────────────────────────

interface CaseStudyClientProps {
  study: CaseStudy;
}

export default function CaseStudyClient({ study }: CaseStudyClientProps) {
  const [showFull, setShowFull] = useState(true);

  const navItems = useMemo(
    () =>
      study.sections
        .filter((s): s is SectionHeading => s.type === 'heading')
        .map(({ id, text }) => ({ id, text })),
    [study.sections]
  );

  const toggleMode = useCallback(() => setShowFull((prev) => !prev), []);

  const allImages = useMemo(() => {
    const list: string[] = [];
    if (study.heroImage) {
      list.push(study.heroImage);
    }
    study.sections.forEach((sec) => {
      if (sec.type === 'image' && sec.src) {
        list.push(sec.src);
      } else if (sec.type === 'before-after') {
        if (sec.imageBefore) list.push(sec.imageBefore);
        if (sec.imageAfter) list.push(sec.imageAfter);
      }
    });
    return list;
  }, [study.heroImage, study.sections]);

  const [activeImgIndex, setActiveImgIndex] = useState<number | null>(null);

  const handleImageClick = useCallback((src: string) => {
    const idx = allImages.indexOf(src);
    if (idx !== -1) {
      setActiveImgIndex(idx);
    }
  }, [allImages]);

  return (
    <>
      {/* Fixed right-edge navigation — not in document flow */}
      <CaseStudyNav items={navItems} />

      <main>
        {/* ── Hero image ── */}
        <div
          className="w-full relative overflow-hidden h-[40vh] cursor-zoom-in"
          onClick={() => handleImageClick(study.heroImage)}
        >
          <Image
            src={study.heroImage}
            alt={`${study.title} hero`}
            fill
            priority
            className="object-cover w-full mt-1"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/55" />
        </div>

        {/* ── Content wrapper ── */}
        <div className="max-w-[780px] mx-auto py-0 md:py-6 lg:py-8 px-4 sm:px-6 md:px-10 lg:px-16">
          {/* Sticky Back button */}
          <Link
            href="/#works"
            className="sticky-back-btn"
            title="Back to Work"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {/* <span className="back-btn-text">Back to Work</span> */}
          </Link>

          {/* Eyebrow + Title */}
          <ScrollReveal>
            <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-text-muted mb-2.5">
              Case Study · {study.tag}
            </p>
            <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.2rem)] tracking-tight leading-[1.05] text-(--color-text) mb-8">
              {study.title}
            </h1>
          </ScrollReveal>

          {/* Metadata block */}
          <MetadataBlock
            metadata={study.metadata}
            readTime={study.readTime}
            readType={study.readType}
          />

          {/* Full / Summary toggle */}
          <div className="mt-6 mb-8">
            <button
              onClick={toggleMode}
              className="toggle-btn py-[0.55rem] px-5 border border-border bg-bg-2 text-(--color-text) text-[0.8rem] font-semibold tracking-wider cursor-pointer transition-colors duration-200"
              aria-pressed={!showFull}
            >
              {showFull ? 'Switch to Summary' : 'Read Full Case Study'}
            </button>
          </div>

          <Divider />

          {/* ── Body content — with smooth swap ── */}
          <div className="mt-4 opacity-100 transition-opacity duration-350">
            {!showFull ? (
              /* Summary mode */
              <div className="p-7 mt-8 bg-bg-2 border border-border">
                <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-text-muted mb-4">
                  Summary
                </p>
                <p className="text-text-muted leading-[1.85] text-[1rem] m-0">
                  {study.summary}
                </p>
              </div>
            ) : (
              /* Full case study */
              <div className="flex flex-col gap-6">
                {study.sections.map((section, i) => (
                  <RenderSection key={i} section={section} onImageClick={handleImageClick} />
                ))}
              </div>
            )}
          </div>

          {/* Related case studies */}
          <RelatedStudies slugs={study.relatedSlugs} />
        </div>
      </main>

      {/* ── Zoom Modal ── */}
      {activeImgIndex !== null && (
        <ImageModal
          src={allImages[activeImgIndex]}
          onClose={() => setActiveImgIndex(null)}
          onPrev={() => setActiveImgIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
          onNext={() => setActiveImgIndex((prev) => (prev !== null && prev < allImages.length - 1 ? prev + 1 : prev))}
          hasPrev={activeImgIndex > 0}
          hasNext={activeImgIndex < allImages.length - 1}
        />
      )}
    </>
  );
}
