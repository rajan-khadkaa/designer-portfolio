'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { PulseBeams, BeamPath } from '@/components/ui/pulse-beams';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { SITE_METADATA } from '@/lib/constants';

// ─── Beam paths adapted from the 21st.dev demo ───────────────────────────────
const BEAMS: BeamPath[] = [
  {
    path: 'M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5',
    gradientConfig: {
      initial: { x1: '0%', x2: '0%', y1: '80%', y2: '100%' },
      animate: { x1: ['0%', '0%', '200%'], x2: ['0%', '0%', '180%'], y1: ['80%', '0%', '0%'], y2: ['100%', '20%', '20%'] },
      transition: { duration: 6, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 2, delay: 0.3 },
    },
    connectionPoints: [{ cx: 6.5, cy: 398.5, r: 6 }, { cx: 269, cy: 220.5, r: 6 }],
  },
  {
    path: 'M568 200H841C846.523 200 851 195.523 851 190V40',
    gradientConfig: {
      initial: { x1: '0%', x2: '0%', y1: '80%', y2: '100%' },
      animate: { x1: ['20%', '100%', '100%'], x2: ['0%', '90%', '90%'], y1: ['80%', '80%', '-20%'], y2: ['100%', '100%', '0%'] },
      transition: { duration: 6, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 2, delay: 0.8 },
    },
    connectionPoints: [{ cx: 851, cy: 34, r: 6.5 }, { cx: 568, cy: 200, r: 6 }],
  },
  {
    path: 'M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5',
    gradientConfig: {
      initial: { x1: '0%', x2: '0%', y1: '80%', y2: '100%' },
      animate: { x1: ['20%', '100%', '100%'], x2: ['0%', '90%', '90%'], y1: ['80%', '80%', '-20%'], y2: ['100%', '100%', '0%'] },
      transition: { duration: 6, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 2, delay: 1.2 },
    },
    connectionPoints: [{ cx: 142, cy: 427, r: 6.5 }, { cx: 425.5, cy: 274, r: 6 }],
  },
  {
    path: 'M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427',
    gradientConfig: {
      initial: { x1: '40%', x2: '50%', y1: '160%', y2: '180%' },
      animate: { x1: '0%', x2: '10%', y1: '-40%', y2: '-20%' },
      transition: { duration: 6, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 2, delay: 0 },
    },
    connectionPoints: [{ cx: 770, cy: 427, r: 6.5 }, { cx: 493, cy: 274, r: 6 }],
  },
  {
    path: 'M380 168V17C380 11.4772 384.477 7 390 7H414',
    gradientConfig: {
      initial: { x1: '-40%', x2: '-10%', y1: '0%', y2: '20%' },
      animate: { x1: ['40%', '0%', '0%'], x2: ['10%', '0%', '0%'], y1: ['0%', '0%', '180%'], y2: ['20%', '20%', '200%'] },
      transition: { duration: 6, repeat: Infinity, repeatType: 'loop', ease: 'linear', repeatDelay: 2, delay: 1.6 },
    },
    connectionPoints: [{ cx: 420.5, cy: 6.5, r: 6 }, { cx: 380, cy: 168, r: 6 }],
  },
];

const GRADIENT_COLORS = { start: '#18CCFC', middle: '#6344F5', end: '#AE48FF' };

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
      <div style={{ marginBottom: '3rem' }}>
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
              <span>Connect</span>
            </div>
          </PulseBeams>
        </div>

        {/* ── Column 2: Email copy + Form ── */}
        <div className="contact-form-col">

          <div className="contact-email-row">
            <div className="contact-email-display">
              {/* Email text is fully selectable / copyable by highlighting */}
              <span className="contact-email-text" style={{ userSelect: 'text' }}>
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

            <div className="contact-field-group" style={{ flex: 1 }}>
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

      <style>{`
        /* ─── Contact grid ─── */
        .contact-grid {
          display: flex;
          gap: 2.5rem;
          align-items: stretch;
        }

        /* PulseBeams column */
        .contact-beams-col {
          flex: 0 0 45%;
          min-height: 420px;
          background: var(--color-bg-2);
          border: 1px solid var(--color-border);
          overflow: hidden;
          position: relative;
        }
        .contact-beams-inner {
          background: transparent !important;
          width: 100% !important;
          height: 100% !important;
        }
        .contact-beams-badge {
          padding: 0.8rem 1.8rem;
          border: 1px solid var(--color-border);
          background: var(--color-bg-2);
          pointer-events: none;
          user-select: none;
        }
        .contact-beams-badge span {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(1.0rem, 2vw, 1.3rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          background: linear-gradient(135deg, var(--color-text) 0%, var(--color-text-muted) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Form column */
        .contact-form-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0;
          min-width: 0;
        }

        /* Email copy row */
        .contact-email-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: var(--color-bg-2);
          border: 1px solid var(--color-border);
          border-bottom: none;
        }
        .contact-email-display {
          flex: 1;
          min-width: 0;
          overflow: hidden;
        }
        .contact-email-text {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-text);
          letter-spacing: 0.01em;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: text;
        }
        .contact-copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          flex-shrink: 0;
          padding: 0.4rem 0.85rem;
          border: 1px solid var(--color-border);
          background: var(--color-bg-3);
          color: var(--color-text-muted);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          border-radius: 100px;
          cursor: pointer;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .contact-copy-btn:hover {
          color: var(--color-text);
          background: var(--color-bg-3);
          border-color: var(--color-text-muted);
        }
        .contact-copy-label { font-size: 0.75rem; }

        /* OR separator */
        .contact-or-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 1.25rem;
          background: var(--color-bg-2);
          border-left: 1px solid var(--color-border);
          border-right: 1px solid var(--color-border);
        }
        .contact-or-line {
          flex: 1;
          height: 1px;
          background: var(--color-border);
        }
        .contact-or-text {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          flex-shrink: 0;
        }

        /* Divider */
        .contact-form-divider {
          height: 1px;
          background: var(--color-border);
          margin: 0;
        }

        /* Form */
        .contact-form {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          padding: 1.5rem 1.25rem 1.25rem;
          background: var(--color-bg-2);
          border: 1px solid var(--color-border);
          border-top: none;
        }
        .contact-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .contact-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .contact-input,
        .contact-textarea {
          width: 100%;
          padding: 0.7rem 0.9rem;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          color: var(--color-text);
          font-family: var(--font-sans);
          font-size: 0.9rem;
          outline: none;
          resize: vertical;
          transition: border-color 0.2s;
        }
        .contact-input::placeholder,
        .contact-textarea::placeholder {
          color: var(--color-text-muted);
          opacity: 0.6;
        }
        .contact-input:focus,
        .contact-textarea:focus {
          border-color: var(--color-text-muted);
        }
        .contact-textarea { min-height: 110px; resize: vertical; }

        .contact-error   { font-size: 0.8rem; color: #f97316; margin: 0; }
        .contact-success { font-size: 0.8rem; color: #22c55e; margin: 0; }

        .contact-submit-btn {
          width: 100%;
          margin-top: 0.25rem;
        }

        /* ─── Responsive ─── */
        @media (max-width: 860px) {
          .contact-grid {
            flex-direction: column;
          }
          .contact-beams-col {
            flex: none;
            min-height: 300px;
          }
        }
      `}</style>
    </div>
  );
}
