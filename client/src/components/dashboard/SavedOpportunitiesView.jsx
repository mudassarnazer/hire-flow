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
  onToggleSaveJob,
  onNavigateToBrowse,
}) {
  const savedJobs = jobs.filter((job) => savedJobIds.has(job.id))

  return (
    <section className="saved-opportunities-view" aria-labelledby="saved-drives-heading">
      <div className="view-header-bar mb-6 pb-5 border-b border-[var(--glass-border)] flex items-center justify-between flex-wrap gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--color-accent)] font-mono block mb-1">
            PERSONAL RECRUITMENT SHORTLIST
          </span>
          <h2 id="saved-drives-heading" className="text-2xl font-extrabold text-[var(--text-primary)] tracking-[-0.02em]">
            Saved Opportunities
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Review and track placement drives bookmarked for later application and review.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--surface-card)] text-[var(--text-secondary)] border border-[var(--glass-border)]">
          {savedJobs.length} {savedJobs.length === 1 ? 'Drive Saved' : 'Drives Saved'}
        </span>
      </div>

      {savedJobs.length === 0 ? (
        <div className="text-center py-20 bg-[var(--surface-card)] rounded-2xl border border-[var(--glass-border)] px-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--surface-glass)] border border-[var(--glass-border)] flex items-center justify-center text-3xl mx-auto mb-4">
            🔖
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">No saved opportunities yet</h3>
          <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto mt-1 mb-6">
            Bookmark interesting placement drives while browsing to easily compare compensation,
            interview requirements, and deadlines.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={onNavigateToBrowse}
            aria-label="Browse opportunities catalog"
          >
            <span>Browse Placement Drives</span>
            <span aria-hidden="true">→</span>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map((job) => (
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
            />
          ))}
        </div>
      )}
    </section>
  )
}
