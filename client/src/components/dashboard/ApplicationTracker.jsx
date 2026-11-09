import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Badge from '../common/Badge'
import Button from '../common/Button'
import './ApplicationTracker.css'

function ApplicationTracker({ applications = [] }) {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedApplication, setSelectedApplication] = useState(null)

  const modalRef = useRef(null)
  const lastActiveElementRef = useRef(null)
  const modalCloseBtnRef = useRef(null)

  const handleOpenModal = (app) => {
    lastActiveElementRef.current = document.activeElement
    setSelectedApplication(app)
  }

  const handleCloseModal = () => {
    setSelectedApplication(null)
  }

  // Handle keyboard focus trap, escape key, body scroll lock, and accessibility focus management
  useEffect(() => {
    if (!selectedApplication) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal()
        return
      }

      if (event.key === 'Tab') {
        if (!modalRef.current) return

        const focusableElements = Array.from(
          modalRef.current.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        )

        if (focusableElements.length === 0) {
          event.preventDefault()
          return
        }

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (event.shiftKey) {
          // Shift + Tab (backward cycling)
          if (
            document.activeElement === firstElement ||
            !modalRef.current.contains(document.activeElement)
          ) {
            event.preventDefault()
            lastElement.focus()
          }
        } else {
          // Tab (forward cycling)
          if (
            document.activeElement === lastElement ||
            !modalRef.current.contains(document.activeElement)
          ) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    const handleFocusIn = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        modalCloseBtnRef.current?.focus()
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', handleFocusIn)

    // Move focus to the existing close button when the modal opens
    modalCloseBtnRef.current?.focus()
    const timer = setTimeout(() => {
      modalCloseBtnRef.current?.focus()
    }, 0)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('focusin', handleFocusIn)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      if (lastActiveElementRef.current && typeof lastActiveElementRef.current.focus === 'function') {
        lastActiveElementRef.current.focus()
      }
    }
  }, [selectedApplication])

  // Category counts for filter tabs
  const interviewsCount = applications.filter((a) => a.status === 'Interview Scheduled').length
  const inReviewCount = applications.filter((a) => a.status === 'Under Review').length
  const offersCount = applications.filter((a) => a.status === 'Offer Received').length

  // Filter and search logic
  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredApplications = applications.filter((app) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'interviews' && app.status === 'Interview Scheduled') ||
      (filter === 'in-review' && app.status === 'Under Review') ||
      (filter === 'offers' && app.status === 'Offer Received')

    if (!matchesFilter) return false

    if (!normalizedQuery) return true

    const companyMatch = (app.company || '').toLowerCase().includes(normalizedQuery)
    const roleMatch = (app.role || '').toLowerCase().includes(normalizedQuery)

    return companyMatch || roleMatch
  })

  const isFilteredOrSearched = filter !== 'all' || searchQuery.trim() !== ''

  const handleResetFilters = () => {
    setFilter('all')
    setSearchQuery('')
  }

  return (
    <section className="app-tracker" aria-labelledby="tracker-heading">
      <div className="app-tracker__header">
        <div>
          <span className="app-tracker__kicker">RECRUITMENT PIPELINE</span>
          <h2 id="tracker-heading" className="app-tracker__title">
            Your Applications
          </h2>
          <p className="app-tracker__subtitle">
            Track interview rounds, review progress, and status updates.
          </p>
        </div>

        <div
          className="app-tracker__filters"
          role="group"
          aria-label="Filter applications by status"
        >
          <button
            type="button"
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            aria-pressed={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            All ({applications.length})
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'interviews' ? 'active' : ''}`}
            aria-pressed={filter === 'interviews'}
            onClick={() => setFilter('interviews')}
          >
            Interviews ({interviewsCount})
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'in-review' ? 'active' : ''}`}
            aria-pressed={filter === 'in-review'}
            onClick={() => setFilter('in-review')}
          >
            In Review ({inReviewCount})
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'offers' ? 'active' : ''}`}
            aria-pressed={filter === 'offers'}
            onClick={() => setFilter('offers')}
          >
            Offers ({offersCount})
          </button>
        </div>
      </div>

      {/* Feature A: Search Input Bar */}
      <div className="app-tracker__search-container">
        <div className="app-tracker__search-wrapper">
          <span className="app-tracker__search-icon" aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <label htmlFor="tracker-search-input" className="visually-hidden">
            Search applications by company or job role
          </label>
          <input
            id="tracker-search-input"
            type="text"
            className="app-tracker__search-input"
            placeholder="Search by company or job role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search applications by company or job role"
          />
          {searchQuery && (
            <button
              type="button"
              className="app-tracker__search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
            >
              ✕
            </button>
          )}
        </div>

        {searchQuery.trim() !== '' && (
          <div className="app-tracker__search-info" aria-live="polite">
            Showing {filteredApplications.length}{' '}
            {filteredApplications.length === 1 ? 'application' : 'applications'} matching &ldquo;
            {searchQuery}&rdquo;
          </div>
        )}
      </div>

      <div className="app-tracker__list">
        {filteredApplications.length === 0 ? (
          <div className="app-tracker__empty">
            <div className="app-tracker__empty-icon" aria-hidden="true">
              📋
            </div>
            <p className="app-tracker__empty-title">No applications found</p>
            <p className="app-tracker__empty-desc">
              {searchQuery.trim() !== ''
                ? `No applications match "${searchQuery}"${
                    filter !== 'all' ? ' with the current filter' : ''
                  }.`
                : 'No applications match the selected filter.'}
            </p>
            {isFilteredOrSearched && (
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={handleResetFilters}
                className="app-tracker__empty-btn"
              >
                Reset Search & Filters
              </Button>
            )}
          </div>
        ) : (
          filteredApplications.map((app) => (
            <article key={app.id} className="app-card">
              <div className="app-card__company">
                <div className="app-card__logo" aria-hidden="true">
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
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={() => handleOpenModal(app)}
                  aria-label={`View details for ${app.role} at ${app.company}`}
                >
                  View Details
                </Button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Feature B: Application Details Modal */}
      {selectedApplication &&
        createPortal(
          <div
            className="app-modal__overlay"
            onClick={handleCloseModal}
            role="presentation"
          >
            <div
              ref={modalRef}
              className="app-modal__container"
              role="dialog"
              aria-modal="true"
              aria-labelledby="app-modal-title"
              aria-describedby="app-modal-company"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="app-modal__header">
                <div className="app-modal__title-group">
                  <div className="app-modal__company-logo" aria-hidden="true">
                    {selectedApplication.company.charAt(0)}
                  </div>
                  <div>
                    <span className="app-modal__kicker">APPLICATION DETAILS</span>
                    <h3 id="app-modal-title" className="app-modal__title">
                      {selectedApplication.role}
                    </h3>
                    <p id="app-modal-company" className="app-modal__company-info">
                      {selectedApplication.company} • <span>📍 {selectedApplication.location}</span>
                    </p>
                  </div>
                </div>
                <button
                  ref={modalCloseBtnRef}
                  type="button"
                  className="app-modal__close-icon-btn"
                  onClick={handleCloseModal}
                  aria-label="Close application details modal"
                >
                  ✕
                </button>
              </div>

              <div className="app-modal__body">
                <div className="app-modal__status-banner">
                  <div>
                    <span className="app-modal__field-label">Application Status</span>
                    <div className="app-modal__status-badge-wrap">
                      <Badge variant={selectedApplication.statusVariant} size="md" dot>
                        {selectedApplication.status}
                      </Badge>
                    </div>
                  </div>
                  {selectedApplication.nextAction && (
                    <div className="app-modal__next-action-box">
                      <span className="app-modal__field-label">Next Action</span>
                      <p className="app-modal__next-action-text">
                        {selectedApplication.nextAction}
                      </p>
                    </div>
                  )}
                </div>

                <div className="app-modal__grid">
                  <div className="app-modal__field">
                    <span className="app-modal__field-label">Company</span>
                    <span className="app-modal__field-value">{selectedApplication.company}</span>
                  </div>

                  <div className="app-modal__field">
                    <span className="app-modal__field-label">Role</span>
                    <span className="app-modal__field-value">{selectedApplication.role}</span>
                  </div>

                  <div className="app-modal__field">
                    <span className="app-modal__field-label">Location</span>
                    <span className="app-modal__field-value">📍 {selectedApplication.location}</span>
                  </div>

                  <div className="app-modal__field">
                    <span className="app-modal__field-label">Stipend</span>
                    <span className="app-modal__field-value">{selectedApplication.stipend}</span>
                  </div>

                  <div className="app-modal__field">
                    <span className="app-modal__field-label">Application Date</span>
                    <span className="app-modal__field-value">{selectedApplication.appliedDate}</span>
                  </div>

                  <div className="app-modal__field">
                    <span className="app-modal__field-label">Current Recruitment Stage</span>
                    <span className="app-modal__field-value">{selectedApplication.currentStage}</span>
                  </div>
                </div>
              </div>

              <div className="app-modal__footer">
                <Button
                  variant="secondary"
                  size="md"
                  type="button"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  )
}

export default ApplicationTracker
