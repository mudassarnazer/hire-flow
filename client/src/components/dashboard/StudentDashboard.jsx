/**
 * HIRE-FLOW — Student Placement Dashboard (Stage G3)
 * Modern Enterprise Architecture: Responsive Sidebar, Top Navigation Strip,
 * Multi-Tab Navigation & Production Dual-Theme Polishing.
 * Developer Attribution: MUDASSAR NAZER
 */

import { useState, useMemo } from 'react'
import DashboardSidebar from './DashboardSidebar'
import DashboardTopNav from './DashboardTopNav'
import DashboardHeader from './DashboardHeader'
import ApplicationTracker from './ApplicationTracker'
import UpcomingSchedule from './UpcomingSchedule'
import BrowseOpportunitiesView from './BrowseOpportunitiesView'
import SavedOpportunitiesView from './SavedOpportunitiesView'
import StudentProfileView from './StudentProfileView'
import DashboardSettingsView from './DashboardSettingsView'
import StatCard from '../common/StatCard'
import JobCard from '../JobCard'
import mockStudentData from '../../data/studentData'
import jobsData from '../../jobsData'
import { calculateProfileCompletion } from './profileUtils'
import './StudentDashboard.css'

const TAB_LABELS = {
  overview: 'Overview',
  applications: 'My Applications',
  opportunities: 'Browse Drives',
  saved: 'Saved Opportunities',
  profile: 'Student Profile & ATS',
  settings: 'Settings & Preferences',
}

