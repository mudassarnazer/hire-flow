import Badge from '../common/Badge'
import Button from '../common/Button'
import './DashboardHeader.css'

function DashboardHeader({ profile, onExploreJobs }) {
  if (!profile) return null

  return (
    <header className="dashboard-header">
      <div className="dashboard-header__glow" />

      <div className="dashboard-header__profile">
        <div className="dashboard-header__avatar">
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
            <span>🎓 {profile.department}</span>
            <span>🏛️ {profile.institution}</span>
            <span>⭐ CGPA: {profile.cgpa}</span>
          </p>
        </div>
      </div>

      <div className="dashboard-header__actions">
        <Button
          variant="primary"
          size="md"
          onClick={onExploreJobs}
          icon="✨"
        >
          Browse Open Drives
        </Button>
      </div>
    </header>
  )
}

export default DashboardHeader
