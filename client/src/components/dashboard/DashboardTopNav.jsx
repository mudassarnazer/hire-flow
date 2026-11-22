/**
 * DashboardTopNav Component
 * Contextual Header Strip with Global Search, Notifications & Theme Control
 * Developer Attribution: MUDASSAR NAZER
 */

import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext'
import Badge from '../common/Badge'
import './DashboardTopNav.css'

export default function DashboardTopNav({
  activeTabLabel = 'Overview',
  searchQuery = '',
  onSearchChange,
  onOpenSidebar,
  onSelectTab,
  profile,
  notifications = [],
}) {
  const { theme, toggleTheme } = useTheme()
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const notifRef = useRef(null)

  // Close notifications popover on click outside
  useEffect(() => {
    if (!isNotifOpen) return

    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isNotifOpen])

  return (
    <header className="dashboard-topnav" aria-label="Dashboard Top Navigation">
      <div className="dashboard-topnav__left">
        {/* Mobile Hamburger Drawer Trigger */}
        <button
          type="button"
          className="dashboard-topnav__menu-trigger"
          onClick={onOpenSidebar}
          aria-label="Open dashboard navigation menu"
          aria-expanded="false"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Contextual Breadcrumb */}
        <nav className="dashboard-topnav__breadcrumbs" aria-label="Breadcrumb navigation">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <span className="breadcrumb-link">Portal</span>
            </li>
            <li className="breadcrumb-separator" aria-hidden="true">/</li>
            <li className="breadcrumb-item">
              <span className="breadcrumb-current" aria-current="page">
                {activeTabLabel}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Global Quick Search Bar */}
      <div className="dashboard-topnav__center">
        <div className="topnav-search-wrap">
          <span className="topnav-search-icon" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="search"
            className="topnav-search-input"
            placeholder="Search applications, drives, skills..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            aria-label="Search applications, placement drives, and skills"
          />
          {searchQuery && (
            <button
              type="button"
              className="topnav-search-clear"
              onClick={() => onSearchChange?.('')}
              aria-label="Clear search input"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Actions: Notifications, Theme Toggle, Profile Chip */}
      <div className="dashboard-topnav__right">
        {/* Notifications Popover */}
        <div className="notif-container" ref={notifRef}>
          <button
            type="button"
            className="topnav-action-btn notif-btn"
            onClick={() => setIsNotifOpen((prev) => !prev)}
            aria-label="View upcoming interview notifications"
            aria-expanded={isNotifOpen}
            aria-haspopup="true"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {notifications.length > 0 && (
              <span className="notif-badge">{notifications.length}</span>
            )}
          </button>

          {isNotifOpen && (
            <div className="notif-dropdown" role="region" aria-label="Upcoming Interview Reminders">
              <div className="notif-dropdown__header">
                <strong>Schedule Alerts</strong>
                <Badge variant="warning" size="sm">{notifications.length} Active</Badge>
              </div>

              <div className="notif-dropdown__list">
                {notifications.length === 0 ? (
                  <p className="notif-empty">No pending schedule notifications.</p>
                ) : (
                  notifications.map((item) => (
                    <div key={item.id} className="notif-item">
                      <div className="notif-item__top">
                        <strong className="notif-company">{item.company}</strong>
                        <span className="notif-time">{item.date?.split(',')[0]}</span>
                      </div>
                      <p className="notif-round">{item.round}</p>
                      <span className="notif-meta">
                        🕒 {item.time} • 💻 {item.mode}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="notif-dropdown__footer">
                <button
                  type="button"
                  className="notif-view-all"
                  onClick={() => {
                    onSelectTab?.('overview')
                    setIsNotifOpen(false)
                  }}
                >
                  View in Dashboard Overview →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          className="topnav-action-btn theme-toggle-topnav"
        >
          {theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-300">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-accent)]">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Profile Avatar Chip */}
        {profile && (
          <button
            type="button"
            className="topnav-profile-btn"
            onClick={() => onSelectTab?.('profile')}
            aria-label={`Open profile for ${profile.name}`}
          >
            <div className="topnav-avatar">{profile.avatarInitials || 'PS'}</div>
            <div className="topnav-profile-text">
              <span className="topnav-student-name">{profile.name}</span>
              <span className="topnav-student-tier">{profile.eligibilityStatus}</span>
            </div>
          </button>
        )}
      </div>
    </header>
  )
}
