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
    <div className="my-10">
      <div className="metadata-vertical-stack">
        {items.map((item) => (
          <div key={item.label} className="metadata-row">
            <span className="metadata-label">{item.label}</span>
            <span className="metadata-value">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Read time line */}
      <p className="mt-5 text-[0.78rem] text-text-muted tracking-wide">
        {readTime} • {readType}
      </p>
    </div>
  );
}
