const BASE_CLASSES =
  'hireflow-badge inline-flex items-center gap-1.5 font-semibold rounded-full border border-transparent leading-none w-fit whitespace-nowrap select-none transition-colors duration-200 motion-reduce:transition-none'

const SIZE_CLASSES = {
  sm: 'hireflow-badge--sm py-1 px-[9px] text-[11px]',
  md: 'hireflow-badge--md py-1.5 px-3 text-xs',
  lg: 'hireflow-badge--lg py-2 px-3.5 text-sm',
}

const VARIANT_CLASSES = {
  primary:
    'hireflow-badge--primary bg-[rgba(99,102,241,0.14)] text-[#a5b4fc] border-[rgba(99,102,241,0.28)]',
  accent:
    'hireflow-badge--accent bg-[rgba(34,211,238,0.12)] text-[#22d3ee] border-[rgba(34,211,238,0.3)]',
  success:
    'hireflow-badge--success bg-[rgba(34,197,94,0.12)] text-[#4ade80] border-[rgba(34,197,94,0.32)]',
  warning:
    'hireflow-badge--warning bg-[rgba(245,158,11,0.12)] text-[#fbbf24] border-[rgba(245,158,11,0.32)]',
  neutral:
    'hireflow-badge--neutral bg-[rgba(148,163,184,0.08)] text-[#cbd5e1] border-[var(--color-border)]',
  hero:
    'hireflow-badge--hero bg-[rgba(139,92,246,0.12)] text-[#c4b5fd] border-[rgba(139,92,246,0.35)] py-2 px-4 rounded-[30px] text-[13px]',
  gradient:
    'hireflow-badge--gradient bg-[image:var(--gradient-primary)] text-white border-transparent',
}

function Badge({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
  icon = null,
  ...rest
}) {
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md
  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary
  const badgeClass = `${BASE_CLASSES} ${sizeClass} ${variantClass} ${className}`.trim()

  return (
    <span className={badgeClass} {...rest}>
      {dot && (
        <span
          className="hireflow-badge__dot w-1.5 h-1.5 rounded-full bg-current shrink-0"
          aria-hidden="true"
        />
      )}
      {icon && (
        <span
          className="hireflow-badge__icon inline-flex items-center shrink-0"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span className="hireflow-badge__text">{children}</span>
    </span>
  )
}

export default Badge
