/**
 * DashboardSidebar Component
 * Responsive Navigation Drawer & Workspace Command Sidebar
 * Developer Attribution: MUDASSAR NAZER
 */

import { useEffect, useRef } from 'react'
import { StatusBeacon } from '../ObsidianGlassUI'
import Badge from '../common/Badge'
import './DashboardSidebar.css'

const NAV_ITEMS = [
  {
    id: 'overview',
    label: 'Overview',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    description: 'Dashboard summary & metrics',
  },
  {
    id: 'applications',
    label: 'My Applications',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        <line x1="12" y1="11" x2="12" y2="17" />
        <line x1="9" y1="14" x2="15" y2="14" />
      </svg>
    ),
    badgeKey: 'applicationsCount',
    description: 'Track recruitment stages',
  },
  {
    id: 'opportunities',
    label: 'Browse Drives',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    badgeKey: 'opportunitiesCount',
    description: 'Curated corporate openings',
  },
  {
    id: 'saved',
    label: 'Saved Drives',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
    badgeKey: 'savedCount',
    description: 'Bookmarked opportunities',
  },
  {
    id: 'profile',
    label: 'Profile & ATS',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    staticBadge: '92%',
    description: 'Academic credentials & score',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    description: 'Preferences & display mode',
  },
]

export default function DashboardSidebar({
  activeTab = 'overview',
  onSelectTab,
  counts = {},
  isOpen = false,
  onClose,
  onExitToLanding,
  profile,
}) {
  const sidebarRef = useRef(null)

  // Handle Escape key to dismiss mobile drawer
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="dashboard-sidebar__backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        id="dashboard-sidebar"
        className={`dashboard-sidebar ${isOpen ? 'dashboard-sidebar--open' : ''}`}
        aria-label="Student Dashboard Navigation"
      >
        {/* Sidebar Brand Header */}
        <div className="dashboard-sidebar__header">
          <div className="dashboard-sidebar__brand">
            <span className="brand-icon" aria-hidden="true">✦</span>
            <div className="brand-text">
              <strong className="brand-name">HIRE-FLOW</strong>
              <span className="brand-badge">STUDENT PORTAL</span>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            className="dashboard-sidebar__close-btn"
            onClick={onClose}
            aria-label="Close dashboard sidebar menu"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        {/* Live System Status Beacon */}
        <div className="dashboard-sidebar__status">
          <StatusBeacon variant="emerald" label="Autumn Cycle Active" />
        </div>

        {/* Main Navigation List */}
        <nav className="dashboard-sidebar__nav" role="navigation" aria-label="Dashboard sections">
          <ul className="dashboard-sidebar__menu">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id
              const count = item.badgeKey ? counts[item.badgeKey] : null

              return (
                <li key={item.id} className="dashboard-sidebar__item">
                  <button
                    type="button"
                    className={`dashboard-sidebar__btn ${isActive ? 'dashboard-sidebar__btn--active' : ''}`}
                    onClick={() => {
                      onSelectTab?.(item.id)
                      onClose?.()
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="btn-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="btn-label">{item.label}</span>

                    {/* Badge or Count Indicator */}
                    {typeof count === 'number' && (
                      <span className={`btn-count ${isActive ? 'btn-count--active' : ''}`}>
                        {count}
                      </span>
                    )}
                    {item.staticBadge && (
                      <Badge variant="accent" size="sm" className="btn-static-badge">
                        {item.staticBadge}
                      </Badge>
                    )}

                    {isActive && (
                      <span className="btn-active-pill" aria-hidden="true" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom Student Profile Card & Exit Action */}
        <div className="dashboard-sidebar__footer">
          {profile && (
            <div
              className="sidebar-student-card"
              role="button"
              tabIndex={0}
              onClick={() => {
                onSelectTab?.('profile')
                onClose?.()
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelectTab?.('profile')
                  onClose?.()
                }
              }}
              aria-label="View student profile details"
              title="Click to view student profile"
            >
              <div className="student-avatar" aria-hidden="true">
                {profile.avatarInitials || 'ST'}
              </div>
              <div className="student-info">
                <strong className="student-name">{profile.name}</strong>
                <span className="student-meta">{profile.rollNumber || 'Class of 2027'}</span>
              </div>
            </div>
          )}

          {onExitToLanding && (
            <button
              type="button"
              className="sidebar-exit-btn"
              onClick={onExitToLanding}
              aria-label="Exit student portal to public landing page"
            >
              <span aria-hidden="true">←</span>
              <span>Exit to Public Site</span>
            </button>
          )}

          <div className="sidebar-attribution">
            <span>Dev:</span>
            <strong>MUDASSAR NAZER</strong>
          </div>
        </div>
      </aside>
    </>
  )
}
