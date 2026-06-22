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
        className="font-display font-extrabold text-[clamp(1.25rem,2.8vw,1.75rem)] tracking-tight text-[var(--color-text)] mt-14 mb-5 leading-[1.15] scroll-mt-20"
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
            className="case-study-html-content text-[var(--color-text-muted)] leading-[1.8] text-[0.97rem] m-0"
            dangerouslySetInnerHTML={{ __html: para }}
          />
        ))}
      </div>
    </ScrollReveal>
  );
}

function RenderImage({ section }: { section: SectionImage }) {
  if (!section.src) {
    return (
      <figure className="my-2">
        <div className="w-full aspect-video bg-[var(--color-bg-3)] border border-dashed border-[var(--color-border)] flex items-center justify-center">
          <span className="italic text-[var(--color-text-muted)] text-[0.85rem] text-center p-4">
            {section.caption}
          </span>
        </div>
      </figure>
    );
  }

  return (
    <figure className="my-2">
      <div className="w-full border border-[var(--color-border)] bg-[var(--color-bg-2)]">
        <img
          src={section.src}
          alt={section.alt}
          className="w-full h-auto block"
        />
      </div>
      {section.caption && (
        <figcaption className="mt-2.5 text-[0.78rem] text-[var(--color-text-muted)] italic leading-relaxed text-center">
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
          className="text-[var(--color-text-muted)] leading-[1.75] text-[0.97rem]"
          dangerouslySetInnerHTML={{ __html: item }}
        />
      ))}
    </Tag>
  );
}

function RenderBeforeAfter({ section }: { section: SectionBeforeAfter }) {
  return (
    <figure className="my-2 flex flex-col gap-4">
      {/* Before/Old Mockup */}
      <div className="relative w-full border border-[var(--color-border)] bg-[var(--color-bg-2)]">
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
      <div className="relative w-full border border-[var(--color-border)] bg-[var(--color-bg-2)]">
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
        <figcaption className="mt-1 text-[0.78rem] text-[var(--color-text-muted)] italic leading-relaxed text-center">
          {section.caption}
        </figcaption>
      )}
    </figure>
  );
}

function RenderPrinciple({ section }: { section: SectionPrinciple }) {
  return (
    <div className="py-5 px-6 bg-[var(--color-bg-2)] border border-[var(--color-border)] border-l-3 border-l-[var(--color-text)] flex flex-col gap-1.5">
      <span className="text-[0.78rem] font-bold tracking-wider text-[var(--color-text)] uppercase">
        {section.label}
      </span>
      <div
        className="case-study-html-content text-[var(--color-text-muted)] leading-[1.75] text-[0.9rem] m-0"
        dangerouslySetInnerHTML={{ __html: section.content }}
      />
    </div>
  );
}

function RenderReflection({ section }: { section: SectionReflection }) {
  return (
    <div className="border-l-2 border-[var(--color-border)] pl-6 flex flex-col gap-7 mt-2">
      <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[var(--color-text-muted)] m-0">
        Reflection
      </p>

      {section.items.map((item, i) => (
        <div key={i} className="flex gap-4 items-start">
          <span className="font-display font-extrabold text-[1.1rem] text-[var(--color-text-muted)] opacity-40 shrink-0 leading-[1.3] min-w-[1.5rem]">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="flex flex-col gap-1.5">
            <p className="font-semibold text-[0.92rem] text-[var(--color-text)] m-0 leading-[1.4]">
              {item.title}
            </p>
            <div
              className="case-study-html-content text-[var(--color-text-muted)] leading-[1.75] text-[0.9rem] m-0"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
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
        <div className="w-full h-[60vh] relative overflow-hidden">
          <Image
            src={study.heroImage}
            alt={`${study.title} hero`}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/55" />
        </div>

        {/* ── Content wrapper ── */}
        <div className="max-w-[780px] mx-auto py-8 px-6 md:px-24">
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
            <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-2.5">
              Case Study · {study.tag}
            </p>
            <h1 className="font-display font-extrabold text-[clamp(2rem,5vw,3.2rem)] tracking-tight leading-[1.05] text-[var(--color-text)] mb-8">
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
              className="toggle-btn py-[0.55rem] px-5 border border-[var(--color-border)] bg-[var(--color-bg-2)] text-[var(--color-text)] text-[0.8rem] font-semibold tracking-wider cursor-pointer transition-colors duration-200"
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
              <div className="p-7 mt-8 bg-[var(--color-bg-2)] border border-[var(--color-border)]">
                <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-4">
                  Summary
                </p>
                <p className="text-[var(--color-text-muted)] leading-[1.85] text-[1rem] m-0">
                  {study.summary}
                </p>
              </div>
            ) : (
              /* Full case study */
              <div className="flex flex-col gap-6">
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
    </>
  );
}
