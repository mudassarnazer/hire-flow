import './Badge.css'

function Badge({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
  icon = null,
}) {
  const badgeClass = `hireflow-badge hireflow-badge--${variant} hireflow-badge--${size} ${className}`.trim()

  return (
    <span className={badgeClass}>
      {dot && <span className="hireflow-badge__dot" />}
      {icon && <span className="hireflow-badge__icon">{icon}</span>}
      <span className="hireflow-badge__text">{children}</span>
    </span>
  )
}

export default Badge
