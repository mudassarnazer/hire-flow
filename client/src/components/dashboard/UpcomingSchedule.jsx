/**
 * UpcomingSchedule Component
 * Calendar & Interview Sessions with Simulated ATS Placement Score Gauge
 * Developer Attribution: MUDASSAR NAZER
 */

import { useId } from 'react'
import Badge from '../common/Badge'
import Button from '../common/Button'
import './UpcomingSchedule.css'

function UpcomingSchedule({ schedule = [], resumeScore = 92 }) {
  const gradientId = useId()

  // SVG circular gauge math: radius = 36, circumference = 2 * PI * 36 ≈ 226.19
  const radius = 36
  const circumference = 2 * Math.PI * radius

  // Normalize score safely between 0 and 100 while preserving decimal precision
  const numericScore =
    typeof resumeScore === 'number' && Number.isFinite(resumeScore)
      ? Math.min(Math.max(resumeScore, 0), 100)
      : 0

  const strokeDashoffset = circumference - (circumference * numericScore) / 100

  return (
    <aside className="upcoming-schedule" aria-label="Upcoming schedule and simulated placement readiness">
      <div className="schedule-card glass-panel glass-specular-edge">
        <div className="schedule-card__header">
          <div>
            <span className="schedule-card__kicker">CALENDAR & SESSIONS (SAMPLE)</span>
            <h2 className="schedule-card__title">Upcoming Schedule</h2>
          </div>
          <Badge variant="neutral" size="sm">
            Sample Schedule
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
                      Next Up (Sample)
                    </Badge>
                  )}
                </div>

                <div className="schedule-item__round">
                  <p className="schedule-item__round-name">{item.round}</p>
                </div>

                <div className="schedule-item__details">
                  <span className="schedule-item__meta-row">
                    <span className="schedule-item__icon" aria-hidden="true">📅</span>
                    <span className="font-mono-tech tabular-nums">{item.date}</span>
                  </span>
                  <span className="schedule-item__meta-row">
                    <span className="schedule-item__icon" aria-hidden="true">⏰</span>
                    <span className="font-mono-tech tabular-nums">{item.time}</span>
                  </span>
                  <span className="schedule-item__meta-row">
                    <span className="schedule-item__icon" aria-hidden="true">💻</span>
                    <span>{item.mode}</span>
                  </span>
                </div>

                <div className="schedule-item__footer">
                  <span className="schedule-item__interviewer">
                    <span aria-hidden="true">👤</span> {item.interviewer}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    aria-label={`View simulated session details for ${item.company}`}
                  >
                    Demo Link →
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Simulated Placement Readiness & ATS Score Card */}
      <div className="readiness-card glass-panel glass-specular-edge">
        <div className="readiness-card__header">
          <span className="readiness-card__kicker">AI READINESS (SIMULATED)</span>
          <h3 className="readiness-card__title">Placement Score (Simulated)</h3>
        </div>

        <div className="readiness-card__meter">
          <div
            className="readiness-card__score-circle"
            role="img"
            aria-label={`Simulated placement readiness score ${numericScore} out of 100`}
          >
            <svg
              className="readiness-card__score-svg"
              viewBox="0 0 88 88"
              width="88"
              height="88"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
              <circle
                cx="44"
                cy="44"
                r={radius}
                className="readiness-card__circle-bg"
              />
              <circle
                cx="44"
                cy="44"
                r={radius}
                className="readiness-card__circle-bar"
                stroke={`url(#${gradientId})`}
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                }}
              />
            </svg>
            <div className="readiness-card__score-content">
              <span className="readiness-card__number font-mono-tech tabular-nums">{numericScore}</span>
              <span className="readiness-card__percent font-mono-tech">/ 100</span>
            </div>
          </div>

          <div className="readiness-card__feedback">
            <strong>Simulated Score Overview</strong>
            <p>Illustrative ATS calculation based on sample resume keywords. Not linked to employer systems.</p>
          </div>
        </div>

        <div className="readiness-card__tags">
          <Badge variant="neutral" size="sm">Sample CGPA</Badge>
          <Badge variant="neutral" size="sm">Self-Reported Skills</Badge>
          <Badge variant="accent" size="sm">Simulated ATS</Badge>
        </div>
      </div>
    </aside>
  )
}

export default UpcomingSchedule
