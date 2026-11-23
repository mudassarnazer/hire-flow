/**
 * StudentProfileView Component
 * Candidate Academic Identity, Skills Profile, Dynamic Completion Meter & Simulated ATS Score
 * Developer Attribution: MUDASSAR NAZER
 */

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Badge from '../common/Badge'
import Button from '../common/Button'
import SpotlightCard from '../glass/SpotlightCard'
import { calculateProfileCompletion } from './profileUtils'

export default function StudentProfileView({ profile, onUpdateProfile }) {
  const safeProfile = profile || {
    name: 'Sample Candidate',
    avatarInitials: 'SC',
    rollNumber: 'DEMO-2027-CS',
    department: 'Computer Science & Engineering',
    institution: 'Sample Technical Institute (Demo)',
    batch: 'Class of 2027 (Sample)',
    cgpa: '8.94 / 10.0 (Sample)',
    eligibilityStatus: 'Standard Placement Track (Sample)',
    resumeScore: 92,
    skills: ['React', 'JavaScript', 'Node.js', 'Python', 'SQL', 'Algorithms'],
    bio: 'Demonstration candidate profile for HIRE-FLOW evaluation. Focusing on full-stack web engineering and distributed systems.',
    portfolioLink: 'https://example.com/candidate-portfolio-demo',
  }

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [studentBio, setStudentBio] = useState(
    safeProfile.bio ||
      'Demonstration candidate profile for HIRE-FLOW evaluation. Focusing on full-stack web engineering and distributed systems.'
  )
  const [portfolioLink, setPortfolioLink] = useState(
    safeProfile.portfolioLink || 'https://example.com/candidate-portfolio-demo'
  )
  const [formError, setFormError] = useState('')
  const [saveToast, setSaveToast] = useState(false)

  const editModalRef = useRef(null)
  const closeBtnRef = useRef(null)
  const lastActiveElementRef = useRef(null)

  // SVG Circular Gauge calculation for simulated ATS resume score
  const resumeScore =
    typeof safeProfile.resumeScore === 'number' && Number.isFinite(safeProfile.resumeScore)
      ? Math.min(Math.max(safeProfile.resumeScore, 0), 100)
      : 0
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (circumference * resumeScore) / 100

  // Calculate profile completion dynamically from actual profile fields
  const currentProfileData = {
    ...safeProfile,
    bio: studentBio,
    portfolioLink: portfolioLink,
  }
  const { percentage: completionPercentage, items: completionItems } =
    calculateProfileCompletion(currentProfileData)

  const handleOpenEditModal = () => {
    lastActiveElementRef.current = document.activeElement
    setFormError('')
    setIsEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setFormError('')
  }

  // Focus management, Escape key handling, and background scroll locking
  useEffect(() => {
    if (!isEditModalOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      // Escape (both "Escape" and legacy "Esc") closes the edit modal – required for accessibility
      if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault()
        handleCloseEditModal()
        return
      }

      if (e.key === 'Tab') {
        const modal = editModalRef.current
        if (!modal) return

        const focusable = Array.from(
          modal.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        )

        if (focusable.length === 0) {
          e.preventDefault()
          return
        }

        const firstElement = focusable[0]
        const lastElement = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement || !modal.contains(document.activeElement)) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement || !modal.contains(document.activeElement)) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    const focusTimer = setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 15)

    return () => {
      clearTimeout(focusTimer)
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)

      // Restore focus to opener element
      if (
        lastActiveElementRef.current &&
        typeof lastActiveElementRef.current.focus === 'function'
      ) {
        lastActiveElementRef.current.focus()
      }
    }
  }, [isEditModalOpen])

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setFormError('')

    const trimmedBio = studentBio.trim()
    const trimmedPortfolio = portfolioLink.trim()

    if (trimmedBio.length < 10) {
      setFormError('Candidate bio must be at least 10 characters in length.')
      return
    }

    if (!/^https?:\/\//i.test(trimmedPortfolio)) {
      setFormError('Portfolio URL must start with http:// or https://.')
      return
    }

    onUpdateProfile?.({
      bio: trimmedBio,
      portfolioLink: trimmedPortfolio,
    })

    handleCloseEditModal()
    setSaveToast(true)
    setTimeout(() => setSaveToast(false), 3500)
  }

  return (
    <section className="student-profile-view" aria-labelledby="profile-view-heading">
      {/* Toast Alert */}
      {saveToast && (
        <div
          className="fixed bottom-6 right-6 z-50 bg-[var(--surface-card)] border border-emerald-400/40 text-emerald-400 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold"
          role="status"
        >
          <span aria-hidden="true">✓</span> Profile bio & portfolio updated in local demonstration state.
        </div>
      )}

      {/* Header Bar */}
      <div className="view-header-bar mb-6 pb-5 border-b border-[var(--glass-border)] flex items-center justify-between flex-wrap gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--color-accent)] font-mono block mb-1">
            STUDENT CANDIDATE PROFILE (DEMO)
          </span>
          <h2 id="profile-view-heading" className="text-2xl font-extrabold text-[var(--text-primary)] tracking-[-0.02em]">
            Student Profile Summary
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Academic profile summary, candidate technical proficiencies, and simulated ATS readiness score.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleOpenEditModal}
          aria-label="Edit student profile information"
        >
          <span>Edit Profile Bio</span>
          <span aria-hidden="true">✎</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Academic Identity Card */}
        <div className="lg:col-span-2 space-y-6">
          <SpotlightCard className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--glass-border)]">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-accent)] to-[#4338CA] text-white flex items-center justify-center text-2xl font-extrabold shadow-[var(--shadow-accent)] border border-white/20">
                  {safeProfile.avatarInitials || 'SC'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">{safeProfile.name}</h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Roll No: <span className="font-mono text-[var(--text-primary)]">{safeProfile.rollNumber || 'DEMO-2027'}</span> • {safeProfile.batch}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="neutral" dot size="sm">
                      {safeProfile.eligibilityStatus}
                    </Badge>
                    <Badge variant="neutral" size="sm">Demonstration Record</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[var(--surface-glass)] border border-[var(--glass-border)] text-xs mb-6">
              <div>
                <span className="text-[var(--text-muted)] block mb-0.5">Academic Department</span>
                <strong className="text-[var(--text-primary)] font-semibold">{safeProfile.department}</strong>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block mb-0.5">Institution</span>
                <strong className="text-[var(--text-primary)] font-semibold">{safeProfile.institution}</strong>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block mb-0.5">Cumulative GPA</span>
                <strong className="text-[var(--color-accent)] font-mono text-sm font-bold">{safeProfile.cgpa}</strong>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block mb-0.5">Placement Eligibility Track</span>
                <strong className="text-[var(--color-accent)] font-semibold">{safeProfile.eligibilityStatus}</strong>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-[var(--text-muted)] block mb-2 uppercase tracking-wider">
                Candidate Bio & Objective
              </span>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed bg-[var(--surface-card)] p-3.5 rounded-xl border border-[var(--glass-border)]">
                {studentBio}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--glass-border)] flex items-center justify-between text-xs flex-wrap gap-2">
              <span className="text-[var(--text-muted)]">Public Portfolio (Sample):</span>
              <a
                href={portfolioLink}
                target="_blank"
                rel="noreferrer"
                className="text-[var(--color-accent)] font-mono hover:underline font-medium"
              >
                {portfolioLink} ↗
              </a>
            </div>
          </SpotlightCard>

          {/* Technical Skills & Proficiencies */}
          <SpotlightCard className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--glass-border)]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Technical Proficiencies (Self-Reported Sample)
              </h4>
              <Badge variant="primary" size="sm">{safeProfile.skills?.length || 0} Listed</Badge>
            </div>

            <p className="text-xs text-[var(--text-secondary)] mb-4">
              Technical proficiencies listed for prototype demonstration purposes.
            </p>

            <div className="flex flex-wrap gap-2">
              {(safeProfile.skills || []).map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-[var(--surface-glass)] border border-[var(--glass-border)] text-xs font-medium text-[var(--text-primary)] flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                  {skill}
                </span>
              ))}
            </div>
          </SpotlightCard>
        </div>

        {/* Right Column: Dynamic Profile Completion & Simulated ATS Score */}
        <div className="space-y-6">
          {/* Profile Completion Checklist (Calculated Dynamically) */}
          <SpotlightCard className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--glass-border)]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Profile Completion</h4>
              <span className="text-sm font-mono font-bold text-[var(--color-accent)]">
                {completionPercentage}%
              </span>
            </div>

            <div
              className="w-full h-2 bg-[var(--surface-glass)] rounded-full overflow-hidden border border-[var(--glass-border)] mb-4"
              role="progressbar"
              aria-valuenow={completionPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Profile completion percentage"
            >
              <div
                className="h-full bg-[var(--gradient-primary)] rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
              {completionItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={item.isComplete ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}
                      aria-hidden="true"
                    >
                      {item.isComplete ? '✓' : '○'}
                    </span>
                    <span className={item.isComplete ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}>
                      {item.label}
                    </span>
                  </div>
                  {item.detail && (
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">
                      {item.detail}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </SpotlightCard>

          {/* AI ATS & Readiness Meter (Simulated) */}
          <SpotlightCard className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--glass-border)] text-center">
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--color-accent)] font-mono block mb-1">
              AI ATS EVALUATION (SIMULATED)
            </span>
            <h4 className="text-base font-bold text-[var(--text-primary)] mb-4">
              ATS Readiness Score (Simulated)
            </h4>

            <div className="relative w-28 h-28 mx-auto flex items-center justify-center mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke="var(--glass-border)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke="var(--color-accent)"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-[var(--text-primary)] font-mono leading-none">
                  {resumeScore}
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">/100</span>
              </div>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Illustrative ATS score based on sample resume keyword density. Cohort comparison is not connected to a live benchmark database.
            </p>
          </SpotlightCard>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={handleCloseEditModal}
            role="presentation"
          >
            <div
              ref={editModalRef}
              className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
              role="dialog"
              aria-modal="true"
              aria-labelledby="edit-profile-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--glass-border)]">
                <div>
                  <h3 id="edit-profile-title" className="text-lg font-bold text-[var(--text-primary)]">
                    Edit Candidate Profile (Local Demonstration)
                  </h3>
                  <span className="text-[11px] text-[var(--text-muted)] block">
                    Modifies local prototype state only
                  </span>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="w-8 h-8 rounded-lg bg-[var(--surface-glass)] border border-[var(--glass-border)] flex items-center justify-center text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                  onClick={handleCloseEditModal}
                  aria-label="Close profile editor modal"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                {formError && (
                  <div
                    className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-medium"
                    role="alert"
                  >
                    {formError}
                  </div>
                )}

                <div>
                  <label htmlFor="bio-input" className="block text-xs font-semibold text-[var(--text-muted)] mb-1 uppercase tracking-wider">
                    Profile Bio / Summary
                  </label>
                  <textarea
                    id="bio-input"
                    rows={4}
                    className="w-full bg-[var(--surface-glass)] border border-[var(--glass-border)] rounded-xl p-3 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent-border)] leading-relaxed"
                    value={studentBio}
                    onChange={(e) => setStudentBio(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="portfolio-input" className="block text-xs font-semibold text-[var(--text-muted)] mb-1 uppercase tracking-wider">
                    GitHub or Public Portfolio URL
                  </label>
                  <input
                    id="portfolio-input"
                    type="url"
                    className="w-full h-10 bg-[var(--surface-glass)] border border-[var(--glass-border)] rounded-xl px-3 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-accent-border)] font-mono"
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    required
                  />
                </div>

                <div className="p-3 rounded-xl bg-[var(--surface-glass)] border border-[var(--glass-border)] text-xs text-[var(--text-muted)]">
                  <span className="text-[var(--color-accent)] font-semibold">Notice:</span> Profile updates modify local demonstration state only. No data is stored on a server or transmitted to an external service.
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--glass-border)]">
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={handleCloseEditModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                  >
                    Save Changes (Demo)
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </section>
  )
}
