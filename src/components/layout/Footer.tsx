'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="footer-divider" />
      <div className="footer-container">
        {/* Left: Logo & Name */}
        <div className="footer-logo-wrap">
          <Link href="/" className="footer-logo-link" aria-label="Rajan Portfolio Home">
            <svg
              width="24"
              height="20"
              viewBox="0 0 1110 947"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="footer-logo-svg"
            >
              <path d="M243.5 115H636.5L394 946.5H0L243.5 115Z" fill="currentColor" />
              <path d="M1109.5 0H716.5L623.5 316H732.5L679.5 498H570.5L546.5 579L629 832H867L1109.5 0Z" fill="currentColor" />
            </svg>
            <span className="footer-logo-text">Rajan</span>
          </Link>
        </div>

        {/* Middle: Links */}
        <div className="footer-links">
          <a
            href="https://www.linkedin.com/in/rajan-khadka-106868268/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
          <a
            href="https://wa.me/+9779814364007?text=Hello%20Rajan,%20Let%27s%20work%20together."
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            WhatsApp
          </a>
          <a
            href="https://github.com/rajan-khadkaa"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} Rajan. All rights reserved.</p>
        </div>
      </div>

      <style>{`
        .footer-wrap {
          display: block !important;
          border-top: none !important;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2.5rem 4rem 2.5rem;
        }
        .footer-divider {
          height: 1px;
          background: var(--color-border);
          width: 100%;
          margin-bottom: 2.5rem;
          transition: background var(--transition);
        }
        .footer-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        .footer-logo-link {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          text-decoration: none;
          color: var(--color-text);
          font-family: var(--font-display), sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: -0.02em;
          transition: color 0.3s ease;
        }
        .footer-logo-link:hover {
          color: var(--color-text-muted);
        }
        .footer-logo-svg {
          display: block;
          height: 1.15rem;
          width: auto;
        }
        .footer-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .footer-link {
          color: var(--color-text-muted);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 400;
          transition: color 0.3s ease;
          position: relative;
          padding-bottom: 4px;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1.5px;
          background-color: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .footer-link:hover {
          color: var(--color-text);
        }
        .footer-link:hover::after {
          transform: scaleX(1);
        }
        .footer-copyright {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .footer-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.5rem;
          }
          .footer-links {
            flex-direction: column;
            gap: 1.25rem;
          }
        }
      `}</style>
    </footer>
  );
}
