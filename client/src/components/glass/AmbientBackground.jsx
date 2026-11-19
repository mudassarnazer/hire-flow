import { useEffect, useRef } from 'react'
import '../../styles/obsidian-glass.css'
import './glass.css'

/**
 * AmbientBackground Component
 * Reactive Living Background Engine: 3-Orbit Aurora Mesh, Mouse Parallax,
 * Glacial Cursor Flashlight Veil & Bounded Click Shockwaves.
 * Developer Attribution: MUDASSAR NAZER
 *
 * Characteristics:
 * - Mounted once at the application root behind all content (z-index: -1).
 * - Strictly pointer-events: none; never captures clicks, scrolls, or interactions.
 * - Continuous 3-orbit asynchronous aurora drift (Cyan, Deep Indigo, Teal).
 * - Normalized pointer parallax: Aurora orbs max ±22px, Architectural grid max ±8px.
 * - Single requestAnimationFrame lerp loop with auto-pause when idle (zero CPU waste).
 * - 320px cursor flashlight veil revealing nearby grid intersections.
 * - Bounded glacial click shockwaves: max 8 concurrent, auto DOM removal on animationend.
 * - Disabled on touch-only devices; fully respects prefers-reduced-motion.
 */
function AmbientBackground() {
  const backgroundRef = useRef(null)
  const shockwaveLayerRef = useRef(null)

  useEffect(() => {
    const bgEl = backgroundRef.current
    const shockwaveLayer = shockwaveLayerRef.current
    if (!bgEl || typeof window === 'undefined') return

    // Verify fine-pointer support and motion preference
    const hasFinePointer =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !hasFinePointer) {
      return
    }

    // ------------------------------------------------------------------------
    // 1. Mouse Parallax & Flashlight Engine (zero React re-renders)
    // ------------------------------------------------------------------------
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let animFrameId = null
    let isLoopRunning = false

    const updateParallax = () => {
      // Linear interpolation factor (0.08 for smooth viscous glass tracking)
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08

      bgEl.style.setProperty('--bg-parallax-x', `${currentX.toFixed(2)}px`)
      bgEl.style.setProperty('--bg-parallax-y', `${currentY.toFixed(2)}px`)

      // If still moving, continue RAF loop; else pause to preserve GPU/CPU cycles
      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        animFrameId = requestAnimationFrame(updateParallax)
      } else {
        isLoopRunning = false
      }
    }

    const startLoopIfNeeded = () => {
      if (!isLoopRunning) {
        isLoopRunning = true
        animFrameId = requestAnimationFrame(updateParallax)
      }
    }

    const handlePointerMove = (e) => {
      // Direct CSS variable update for cursor flashlight position
      bgEl.style.setProperty('--cursor-x', `${e.clientX}px`)
      bgEl.style.setProperty('--cursor-y', `${e.clientY}px`)

      // Normalized coordinates (-0.5 to +0.5)
      const normX = e.clientX / window.innerWidth - 0.5
      const normY = e.clientY / window.innerHeight - 0.5

      // Aurora max ±22px (normX * 44 clamped between -22 and +22)
      targetX = Math.max(-22, Math.min(22, normX * 44))
      targetY = Math.max(-22, Math.min(22, normY * 44))

      startLoopIfNeeded()
    }

    const handlePointerLeave = () => {
      // Smoothly return background parallax to neutral center
      targetX = 0
      targetY = 0
      bgEl.style.setProperty('--cursor-x', '-9999px')
      bgEl.style.setProperty('--cursor-y', '-9999px')
      startLoopIfNeeded()
    }

    // ------------------------------------------------------------------------
    // 2. Bounded Click Shockwave System (max 8 concurrent, auto DOM removal)
    // ------------------------------------------------------------------------
    const MAX_CONCURRENT_RIPPLES = 8

    const handlePointerDown = (e) => {
      // Only trigger for primary mouse button and non-touch devices
      if (e.button !== 0 || e.pointerType === 'touch' || !shockwaveLayer) {
        return
      }

      // Enforce strict upper bound of 8 concurrent shockwave elements
      while (shockwaveLayer.children.length >= MAX_CONCURRENT_RIPPLES) {
        shockwaveLayer.removeChild(shockwaveLayer.firstChild)
      }

      const ripple = document.createElement('div')
      ripple.className = 'glacial-shockwave-node'
      ripple.style.left = `${e.clientX}px`
      ripple.style.top = `${e.clientY}px`

      const pulse = document.createElement('div')
      pulse.className = 'glacial-shockwave-pulse'
      ripple.appendChild(pulse)

      const cleanup = () => {
        if (ripple.parentNode === shockwaveLayer) {
          shockwaveLayer.removeChild(ripple)
        }
      }

      ripple.addEventListener('animationend', cleanup, { once: true })
      // Defensive fallback timer to guarantee cleanup even if animation is skipped
      setTimeout(cleanup, 800)

      shockwaveLayer.appendChild(ripple)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('pointerleave', handlePointerLeave, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })

    return () => {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId)
      }
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('pointerdown', handlePointerDown)

      if (shockwaveLayer) {
        while (shockwaveLayer.firstChild) {
          shockwaveLayer.removeChild(shockwaveLayer.firstChild)
        }
      }
    }
  }, [])

  return (
    <div
      ref={backgroundRef}
      className="aurora-background ambient-background-layer"
      aria-hidden="true"
      role="presentation"
    >
      {/* 3-Orbit Asynchronous Drifting Aurora Mesh (Cyan, Deep Indigo, Teal) */}
      <div className="aurora-mesh-container">
        <div className="aurora-orb aurora-orb-cyan" />
        <div className="aurora-orb aurora-orb-indigo" />
        <div className="aurora-orb aurora-orb-teal" />
      </div>

      {/* Architectural 24px Dot-Grid with Parallax & Vignette */}
      <div className="architectural-dot-grid" />

      {/* Cursor-Reactive Glacial Flashlight Veil */}
      <div className="cursor-flashlight-veil" />

      {/* Non-Intrusive SVG Fractal Noise Overlay */}
      <svg
        className="ambient-noise-layer"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="hf-obsidian-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hf-obsidian-noise)" />
      </svg>

      {/* Bounded Glacial Click Shockwave Layer */}
      <div ref={shockwaveLayerRef} className="glacial-shockwave-layer" />
    </div>
  )
}

export default AmbientBackground
