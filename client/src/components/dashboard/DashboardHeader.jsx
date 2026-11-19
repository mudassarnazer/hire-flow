import Badge from '../common/Badge'
import Button from '../common/Button'
import SpotlightCard from '../glass/SpotlightCard'
import './DashboardHeader.css'

function DashboardHeader({ profile, onExploreJobs }) {
  if (!profile) return null

  return (
    <SpotlightCard as="header" className="dashboard-header">
      <div className="dashboard-header__glow" />

      <div className="dashboard-header__profile">
        <div className="dashboard-header__avatar" aria-hidden="true">
          {profile.avatarInitials}
        </div>

        <div className="dashboard-header__info">
          <div className="dashboard-header__badge-row">
            <span className="dashboard-header__greeting">Student Placement Portal</span>
            <Badge variant="success" dot size="sm">
              {profile.eligibilityStatus}
            </Badge>
          </div>

          <h1 className="dashboard-header__title">
            Welcome back, <span>{profile.name}</span>
          </h1>

          <p className="dashboard-header__meta">
            <span className="dashboard-header__meta-item">
              <span aria-hidden="true">🎓</span> {profile.department}
            </span>
            <span className="dashboard-header__meta-item">
              <span aria-hidden="true">🏛️</span> {profile.institution}
            </span>
            <span className="dashboard-header__meta-item">
              <span aria-hidden="true">⭐</span> CGPA:{' '}
              <strong className="tabular-nums font-mono-tech text-sky-300">
                {profile.cgpa}
              </strong>
            </span>
          </p>
        </div>
      </div>

      <div className="dashboard-header__actions">
        <Button
          variant="primary"
          size="md"
          type="button"
          aria-label="Browse recommended open placement drives"
          onClick={onExploreJobs}
        >
          <span>Browse Open Drives</span>
          <span aria-hidden="true">✨</span>
        </Button>
      </div>
    </SpotlightCard>
  )
}

export default DashboardHeader
