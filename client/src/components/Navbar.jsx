/**
 * HireFlow Navbar Component
 * Developer Attribution: MUDASSAR NAZER
 * Responsive mobile hamburger navigation with Tailwind CSS v4
 */

import { useState, useEffect } from 'react'

function Navbar({ activeView = 'landing', onViewChange = () => {} }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
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
  const baseNavLinkClasses =
    "relative text-[14px] font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] rounded-sm after:content-[''] after:absolute after:left-0 after:-bottom-[8px] after:h-[2px] after:bg-[linear-gradient(135deg,#6366f1,#8b5cf6,#22d3ee)] after:transition-[width] after:duration-[350ms] after:ease-out"

  const getDesktopNavLinkClasses = (isActive) =>
    `${baseNavLinkClasses} ${
      isActive
        ? 'text-[var(--color-text)] after:w-full'
        : 'text-[var(--color-muted)] hover:text-[var(--color-text)] after:w-0 hover:after:w-full'
    }`

  return (
    <nav
      aria-label="Main Navigation"
      className="relative sticky top-0 z-[100] flex h-[80px] w-full items-center justify-between border-b border-[var(--color-border)] bg-[rgba(11,16,32,0.85)] px-[8%] backdrop-blur-[20px] animate-navbar-enter motion-reduce:animate-none max-[700px]:px-[5%]"
    >
      {/* Brand Logo */}
      <a
        href="/"
        className="text-[26px] font-extrabold tracking-[-1px] text-transparent bg-clip-text bg-[linear-gradient(135deg,#6366f1,#8b5cf6,#22d3ee)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] rounded-sm"
        onClick={(e) => {
          setIsMobileMenuOpen(false)
          handleNavClick('landing', e)
        }}
      >
        HireFlow
      </a>

      {/* Desktop Navigation Links (> 700px) */}
      <div className="hidden min-[701px]:flex items-center gap-[36px]">
        <a
          href="/"
          className={getDesktopNavLinkClasses(activeView === 'landing')}
          aria-current={activeView === 'landing' ? 'page' : undefined}
          onClick={(e) => handleNavClick('landing', e)}
        >
          Home
        </a>
        <a
          href="#dashboard"
          className={getDesktopNavLinkClasses(activeView === 'dashboard')}
          aria-current={activeView === 'dashboard' ? 'page' : undefined}
          onClick={(e) => handleNavClick('dashboard', e)}
        >
          Student Dashboard
        </a>
        <a
          href="#opportunities"
          className={getDesktopNavLinkClasses(false)}
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

      {/* Desktop Action Button (> 700px) */}
      <div className="hidden min-[701px]:flex items-center">
        {activeView === 'landing' ? (
          <button
            type="button"
            className="rounded-[10px] border border-[rgba(139,92,246,0.5)] bg-[rgba(99,102,241,0.12)] px-[25px] py-[11px] font-semibold text-[var(--color-text)] transition-all duration-300 hover:-translate-y-[3px] hover:border-transparent hover:bg-[linear-gradient(135deg,#6366f1,#8b5cf6,#22d3ee)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1020]"
            onClick={() => onViewChange('dashboard')}
          >
            Student Portal →
          </button>
        ) : (
          <button
            type="button"
            className="rounded-[10px] border border-[rgba(34,211,238,0.45)] bg-[rgba(34,211,238,0.12)] px-[25px] py-[11px] font-semibold text-[#22d3ee] transition-all duration-300 hover:-translate-y-[3px] hover:border-[#22d3ee] hover:bg-[rgba(34,211,238,0.22)] hover:shadow-[0_8px_25px_rgba(34,211,238,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1020]"
            onClick={() => onViewChange('landing')}
          >
            ← Public View
          </button>
        )}
      </div>

      {/* Mobile Hamburger Toggle Button (<= 700px) */}
      <button
        type="button"
        id="mobile-menu-toggle"
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
        aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="min-[701px]:hidden flex items-center justify-center p-2 rounded-lg border border-[rgba(148,163,184,0.2)] bg-[rgba(17,26,46,0.6)] text-[var(--color-text)] hover:bg-[rgba(99,102,241,0.15)] hover:border-[rgba(139,92,246,0.4)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]"
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
      >
        {isMobileMenuOpen ? (
          <svg
            className="h-6 w-6"
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
            className="h-6 w-6"
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

      {/* Mobile Dropdown Menu Panel (<= 700px) */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          role="region"
          aria-label="Mobile Navigation"
          className="min-[701px]:hidden absolute top-[80px] left-0 w-full border-b border-[var(--color-border)] bg-[rgba(11,16,32,0.985)] px-[6%] py-6 shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-[24px] animate-mobile-menu-enter motion-reduce:animate-none flex flex-col gap-5 z-[99]"
        >
          <div className="flex flex-col gap-3">
            <a
              href="/"
              className={`flex items-center text-[15px] font-medium transition-colors duration-200 py-2 px-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] ${
                activeView === 'landing'
                  ? 'text-[var(--color-text)] bg-[rgba(99,102,241,0.15)] font-semibold border-l-2 border-[#6366f1]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[rgba(255,255,255,0.03)]'
              }`}
              aria-current={activeView === 'landing' ? 'page' : undefined}
              onClick={(e) => {
                setIsMobileMenuOpen(false)
                handleNavClick('landing', e)
              }}
            >
              Home
            </a>

            <a
              href="#dashboard"
              className={`flex items-center text-[15px] font-medium transition-colors duration-200 py-2 px-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] ${
                activeView === 'dashboard'
                  ? 'text-[var(--color-text)] bg-[rgba(99,102,241,0.15)] font-semibold border-l-2 border-[#6366f1]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[rgba(255,255,255,0.03)]'
              }`}
              aria-current={activeView === 'dashboard' ? 'page' : undefined}
              onClick={(e) => {
                setIsMobileMenuOpen(false)
                handleNavClick('dashboard', e)
              }}
            >
              Student Dashboard
            </a>

            <a
              href="#opportunities"
              className="flex items-center text-[15px] font-medium text-[var(--color-muted)] transition-colors duration-200 py-2 px-3 rounded-lg hover:text-[var(--color-text)] hover:bg-[rgba(255,255,255,0.03)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1]"
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

          <div className="pt-3 border-t border-[rgba(148,163,184,0.15)] flex flex-col">
            {activeView === 'landing' ? (
              <button
                type="button"
                className="w-full text-center rounded-[10px] border border-[rgba(139,92,246,0.5)] bg-[rgba(99,102,241,0.12)] px-[25px] py-[12px] font-semibold text-[var(--color-text)] transition-all duration-300 hover:border-transparent hover:bg-[linear-gradient(135deg,#6366f1,#8b5cf6,#22d3ee)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1020]"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onViewChange('dashboard')
                }}
              >
                Student Portal →
              </button>
            ) : (
              <button
                type="button"
                className="w-full text-center rounded-[10px] border border-[rgba(34,211,238,0.45)] bg-[rgba(34,211,238,0.12)] px-[25px] py-[12px] font-semibold text-[#22d3ee] transition-all duration-300 hover:border-[#22d3ee] hover:bg-[rgba(34,211,238,0.22)] hover:shadow-[0_8px_25px_rgba(34,211,238,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1020]"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  onViewChange('landing')
                }}
              >
                ← Public View
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
