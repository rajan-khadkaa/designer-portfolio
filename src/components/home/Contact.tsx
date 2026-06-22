'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { PulseBeams, BeamPath } from '@/components/ui/pulse-beams';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { SITE_METADATA } from '@/lib/constants';

// ─── Shared timing configuration ──────────────────────────────
const TIMING_CONFIG = {
  duration: 4,        // Speed: lower = faster, higher = slower
  repeat: Infinity,
  repeatType: 'loop' as const,
  ease: 'linear',
  repeatDelay: 0.5,   // Pause between loops
};

// ─── Beam paths adapted from the 21st.dev demo ──────────────
const BEAMS: BeamPath[] = [
  {
    path: 'M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5',
    gradientConfig: {
      initial: { x1: '0%', x2: '0%', y1: '80%', y2: '100%' },
      animate: {
        x1: ['0%', '0%', '200%'],
        x2: ['0%', '0%', '180%'],
        y1: ['80%', '0%', '0%'],
        y2: ['100%', '20%', '20%']
      },
      transition: {
        ...TIMING_CONFIG,
        delay: 0.3,
      },
    },
    connectionPoints: [
      { cx: 6.5, cy: 398.5, r: 6 },
      { cx: 269, cy: 220.5, r: 6 }
    ],
  },
  {
    path: 'M568 200H841C846.523 200 851 195.523 851 190V40',
    gradientConfig: {
      initial: { x1: '0%', x2: '0%', y1: '80%', y2: '100%' },
      animate: {
        x1: ['20%', '100%', '100%'],
        x2: ['0%', '90%', '90%'],
        y1: ['80%', '80%', '-20%'],
        y2: ['100%', '100%', '0%']
      },
      transition: {
        ...TIMING_CONFIG,
        delay: 0.8,
      },
    },
    connectionPoints: [
      { cx: 851, cy: 34, r: 6.5 },
      { cx: 568, cy: 200, r: 6 }
    ],
  },
  {
    path: 'M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5',
    gradientConfig: {
      initial: { x1: '0%', x2: '0%', y1: '80%', y2: '100%' },
      animate: {
        x1: ['20%', '100%', '100%'],
        x2: ['0%', '90%', '90%'],
        y1: ['80%', '80%', '-20%'],
        y2: ['100%', '100%', '0%']
      },
      transition: {
        ...TIMING_CONFIG,
        delay: 1.2,
      },
    },
    connectionPoints: [
      { cx: 142, cy: 427, r: 6.5 },
      { cx: 425.5, cy: 274, r: 6 }
    ],
  },
  {
    path: 'M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427',
    gradientConfig: {
      initial: { x1: '40%', x2: '50%', y1: '160%', y2: '180%' },
      animate: {
        x1: '0%',
        x2: '10%',
        y1: '-40%',
        y2: '-20%'
      },
      transition: {
        ...TIMING_CONFIG,
        delay: 0,
      },
    },
    connectionPoints: [
      { cx: 770, cy: 427, r: 6.5 },
      { cx: 493, cy: 274, r: 6 }
    ],
  },
  {
    path: 'M380 168V17C380 11.4772 384.477 7 390 7H414',
    gradientConfig: {
      initial: { x1: '-40%', x2: '-10%', y1: '0%', y2: '20%' },
      animate: {
        x1: ['40%', '0%', '0%'],
        x2: ['10%', '0%', '0%'],
        y1: ['0%', '0%', '180%'],
        y2: ['20%', '20%', '200%']
      },
      transition: {
        ...TIMING_CONFIG,
        delay: 1.6,
      },
    },
    connectionPoints: [
      { cx: 420.5, cy: 6.5, r: 6 },
      { cx: 380, cy: 168, r: 6 }
    ],
  },
];

// const GRADIENT_COLORS = { start: '#18CCFC', middle: '#6344F5', end: '#AE48FF' }; //colorful gradient colors
// Option 2: Grayscale (theme-aware)
const GRADIENT_COLORS = {
  start: 'var(--color-text-muted)',
  middle: 'var(--color-text)',
  end: 'var(--color-bg-2)',
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function Contact() {
  const email = SITE_METADATA.email;
  const formRef = useRef<HTMLFormElement>(null);

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ user_email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmailCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.user_email.trim() || !form.message.trim()) {
      setError('Please fill in both fields.');
      return;
    }
    setLoading(true);
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setForm({ user_email: '', message: '' });
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="page-section" id="contact">
      {/* Section header */}
      <div className="mb-12">
        <p className="section-eyebrow">Get in touch</p>
        <h2 className="section-title">Let&apos;s build together.</h2>
      </div>

      {/* ── Two-column layout ─────────────────────────── */}
      <div className="contact-grid">

        {/* ── Column 1: PulseBeams ── */}
        <div className="contact-beams-col">
          <PulseBeams
            beams={BEAMS}
            gradientColors={GRADIENT_COLORS}
            width={858}
            height={434}
            className="contact-beams-inner"
          >
            {/* Non-interactive centre badge */}
            <div className="contact-beams-badge" aria-hidden="true">
              <span>let's connect</span>
            </div>
          </PulseBeams>
        </div>

        {/* ── Column 2: Email copy + Form ── */}
        <div className="contact-form-col">

          <div className="contact-email-row">
            <div className="contact-email-display">
              {/* Email text is fully selectable / copyable by highlighting */}
              <span className="contact-email-text select-text">
                {email}
              </span>
            </div>
            <button
              onClick={handleEmailCopy}
              className="contact-copy-btn"
              aria-label="Copy email address"
              title={copied ? 'Copied!' : 'Copy to clipboard'}
            >
              {copied ? (
                /* Check icon */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                /* Clipboard icon */
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
              <span className="contact-copy-label">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {/* OR separator */}
          <div className="contact-or-row">
            <span className="contact-or-line" />
            <span className="contact-or-text">or</span>
            <span className="contact-or-line" />
          </div>

          {/* Row 2 — Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate>
            <div className="contact-field-group">
              <label htmlFor="contact-email" className="contact-label">Your email</label>
              <input
                id="contact-email"
                type="email"
                name="user_email"
                value={form.user_email}
                onChange={handleChange}
                placeholder="hello@example.com"
                className="contact-input"
                autoComplete="email"
                required
              />
            </div>

            <div className="contact-field-group flex-1">
              <label htmlFor="contact-message" className="contact-label">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What are you working on?"
                className="contact-textarea"
                rows={5}
                required
              />
            </div>

            {error && <p className="contact-error">{error}</p>}
            {sent && <p className="contact-success">Message sent — I&apos;ll be in touch soon!</p>}

            <PrimaryButton
              text={loading ? 'Sending…' : 'Send message'}
              CustomStyle="contact-submit-btn"
              chkBtnDisabled={loading}
              ArrowStyle="ml-1.5"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
