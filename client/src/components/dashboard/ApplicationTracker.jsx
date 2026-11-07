import { useState } from 'react'
import Badge from '../common/Badge'
import Button from '../common/Button'
import './ApplicationTracker.css'

function ApplicationTracker({ applications = [] }) {
  const [filter, setFilter] = useState('all')

  const filteredApplications = applications.filter((app) => {
    if (filter === 'all') return true
    if (filter === 'interviews') return app.status === 'Interview Scheduled'
    if (filter === 'in-review') return app.status === 'Under Review'
    if (filter === 'offers') return app.status === 'Offer Received'
    return true
  })

  return (
    <section className="app-tracker">
      <div className="app-tracker__header">
        <div>
          <span className="app-tracker__kicker">RECRUITMENT PIPELINE</span>
          <h2 className="app-tracker__title">Your Applications</h2>
          <p className="app-tracker__subtitle">
            Track interview rounds, review progress, and status updates.
          </p>
        </div>

        <div className="app-tracker__filters">
          <button
            type="button"
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({applications.length})
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'interviews' ? 'active' : ''}`}
            onClick={() => setFilter('interviews')}
          >
            Interviews ({applications.filter((a) => a.status === 'Interview Scheduled').length})
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'in-review' ? 'active' : ''}`}
            onClick={() => setFilter('in-review')}
          >
            In Review ({applications.filter((a) => a.status === 'Under Review').length})
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'offers' ? 'active' : ''}`}
            onClick={() => setFilter('offers')}
          >
            Offers ({applications.filter((a) => a.status === 'Offer Received').length})
          </button>
        </div>
      </div>

      <div className="app-tracker__list">
        {filteredApplications.length === 0 ? (
          <div className="app-tracker__empty">
            <p>No applications match the selected filter.</p>
          </div>
        ) : (
          filteredApplications.map((app) => (
            <article key={app.id} className="app-card">
              <div className="app-card__company">
                <div className="app-card__logo">
                  {app.company.charAt(0)}
                </div>
                <div>
                  <h3 className="app-card__role">{app.role}</h3>
                  <p className="app-card__name">
                    {app.company} • <span>📍 {app.location}</span>
                  </p>
                </div>
              </div>

              <div className="app-card__stage">
                <span className="app-card__stage-label">Current Stage</span>
                <span className="app-card__stage-value">{app.currentStage}</span>
              </div>

              <div className="app-card__date">
                <span className="app-card__stage-label">Applied On</span>
                <span className="app-card__stage-value">{app.appliedDate}</span>
              </div>

              <div className="app-card__status">
                <Badge variant={app.statusVariant} size="md">
                  {app.status}
                </Badge>
                {app.nextAction && (
                  <span className="app-card__next-action">{app.nextAction}</span>
                )}
              </div>

              <div className="app-card__action">
                <Button variant="secondary" size="sm">
                  View Details
                </Button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default ApplicationTracker