function StudentDashboard({ onViewChange }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [globalSearchQuery, setGlobalSearchQuery] = useState('')
  const [savedJobIds, setSavedJobIds] = useState(() => new Set([1])) // Seed initial bookmarked sample
  const [appliedJobIds, setAppliedJobIds] = useState(() => new Set())
  const [applications, setApplications] = useState(mockStudentData.applications)
  const [profile, setProfile] = useState(mockStudentData.profile)

  // Toggle bookmarking a job
  const handleToggleSaveJob = (jobId) => {
    setSavedJobIds((prev) => {
      const next = new Set(prev)
      if (next.has(jobId)) {
        next.delete(jobId)
      } else {
        next.add(jobId)
      }
      return next
    })
  }

  // Handle simulated job application submission
  const handleApplyJob = (jobId) => {
    setAppliedJobIds((prev) => {
      const next = new Set(prev)
      next.add(jobId)
      return next
    })

    const job = jobsData.find((j) => j.id === jobId)
    if (job) {
      setApplications((prev) => {
        const existingApp = prev.find((a) => a.id === `app-job-${job.id}`)
        if (existingApp) return prev

        const newApp = {
          id: `app-job-${job.id}`,
          company: job.company,
          role: job.title,
          location: job.location,
          stipend: job.salary,
          appliedDate: 'Today (Simulated)',
          currentStage: 'Application Submitted (Sample)',
          status: 'Under Review',
          statusVariant: 'accent',
          nextAction: 'Demonstration review process',
          isSample: true,
        }
        return [newApp, ...prev]
      })
    }
  }

  const handleUpdateProfile = (updates) => {
    setProfile((prev) => ({
      ...prev,
      ...updates,
    }))
  }

  // Derive dynamic metrics from applications state
  const totalSubmitted = applications.length
  const underReviewCount = applications.filter((app) => app.status === 'Under Review').length
  const interviewsCount = applications.filter((app) => app.status === 'Interview Scheduled').length
  const offersCount = applications.filter((app) => app.status === 'Offer Received').length

  const dynamicMetrics = useMemo(() => {
    return mockStudentData.metrics.map((metric) => {
      switch (metric.label) {
        case 'Applications Submitted':
          return { ...metric, value: String(totalSubmitted) }
        case 'Under Review':
          return {
            ...metric,
            value: String(underReviewCount),
            trend: `${underReviewCount} active sample processes`,
          }
        case 'Interviews Scheduled':
          return { ...metric, value: String(interviewsCount) }
        case 'Offers Received':
          return { ...metric, value: String(offersCount) }
        default:
          return metric
      }
    })
  }, [totalSubmitted, underReviewCount, interviewsCount, offersCount])

  // Dynamic profile completion
  const { percentage: profileCompletionPercent } = calculateProfileCompletion(profile)

  // Badge counts for sidebar
  const sidebarCounts = {
    applicationsCount: totalSubmitted,
    opportunitiesCount: jobsData.length,
    savedCount: savedJobIds.size,
    profileCompletionBadge: `${profileCompletionPercent}% (Sample)`,
  }

  // Filter preview opportunities on overview tab when global search query is active
  const overviewPreviewJobs = useMemo(() => {
    if (!globalSearchQuery.trim()) return jobsData.slice(0, 2)
    const q = globalSearchQuery.trim().toLowerCase()
    return jobsData.filter(
      (job) =>
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.skills.some((s) => s.toLowerCase().includes(q))
    )
  }, [globalSearchQuery])

  return (
    <div className="student-dashboard-root">
      <div className="student-dashboard-workspace">
        {/* A. SIDEBAR / NAVIGATION */}
        <DashboardSidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          counts={sidebarCounts}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          onExitToLanding={() => onViewChange?.('landing')}
          profile={profile}
        />

        {/* Content Area */}
        <div className="dashboard-content-area">
          {/* B. TOP NAVIGATION */}
          <DashboardTopNav
            activeTab={activeTab}
            activeTabLabel={TAB_LABELS[activeTab] || 'Dashboard'}
            searchQuery={globalSearchQuery}
            onSearchChange={setGlobalSearchQuery}
            isSidebarOpen={isMobileSidebarOpen}
            onOpenSidebar={() => setIsMobileSidebarOpen(true)}
            onSelectTab={setActiveTab}
            profile={profile}
            notifications={mockStudentData.upcomingSchedule}
          />

          {/* Main Tab Views */}
          <main className="dashboard-main-view">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="tab-pane tab-pane--overview">
                {/* C. STUDENT OVERVIEW WELCOME HEADER */}
                <DashboardHeader
                  profile={profile}
                  onExploreJobs={() => setActiveTab('opportunities')}
                  onViewSchedule={() => {
                    const el = document.getElementById('upcoming-schedule-aside')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  onOpenProfile={() => setActiveTab('profile')}
                />

                {/* KPI Metrics Row */}
                <section
                  className="dashboard-metrics-grid"
                  aria-label="Placement KPI Metrics"
                >
                  {dynamicMetrics.map((metric) => (
                    <StatCard
                      key={metric.id}
                      value={metric.value}
                      label={metric.label}
                      icon={metric.icon}
                      trend={metric.trend}
                      accent={metric.accent}
                    />
                  ))}
                </section>

                {/* Asymmetric 2-Column Bento Workspace */}
                <div className="dashboard-overview-bento">
                  {/* Left Main Column: Application Tracker & Matched Drives */}
                  <div className="dashboard-overview-main space-y-6">
                    {/* D. APPLICATION TRACKING */}
                    <ApplicationTracker
                      applications={applications}
                      searchQuery={globalSearchQuery}
                      onSearchChange={setGlobalSearchQuery}
                    />

                    {/* E. RECOMMENDED OPPORTUNITIES PREVIEW */}
                    <section className="dashboard-jobs-preview p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--glass-border)]">
                      <div className="flex items-center justify-between pb-4 mb-5 border-b border-[var(--glass-border)] flex-wrap gap-3">
                        <div>
                          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--color-accent)] font-mono block mb-1">
                            CURATED SAMPLE DRIVES
                          </span>
                          <h2 className="text-xl font-bold text-[var(--text-primary)]">
                            Recommended Sample Opportunities
                          </h2>
                          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                            Sample roles matching candidate technical skills: {(profile.skills || []).slice(0, 3).join(', ')}.
                          </p>
                        </div>

                        <button
                          type="button"
                          className="text-xs font-bold text-[var(--color-accent)] hover:underline flex items-center gap-1 cursor-pointer"
                          onClick={() => setActiveTab('opportunities')}
                        >
                          <span>View All Sample Drives ({jobsData.length})</span>
                          <span aria-hidden="true">→</span>
                        </button>
                      </div>

                      {overviewPreviewJobs.length === 0 ? (
                        <div className="text-center py-8 text-xs text-[var(--text-secondary)]">
                          No sample drives match &ldquo;{globalSearchQuery}&rdquo;.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {overviewPreviewJobs.slice(0, 2).map((job) => (
                            <JobCard
                              key={job.id}
                              title={job.title}
                              company={job.company}
                              location={job.location}
                              type={job.type}
                              salary={job.salary}
                              skills={job.skills}
                              isSaved={savedJobIds.has(job.id)}
                              onToggleSave={() => handleToggleSaveJob(job.id)}
                              onViewDetails={() => setActiveTab('opportunities')}
                            />
                          ))}
                        </div>
                      )}
                    </section>
                  </div>

                  {/* Right Sidebar Column: Upcoming Schedule & ATS Score */}
                  <div id="upcoming-schedule-aside" className="dashboard-overview-aside">
                    <UpcomingSchedule
                      schedule={mockStudentData.upcomingSchedule}
                      resumeScore={profile.resumeScore}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MY APPLICATIONS */}
            {activeTab === 'applications' && (
              <div className="tab-pane tab-pane--applications">
                <ApplicationTracker
                  applications={applications}
                  searchQuery={globalSearchQuery}
                  onSearchChange={setGlobalSearchQuery}
                />
              </div>
            )}

            {/* TAB 3: BROWSE OPPORTUNITIES */}
            {activeTab === 'opportunities' && (
              <div className="tab-pane tab-pane--opportunities">
                <BrowseOpportunitiesView
                  jobs={jobsData}
                  savedJobIds={savedJobIds}
                  appliedJobIds={appliedJobIds}
                  onToggleSaveJob={handleToggleSaveJob}
                  onApplyJob={handleApplyJob}
                  searchQuery={globalSearchQuery}
                  onSearchChange={setGlobalSearchQuery}
                />
              </div>
            )}

            {/* TAB 4: SAVED OPPORTUNITIES */}
            {activeTab === 'saved' && (
              <div className="tab-pane tab-pane--saved">
                <SavedOpportunitiesView
                  jobs={jobsData}
                  savedJobIds={savedJobIds}
                  onToggleSaveJob={handleToggleSaveJob}
                  onNavigateToBrowse={() => setActiveTab('opportunities')}
                  searchQuery={globalSearchQuery}
                />
              </div>
            )}

            {/* TAB 5: STUDENT PROFILE & ATS */}
            {activeTab === 'profile' && (
              <div className="tab-pane tab-pane--profile">
                <StudentProfileView
                  profile={profile}
                  onUpdateProfile={handleUpdateProfile}
                />
              </div>
            )}

            {/* TAB 6: SETTINGS & PREFERENCES */}
            {activeTab === 'settings' && (
              <div className="tab-pane tab-pane--settings">
                <DashboardSettingsView />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
