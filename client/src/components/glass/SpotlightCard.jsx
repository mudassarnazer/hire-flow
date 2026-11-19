import { useRef, useEffect } from 'react'

/**
 * SpotlightCard Component
 * High-performance cursor-tracking specular glass card with 3D perspective tilt
 * Developer Attribution: MUDASSAR NAZER
 *
 * Characteristics:
 * - 420px Glacial Cyan spotlight tracking (--x, --y).
 * - Restrained 3D perspective tilt (maximum ±2.5 degrees on X/Y axes).
 * - Tactile active click compression (scale 0.992).
 * - Direct native DOM property manipulation (zero React re-renders on pointer movements).
 * - Graceful spring-back to neutral orientation on pointer leave.
 * - Strictly disabled on touch devices via matchMedia('(hover: hover) and (pointer: fine)').
 * - Respects prefers-reduced-motion.
 */
function SpotlightCard({
  children,
  className = '',
  as: Component = 'div',
  tilt = true,
  ...rest
}) {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card || typeof window === 'undefined') return

    // Verify fine pointer (mouse/trackpad) support and reduced motion preference
    const hasFinePointer =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!hasFinePointer || prefersReducedMotion) return

    const handlePointerMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Update cursor coordinates for spotlight
      card.style.setProperty('--x', `${x}px`)
      card.style.setProperty('--y', `${y}px`)

      // Compute 3D perspective tilt if enabled (max ±2.5 degrees)
      if (tilt && rect.width > 0 && rect.height > 0) {
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const normX = (x - centerX) / centerX
        const normY = (y - centerY) / centerY

        // Rotating around X-axis tilts top/bottom; around Y-axis tilts left/right
        const tiltX = Math.max(-2.5, Math.min(2.5, -normY * 2.5))
        const tiltY = Math.max(-2.5, Math.min(2.5, normX * 2.5))

        card.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`)
        card.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`)
      }
    }

    const handlePointerLeave = () => {
      // Smoothly reset spotlight and tilt to neutral
      card.style.setProperty('--x', '-9999px')
      card.style.setProperty('--y', '-9999px')
      if (tilt) {
        card.style.setProperty('--tilt-x', '0deg')
        card.style.setProperty('--tilt-y', '0deg')
      }
    }

    card.addEventListener('pointermove', handlePointerMove, { passive: true })
    card.addEventListener('pointerleave', handlePointerLeave, { passive: true })

    return () => {
      card.removeEventListener('pointermove', handlePointerMove)
      card.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [tilt])

  return (
    <Component
      ref={cardRef}
      className={`spotlight-card ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default SpotlightCard
