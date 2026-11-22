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
            PORTAL CONFIGURATION
          </span>
          <h2 id="settings-heading" className="text-2xl font-extrabold text-[var(--text-primary)] tracking-[-0.02em]">
            Settings & Preferences
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Manage appearance themes, notification schedules, and privacy controls.
          </p>
        </div>

        <Badge variant="accent" size="sm">Persistent Preferences</Badge>
      </div>

      <div className="space-y-6 max-w-4xl">
        {/* Appearance & Theme Selector */}
        <SpotlightCard className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--glass-border)]">
          <div className="mb-4">
            <h3 className="text-base font-bold text-[var(--text-primary)]">Interface Theme Mode</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Choose your preferred visual environment. Both themes are calibrated with strict WCAG AA contrast.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dark Theme Option */}
            <button
              type="button"
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
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
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
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
            <h3 className="text-base font-bold text-[var(--text-primary)]">Placement Notifications</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Control when and how you receive alerts regarding interview invitations and application changes.
            </p>
          </div>

          <div className="divide-y divide-[var(--glass-border)] text-xs">
            <div className="py-3.5 flex items-center justify-between">
              <div>
                <strong className="block text-[var(--text-primary)] font-semibold">Interview Round Reminders</strong>
                <span className="text-[var(--text-secondary)]">Receive email alerts 24 hours and 1 hour before scheduled rounds.</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifications.interviewEmail}
                onClick={() => toggleNotif('interviewEmail')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  notifications.interviewEmail ? 'bg-[var(--color-accent)]' : 'bg-[var(--surface-glass)] border border-[var(--glass-border)]'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    notifications.interviewEmail ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div>
                <strong className="block text-[var(--text-primary)] font-semibold">Application Stage Updates</strong>
                <span className="text-[var(--text-secondary)]">Instant notifications when your status shifts to Shortlisted or Interview.</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifications.stageUpdates}
                onClick={() => toggleNotif('stageUpdates')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  notifications.stageUpdates ? 'bg-[var(--color-accent)]' : 'bg-[var(--surface-glass)] border border-[var(--glass-border)]'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    notifications.stageUpdates ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div>
                <strong className="block text-[var(--text-primary)] font-semibold">New Corporate Placement Drives</strong>
                <span className="text-[var(--text-secondary)]">Alerts when new hiring partners open applications for your batch.</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={notifications.newDrives}
                onClick={() => toggleNotif('newDrives')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  notifications.newDrives ? 'bg-[var(--color-accent)]' : 'bg-[var(--surface-glass)] border border-[var(--glass-border)]'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    notifications.newDrives ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </SpotlightCard>

        {/* Privacy & Benchmark */}
        <SpotlightCard className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--glass-border)]">
          <div className="mb-4">
            <h3 className="text-base font-bold text-[var(--text-primary)]">Privacy & Recruiter Visibility</h3>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Manage data sharing permissions with verified corporate recruiters.
            </p>
          </div>

          <div className="divide-y divide-[var(--glass-border)] text-xs">
            <div className="py-3.5 flex items-center justify-between">
              <div>
                <strong className="block text-[var(--text-primary)] font-semibold">Corporate Recruiter Discoverability</strong>
                <span className="text-[var(--text-secondary)]">Allow hiring partners to discover your profile based on verified skill tags.</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={privacy.recruiterDiscoverable}
                onClick={() => togglePrivacy('recruiterDiscoverable')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  privacy.recruiterDiscoverable ? 'bg-[var(--color-accent)]' : 'bg-[var(--surface-glass)] border border-[var(--glass-border)]'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    privacy.recruiterDiscoverable ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div>
                <strong className="block text-[var(--text-primary)] font-semibold">Anonymous Peer Benchmarking</strong>
                <span className="text-[var(--text-secondary)]">Contribute anonymized CGPA and ATS score statistics to placement cohort analytics.</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={privacy.peerBenchmarking}
                onClick={() => togglePrivacy('peerBenchmarking')}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  privacy.peerBenchmarking ? 'bg-[var(--color-accent)]' : 'bg-[var(--surface-glass)] border border-[var(--glass-border)]'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    privacy.peerBenchmarking ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </SpotlightCard>

        {/* Prototype Technical Disclosure Notice */}
        <div className="p-4 rounded-2xl bg-[var(--surface-glass)] border border-[var(--glass-border)] text-xs text-[var(--text-muted)] space-y-1">
          <strong className="text-[var(--text-primary)] block">Stage G3 Architecture Disclosure</strong>
          <p>
            Preferences modified in this view are maintained in persistent client-side application memory.
            In production deployments, settings synchronize via institutional student identity services.
          </p>
        </div>
      </div>
    </section>
  )
}
