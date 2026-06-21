import React from 'react';
import { CaseStudyMetadata } from '@/lib/case-studies';

interface MetadataBlockProps {
  metadata: CaseStudyMetadata;
  readTime: string;
  readType: string;
}

export default function MetadataBlock({
  metadata,
  readTime,
  readType,
}: MetadataBlockProps) {
  const items: { label: string; value: string }[] = [
    { label: 'Role', value: metadata.role },
    { label: 'Duration', value: metadata.duration },
    { label: 'Tools', value: metadata.tools },
    { label: 'Type', value: metadata.type },
    // { label: 'Status', value: metadata.status },
  ];

  return (
    <div>
      {/* Metadata row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg-2)',
        }}
        className="metadata-grid"
      >
        {items.map((item, i) => (
          <div
            key={item.label}
            style={{
              padding: '1rem 1.25rem',
              borderLeft: i > 0 ? '1px solid var(--color-border)' : undefined,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
            }}
          >
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              {item.label}
            </span>
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--color-text)',
                lineHeight: 1.4,
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Read time line */}
      <p
        style={{
          marginTop: '0.75rem',
          fontSize: '0.78rem',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.02em',
        }}
      >
        {readTime} · {readType}
      </p>

      <style>{`
        @media (max-width: 640px) {
          .metadata-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .metadata-grid > div:nth-child(odd) {
            border-left: none !important;
          }
        }
      `}</style>
    </div>
  );
}
