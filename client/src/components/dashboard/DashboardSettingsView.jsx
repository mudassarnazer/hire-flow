/**
 * DashboardSettingsView Component
 * Student Portal Appearance, Notification & Privacy Settings
 * Developer Attribution: MUDASSAR NAZER
 */

import { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import SpotlightCard from '../glass/SpotlightCard'
import Badge from '../common/Badge'

export default function DashboardSettingsView() {
  const { theme, setTheme } = useTheme()

  const [notifications, setNotifications] = useState({
    interviewEmail: true,
    stageUpdates: true,
    newDrives: true,
    smsAlerts: false,
  })

  const [privacy, setPrivacy] = useState({
    recruiterDiscoverable: true,
    peerBenchmarking: true,
  })

  const toggleNotif = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const togglePrivacy = (key) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <section className="dashboard-settings-view" aria-labelledby="settings-heading">
      {/* Header Bar */}
      <div className="view-header-bar mb-6 pb-5 border-b border-[var(--glass-border)] flex items-center justify-between flex-wrap gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--color-accent)] font-mono block mb-1">
            PORTAL CONFIGURATION (DEMO)
          </span>
          <h2 id="settings-heading" className="text-2xl font-extrabold text-[var(--text-primary)] tracking-[-0.02em]">
            Settings & Preferences
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Manage appearance themes, simulated notification preferences, and privacy controls.
          </p>
        </div>

        <Badge variant="neutral" size="sm">Local Demonstration Settings</Badge>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* Appearance & Theme Selector */}
        <SpotlightCard className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--glass-border)]">
          <div className="mb-4">
            <h3 className="text-base font-bold text-[var(--text-primary)]">Interface Theme Mode</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Choose your preferred visual environment between Anodized Dark and Iridescent Chrome. Theme preference is saved in local browser storage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dark Theme Option */}
            <button
              type="button"
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)] ${
                theme === 'dark'
                  ? 'bg-[var(--surface-card-hover)] border-[var(--color-accent)] shadow-[0_0_20px_var(--color-accent-subtle)]'
                  : 'bg-[var(--surface-glass)] border-[var(--glass-border)] hover:border-[var(--color-accent-border)]'
              }`}
              onClick={() => setTheme('dark')}
              aria-pressed={theme === 'dark'}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-4 h-4 rounded-full bg-[#CCF381] inline-block shadow-[0_0_8px_rgba(204,243,129,0.5)]" />
                {theme === 'dark' && <Badge variant="primary" size="sm">Active</Badge>}
              </div>
              <strong className="block text-sm font-bold text-[var(--text-primary)]">Anodized Dark</strong>
              <span className="text-xs text-[var(--text-secondary)] block mt-0.5">
                Obsidian #09090B with neon lime accents for night-time focus.
              </span>
            </button>

            {/* Light Theme Option */}
            <button
              type="button"
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)] ${
                theme === 'light'
                  ? 'bg-[var(--surface-card-hover)] border-[var(--color-accent)] shadow-[0_0_20px_var(--color-accent-subtle)]'
                  : 'bg-[var(--surface-glass)] border-[var(--glass-border)] hover:border-[var(--color-accent-border)]'
              }`}
              onClick={() => setTheme('light')}
              aria-pressed={theme === 'light'}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-4 h-4 rounded-full bg-[#7C3AED] inline-block shadow-[0_0_8px_rgba(124,58,237,0.5)]" />
                {theme === 'light' && <Badge variant="primary" size="sm">Active</Badge>}
              </div>
              <strong className="block text-sm font-bold text-[var(--text-primary)]">Iridescent Chrome</strong>
              <span className="text-xs text-[var(--text-secondary)] block mt-0.5">
                Luminous #FAF8FF with electric violet ink for daylight clarity.
              </span>
            </button>
          </div>
        </SpotlightCard>

        {/* Notification Preferences */}
        <SpotlightCard className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--glass-border)]">
          <div className="mb-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-base font-bold text-[var(--text-primary)]">Demonstration Notification Controls</h3>
              <Badge variant="neutral" size="sm">Local State Only</Badge>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Toggle simulated notification preferences. Note: External email delivery and SMS gateways are not implemented in this prototype.
            </p>
          </div>

          <div className="divide-y divide-[var(--glass-border)] text-xs">
            {/* Interview Email */}
            <div className="py-3.5 flex items-center justify-between gap-4">
              <div>
                <strong className="block text-[var(--text-primary)] font-semibold">Interview Round Reminders</strong>
                <span className="text-[var(--text-secondary)]">
                  Simulated email alerts before scheduled rounds (email delivery service is not implemented).
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifications.interviewEmail}
                aria-label="Toggle interview round email reminders"
                onClick={() => toggleNotif('interviewEmail')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)] ${
                  notifications.interviewEmail ? 'bg-[var(--color-accent)]' : 'bg-[var(--surface-glass)] border border-[var(--glass-border)]'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full transition-transform absolute top-1 ${
                    notifications.interviewEmail ? 'right-1 bg-white' : 'left-1 bg-[var(--text-secondary)]'
                  }`}
                />
              </button>
            </div>

            {/* Stage Updates */}
            <div className="py-3.5 flex items-center justify-between gap-4">
              <div>
                <strong className="block text-[var(--text-primary)] font-semibold">Application Stage Updates</strong>
                <span className="text-[var(--text-secondary)]">
                  Simulated notifications for application progress changes (push alert service is not connected).
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifications.stageUpdates}
                aria-label="Toggle application stage updates"
                onClick={() => toggleNotif('stageUpdates')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)] ${
                  notifications.stageUpdates ? 'bg-[var(--color-accent)]' : 'bg-[var(--surface-glass)] border border-[var(--glass-border)]'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full transition-transform absolute top-1 ${
                    notifications.stageUpdates ? 'right-1 bg-white' : 'left-1 bg-[var(--text-secondary)]'
                  }`}
                />
              </button>
            </div>

            {/* New Drives */}
            <div className="py-3.5 flex items-center justify-between gap-4">
              <div>
                <strong className="block text-[var(--text-primary)] font-semibold">New Placement Drives</strong>
                <span className="text-[var(--text-secondary)]">
                  Simulated alerts when new sample drives are added to the prototype catalog.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifications.newDrives}
                aria-label="Toggle new placement drives alerts"
                onClick={() => toggleNotif('newDrives')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)] ${
                  notifications.newDrives ? 'bg-[var(--color-accent)]' : 'bg-[var(--surface-glass)] border border-[var(--glass-border)]'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full transition-transform absolute top-1 ${
                    notifications.newDrives ? 'right-1 bg-white' : 'left-1 bg-[var(--text-secondary)]'
                  }`}
                />
              </button>
            </div>

            {/* SMS Alerts */}
            <div className="py-3.5 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <strong className="block text-[var(--text-primary)] font-semibold">SMS Urgent Alerts</strong>
                  <Badge variant="neutral" size="sm">Simulated</Badge>
                </div>
                <span className="text-[var(--text-secondary)]">
                  Simulated SMS notifications for urgent schedule changes (SMS gateway is not connected).
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifications.smsAlerts}
                aria-label="Toggle SMS urgent alerts (demonstration only)"
                onClick={() => toggleNotif('smsAlerts')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)] ${
                  notifications.smsAlerts ? 'bg-[var(--color-accent)]' : 'bg-[var(--surface-glass)] border border-[var(--glass-border)]'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full transition-transform absolute top-1 ${
                    notifications.smsAlerts ? 'right-1 bg-white' : 'left-1 bg-[var(--text-secondary)]'
                  }`}
                />
              </button>
            </div>
          </div>
        </SpotlightCard>

        {/* Privacy & Benchmark */}
        <SpotlightCard className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--glass-border)]">
          <div className="mb-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-base font-bold text-[var(--text-primary)]">Privacy & Recruiter Visibility (Demo Controls)</h3>
              <Badge variant="neutral" size="sm">Local State Only</Badge>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Simulated privacy preferences. Live corporate recruiter indexing and external benchmark databases are not connected.
            </p>
          </div>

          <div className="divide-y divide-[var(--glass-border)] text-xs">
            <div className="py-3.5 flex items-center justify-between gap-4">
              <div>
                <strong className="block text-[var(--text-primary)] font-semibold">Corporate Recruiter Discoverability</strong>
                <span className="text-[var(--text-secondary)]">
                  Simulated permission to index candidate skills (recruiter discovery search engine is not implemented).
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={privacy.recruiterDiscoverable}
                aria-label="Toggle corporate recruiter discoverability"
                onClick={() => togglePrivacy('recruiterDiscoverable')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)] ${
                  privacy.recruiterDiscoverable ? 'bg-[var(--color-accent)]' : 'bg-[var(--surface-glass)] border border-[var(--glass-border)]'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full transition-transform absolute top-1 ${
                    privacy.recruiterDiscoverable ? 'right-1 bg-white' : 'left-1 bg-[var(--text-secondary)]'
                  }`}
                />
              </button>
            </div>

            <div className="py-3.5 flex items-center justify-between gap-4">
              <div>
                <strong className="block text-[var(--text-primary)] font-semibold">Anonymous Peer Benchmarking</strong>
                <span className="text-[var(--text-secondary)]">
                  Simulated data contribution to placement statistics (cohort analytics service is not connected).
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={privacy.peerBenchmarking}
                aria-label="Toggle anonymous peer benchmarking"
                onClick={() => togglePrivacy('peerBenchmarking')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)] ${
                  privacy.peerBenchmarking ? 'bg-[var(--color-accent)]' : 'bg-[var(--surface-glass)] border border-[var(--glass-border)]'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full transition-transform absolute top-1 ${
                    privacy.peerBenchmarking ? 'right-1 bg-white' : 'left-1 bg-[var(--text-secondary)]'
                  }`}
                />
              </button>
            </div>
          </div>
        </SpotlightCard>

        {/* Prototype Technical Disclosure Notice */}
        <div className="p-4 rounded-2xl bg-[var(--surface-glass)] border border-[var(--glass-border)] text-xs text-[var(--text-muted)] space-y-1.5">
          <strong className="text-[var(--text-primary)] block">Stage G3 Architecture Disclosure</strong>
          <p>
            Notification preferences, privacy toggles, and profile updates modify local React demonstration state only and do not persist across browser reloads. Theme selection is saved to your browser&apos;s local storage via ThemeContext.
          </p>
          <p>
            External integrations — including email notifications, SMS delivery gateways, recruiter search visibility, and institutional academic record synchronization — are not connected in this prototype release.
          </p>
        </div>
      </div>
    </section>
  )
}
