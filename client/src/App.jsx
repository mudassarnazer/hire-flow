import Navbar from './components/navbar'
import JobCard from './components/JobCard'
import jobsData from './jobsData'
import './App.css'

function App() {
  return (
    <>
      <Navbar />

      <main className="hero-section">
        <div className="hero-glow"></div>

        <div className="hero-content">
          <span className="hero-badge">
            ✦ Your Career. Your Future.
          </span>

          <h1>
            Discover Opportunities.
            <br />
            <span>Build Your Future.</span>
          </h1>

          <p className="hero-description">
            Your next opportunity starts here.
            Explore internships, discover jobs and
            connect with companies that match your ambitions.
          </p>

          <div className="hero-actions">
            <a href="/jobs" className="hero-primary-btn">
              Explore Opportunities →
            </a>

            <a href="/about" className="hero-secondary-btn">
              Learn More
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <h3>10K+</h3>
              <p>Opportunities</p>
            </div>

            <div>
              <h3>500+</h3>
              <p>Companies</p>
            </div>

            <div>
              <h3>5K+</h3>
              <p>Students</p>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card card-one">
            <span>✦</span>
            <div>
              <strong>New opportunity</strong>
              <p>Software Developer Intern</p>
            </div>
          </div>

          <div className="floating-card card-two">
            <span>✓</span>
            <div>
              <strong>Application tracked</strong>
              <p>Your journey is progressing</p>
            </div>
          </div>
        </div>
      </main>
      <section className="featured-section">
  <div className="featured-heading">
    <span>CAREER OPPORTUNITIES</span>
    <h2>Featured Opportunities</h2>
    <p>Discover opportunities that match your ambitions.</p>
  </div>

  <div className="jobs-grid">
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
    </>
  )
}

export default App