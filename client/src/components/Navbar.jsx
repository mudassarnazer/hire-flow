/**
 * HireFlow Navbar Component
 * Flagship Liquid Glassmorphism Navigation & Crystal Mobile Drawer
 * Developer Attribution: MUDASSAR NAZER
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import Button from './common/Button'
import { useTheme } from '../context/ThemeContext'

function Navbar({ activeView = 'landing', onViewChange = () => {} }) {
  const { theme, toggleTheme } = useTheme()
  const navContainerRef = useRef(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const drawerRef = useRef(null)
  const homeLinkRef = useRef(null)
  const dashboardLinkRef = useRef(null)
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  })

  // Helper to update active indicator in segmented glass navigation pill
  const updateIndicator = useCallback(() => {
    const container = navContainerRef.current
    if (!container) return
    let targetEl = null
    if (activeView === 'landing') {
      targetEl = homeLinkRef.current
    } else if (activeView === 'dashboard') {
      targetEl = dashboardLinkRef.current
    }
    if (targetEl) {
      const containerRect = container.getBoundingClientRect()
      const targetRect = targetEl.getBoundingClientRect()
      setIndicatorStyle({
        left: targetRect.left - containerRect.left,
        width: targetRect.width,
        opacity: 1,
      })
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
    }
  }, [activeView])

  // Measure and align sliding active indicator in segmented glass navigation pill
  useEffect(() => {
    const handleResize = () => updateIndicator()
    updateIndicator()
    window.addEventListener('resize', handleResize)

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
    if (!isMobileMenuOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusFirst = () => {
      const drawer = drawerRef.current
      if (!drawer) return
      const focusable = drawer.querySelector(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      focusable?.focus()
    }
    const rafId = requestAnimationFrame(focusFirst)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
        document.getElementById('mobile-menu-toggle')?.focus()
        return
      }

      if (e.key === 'Tab') {
        const drawer = drawerRef.current
        if (!drawer) return
        const focusableEls = drawer.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusableEls.length === 0) {
          e.preventDefault()
          return
        }
        const firstEl = focusableEls[0]
        const lastEl = focusableEls[focusableEls.length - 1]

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      cancelAnimationFrame(rafId)
    }
  }, [isMobileMenuOpen])

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
    'relative z-10 px-4 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] flex items-center'

  const getDesktopLinkClasses = (isActive) =>
    isActive
      ? `${baseDesktopLink} text-[var(--text-primary)] font-semibold`
      : `${baseDesktopLink} text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--color-accent-subtle)]`

  return (
    <nav
      aria-label="Main Navigation"
      className="relative sticky top-0 z-[100] flex h-[80px] w-full items-center justify-between border-b border-[var(--glass-border)] bg-[var(--surface-glass)] px-[8%] backdrop-blur-[var(--glass-blur,24px)] saturate-[var(--glass-saturate,180%)] shadow-[var(--shadow-glass)] animate-navbar-enter motion-reduce:animate-none max-[700px]:px-[5%]"
    >
      {/* Brand Logo */}
      <a
        href="/"
        className="group flex items-center gap-2.5 text-[24px] font-extrabold tracking-[-0.03em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-lg"
        onClick={(e) => {
          setIsMobileMenuOpen(false)
          handleNavClick('landing', e)
        }}
      >
        <span
          className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--color-accent)] to-indigo-600 flex items-center justify-center text-white text-xs font-black shadow-[0_0_16px_var(--color-accent-subtle)] border border-white/30 transition-transform duration-200 group-hover:scale-105 shrink-0"
          aria-hidden="true"
        >
          HF
        </span>
        <span className="text-[var(--text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
          Hire<span className="text-[var(--color-accent)]">Flow</span>
        </span>
      </a>

      {/* Desktop Segmented Glass Navigation Pill (> 700px) */}
      <div
        ref={navContainerRef}
        className="nav-segmented-pill relative hidden min-[701px]:flex items-center gap-1 p-1 rounded-full bg-[var(--surface-card)] border border-[var(--glass-border)] backdrop-blur-[16px] shadow-[var(--shadow-specular)]"
      >
        {/* Animated Sliding Active Indicator */}
        <span
          className="nav-active-indicator absolute top-1 bottom-1 rounded-full bg-[var(--color-accent-subtle)] border border-[var(--color-accent-border)] shadow-[var(--shadow-accent)] pointer-events-none transition-all duration-300 ease-out motion-reduce:transition-none"
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
              className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mr-1.5 shadow-[0_0_8px_var(--color-accent)] motion-reduce:animate-none animate-pulse shrink-0"
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
              className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mr-1.5 shadow-[0_0_8px_var(--color-accent)] motion-reduce:animate-none animate-pulse shrink-0"
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

      {/* Desktop Action & Theme Controls (> 700px) */}
      <div className="hidden min-[701px]:flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          aria-pressed={theme === 'dark'}
          className="theme-toggle-btn group relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--surface-card)] text-[var(--text-primary)] backdrop-blur-[14px] shadow-[var(--shadow-specular)] transition-all duration-200 hover:scale-105 hover:border-[var(--color-accent-border)] hover:bg-[var(--surface-card-hover)] hover:text-[var(--color-accent)] hover:shadow-[var(--shadow-accent)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)] motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          {/* Sun Icon */}
          <svg
            className={`h-[18px] w-[18px] transition-all duration-300 motion-reduce:transition-none ${
              theme === 'dark'
                ? 'rotate-0 scale-100 opacity-100 text-amber-300'
                : '-rotate-90 scale-0 opacity-0 absolute'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>

          {/* Moon Icon */}
          <svg
            className={`h-[18px] w-[18px] transition-all duration-300 motion-reduce:transition-none ${
              theme !== 'dark'
                ? 'rotate-0 scale-100 opacity-100 text-[var(--color-accent)]'
                : 'rotate-90 scale-0 opacity-0 absolute'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>

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

      {/* Mobile Header Controls (<= 700px) */}
      <div className="min-[701px]:hidden flex items-center gap-2">
        {/* Mobile Quick Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          aria-pressed={theme === 'dark'}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--surface-card)] text-[var(--text-primary)] backdrop-blur-[12px] hover:bg-[var(--surface-card-hover)] hover:border-[var(--color-accent-border)] transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        >
          <svg
            className={`h-5 w-5 transition-all duration-300 motion-reduce:transition-none ${
              theme === 'dark'
                ? 'rotate-0 scale-100 opacity-100 text-amber-300'
                : '-rotate-90 scale-0 opacity-0 absolute'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>

          <svg
            className={`h-5 w-5 transition-all duration-300 motion-reduce:transition-none ${
              theme !== 'dark'
                ? 'rotate-0 scale-100 opacity-100 text-[var(--color-accent)]'
                : 'rotate-90 scale-0 opacity-0 absolute'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          id="mobile-menu-toggle"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="flex items-center justify-center p-2.5 rounded-xl border border-[var(--glass-border)] bg-[var(--surface-card)] text-[var(--text-primary)] backdrop-blur-[12px] hover:bg-[var(--surface-card-hover)] hover:border-[var(--color-accent-border)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
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
      </div>

      {/* Mobile Dropdown Crystal Glass Menu Panel (<= 700px) */}
      {isMobileMenuOpen && (
        <div
          ref={drawerRef}
          id="mobile-menu"
          role="region"
          aria-label="Mobile Navigation"
          className="min-[701px]:hidden absolute top-[80px] left-0 w-full border-b border-[var(--glass-border)] bg-[var(--surface-elevated)]/95 px-[6%] py-6 shadow-[var(--shadow-glass)] backdrop-blur-[32px] saturate-[200%] animate-mobile-menu-enter motion-reduce:animate-none flex flex-col gap-5 z-[99]"
        >
          <div className="flex flex-col gap-2">
            <a
              href="/"
              className={`flex items-center gap-2 text-[15px] transition-colors duration-200 py-3 px-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${
                activeView === 'landing'
                  ? 'text-[var(--text-primary)] bg-[var(--color-accent-subtle)] font-semibold border-l-2 border-[var(--color-accent)] shadow-[var(--shadow-accent)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--color-accent-subtle)]'
              }`}
              aria-current={activeView === 'landing' ? 'page' : undefined}
              onClick={(e) => {
                setIsMobileMenuOpen(false)
                handleNavClick('landing', e)
              }}
            >
              {activeView === 'landing' && (
                <span
                  className="w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)] motion-reduce:animate-none animate-pulse shrink-0"
                  aria-hidden="true"
                />
              )}
              Home
            </a>

            <a
              href="#dashboard"
              className={`flex items-center gap-2 text-[15px] transition-colors duration-200 py-3 px-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${
                activeView === 'dashboard'
                  ? 'text-[var(--text-primary)] bg-[var(--color-accent-subtle)] font-semibold border-l-2 border-[var(--color-accent)] shadow-[var(--shadow-accent)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--color-accent-subtle)]'
              }`}
              aria-current={activeView === 'dashboard' ? 'page' : undefined}
              onClick={(e) => {
                setIsMobileMenuOpen(false)
                handleNavClick('dashboard', e)
              }}
            >
              {activeView === 'dashboard' && (
                <span
                  className="w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)] motion-reduce:animate-none animate-pulse shrink-0"
                  aria-hidden="true"
                />
              )}
              Student Dashboard
            </a>

            <a
              href="#opportunities"
              className="flex items-center gap-2 text-[15px] font-medium text-[var(--text-secondary)] transition-colors duration-200 py-3 px-4 rounded-xl hover:text-[var(--text-primary)] hover:bg-[var(--color-accent-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
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

          {/* Mobile Theme Toggle Row */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--surface-card)] border border-[var(--glass-border)]">
            <span className="text-sm font-medium text-[var(--text-primary)]">
              Theme: <span className="font-semibold capitalize text-[var(--color-accent)]">{theme}</span>
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border border-[var(--color-accent-border)] bg-[var(--color-accent-subtle)] text-[var(--color-accent)] transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            >
              {theme === 'dark' ? (
                <>
                  <svg className="w-3.5 h-3.5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-3 border-t border-[var(--glass-border)] flex flex-col">
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
