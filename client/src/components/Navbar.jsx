/**
 * HireFlow Navbar Component
 * Flagship Liquid Glassmorphism Navigation & Crystal Mobile Drawer
 * Developer Attribution: MUDASSAR NAZER
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import Button from './common/Button'

function Navbar({ activeView = 'landing', onViewChange = () => {} }) {

  const navContainerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const drawerRef = useRef(null);
  const homeLinkRef = useRef(null);
  const dashboardLinkRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Helper to update active indicator (extracted for reuse)
  // Helper to update active indicator (extracted for reuse)
const updateIndicator = useCallback(() => {
  const container = navContainerRef.current;
  if (!container) return;
  let targetEl = null;
  if (activeView === 'landing') {
    targetEl = homeLinkRef.current;
  } else if (activeView === 'dashboard') {
    targetEl = dashboardLinkRef.current;
  }
  if (targetEl) {
    const containerRect = container.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    setIndicatorStyle({
      left: targetRect.left - containerRect.left,
      width: targetRect.width,
      opacity: 1,
    });
  } else {
    setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
  }
}, [activeView]);
// (removed duplicated updateIndicator logic)



  // Measure and align sliding active indicator in segmented glass navigation pill
  useEffect(() => {
    // initial update and resize handling
    const handleResize = () => updateIndicator()
    updateIndicator()
    window.addEventListener('resize', handleResize)

    // Font loading handling
    let cancelled = false
    const fontReady = document.fonts?.ready
    fontReady?.then(() => {
      if (!cancelled) updateIndicator()
    })

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelled = true
    }
  }, [updateIndicator])

// Trap focus, handle Escape dismissal, and lock body scroll while mobile menu is open
useEffect(() => {
  if (!isMobileMenuOpen) return;

  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  // Move focus to first focusable element in the drawer after it opens
  const focusFirst = () => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    const focusable = drawer.querySelector(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();
  };
  const rafId = requestAnimationFrame(focusFirst);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsMobileMenuOpen(false);
      document.getElementById('mobile-menu-toggle')?.focus();
      return;
    }

    if (e.key === 'Tab') {
      const drawer = drawerRef.current;
      if (!drawer) return;
      const focusableEls = drawer.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusableEls.length === 0) {
        // Prevent focus from escaping when there are no focusable elements
        e.preventDefault();
        return;
      }
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      // If focus is on the toggle and Shift+Tab, move to last element in drawer
      if (e.shiftKey && document.activeElement.id === 'mobile-menu-toggle') {
        e.preventDefault();
        lastEl.focus();
        return;
      }

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
    document.body.style.overflow = originalOverflow;
    cancelAnimationFrame(rafId);
  };
}, [isMobileMenuOpen]);

  // Automatically close mobile menu if viewport widens above desktop breakpoint (700px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = (view, e) => {
    if (e) e.preventDefault()
    onViewChange(view)
  }

  // Desktop navigation link styles
  const baseDesktopLink =
    'relative z-10 px-4 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] flex items-center'

  const getDesktopLinkClasses = (isActive) =>
    isActive
      ? `${baseDesktopLink} text-[#f8fafc] font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]`
      : `${baseDesktopLink} text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]`

  return (
    <nav
      aria-label="Main Navigation"
      className="relative sticky top-0 z-[100] flex h-[80px] w-full items-center justify-between border-b border-white/[0.12] bg-[rgba(5,7,15,0.72)] px-[8%] backdrop-blur-[24px] saturate-[180%] shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_-1px_0_0_rgba(255,255,255,0.06)] animate-navbar-enter motion-reduce:animate-none max-[700px]:px-[5%]"
    >
      {/* Brand Logo */}
      <a
        href="/"
        className="group flex items-center gap-2.5 text-[24px] font-extrabold tracking-[-0.03em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded-lg"
        onClick={(e) => {
          setIsMobileMenuOpen(false)
          handleNavClick('landing', e)
        }}
      >
        <span
          className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-[0_0_16px_rgba(56,189,248,0.4)] border border-white/30 transition-transform duration-200 group-hover:scale-105 shrink-0"
          aria-hidden="true"
        >
          HF
        </span>
        <span className="text-[#f8fafc] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-400 group-hover:to-cyan-300 transition-colors">
          Hire<span className="text-sky-400">Flow</span>
        </span>
      </a>

      {/* Desktop Segmented Glass Navigation Pill (> 700px) */}
      <div
        ref={navContainerRef}
        className="nav-segmented-pill relative hidden min-[701px]:flex items-center gap-1 p-1 rounded-full bg-white/[0.035] border border-white/[0.09] backdrop-blur-[16px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
      >
        {/* Animated Sliding Glacial Active Indicator */}
        <span
          className="nav-active-indicator absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-sky-500/20 to-cyan-500/10 border border-sky-400/35 shadow-[0_2px_14px_rgba(56,189,248,0.22),inset_0_1px_0_0_rgba(224,242,254,0.25)] pointer-events-none transition-all duration-300 ease-out motion-reduce:transition-none"
          style={{
            transform: `translateX(${indicatorStyle.left}px)`,
            width: `${indicatorStyle.width}px`,
            opacity: indicatorStyle.opacity,
          }}
          aria-hidden="true"
        />

        <a
          ref={homeLinkRef}
          href="/"
          className={getDesktopLinkClasses(activeView === 'landing')}
          aria-current={activeView === 'landing' ? 'page' : undefined}
          onClick={(e) => handleNavClick('landing', e)}
        >
          {activeView === 'landing' && (
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400 mr-1.5 shadow-[0_0_8px_rgba(56,189,248,0.8)] motion-reduce:animate-none animate-pulse shrink-0"
              aria-hidden="true"
            />
          )}
          Home
        </a>

        <a
          ref={dashboardLinkRef}
          href="#dashboard"
          className={getDesktopLinkClasses(activeView === 'dashboard')}
          aria-current={activeView === 'dashboard' ? 'page' : undefined}
          onClick={(e) => handleNavClick('dashboard', e)}
        >
          {activeView === 'dashboard' && (
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400 mr-1.5 shadow-[0_0_8px_rgba(56,189,248,0.8)] motion-reduce:animate-none animate-pulse shrink-0"
              aria-hidden="true"
            />
          )}
          Student Dashboard
        </a>

        <a
          href="#opportunities"
          className={getDesktopLinkClasses(false)}
          onClick={(e) => {
            if (activeView === 'dashboard') {
              handleNavClick('landing', e)
              setTimeout(() => {
                const el = document.querySelector('.featured-section')
                el?.scrollIntoView({ behavior: 'smooth' })
              }, 100)
            }
          }}
        >
          Find Jobs
        </a>
      </div>

      {/* Desktop Unified Action Button (> 700px) */}
      <div className="hidden min-[701px]:flex items-center">
        {activeView === 'landing' ? (
          <Button
            variant="primary"
            size="md"
            onClick={() => onViewChange('dashboard')}
          >
            <span>Student Portal</span>
            <span aria-hidden="true">→</span>
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="md"
            onClick={() => onViewChange('landing')}
          >
            <span aria-hidden="true">←</span>
            <span>Public View</span>
          </Button>
        )}
      </div>

      {/* Mobile Hamburger Toggle Button (<= 700px) */}
      <button
        type="button"
        id="mobile-menu-toggle"
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
        aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="min-[701px]:hidden flex items-center justify-center p-2.5 rounded-xl border border-white/12 bg-white/[0.05] text-[#f8fafc] backdrop-blur-[12px] hover:bg-white/[0.1] hover:border-sky-400/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      >
        {isMobileMenuOpen ? (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Dropdown Crystal Glass Menu Panel (<= 700px) */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          role="region"
          aria-label="Mobile Navigation"
          className="min-[701px]:hidden absolute top-[80px] left-0 w-full border-b border-white/[0.14] bg-[rgba(5,8,17,0.95)] px-[6%] py-6 shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(224,242,254,0.12)] backdrop-blur-[32px] saturate-[200%] animate-mobile-menu-enter motion-reduce:animate-none flex flex-col gap-5 z-[99]"
        >
          <div className="flex flex-col gap-2">
            <a
              href="/"
              className={`flex items-center gap-2 text-[15px] transition-colors duration-200 py-3 px-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] ${
                activeView === 'landing'
                  ? 'text-[#f8fafc] bg-sky-500/15 font-semibold border-l-2 border-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.12)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
              }`}
              aria-current={activeView === 'landing' ? 'page' : undefined}
              onClick={(e) => {
                setIsMobileMenuOpen(false)
                handleNavClick('landing', e)
              }}
            >
              {activeView === 'landing' && (
                <span
                  className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] motion-reduce:animate-none animate-pulse shrink-0"
                  aria-hidden="true"
                />
              )}
              Home
            </a>

            <a
              href="#dashboard"
              className={`flex items-center gap-2 text-[15px] transition-colors duration-200 py-3 px-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] ${
                activeView === 'dashboard'
                  ? 'text-[#f8fafc] bg-sky-500/15 font-semibold border-l-2 border-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.12)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
              }`}
              aria-current={activeView === 'dashboard' ? 'page' : undefined}
              onClick={(e) => {
                setIsMobileMenuOpen(false)
                handleNavClick('dashboard', e)
              }}
            >
              {activeView === 'dashboard' && (
                <span
                  className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] motion-reduce:animate-none animate-pulse shrink-0"
                  aria-hidden="true"
                />
              )}
              Student Dashboard
            </a>

            <a
              href="#opportunities"
              className="flex items-center gap-2 text-[15px] font-medium text-slate-300 transition-colors duration-200 py-3 px-4 rounded-xl hover:text-white hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
              onClick={(e) => {
                setIsMobileMenuOpen(false)
                if (activeView === 'dashboard') {
                  handleNavClick('landing', e)
                  setTimeout(() => {
                    const el = document.querySelector('.featured-section')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }, 100)
                } else {
                  const el = document.querySelector('.featured-section')
                  if (el) {
                    if (e) e.preventDefault()
                    el.scrollIntoView({ behavior: 'smooth' })
                  }
                }
              }}
            >
              Find Jobs
            </a>
          </div>

          <div className="pt-3 border-t border-white/[0.1] flex flex-col">
            {activeView === 'landing' ? (
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onViewChange('dashboard')
                }}
              >
                <span>Student Portal</span>
                <span aria-hidden="true">→</span>
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="md"
                className="w-full justify-center"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onViewChange('landing')
                }}
              >
                <span aria-hidden="true">←</span>
                <span>Public View</span>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
