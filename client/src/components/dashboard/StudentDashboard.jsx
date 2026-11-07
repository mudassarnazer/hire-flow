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
          {mockStudentData.metrics.map((metric) => (
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
            <ApplicationTracker applications={mockStudentData.applications} />

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
