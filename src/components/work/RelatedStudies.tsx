import React from 'react';
import Link from 'next/link';
// import { PROJECTS } from '@/lib/constants';
import { WORKS } from '@/lib/constants';

interface RelatedStudiesProps {
  slugs: string[];
  /** Map from case study slug to display title/tag overrides if needed */
  overrides?: Record<string, { title?: string; tag?: string }>;
}

export default function RelatedStudies({ slugs, overrides = {} }: RelatedStudiesProps) {
  const related = slugs
    .map((slug) => {
      // First try to find in PROJECTS (constants) - commented out
      // const project = PROJECTS.find((p) => p.slug === slug);
      // if (project) return { slug, title: project.title, tag: project.tag };
      const project = WORKS.find((w) => w.slug === slug);
      if (project) return { slug, title: project.title, tag: project.tag };
      // Fallback to overrides
      const o = overrides[slug];
      if (o) return { slug, title: o.title ?? slug, tag: o.tag ?? '' };
      return null;
    })
    .filter(Boolean) as { slug: string; title: string; tag: string }[];

  // For slugs not in PROJECTS, provide friendly defaults
  const knownFallbacks: Record<string, { title: string; tag: string }> = {
    safetrack: { title: 'Safetrack', tag: 'Mobile App Design' },
    hrms: { title: 'HRMS', tag: 'Web Application Design' },
  };

  const items = slugs.map((slug) => {
    // const fromProjects = PROJECTS.find((p) => p.slug === slug);
    // if (fromProjects) return { slug, title: fromProjects.title, tag: fromProjects.tag };
    const fromWorks = WORKS.find((w) => w.slug === slug);
    if (fromWorks) return { slug, title: fromWorks.title, tag: fromWorks.tag };
    const fallback = knownFallbacks[slug];
    if (fallback) return { slug, ...fallback };
    return { slug, title: slug, tag: '' };
  });

  if (items.length === 0) return null;

  return (
    <section className="mt-20">
      <div className="mb-8">
        <p className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-2">
          Related Case Studies
        </p>
        <div className="h-[1px] bg-[var(--color-border)]" />
      </div>

      <div
        style={{
          gridTemplateColumns: `repeat(${Math.min(items.length, 3)}, 1fr)`,
        }}
        className="related-grid"
      >
        {items.map(({ slug, title, tag }) => (
          <Link
            key={slug}
            href={`/work/${slug}`}
            target="_blank"
            className="no-underline related-card-link"
          >
            <article className="related-card">
              {tag && (
                <span className="inline-block px-3 py-1 border border-[var(--color-border)] text-[0.68rem] font-semibold tracking-wider uppercase text-[var(--color-tag-text)] bg-[var(--color-tag-bg)] w-fit">
                  {tag}
                </span>
              )}

              <p className="font-display font-extrabold text-[clamp(1.1rem,2vw,1.45rem)] tracking-tight text-[var(--color-text)] leading-tight m-0">
                {title}
              </p>

              <span className="related-card-cta">
                View Case Study →
              </span>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
