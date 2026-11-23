/**
 * SavedOpportunitiesView Component
 * Saved / Bookmarked Placement Drives View
 * Developer Attribution: MUDASSAR NAZER
 */

import JobCard from '../JobCard'
import Button from '../common/Button'

export default function SavedOpportunitiesView({
  jobs = [],
  savedJobIds = new Set(),
  searchQuery = '',
  onToggleSaveJob,
  onNavigateToBrowse,
  onViewJobDetails,
}) {
  const normalizedQuery = (searchQuery || '').trim().toLowerCase()

  const allSavedJobs = jobs.filter((job) => savedJobIds.has(job.id))

  const filteredSavedJobs = allSavedJobs.filter((job) => {
    if (!normalizedQuery) return true
    const matchesTitle = (job.title || '').toLowerCase().includes(normalizedQuery)
    const matchesCompany = (job.company || '').toLowerCase().includes(normalizedQuery)
    const matchesLocation = (job.location || '').toLowerCase().includes(normalizedQuery)
    const matchesSkills =
      Array.isArray(job.skills) &&
      job.skills.some((s) => s.toLowerCase().includes(normalizedQuery))
    return matchesTitle || matchesCompany || matchesLocation || matchesSkills
  })

  return (
    <section className="saved-opportunities-view" aria-labelledby="saved-drives-heading">
      <div className="view-header-bar mb-6 pb-5 border-b border-[var(--glass-border)] flex items-center justify-between flex-wrap gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--color-accent)] font-mono block mb-1">
            SAVED DRIVES (DEMO SHORTLIST)
          </span>
          <h2 id="saved-drives-heading" className="text-2xl font-extrabold text-[var(--text-primary)] tracking-[-0.02em]">
            Saved Opportunities
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Review and track sample placement opportunities bookmarked for later simulated application.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--surface-card)] text-[var(--text-secondary)] border border-[var(--glass-border)]">
          {allSavedJobs.length} {allSavedJobs.length === 1 ? 'Drive Bookmarked' : 'Drives Bookmarked'}
        </span>
      </div>

      {allSavedJobs.length === 0 ? (
        <div className="text-center py-20 bg-[var(--surface-card)] rounded-2xl border border-[var(--glass-border)] px-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--surface-glass)] border border-[var(--glass-border)] flex items-center justify-center text-3xl mx-auto mb-4">
            🔖
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">No saved opportunities yet</h3>
          <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto mt-1 mb-6">
            Bookmark interesting sample placement drives while browsing to easily compare compensation,
            interview requirements, and role details.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={onNavigateToBrowse}
            aria-label="Browse opportunities catalog"
          >
            <span>Browse Sample Drives</span>
            <span aria-hidden="true">→</span>
          </Button>
        </div>
      ) : filteredSavedJobs.length === 0 ? (
        <div className="text-center py-16 bg-[var(--surface-card)] rounded-2xl border border-[var(--glass-border)] px-4">
          <span className="text-3xl block mb-2" aria-hidden="true">🔍</span>
          <h3 className="text-base font-bold text-[var(--text-primary)]">No matching saved opportunities</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            No bookmarked opportunities match &ldquo;{searchQuery}&rdquo;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSavedJobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              type={job.type}
              salary={job.salary}
              skills={job.skills}
              isSaved={true}
              onToggleSave={() => onToggleSaveJob?.(job.id)}
              onViewDetails={onViewJobDetails ? () => onViewJobDetails(job) : onNavigateToBrowse}
            />
          ))}
        </div>
      )}
    </section>
  )
}
