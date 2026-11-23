/**
 * DashboardHeader Component
 * Personalized Student Welcome Banner with Dynamic Profile Completion Meter
 * Developer Attribution: MUDASSAR NAZER
 */

import Badge from '../common/Badge'
import Button from '../common/Button'
import SpotlightCard from '../glass/SpotlightCard'
import { calculateProfileCompletion } from './profileUtils'
import './DashboardHeader.css'

function DashboardHeader({ profile, onExploreJobs, onViewSchedule, onOpenProfile }) {
  const safeProfile = profile || {
    name: 'Sample Candidate',
    avatarInitials: 'SC',
    department: 'Computer Science & Engineering',
    institution: 'Sample Technical Institute (Demo)',
    cgpa: '8.94 / 10.0 (Sample)',
    eligibilityStatus: 'Standard Placement Track (Sample)',
    skills: [],
    resumeScore: 92,
  }

  // Calculate profile completion dynamically from actual available profile fields
  const { percentage: completionPercentage, items: completionItems } =
    calculateProfileCompletion(safeProfile)

  const portfolioItem = completionItems.find((i) => i.id === 'portfolio')
  const isPortfolioComplete = portfolioItem?.isComplete

  return (
    <SpotlightCard as="header" className="dashboard-header">
      <div className="dashboard-header__glow" aria-hidden="true" />

      <div className="dashboard-header__top-row">
        <div className="dashboard-header__profile">
          <div className="dashboard-header__avatar" aria-hidden="true">
            {safeProfile.avatarInitials || 'SC'}
          </div>

          <div className="dashboard-header__info">
            <div className="dashboard-header__badge-row">
              <span className="dashboard-header__greeting">Student Placement Portal</span>
              <Badge variant="neutral" dot size="sm">
                {safeProfile.eligibilityStatus || 'Standard Track'}
              </Badge>
              <Badge variant="neutral" size="sm">Demonstration Record</Badge>
            </div>

            <h1 className="dashboard-header__title">
              Welcome back, <span>{safeProfile.name}</span>
            </h1>

            <p className="dashboard-header__meta">
              <span className="dashboard-header__meta-item">
                <span aria-hidden="true">🎓</span> {safeProfile.department}
              </span>
              <span className="dashboard-header__meta-item">
                <span aria-hidden="true">🏛️</span> {safeProfile.institution}
              </span>
              <span className="dashboard-header__meta-item">
                <span aria-hidden="true">⭐</span> CGPA:{' '}
                <strong className="tabular-nums font-mono-tech text-[var(--color-accent)] font-bold">
                  {safeProfile.cgpa}
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
            aria-label="Browse sample placement drives"
            onClick={onExploreJobs}
          >
            <span>Browse Sample Drives</span>
            <span aria-hidden="true">✨</span>
          </Button>

          {onViewSchedule && (
            <Button
              variant="secondary"
              size="md"
              type="button"
              aria-label="View upcoming sample schedule"
              onClick={onViewSchedule}
            >
              <span>Sample Schedule</span>
              <span aria-hidden="true">📅</span>
            </Button>
          )}
        </div>
      </div>

      {/* Dynamic Profile Completion Indicator Strip */}
      <div className="profile-completion-strip" role="region" aria-label="Profile completion status">
        <div className="completion-bar-wrap">
          <div className="completion-label-row">
            <span className="completion-label">
              Profile Readiness & Field Completion (Dynamic Calculation)
            </span>
            <strong className="completion-percent text-[var(--color-accent)] font-mono">
              {completionPercentage}% Complete
            </strong>
          </div>
          <div
            className="completion-track"
            role="progressbar"
            aria-valuenow={completionPercentage}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Profile completion progress"
          >
            <div
              className="completion-fill"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="completion-pills">
          <span className="comp-pill comp-pill--done">
            <span aria-hidden="true">✓</span> Academics Listed
          </span>
          <span className="comp-pill comp-pill--done">
            <span aria-hidden="true">✓</span> Candidate Skills ({safeProfile.skills?.length || 0})
          </span>
          <span className="comp-pill comp-pill--done">
            <span aria-hidden="true">✓</span> ATS Resume ({safeProfile.resumeScore || 0}/100, Simulated)
          </span>

          {!isPortfolioComplete && onOpenProfile ? (
            <button
              type="button"
              className="comp-pill comp-pill--action"
              onClick={onOpenProfile}
              aria-label="Open profile to configure portfolio URL"
            >
              <span>+ Add Portfolio Link</span>
              <span aria-hidden="true">→</span>
            </button>
          ) : (
            <span className="comp-pill comp-pill--done">
              <span aria-hidden="true">✓</span> Portfolio Configured
            </span>
          )}
        </div>
      </div>
    </SpotlightCard>
  )
}

export default DashboardHeader
