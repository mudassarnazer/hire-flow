import './Button.css'

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
  const buttonClass = `hireflow-btn hireflow-btn--${variant} hireflow-btn--${size} ${className}`.trim()

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className="hireflow-btn__icon">{icon}</span>}
      <span className="hireflow-btn__text">{children}</span>
    </button>
  )
}

export default Button
