/**
 * BrowseOpportunitiesView Component
 * Placement Drives Catalog with Category Filters, Search, Bookmarks, and Detail Modal
 * Developer Attribution: MUDASSAR NAZER
 */

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import JobCard from '../JobCard'
import Badge from '../common/Badge'
import Button from '../common/Button'

export default function BrowseOpportunitiesView({
  jobs = [],
  savedJobIds = new Set(),
  onToggleSaveJob,
  onApplyJob,
}) {
  const [filterType, setFilterType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedJob, setSelectedJob] = useState(null)
  const [appliedStatus, setAppliedStatus] = useState({}) // { [jobId]: true }

  const modalRef = useRef(null)
  const closeBtnRef = useRef(null)

  // Filter jobs by category and search query
  const filteredJobs = jobs.filter((job) => {
    const matchesType = filterType === 'all' || job.type === filterType
    if (!matchesType) return false

    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    const matchesTitle = job.title.toLowerCase().includes(q)
    const matchesCompany = job.company.toLowerCase().includes(q)
    const matchesLocation = job.location.toLowerCase().includes(q)
    const matchesSkills = job.skills.some((s) => s.toLowerCase().includes(q))
    return matchesTitle || matchesCompany || matchesLocation || matchesSkills
  })

  // Modal accessibility: focus trap & Escape handling
  useEffect(() => {
    if (!selectedJob) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedJob(null)
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
  }, [selectedJob])

  const handleApply = (jobId) => {
    setAppliedStatus((prev) => ({ ...prev, [jobId]: true }))
    onApplyJob?.(jobId)
  }

  return (
    <section className="browse-opportunities-view" aria-labelledby="browse-drives-heading">
      {/* View Header with Filters */}
      <div className="view-header-bar flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b border-[var(--glass-border)]">
        <div>
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--color-accent)] font-mono block mb-1">
            CORPORATE PLACEMENT DRIVES
          </span>
          <h2 id="browse-drives-heading" className="text-2xl font-extrabold text-[var(--text-primary)] tracking-[-0.02em]">
            Browse Opportunities
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Explore verified placement drives with transparent compensation and direct eligibility pre-checks.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 bg-[var(--surface-card)] p-1 rounded-full border border-[var(--glass-border)]">
          <button
            type="button"
            className={`py-1.5 px-4 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              filterType === 'all'
                ? 'bg-[var(--color-accent)] text-[var(--color-accent-ink)] shadow-[var(--shadow-accent)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            onClick={() => setFilterType('all')}
          >
            All Drives ({jobs.length})
          </button>
          <button
            type="button"
            className={`py-1.5 px-4 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              filterType === 'Internship'
                ? 'bg-[var(--color-accent)] text-[var(--color-accent-ink)] shadow-[var(--shadow-accent)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            onClick={() => setFilterType('Internship')}
          >
            Internships ({jobs.filter((j) => j.type === 'Internship').length})
          </button>
          <button
            type="button"
            className={`py-1.5 px-4 rounded-full text-xs font-semibold cursor-pointer transition-all ${
              filterType === 'Full-time'
                ? 'bg-[var(--color-accent)] text-[var(--color-accent-ink)] shadow-[var(--shadow-accent)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            onClick={() => setFilterType('Full-time')}
          >
            Full-Time ({jobs.filter((j) => j.type === 'Full-time').length})
          </button>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          className="w-full h-11 bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-xl px-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--color-accent-border)] focus:shadow-[0_0_16px_var(--color-accent-subtle)]"
          placeholder="Filter by role title, company name, skills, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Filter opportunities by role, company, skills, or location"
        />
        {searchQuery && (
          <button
            type="button"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            onClick={() => setSearchQuery('')}
            aria-label="Clear opportunity search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Job Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-16 bg-[var(--surface-card)] rounded-2xl border border-[var(--glass-border)]">
          <span className="text-3xl block mb-2" aria-hidden="true">🔍</span>
          <h3 className="text-base font-bold text-[var(--text-primary)]">No matching placement drives</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Try adjusting your search criteria or reset filters to view all drives.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setFilterType('all')
              setSearchQuery('')
            }}
            className="mt-4"
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              type={job.type}
              salary={job.salary}
              skills={job.skills}
              isSaved={savedJobIds.has(job.id)}
              onToggleSave={() => onToggleSaveJob?.(job.id)}
              onViewDetails={() => setSelectedJob(job)}
            />
          ))}
        </div>
      )}

      {/* Opportunity Detail & Application Modal */}
      {selectedJob &&
        createPortal(
          <div
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedJob(null)}
            role="presentation"
          >
            <div
              ref={modalRef}
              className="bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-2xl max-w-xl w-full p-6 shadow-2xl relative"
              role="dialog"
              aria-modal="true"
              aria-labelledby="job-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-[var(--glass-border)]">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[#4338CA] text-white flex items-center justify-center text-lg font-bold">
                    {selectedJob.company.charAt(0)}
                  </div>
                  <div>
                    <h3 id="job-modal-title" className="text-lg font-bold text-[var(--text-primary)]">
                      {selectedJob.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {selectedJob.company} • 📍 {selectedJob.location} • <span className="text-[var(--color-accent)] font-mono font-medium">{selectedJob.salary}</span>
                    </p>
                  </div>
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  className="w-8 h-8 rounded-lg bg-[var(--surface-glass)] border border-[var(--glass-border)] flex items-center justify-center text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                  onClick={() => setSelectedJob(null)}
                  aria-label="Close job details modal"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <span className="text-xs font-semibold text-[var(--text-muted)] block mb-1 uppercase tracking-wider">
                    Role Overview
                  </span>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Join {selectedJob.company} as a {selectedJob.title}. In this role, you will work with
                    engineering leads to design and deploy scalable applications, participate in code reviews,
                    and contribute to live production services.
                  </p>
                </div>

                <div>
                  <span className="text-xs font-semibold text-[var(--text-muted)] block mb-1 uppercase tracking-wider">
                    Required Technical Proficiencies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.skills.map((skill) => (
                      <Badge key={skill} variant="primary" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[var(--surface-glass)] border border-[var(--glass-border)] text-xs">
                  <div>
                    <span className="text-[var(--text-muted)] block">Employment Type</span>
                    <strong className="text-[var(--text-primary)] font-semibold">{selectedJob.type}</strong>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block">Eligibility Pre-Check</span>
                    <strong className="text-emerald-400 font-semibold">Tier-1 Eligible ✓</strong>
                  </div>
                </div>

                {appliedStatus[selectedJob.id] && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                    <span aria-hidden="true">✓</span> Sample Application Submitted Successfully (Demonstration State).
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-[var(--glass-border)]">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onToggleSaveJob?.(selectedJob.id)}
                >
                  {savedJobIds.has(selectedJob.id) ? '★ Bookmarked' : '☆ Bookmark Role'}
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedJob(null)}
                  >
                    Close
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    disabled={Boolean(appliedStatus[selectedJob.id])}
                    onClick={() => handleApply(selectedJob.id)}
                  >
                    {appliedStatus[selectedJob.id] ? 'Applied' : 'Submit Application →'}
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  )
}
