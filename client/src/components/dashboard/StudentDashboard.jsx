import { useRef } from 'react'
import DashboardHeader from './DashboardHeader'
import ApplicationTracker from './ApplicationTracker'
import UpcomingSchedule from './UpcomingSchedule'
import StatCard from '../common/StatCard'
import JobCard from '../JobCard'
import mockStudentData from '../../data/studentData'
import jobsData from '../../jobsData'
import './StudentDashboard.css'

function StudentDashboard() {
  const jobsRef = useRef(null)

  const handleScrollToJobs = () => {
    jobsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Derive dynamic metrics from the mock student applications array
  const applications = mockStudentData.applications

  const totalSubmitted = applications.length
  const underReviewCount = applications.filter((app) => app.status === 'Under Review').length
  const interviewsCount = applications.filter((app) => app.status === 'Interview Scheduled').length
  const offersCount = applications.filter((app) => app.status === 'Offer Received').length

  const dynamicMetrics = mockStudentData.metrics.map((metric) => {
    switch (metric.label) {
      case 'Applications Submitted':
        return { ...metric, value: String(totalSubmitted) }
      case 'Under Review':
        return {
          ...metric,
          value: String(underReviewCount),
          trend: `${underReviewCount} active processes`,
        }
      case 'Interviews Scheduled':
        return { ...metric, value: String(interviewsCount) }
      case 'Offers Received':
        return { ...metric, value: String(offersCount) }
      default:
        return metric
    }
  })

  return (
    <main className="student-dashboard">
      <div className="student-dashboard__container">
        {/* Profile Welcome Header */}
        <DashboardHeader
          profile={mockStudentData.profile}
          onExploreJobs={handleScrollToJobs}
        />

        {/* Top KPI Metrics Row */}
        <section className="student-dashboard__metrics">
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

        {/* 2-Column Main Workspace */}
        <div className="student-dashboard__layout">
          {/* Main Column */}
          <div className="student-dashboard__main">
            {/* Application Pipeline */}
            <ApplicationTracker applications={applications} />

            {/* Recommended Opportunities using Existing JobCard */}
            <section ref={jobsRef} className="dashboard-jobs-section">
              <div className="dashboard-jobs-section__header">
                <div>
                  <span className="dashboard-jobs-section__kicker">MATCHED OPPORTUNITIES</span>
                  <h2 className="dashboard-jobs-section__title">Recommended for Your Profile</h2>
                  <p className="dashboard-jobs-section__subtitle">
                    Opportunities matching your skills: {mockStudentData.profile.skills.slice(0, 3).join(', ')} & more.
                  </p>
                </div>
              </div>

              <div className="dashboard-jobs-grid">
                {jobsData.map((job) => (
                  <JobCard
                    key={job.id}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    type={job.type}
                    salary={job.salary}
                    skills={job.skills}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar Column */}
          <div className="student-dashboard__sidebar">
            <UpcomingSchedule
              schedule={mockStudentData.upcomingSchedule}
              resumeScore={mockStudentData.profile.resumeScore}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default StudentDashboard
