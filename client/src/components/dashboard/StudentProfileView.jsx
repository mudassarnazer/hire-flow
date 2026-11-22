/**
 * StudentProfileView Component
 * Comprehensive Student Academic Identity, Verified Skills, Completion Meter & ATS Score
 * Developer Attribution: MUDASSAR NAZER
 */

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Badge from '../common/Badge'
import Button from '../common/Button'
import SpotlightCard from '../glass/SpotlightCard'

export default function StudentProfileView({ profile }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [studentBio, setStudentBio] = useState(
    'Final-year Computer Science undergraduate at NIT focusing on distributed systems and full-stack web engineering. Seeking 2027 software engineering internship and full-time roles.'
  )
  const [portfolioLink, setPortfolioLink] = useState('https://github.com/priyasharma')
  const [saveToast, setSaveToast] = useState(false)

  const editModalRef = useRef(null)
  const closeBtnRef = useRef(null)

  // SVG Circular Gauge calculation for ATS resume score (92)
  const resumeScore = profile?.resumeScore || 92
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (circumference * resumeScore) / 100

  // Focus management and Escape key handling
  useEffect(() => {
    if (!isEditModalOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsEditModalOpen(false)
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    closeBtnRef.current?.focus()

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isEditModalOpen])

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setIsEditModalOpen(false)
    setSaveToast(true)
    setTimeout(() => setSaveToast(false), 3500)
  }

  if (!profile) return null

  return (
    <section className="student-profile-view" aria-labelledby="profile-view-heading">
      {/* Toast Alert */}
      {saveToast && (
        <div
          className="fixed bottom-6 right-6 z-50 bg-[var(--surface-card)] border border-emerald-400/40 text-emerald-400 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-bounce"
          role="status"
        >
          <span aria-hidden="true">✓</span> Profile bio & portfolio updated (Demonstration State).
        </div>
      )}

      {/* Header Bar */}
      <div className="view-header-bar mb-6 pb-5 border-b border-[var(--glass-border)] flex items-center justify-between flex-wrap gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--color-accent)] font-mono block mb-1">
            INSTITUTIONAL RECORD & VERIFICATION
          </span>
          <h2 id="profile-view-heading" className="text-2xl font-extrabold text-[var(--text-primary)] tracking-[-0.02em]">
            Student Profile Summary
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Verified academic credentials, technical skills index, and placement readiness score.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsEditModalOpen(true)}
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
                  {profile.avatarInitials}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">{profile.name}</h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Roll No: <span className="font-mono text-[var(--text-primary)]">{profile.rollNumber}</span> • {profile.batch}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="success" dot size="sm">
                      {profile.eligibilityStatus}
                    </Badge>
                    <Badge variant="neutral" size="sm">Verified Academic Record</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[var(--surface-glass)] border border-[var(--glass-border)] text-xs mb-6">
              <div>
                <span className="text-[var(--text-muted)] block mb-0.5">Academic Department</span>
                <strong className="text-[var(--text-primary)] font-semibold">{profile.department}</strong>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block mb-0.5">Institution</span>
                <strong className="text-[var(--text-primary)] font-semibold">{profile.institution}</strong>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block mb-0.5">Cumulative GPA</span>
                <strong className="text-[var(--color-accent)] font-mono text-sm font-bold">{profile.cgpa}</strong>
              </div>
              <div>
                <span className="text-[var(--text-muted)] block mb-0.5">Recruitment Eligibility</span>
                <strong className="text-emerald-400 font-semibold">Tier-1 Cleared (Zero Backlogs)</strong>
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

            <div className="mt-4 pt-4 border-t border-[var(--glass-border)] flex items-center justify-between text-xs">
              <span className="text-[var(--text-muted)]">Public Portfolio:</span>
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
                Verified Technical Proficiencies
              </h4>
              <Badge variant="primary" size="sm">{profile.skills.length} Indexed</Badge>
            </div>

            <p className="text-xs text-[var(--text-secondary)] mb-4">
              Skills verified via campus coding evaluations and academic coursework.
            </p>

            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-[var(--surface-glass)] border border-[var(--glass-border)] text-xs font-medium text-[var(--text-primary)] flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                  {skill}
                </span>
              ))}
              <span className="px-3 py-1.5 rounded-lg bg-[var(--surface-glass)] border border-[var(--glass-border)] text-xs font-medium text-[var(--text-primary)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Data Structures
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[var(--surface-glass)] border border-[var(--glass-border)] text-xs font-medium text-[var(--text-primary)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                System Design
              </span>
            </div>
          </SpotlightCard>
        </div>

        {/* Right Column: Profile Completion & ATS Score Gauge */}
        <div className="space-y-6">
          {/* Profile Completion Checklist */}
          <SpotlightCard className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--glass-border)]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Profile Completion</h4>
              <span className="text-sm font-mono font-bold text-[var(--color-accent)]">85%</span>
            </div>

            <div className="w-full h-2 bg-[var(--surface-glass)] rounded-full overflow-hidden border border-[var(--glass-border)] mb-4">
              <div className="h-full bg-[var(--gradient-primary)] rounded-full" style={{ width: '85%' }} />
            </div>

            <ul className="space-y-2.5 text-xs text-[var(--text-secondary)]">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Academic Record & CGPA Indexed</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Placement Tier Eligibility Confirmed</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Primary Technical Skills (6) Verified</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Standard Placement Resume Uploaded</span>
              </li>
              <li className="flex items-center gap-2 text-[var(--text-muted)]">
                <span className="text-amber-400 font-bold">○</span>
                <span>Personal GitHub/Portfolio Link Added</span>
              </li>
            </ul>
          </SpotlightCard>

          {/* AI ATS & Readiness Meter */}
          <SpotlightCard className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--glass-border)] text-center">
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--color-accent)] font-mono block mb-1">
              AI PLACEMENT EVALUATION
            </span>
            <h4 className="text-base font-bold text-[var(--text-primary)] mb-4">
              ATS Readiness Score
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
              Your resume format and keyword density rank in the top quartile of the Class of 2027 cohort.
            </p>
          </SpotlightCard>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsEditModalOpen(false)}
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
                <h3 id="edit-profile-title" className="text-lg font-bold text-[var(--text-primary)]">
                  Edit Candidate Profile
                </h3>
                <button
                  ref={closeBtnRef}
                  type="button"
                  className="w-8 h-8 rounded-lg bg-[var(--surface-glass)] border border-[var(--glass-border)] flex items-center justify-center text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                  onClick={() => setIsEditModalOpen(false)}
                  aria-label="Close profile editor modal"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
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
                  <span className="text-[var(--color-accent)] font-semibold">Note:</span> Academic records (CGPA, Coursework, Roll Number) are managed by institutional registrar records and cannot be edited in client demonstration mode.
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--glass-border)]">
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    type="submit"
                  >
                    Save Changes
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
