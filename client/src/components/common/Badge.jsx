const BASE_CLASSES =
  'hireflow-badge inline-flex items-center gap-1.5 font-semibold rounded-full border leading-none w-fit whitespace-nowrap select-none backdrop-blur-[12px] transition-colors duration-200 motion-reduce:transition-none'

const SIZE_CLASSES = {
  sm: 'hireflow-badge--sm py-1 px-2.5 text-[11px]',
  md: 'hireflow-badge--md py-1.5 px-3 text-xs',
  lg: 'hireflow-badge--lg py-2 px-3.5 text-sm',
}

const VARIANT_CLASSES = {
  primary:
    'hireflow-badge--primary bg-sky-500/10 text-sky-300 border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.08)]',
  accent:
    'hireflow-badge--accent bg-cyan-500/10 text-cyan-300 border-cyan-400/35 shadow-[0_0_12px_rgba(34,211,238,0.08)]',
  success:
    'hireflow-badge--success bg-emerald-500/12 text-emerald-300 border-emerald-400/35 shadow-[0_0_12px_rgba(52,211,153,0.08)]',
  warning:
    'hireflow-badge--warning bg-amber-500/12 text-amber-300 border-amber-400/35 shadow-[0_0_12px_rgba(251,191,36,0.08)]',
  neutral:
    'hireflow-badge--neutral bg-slate-500/10 text-slate-300 border-white/12',
  hero:
    'hireflow-badge--hero bg-violet-500/12 text-violet-200 border-violet-400/30 py-2 px-4 text-[13px] shadow-[0_0_16px_rgba(139,92,246,0.12)]',
  gradient:
    'hireflow-badge--gradient bg-gradient-to-r from-sky-400 to-indigo-500 text-white border-transparent shadow-[0_4px_14px_rgba(56,189,248,0.25)]',
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
