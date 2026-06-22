'use client';

import React, { useState, useMemo, useCallback } from 'react';
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
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(1.25rem, 2.8vw, 1.75rem)',
          letterSpacing: '-0.02em',
          color: 'var(--color-text)',
          marginTop: '3.5rem',
          marginBottom: '1.25rem',
          lineHeight: 1.15,
          scrollMarginTop: '80px',
        }}
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {paragraphs.map((para, i) => (
          <p
            key={i}
            style={{
              color: 'var(--color-text-muted)',
              lineHeight: 1.8,
              fontSize: '0.97rem',
              margin: 0,
            }}
          >
            {para}
          </p>
        ))}
      </div>
    </ScrollReveal>
  );
}

function RenderImage({ section }: { section: SectionImage }) {
  if (!section.src) {
    return (
      <figure style={{ margin: '0.5rem 0' }}>
        <div
          style={{
            width: '100%',
            aspectRatio: '16/9',
            background: 'var(--color-bg-3)',
            border: '1px dashed var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontStyle: 'italic',
              color: 'var(--color-text-muted)',
              fontSize: '0.85rem',
              textAlign: 'center',
              padding: '1rem',
            }}
          >
            {section.caption}
          </span>
        </div>
      </figure>
    );
  }

  return (
    <figure style={{ margin: '0.5rem 0' }}>
      <div
        style={{
          width: '100%',
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg-2)',
        }}
      >
        <img
          src={section.src}
          alt={section.alt}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
      {section.caption && (
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
          {section.caption}
        </figcaption>
      )}
    </figure>
  );
}

function RenderList({ section }: { section: SectionList }) {
  const Tag = section.listType === 'ordered' ? 'ol' : 'ul';
  return (
    <Tag
      style={{
        paddingLeft: '1.5rem',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
      }}
    >
      {section.items.map((item, i) => (
        <li
          key={i}
          style={{
            color: 'var(--color-text-muted)',
            lineHeight: 1.75,
            fontSize: '0.97rem',
          }}
        >
          {item}
        </li>
      ))}
    </Tag>
  );
}

function RenderBeforeAfter({ section }: { section: SectionBeforeAfter }) {
  return (
    <figure style={{ margin: '0.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Before/Old Mockup */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg-2)',
        }}
      >
        <img
          src={section.imageBefore}
          alt={section.beforeLabel}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <span
          style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            padding: '0.25rem 0.75rem',
            background: 'rgba(0, 0, 0, 0.7)',
            color: '#ffffff',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {section.beforeLabel}
        </span>
      </div>

      {/* After/Iterated New Mockup */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg-2)',
        }}
      >
        <img
          src={section.imageAfter}
          alt={section.afterLabel}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <span
          style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            padding: '0.25rem 0.75rem',
            background: 'rgba(0, 0, 0, 0.7)',
            color: '#ffffff',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {section.afterLabel}
        </span>
      </div>

      {section.caption && (
        <figcaption
          style={{
            marginTop: '0.2rem',
            fontSize: '0.78rem',
            color: 'var(--color-text-muted)',
            fontStyle: 'italic',
            lineHeight: 1.55,
            textAlign: 'center',
          }}
        >
          {section.caption}
        </figcaption>
      )}
    </figure>
  );
}

function RenderPrinciple({ section }: { section: SectionPrinciple }) {
  return (
    <div
      style={{
        padding: '1.25rem 1.5rem',
        background: 'var(--color-bg-2)',
        border: '1px solid var(--color-border)',
        borderLeft: '3px solid var(--color-text)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
      }}
    >
      <span
        style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          color: 'var(--color-text)',
          textTransform: 'uppercase',
        }}
      >
        {section.label}
      </span>
      <p
        style={{
          color: 'var(--color-text-muted)',
          lineHeight: 1.75,
          fontSize: '0.9rem',
          margin: 0,
        }}
      >
        {section.content}
      </p>
    </div>
  );
}

function RenderReflection({ section }: { section: SectionReflection }) {
  return (
    <div
      style={{
        borderLeft: '2px solid var(--color-border)',
        paddingLeft: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.75rem',
        marginTop: '0.5rem',
      }}
    >
      <p
        style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          margin: 0,
        }}
      >
        Reflection
      </p>

      {section.items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.1rem',
              color: 'var(--color-text-muted)',
              opacity: 0.4,
              flexShrink: 0,
              lineHeight: 1.3,
              minWidth: '1.5rem',
            }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <p
              style={{
                fontWeight: 600,
                fontSize: '0.92rem',
                color: 'var(--color-text)',
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {item.title}
            </p>
            <p
              style={{
                color: 'var(--color-text-muted)',
                lineHeight: 1.75,
                fontSize: '0.9rem',
                margin: 0,
              }}
            >
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function RenderSection({ section }: { section: CaseStudySection }) {
  switch (section.type) {
    case 'heading':
      return <RenderHeading section={section} />;
    case 'text':
      return <RenderText section={section} />;
    case 'image':
      return <RenderImage section={section} />;
    case 'list':
      return <RenderList section={section} />;
    case 'before-after':
      return <RenderBeforeAfter section={section} />;
    case 'principle':
      return <RenderPrinciple section={section} />;
    case 'reflection':
      return <RenderReflection section={section} />;
    default:
      return null;
  }
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

  return (
    <>
      {/* Fixed right-edge navigation — not in document flow */}
      <CaseStudyNav items={navItems} />

      <main>
        {/* ── Hero image ── */}
        <div
          style={{
            width: '100%',
            height: '60vh',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Image
            src={study.heroImage}
            alt={`${study.title} hero`}
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)',
            }}
          />
        </div>

        {/* ── Content wrapper ── */}
        <div
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            padding: '2rem 6rem',
          }}
        >
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
            <p
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
                marginBottom: '0.6rem',
              }}
            >
              Case Study · {study.tag}
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: 'var(--color-text)',
                marginBottom: '2rem',
              }}
            >
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
          <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
            <button
              onClick={toggleMode}
              style={{
                padding: '0.55rem 1.25rem',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-2)',
                color: 'var(--color-text)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'background 0.2s ease, border-color 0.2s ease',
              }}
              className="toggle-btn"
              aria-pressed={!showFull}
            >
              {showFull ? 'Switch to Summary' : 'Read Full Case Study'}
            </button>
          </div>

          <Divider />

          {/* ── Body content — with smooth swap ── */}
          <div
            style={{
              marginTop: '1rem',
              opacity: 1,
              transition: 'opacity 0.35s ease',
            }}
          >
            {!showFull ? (
              /* Summary mode */
              <div
                style={{
                  padding: '1.75rem',
                  marginTop: '2rem',
                  background: 'var(--color-bg-2)',
                  border: '1px solid var(--color-border)',
                  
                }}
              >
                <p
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    marginBottom: '1rem',
                  }}
                >
                  Summary
                </p>
                <p
                  style={{
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.85,
                    fontSize: '1rem',
                    margin: 0,
                  }}
                >
                  {study.summary}
                </p>
              </div>
            ) : (
              /* Full case study */
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                }}
              >
                {study.sections.map((section, i) => (
                  <RenderSection key={i} section={section} />
                ))}
              </div>
            )}
          </div>

          {/* Related case studies */}
          <RelatedStudies slugs={study.relatedSlugs} />
        </div>
      </main>

      <style>{`
        .toggle-btn:hover { background: var(--color-bg-3) !important; }
      `}</style>
    </>
  );
}
