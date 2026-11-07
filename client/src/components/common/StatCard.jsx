import './StatCard.css'

function StatCard({
  value,
  label,
  icon = null,
  trend = null,
  accent = 'primary',
  className = '',
}) {
  return (
    <div className={`hireflow-stat-card hireflow-stat-card--${accent} ${className}`.trim()}>
      <div className="hireflow-stat-card__top">
        {icon && <div className="hireflow-stat-card__icon">{icon}</div>}
        {trend && <span className="hireflow-stat-card__trend">{trend}</span>}
      </div>

      <div className="hireflow-stat-card__body">
        <h3 className="hireflow-stat-card__value">{value}</h3>
        <p className="hireflow-stat-card__label">{label}</p>
      </div>
    </div>
  )
}

export default StatCard
