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
          <div className="company-icon w-12 h-12 grid place-items-center rounded-[14px] bg-gradient-to-br from-sky-400 to-indigo-600 text-white text-[19px] font-extrabold shadow-[0_6px_20px_rgba(56,189,248,0.25)] border border-white/20">
            {company.charAt(0)}
          </div>

          <span className="job-type py-1 px-3 rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/25 text-[11px] font-semibold tracking-wide">
            {type}
          </span>
        </div>

        <h3 className="job-title text-[18px] font-bold text-[#f8fafc] mb-1.5 leading-snug">
          {title}
        </h3>

        <p className="company-name text-[#94a3b8] text-sm font-medium mb-4">
          {company}
        </p>

        <div className="job-details flex flex-wrap gap-3.5 my-3.5 text-xs text-[#cbd5e1]">
          <span className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/8">
            <span aria-hidden="true">📍</span> {location}
          </span>
          <span className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1 rounded-lg border border-white/8 tabular-nums font-mono-tech">
            <span aria-hidden="true">💰</span> {salary}
          </span>
        </div>

        <div className="job-skills flex flex-wrap gap-2 mb-6">
          {skills.map((skill) => (
            <span
              key={skill}
              className="py-1 px-2.5 border border-white/10 bg-white/[0.04] rounded-lg text-[#cbd5e1] text-[11px] font-medium"
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
