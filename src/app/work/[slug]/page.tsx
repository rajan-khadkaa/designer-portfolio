import React from 'react';
import { notFound } from 'next/navigation';
import { getCaseStudy, CASE_STUDIES } from '@/lib/case-studies';
import CaseStudyClient from '@/components/work/CaseStudyClient';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: 'Not Found' };
  return {
    title: `${study.title} Case Study | Rajan`,
    description: study.summary.slice(0, 160),
  };
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return <CaseStudyClient study={study} />;
}
