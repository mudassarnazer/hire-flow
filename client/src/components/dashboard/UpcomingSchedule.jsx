import Badge from '../common/Badge'
import Button from '../common/Button'
import './UpcomingSchedule.css'

function UpcomingSchedule({ schedule = [], resumeScore = 92 }) {
  return (
    <aside className="upcoming-schedule">
      <div className="schedule-card">
        <div className="schedule-card__header">
          <div>
            <span className="schedule-card__kicker">CALENDAR & SESSIONS</span>
            <h2 className="schedule-card__title">Upcoming Schedule</h2>
          </div>
          <Badge variant="accent" size="sm">
            Live Schedule
          </Badge>
        </div>

        <div className="schedule-card__items">
          {schedule.length === 0 ? (
            <p className="schedule-card__empty">No upcoming interview sessions.</p>
          ) : (
            schedule.map((item) => (
              <div
                key={item.id}
                className={`schedule-item ${item.isUpcoming ? 'schedule-item--active' : ''}`}
              >
                <div className="schedule-item__top">
                  <div className="schedule-item__company-box">
                    <strong>{item.company}</strong>
                    <span className="schedule-item__role">{item.role}</span>
                  </div>
                  {item.isUpcoming && (
                    <Badge variant="warning" dot size="sm">
                      Next Up
                    </Badge>
                  )}
                </div>

                <div className="schedule-item__round">
                  <p className="schedule-item__round-name">{item.round}</p>
                </div>

                <div className="schedule-item__details">
                  <span>📅 {item.date}</span>
                  <span>⏰ {item.time}</span>
                  <span>💻 {item.mode}</span>
                </div>

                <div className="schedule-item__footer">
                  <span className="schedule-item__interviewer">
                    👤 {item.interviewer}
                  </span>
                  <Button variant="outline" size="sm">
                    Session Link →
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Placement Readiness & ATS Score Card */}
      <div className="readiness-card">
        <div className="readiness-card__header">
          <span className="readiness-card__kicker">AI READINESS</span>
          <h3 className="readiness-card__title">Placement Score</h3>
        </div>

        <div className="readiness-card__meter">
          <div className="readiness-card__score-circle">
            <span className="readiness-card__number">{resumeScore}</span>
            <span className="readiness-card__percent">/ 100</span>
          </div>

          <div className="readiness-card__feedback">
            <strong>Excellent Profile Match</strong>
            <p>Your resume and coding performance qualify for top-tier campus recruitment drives.</p>
          </div>
        </div>

        <div className="readiness-card__tags">
          <Badge variant="success" size="sm">✓ Verified CGPA</Badge>
          <Badge variant="primary" size="sm">✓ Coding Verified</Badge>
          <Badge variant="accent" size="sm">✓ ATS Optimized</Badge>
        </div>
      </div>
    </aside>
  )
}

export default UpcomingSchedule
