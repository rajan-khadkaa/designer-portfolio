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
  ];

  return (
    <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
      <div className="metadata-vertical-stack">
        {items.map((item) => (
          <div key={item.label} className="metadata-row">
            <span className="metadata-label">{item.label}</span>
            <span className="metadata-value">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Read time line */}
      <p
        style={{
          marginTop: '1.25rem',
          fontSize: '0.78rem',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.02em',
        }}
      >
        {readTime} · {readType}
      </p>

      <style>{`
        .metadata-vertical-stack {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .metadata-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding: 0.95rem 0;
          border-bottom: 1.5px dotted var(--color-border);
          transition: border-color var(--transition);
        }
        .metadata-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .metadata-value {
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--color-text);
          text-align: right;
        }
      `}</style>
    </div>
  );
}
