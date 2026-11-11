const CARD_CLASSES =
  'p-[25px] rounded-[18px] bg-[var(--color-card)] border border-[var(--color-border)] transition-all duration-[350ms] ease-out hover:-translate-y-2 hover:border-[rgba(139,92,246,0.6)] hover:shadow-[0_20px_45px_rgba(99,102,241,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0'

const TOP_CLASSES = 'flex items-center justify-between mb-[25px]'

const ICON_CLASSES =
  'w-12 h-12 grid place-items-center rounded-[13px] bg-[image:var(--gradient-primary)] text-white text-[20px] font-extrabold'

const TYPE_CLASSES =
  'py-[7px] px-3 rounded-[20px] bg-[rgba(99,102,241,0.13)] text-[#a5b4fc] text-[11px]'

const TITLE_CLASSES = 'text-[19px] mb-[9px]'

const COMPANY_CLASSES = 'text-[var(--color-muted)] text-sm'

const DETAILS_CLASSES =
  'flex flex-wrap gap-[15px] my-[22px] text-[var(--color-muted)] text-xs'

const SKILLS_CONTAINER_CLASSES = 'flex flex-wrap gap-2 mb-[25px]'

const SKILL_TAG_CLASSES =
  'py-[7px] px-[11px] border border-[var(--color-border)] rounded-lg text-[#cbd5e1] text-[11px]'

const APPLY_BTN_CLASSES =
  'w-full p-3 border-none rounded-[10px] bg-[rgba(99,102,241,0.14)] text-white font-semibold cursor-pointer transition-all duration-300 ease-out hover:bg-[image:var(--gradient-primary)] hover:-translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hf-primary focus-visible:ring-offset-2 focus-visible:ring-offset-hf-bg motion-reduce:transition-none motion-reduce:hover:translate-y-0'

function JobCard({ title, company, location, type, salary, skills }) {
  return (
    <article className={CARD_CLASSES}>
      <div className={TOP_CLASSES}>
        <div className={ICON_CLASSES}>
          {company.charAt(0)}
        </div>

        <span className={TYPE_CLASSES}>{type}</span>
      </div>

      <h3 className={TITLE_CLASSES}>{title}</h3>

      <p className={COMPANY_CLASSES}>{company}</p>

      <div className={DETAILS_CLASSES}>
        <span>📍 {location}</span>
        <span>💰 {salary}</span>
      </div>

      <div className={SKILLS_CONTAINER_CLASSES}>
        {skills.map((skill) => (
          <span className={SKILL_TAG_CLASSES} key={skill}>{skill}</span>
        ))}
      </div>

      <button className={APPLY_BTN_CLASSES}>
        View Opportunity →
      </button>
    </article>
  )
}

export default JobCard