const BASE_CLASSES =
  'hireflow-stat-card relative overflow-hidden flex flex-col justify-between gap-[14px] p-[22px] rounded-[16px] bg-[var(--color-card)] border border-[var(--color-border)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[rgba(139,92,246,0.4)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 before:content-[\'\'] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-transparent before:transition-all before:duration-300 before:ease-out motion-reduce:before:transition-none'

const ACCENT_CLASSES = {
  primary:
    'hireflow-stat-card--primary hover:before:bg-[image:var(--gradient-primary)]',
  accent:
    'hireflow-stat-card--accent hover:before:bg-[var(--color-accent)]',
  success:
    'hireflow-stat-card--success hover:before:bg-[#22c55e]',
  warning:
    'hireflow-stat-card--warning hover:before:bg-[#f59e0b]',
}

function StatCard({
  value,
  label,
  icon = null,
  trend = null,
  accent = 'primary',
  className = '',
  ...rest
}) {
  const accentClass = ACCENT_CLASSES[accent] || ACCENT_CLASSES.primary
  const cardClass = `${BASE_CLASSES} ${accentClass} ${className}`.trim()

  return (
    <div className={cardClass} {...rest}>
      <div className="hireflow-stat-card__top flex items-center justify-between gap-[10px]">
        {icon && (
          <div className="hireflow-stat-card__icon w-10 h-10 grid place-items-center rounded-[10px] bg-[rgba(99,102,241,0.12)] border border-[rgba(99,102,241,0.2)] text-[18px] text-[#c4b5fd]">
            {icon}
          </div>
        )}
        {trend && (
          <span className="hireflow-stat-card__trend py-1 px-2 rounded-[12px] text-[11px] font-semibold text-[#38bdf8] bg-[rgba(56,189,248,0.1)] border border-[rgba(56,189,248,0.2)]">
            {trend}
          </span>
        )}
      </div>

      <div className="hireflow-stat-card__body flex flex-col gap-1">
        <h3 className="hireflow-stat-card__value text-[28px] font-extrabold tracking-[-0.5px] text-[var(--color-text)] leading-[1.1]">
          {value}
        </h3>
        <p className="hireflow-stat-card__label text-[13px] text-[var(--color-muted)] font-medium">
          {label}
        </p>
      </div>
    </div>
  )
}

export default StatCard
