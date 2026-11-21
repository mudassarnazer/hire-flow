const BASE_CLASSES =
  'hireflow-badge inline-flex items-center gap-1.5 font-semibold rounded-full border leading-none w-fit whitespace-nowrap select-none backdrop-blur-[12px] transition-colors duration-200 motion-reduce:transition-none'

const SIZE_CLASSES = {
  sm: 'hireflow-badge--sm py-1 px-2.5 text-[11px]',
  md: 'hireflow-badge--md py-1.5 px-3 text-xs',
  lg: 'hireflow-badge--lg py-2 px-3.5 text-sm',
}

const VARIANT_CLASSES = {
  primary:
    'hireflow-badge--primary bg-[var(--badge-primary-bg)] text-[var(--badge-primary-text)] border-[var(--badge-primary-border)] shadow-[var(--badge-primary-shadow)]',
  accent:
    'hireflow-badge--accent bg-[var(--badge-accent-bg)] text-[var(--badge-accent-text)] border-[var(--badge-accent-border)] shadow-[var(--badge-accent-shadow)]',
  success:
    'hireflow-badge--success bg-[var(--badge-success-bg)] text-[var(--badge-success-text)] border-[var(--badge-success-border)] shadow-[var(--badge-success-shadow)]',
  warning:
    'hireflow-badge--warning bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)] border-[var(--badge-warning-border)] shadow-[var(--badge-warning-shadow)]',
  neutral:
    'hireflow-badge--neutral bg-[var(--badge-neutral-bg)] text-[var(--badge-neutral-text)] border-[var(--badge-neutral-border)] shadow-[var(--badge-neutral-shadow)]',
  hero:
    'hireflow-badge--hero bg-[var(--badge-hero-bg)] text-[var(--badge-hero-text)] border-[var(--badge-hero-border)] py-2 px-4 text-[13px] shadow-[var(--badge-hero-shadow)]',
  gradient:
    'hireflow-badge--gradient bg-[image:var(--gradient-primary)] text-[var(--color-accent-ink)] border-transparent shadow-[var(--shadow-accent)]',
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
          className="hireflow-badge__dot w-1.5 h-1.5 rounded-full bg-current shrink-0 shadow-[0_0_6px_currentColor]"
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
