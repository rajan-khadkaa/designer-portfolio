import React from 'react';
import Link from 'next/link';
import { PROJECTS } from '@/lib/constants';

interface RelatedStudiesProps {
  slugs: string[];
  /** Map from case study slug to display title/tag overrides if needed */
  overrides?: Record<string, { title?: string; tag?: string }>;
}

export default function RelatedStudies({ slugs, overrides = {} }: RelatedStudiesProps) {
  const related = slugs
    .map((slug) => {
      // First try to find in PROJECTS (constants)
      const project = PROJECTS.find((p) => p.slug === slug);
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
    const fromProjects = PROJECTS.find((p) => p.slug === slug);
    if (fromProjects) return { slug, title: fromProjects.title, tag: fromProjects.tag };
    const fallback = knownFallbacks[slug];
    if (fallback) return { slug, ...fallback };
    return { slug, title: slug, tag: '' };
  });

  if (items.length === 0) return null;

  return (
    <section style={{ marginTop: '5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <p
          style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            marginBottom: '0.5rem',
          }}
        >
          Related Case Studies
        </p>
        <div style={{ height: '1px', background: 'var(--color-border)' }} />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(items.length, 3)}, 1fr)`,
          gap: '1.5rem',
        }}
        className="related-grid"
      >
        {items.map(({ slug, title, tag }) => (
          <Link
            key={slug}
            href={`/work/${slug}`}
            style={{ textDecoration: 'none' }}
            target="_blank"
            className="related-card-link"
          >
            <article
              className="related-card"
              style={{
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-2)',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'background 0.2s ease, border-color 0.2s ease',
              }}
            >
              {tag && (
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.7rem',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-tag-text)',
                    background: 'var(--color-tag-bg)',
                    width: 'fit-content',
                  }}
                >
                  {tag}
                </span>
              )}

              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.1rem, 2vw, 1.45rem)',
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text)',
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {title}
              </p>

              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.04em',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  marginTop: 'auto',
                  transition: 'color 0.2s ease',
                }}
                className="related-card-cta"
              >
                View Case Study →
              </span>
            </article>
          </Link>
        ))}
      </div>

      <style>{`
        .related-card:hover {
          background: var(--color-bg-3) !important;
          border-color: rgba(var(--color-text-rgb, 17,17,20), 0.15) !important;
        }
        .related-card:hover .related-card-cta {
          color: var(--color-text) !important;
        }
        @media (max-width: 640px) {
          .related-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
