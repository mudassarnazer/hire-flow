const BASE_CLASSES =
  'hireflow-btn inline-flex items-center justify-center gap-2 font-semibold border border-transparent cursor-pointer whitespace-nowrap select-none transition-all duration-[250ms] ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hf-primary focus-visible:ring-offset-2 focus-visible:ring-offset-hf-bg motion-reduce:transition-none motion-reduce:hover:translate-y-0'

const SIZE_CLASSES = {
  sm: 'hireflow-btn--sm py-2 px-3.5 text-xs rounded-lg',
  md: 'hireflow-btn--md py-[11px] px-[22px] text-sm rounded-[10px]',
  lg: 'hireflow-btn--lg py-[15px] px-7 text-[15px] font-bold rounded-xl',
}

const VARIANT_CLASSES = {
  primary:
    'hireflow-btn--primary bg-[image:var(--gradient-primary)] text-white shadow-[0_8px_25px_rgba(99,102,241,0.25)] hover:-translate-y-[2px] hover:shadow-[0_12px_30px_rgba(99,102,241,0.4)]',
  secondary:
    'hireflow-btn--secondary bg-white/[0.04] text-hf-text border-[var(--color-border)] hover:bg-[rgba(139,92,246,0.15)] hover:border-[rgba(139,92,246,0.5)] hover:-translate-y-[2px]',
  outline:
    'hireflow-btn--outline bg-[rgba(99,102,241,0.1)] text-hf-text border-[rgba(139,92,246,0.45)] hover:bg-[image:var(--gradient-primary)] hover:border-transparent hover:text-white hover:-translate-y-[2px] hover:shadow-[0_8px_25px_rgba(99,102,241,0.3)]',
  ghost:
    'hireflow-btn--ghost bg-transparent text-hf-muted hover:text-hf-text hover:bg-white/[0.05]',
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon = null,
  ...rest
}) {
  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md
  const buttonClass = `${BASE_CLASSES} ${variantClass} ${sizeClass} ${className}`.trim()

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {icon && (
        <span className="hireflow-btn__icon inline-flex items-center text-[1.1em]">
          {icon}
        </span>
      )}
      <span className="hireflow-btn__text">{children}</span>
    </button>
  )
}

export default Button
