'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import ThemeToggle from '../ui/ThemeToggle';
import { useThemeContext } from '@/providers/ThemeProvider';
import { useLenis } from '@/providers/SmoothScrollProvider';

export default function Navbar() {
  const pathname = usePathname();
  const { theme } = useThemeContext();
  const lenis = useLenis();

  const [scrolled, setScrolled] = useState(false);
  const [show3d, setShow3d] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const isHomePage = pathname === '/';

  // IntersectionObserver for tracking active home page sections
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection('');
      return;
    }

    const sections = ['works', 'skills', 'process', 'contact'];
    const visibleSections = new Set<string>();
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.add(id);
            } else {
              visibleSections.delete(id);
            }

            const current = sections.find((s) => visibleSections.has(s));
            if (current && window.scrollY >= 200) {
              setActiveSection(current);
            } else {
              setActiveSection('');
            }
          });
        },
        { rootMargin: '-30% 0px -40% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isHomePage]);

  // Smooth scroll to element on load/path changes when a hash is present
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash;
      const target = document.querySelector(hash) as HTMLElement;
      if (target) {
        const timer = setTimeout(() => {
          const offset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;

          if (lenis) {
            lenis.scrollTo(offsetPosition, { duration: 1.2 });
          } else {
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, lenis]);

  useEffect(() => {
    const handleScroll = (scrollVal: number) => {
      setScrolled(scrollVal > 40);
      if (scrollVal < 200) {
        setActiveSection('');
      }
    };

    // Fallback to window scroll if lenis is not yet initialised
    const windowScrollHandler = () => {
      if (!lenis) {
        handleScroll(window.scrollY);
      }
    };

    window.addEventListener('scroll', windowScrollHandler);

    if (lenis) {
      const onLenisScroll = (e: any) => {
        handleScroll(e.scroll);
      };
      lenis.on('scroll', onLenisScroll);
      return () => {
        window.removeEventListener('scroll', windowScrollHandler);
        lenis.off('scroll', onLenisScroll);
      };
    }

    return () => {
      window.removeEventListener('scroll', windowScrollHandler);
    };
  }, [lenis]);

  const handleToggle3D = () => {
    const nextVal = !show3d;
    setShow3d(nextVal);
    // Dispatch custom event that HeroCanvas will listen to
    window.dispatchEvent(
      new CustomEvent('toggle-3d-model', { detail: { visible: nextVal } })
    );
  };

  // Listen to external toggle events to keep state synced (e.g. if Hero Canvas changes it)
  useEffect(() => {
    const handleExternalToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && typeof customEvent.detail.visible === 'boolean') {
        setShow3d(customEvent.detail.visible);
      }
    };
    window.addEventListener('sync-3d-model-state', handleExternalToggle);
    return () => {
      window.removeEventListener('sync-3d-model-state', handleExternalToggle);
    };
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHomePage) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        if (lenis) {
          lenis.scrollTo(offsetPosition, { duration: 1.2 });
        } else {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const isAtTop = !scrolled;
  const isLightTheme = theme === 'light';

  // Only apply the "at-top" hero-overlay style on the homepage hero.
  // On all other routes (blog, about, work, etc.) the navbar always uses
  // the standard theme-aware text colours so links remain legible.
  const atTopClass = isAtTop && isLightTheme && isHomePage ? 'at-top' : '';
  const scrolledClass = scrolled ? 'scrolled' : '';
  // Non-hero pages always show a solid navbar so text is legible
  const notHeroClass = !isHomePage ? 'not-hero' : '';

  return (
    <nav className={`${scrolledClass} ${atTopClass} ${notHeroClass}`} id="navbar">
      <Link href="/" className="nav-logo" aria-label="Rajan Portfolio Home">
        <svg
          width="28"
          height="24"
          viewBox="0 0 1110 947"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', height: '1.35rem', width: 'auto' }}
        >
          <path d="M243.5 115H636.5L394 946.5H0L243.5 115Z" fill="currentColor"/>
          <path d="M1109.5 0H716.5L623.5 316H732.5L679.5 498H570.5L546.5 579L629 832H867L1109.5 0Z" fill="currentColor"/>
        </svg>
      </Link>
      <ul className="nav-links">
        {NAV_LINKS.map((link) => {
          const isAnchor = link.href.startsWith('#');
          if (isAnchor) {
            const finalHref = isHomePage ? link.href : `/${link.href}`;
            const isActive = isHomePage && activeSection === link.href.substring(1);
            return (
              <li key={link.href}>
                <a
                  href={finalHref}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={isActive ? 'active-link' : ''}
                >
                  {link.label}
                </a>
              </li>
            );
          } else {
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? 'active-link' : ''}
                >
                  {link.label}
                </Link>
              </li>
            );
          }
        })}
      </ul>
      <div className="nav-right">
        <ThemeToggle />
        {/* <button id="toggle-model-btn" onClick={handleToggle3D}>
          {show3d ? 'Hide 3D' : 'Show 3D'}
        </button> */}
      </div>
    </nav>
  );
}
