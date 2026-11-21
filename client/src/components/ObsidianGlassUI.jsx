import { useEffect, useRef, useState } from 'react'

/**
 * ObsidianGlassUI Primitives
 * Flagship Liquid Glassmorphism Interactive Primitives
 * Developer Attribution: MUDASSAR NAZER
 *
 * Components:
 * - ScrollReveal: High-performance one-time viewport entry reveal via IntersectionObserver.
 * - StatusBeacon: Living micro-widget pulse indicator for recruitment status.
 */

/**
 * ScrollReveal Component
 * Initial state: blur(10px), translateY(16px), opacity 0
 * Final state: blur(0), translateY(0), opacity 1
 * Safely falls back to immediate visibility when IntersectionObserver is unsupported
 * or when prefers-reduced-motion is active.
 */
export function ScrollReveal({
  children,
  className = '',
  as: Component = 'div',
  threshold = 0.1,
  delay = 0,
  ...rest
}) {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasObserver = 'IntersectionObserver' in window
    return prefersReducedMotion || !hasObserver
  })

  useEffect(() => {
    if (isVisible) return
    const el = elementRef.current
    if (!el || typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true)
            }, delay)
          } else {
            setIsVisible(true)
          }
          // Disconnect once revealed: zero continuous scroll CPU overhead
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [threshold, delay, isVisible])

  return (
    <Component
      ref={elementRef}
      className={`obsidian-reveal ${isVisible ? 'obsidian-reveal--visible' : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  )
}

/**
 * StatusBeacon Component
 * Subtle living pulse indicator representing real recruitment workflow statuses
 */
export function StatusBeacon({
  variant = 'cyan',
  label = '',
  className = '',
  ...rest
}) {
  const COLOR_CLASSES = {
    cyan: 'text-[var(--beacon-cyan)]',
    sky: 'text-[var(--beacon-cyan)]',
    emerald: 'text-[var(--beacon-emerald)]',
    success: 'text-[var(--beacon-emerald)]',
    amber: 'text-[var(--beacon-amber)]',
    warning: 'text-[var(--beacon-amber)]',
    indigo: 'text-[var(--beacon-indigo)]',
    primary: 'text-[var(--beacon-indigo)]',
    accent: 'text-[var(--beacon-cyan)]',
  }

  const colorClass = COLOR_CLASSES[variant] || COLOR_CLASSES.cyan

  return (
    <span
      className={`status-beacon ${colorClass} ${className}`.trim()}
      role="status"
      aria-label={label || undefined}
      {...rest}
    >
      <span className="status-beacon__core" aria-hidden="true" />
      <span className="status-beacon__pulse" aria-hidden="true" />
    </span>
  )
}

export default {
  ScrollReveal,
  StatusBeacon,
}
