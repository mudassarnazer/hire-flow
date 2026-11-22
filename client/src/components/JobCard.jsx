import SpotlightCard from './glass/SpotlightCard'
import Button from './common/Button'
import './JobCard.css'

const CARD_CLASSES =
  'job-card p-[25px] rounded-[20px] transition-all duration-[350ms] ease-out hover:-translate-y-2.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 flex flex-col justify-between'

function JobCard({ title, company, location, type, salary, skills }) {
  return (
    <SpotlightCard as="article" className={CARD_CLASSES}>
      <div>
        <div className="job-card-top flex items-center justify-between mb-5">
          <div className="company-icon w-12 h-12 grid place-items-center rounded-[14px] bg-gradient-to-br from-[var(--color-accent)] to-[#4338CA] text-white text-[19px] font-extrabold shadow-[var(--shadow-accent)] border border-white/20">
            {company.charAt(0)}
          </div>

          <span className="job-type py-1 px-3 rounded-full bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border border-[var(--color-accent-border)] text-[11px] font-semibold tracking-wide">
            {type}
          </span>
        </div>

        <h3 className="job-title text-[18px] font-bold text-[var(--text-primary)] mb-1.5 leading-snug">
          {title}
        </h3>

        <p className="company-name text-[var(--text-secondary)] text-sm font-medium mb-4">
          {company}
        </p>

        <div className="job-details flex flex-wrap gap-3.5 my-3.5 text-xs text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5 bg-[var(--surface-card)] px-2.5 py-1 rounded-lg border border-[var(--glass-border)]">
            <span aria-hidden="true">📍</span> {location}
          </span>
          <span className="flex items-center gap-1.5 bg-[var(--surface-card)] px-2.5 py-1 rounded-lg border border-[var(--glass-border)] tabular-nums font-mono-tech">
            <span aria-hidden="true">💰</span> {salary}
          </span>
        </div>

        <div className="job-skills flex flex-wrap gap-2 mb-6">
          {skills.map((skill) => (
            <span
              key={skill}
              className="py-1 px-2.5 border border-[var(--glass-border)] bg-[var(--surface-card)] rounded-lg text-[var(--text-secondary)] text-[11px] font-medium transition-colors hover:border-[var(--color-accent-border)] hover:text-[var(--text-primary)]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <Button
        variant="secondary"
        size="md"
        className="w-full justify-center group"
        aria-label={`View opportunity for ${title} at ${company}`}
        type="button"
      >
        <span>View Opportunity</span>
        <span
          className="transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </Button>
    </SpotlightCard>
  )
}

export default JobCard
