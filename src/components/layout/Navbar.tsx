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

  useEffect(() => {
    const handleScroll = (scrollVal: number) => {
      setScrolled(scrollVal > 40);
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

  const isAtTop = !scrolled;
  const isLightTheme = theme === 'light';

  // Only apply the "at-top" hero-overlay style on the homepage hero.
  // On all other routes (blog, about, work, etc.) the navbar always uses
  // the standard theme-aware text colours so links remain legible.
  const isHomePage = pathname === '/';
  const atTopClass = isAtTop && isLightTheme && isHomePage ? 'at-top' : '';
  const scrolledClass = scrolled ? 'scrolled' : '';
  // Non-hero pages always show a solid navbar so text is legible
  const notHeroClass = !isHomePage ? 'not-hero' : '';

  return (
    <nav className={`${scrolledClass} ${atTopClass} ${notHeroClass}`} id="navbar">
      <Link href="/" className="nav-logo">
        Rajan
      </Link>
      <ul className="nav-links">
        {NAV_LINKS.map((link) => {
          const isAnchor = link.href.startsWith('#');
          if (isAnchor) {
            const finalHref = isHomePage ? link.href : `/${link.href}`;
            return (
              <li key={link.href}>
                <a href={finalHref}>{link.label}</a>
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
