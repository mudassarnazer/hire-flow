import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'

const BASE_CLASSES =
  'hireflow-btn inline-flex items-center justify-center gap-2 font-semibold cursor-pointer whitespace-nowrap select-none transition-all duration-200 ease-out disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)] active:scale-[0.97] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100'

const SIZE_CLASSES = {
  sm: 'hireflow-btn--sm py-2 px-3.5 text-xs rounded-full',
  md: 'hireflow-btn--md py-[10px] px-5 text-sm rounded-full',
  lg: 'hireflow-btn--lg py-[14px] px-7 text-[15px] font-bold rounded-full',
}

const VARIANT_CLASSES = {
  // Tier 1: Border-Beam Hero Pill
  beam: 'btn-border-beam text-[var(--text-primary)] font-bold tracking-[-0.01em]',
  'border-beam': 'btn-border-beam text-[var(--text-primary)] font-bold tracking-[-0.01em]',

  // Tier 2: Solid Luminous CTA
  primary:
    'hireflow-btn--primary btn-luminous-cta text-[var(--color-accent-ink)] font-extrabold shadow-[var(--shadow-accent)] border border-[var(--color-accent-border)] hover:-translate-y-[2px] hover:shadow-[0_12px_34px_var(--color-accent-border)]',
  luminous:
    'hireflow-btn--primary btn-luminous-cta text-[var(--color-accent-ink)] font-extrabold shadow-[var(--shadow-accent)] border border-[var(--color-accent-border)] hover:-translate-y-[2px] hover:shadow-[0_12px_34px_var(--color-accent-border)]',

  // Tier 3: Glass Spotlight Secondary Pill
  secondary:
    'btn-secondary-pill hireflow-btn--secondary text-[var(--text-primary)] border border-[var(--glass-border)] backdrop-blur-[14px] hover:border-[var(--color-accent-border)] hover:-translate-y-[2px] hover:shadow-[var(--shadow-glass)]',
  spotlight:
    'btn-secondary-pill hireflow-btn--secondary text-[var(--text-primary)] border border-[var(--glass-border)] backdrop-blur-[14px] hover:border-[var(--color-accent-border)] hover:-translate-y-[2px] hover:shadow-[var(--shadow-glass)]',

  // Backward-compatible Utility Variants
  outline:
    'hireflow-btn--outline bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-accent-border)] backdrop-blur-[8px] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-ink)] hover:border-[var(--color-accent)] hover:-translate-y-[2px] hover:shadow-[var(--shadow-accent)]',
  ghost:
    'hireflow-btn--ghost bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--color-accent-subtle)]',
}

/**
 * Button Component
 * Executive Three-Tier Obsidian & Glacial Cyan button with magnetic pointer attraction
 * Developer Attribution: MUDASSAR NAZER
 *
 * System Architecture:
 * - Tier 1 (`beam`): Glacial Border-Beam Hero Pill with rotating conic aura.
 * - Tier 2 (`primary` / `luminous`): Solid Luminous Cyan CTA with diagonal shimmer pass.
 * - Tier 3 (`secondary` / `spotlight`): Dark Glass Spotlight Pill with hairline glacial border.
 * - Magnetic attraction with maximum displacement ±6px on fine-pointer devices.
 * - Smooth spring-back to neutral (0, 0) on pointer leave.
 * - Zero React re-renders: writes directly to DOM styles (--mag-x, --mag-y).
 * - Full accessibility: forwardRef, focus-visible rings, keyboard triggerable.
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    type = 'button',
    disabled = false,
    className = '',
    icon = null,
    magnetic,
    ...rest
  },
  ref
) {
  const innerRef = useRef(null)
  useImperativeHandle(ref, () => innerRef.current)

  // Magnetic attraction enabled by default on primary/beam variants, or when explicitly passed
  const isMagnetic =
    !disabled &&
    (magnetic ??
      (variant === 'primary' ||
        variant === 'beam' ||
        variant === 'border-beam' ||
        variant === 'luminous'))

  useEffect(() => {
    const btn = innerRef.current
    if (!btn || !isMagnetic || typeof window === 'undefined') return

    const hasFinePointer =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!hasFinePointer || prefersReducedMotion) return

    const handlePointerMove = (e) => {
      const rect = btn.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Normalize delta from center (-1 to 1) and scale to max ±6px
      const normX = (e.clientX - centerX) / (rect.width / 2)
      const normY = (e.clientY - centerY) / (rect.height / 2)

      const magX = Math.max(-6, Math.min(6, normX * 6))
      const magY = Math.max(-6, Math.min(6, normY * 6))

      btn.style.setProperty('--mag-x', `${magX.toFixed(2)}px`)
      btn.style.setProperty('--mag-y', `${magY.toFixed(2)}px`)
    }

    const handlePointerLeave = () => {
      btn.style.setProperty('--mag-x', '0px')
      btn.style.setProperty('--mag-y', '0px')
    }

    btn.addEventListener('pointermove', handlePointerMove, { passive: true })
    btn.addEventListener('pointerleave', handlePointerLeave, { passive: true })

    return () => {
      btn.removeEventListener('pointermove', handlePointerMove)
      btn.removeEventListener('pointerleave', handlePointerLeave)
      btn.style.setProperty('--mag-x', '0px')
      btn.style.setProperty('--mag-y', '0px')
    }
  }, [isMagnetic])

  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md
  const magneticClass = isMagnetic ? 'hireflow-btn--magnetic' : ''
  const buttonClass = `${BASE_CLASSES} ${variantClass} ${sizeClass} ${magneticClass} ${className}`.trim()

  return (
    <button
      ref={innerRef}
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {icon && (
        <span className="hireflow-btn__icon inline-flex items-center text-[1.1em]">
          {icon}
        </span>
      )}
      <span className="hireflow-btn__text">{children}</span>
    </button>
  )
})

Button.displayName = 'Button'

export default Button
