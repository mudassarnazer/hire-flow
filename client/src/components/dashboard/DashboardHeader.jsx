/**
 * DashboardHeader Component
 * Personalized Student Welcome Banner with Profile Completion Meter
 * Developer Attribution: MUDASSAR NAZER
 */

import Badge from '../common/Badge'
import Button from '../common/Button'
import SpotlightCard from '../glass/SpotlightCard'
import './DashboardHeader.css'

function DashboardHeader({ profile, onExploreJobs, onViewSchedule, onOpenProfile }) {
  if (!profile) return null

  // Profile completion calculation: 85% with 4 milestone metrics
  const completionPercentage = 85

  return (
    <SpotlightCard as="header" className="dashboard-header">
      <div className="dashboard-header__glow" aria-hidden="true" />

      <div className="dashboard-header__top-row">
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
              <Badge variant="neutral" size="sm">Demo Record</Badge>
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
                <strong className="tabular-nums font-mono-tech text-[var(--color-accent)] font-bold">
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
            <span>Browse Placement Drives</span>
            <span aria-hidden="true">✨</span>
          </Button>

          {onViewSchedule && (
            <Button
              variant="secondary"
              size="md"
              type="button"
              aria-label="View upcoming interview schedule"
              onClick={onViewSchedule}
            >
              <span>Interview Schedule</span>
              <span aria-hidden="true">📅</span>
            </Button>
          )}
        </div>
      </div>

      {/* Profile Completion Indicator Strip */}
      <div className="profile-completion-strip" role="region" aria-label="Profile completion status">
        <div className="completion-bar-wrap">
          <div className="completion-label-row">
            <span className="completion-label">
              Profile Readiness & Verification Score
            </span>
            <strong className="completion-percent text-[var(--color-accent)] font-mono">
              {completionPercentage}% Complete
            </strong>
          </div>
          <div className="completion-track" role="progressbar" aria-valuenow={completionPercentage} aria-valuemin="0" aria-valuemax="100">
            <div
              className="completion-fill"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="completion-pills">
          <span className="comp-pill comp-pill--done">
            <span aria-hidden="true">✓</span> Academics Verified
          </span>
          <span className="comp-pill comp-pill--done">
            <span aria-hidden="true">✓</span> Technical Skills (6)
          </span>
          <span className="comp-pill comp-pill--done">
            <span aria-hidden="true">✓</span> ATS Resume (92/100)
          </span>
          {onOpenProfile && (
            <button
              type="button"
              className="comp-pill comp-pill--action"
              onClick={onOpenProfile}
              aria-label="Open profile to complete remaining items"
            >
              <span>+ Add Portfolio Link</span>
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>
    </SpotlightCard>
  )
}

export default DashboardHeader
