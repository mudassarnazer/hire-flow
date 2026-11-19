// LandingPage component – extracted from App.jsx
// Receives onViewChange prop to switch views (e.g., to the dashboard)


import Button from './common/Button';
import Badge from './common/Badge';
import SpotlightCard from './glass/SpotlightCard';
import JobCard from './JobCard';
import jobsData from '../jobsData';

export default function LandingPage({ onViewChange }) {
  return (
    <>
      {/* ---------- HERO SECTION (unchanged markup) ---------- */}
      <main className="hero-section">
        <div className="hero-content">
          <div className="hero-badge-wrap">
            <Badge variant="primary" dot size="md">
              ✦ Campus Recruitment Platform
            </Badge>
          </div>

          <h1 className="hero-title">
            Discover Opportunities.<br />
            <span className="hero-title-gradient">Build Your Future.</span>
          </h1>

          <p className="hero-description">
            Your next opportunity starts here. Explore internships,
            discover top placement drives, and connect with companies that match your ambitions.
          </p>

          <div className="hero-actions">
            {/* Tier‑1 CTA – primary */}
            <Button
              variant="primary"
              size="lg"
              onClick={() => onViewChange('dashboard')}
            >
              <span>Student Portal Dashboard</span>
              <span aria-hidden="true">→</span>
            </Button>

            {/* Tier‑2 CTA – secondary, scrolls to opportunities */}
            <Button
              variant="secondary"
              size="lg"
              onClick={e => {
                if (e) e.preventDefault();
                document
                  .querySelector('.featured-section')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Explore Opportunities</span>
              <span aria-hidden="true">↓</span>
            </Button>
          </div>

          {/* ---------- HERO STATISTICS (preserve original divs) ---------- */}
          <div className="hero-stats">
            <div className="hero-stat-item">
              <span className="hero-stat-value">10K+</span>
              <span className="hero-stat-label">Opportunities</span>
            </div>

            <div className="hero-stat-item">
              <span className="hero-stat-value">500+</span>
              <span className="hero-stat-label">Companies</span>
            </div>

            <div className="hero-stat-item">
              <span className="hero-stat-value">5K+</span>
              <span className="hero-stat-label">Students</span>
            </div>
          </div>
        </div>

        {/* ---------- PREVIEW SPOTLIGHT CARDS (identical to App.jsx) ---------- */}
        <div
          className="hero-visual"
          role="region"
          aria-label="Placement preview highlights"
        >
          <SpotlightCard
            className="preview-card-one"
            onClick={() => onViewChange('dashboard')}
            role="button"
            tabIndex={0}
            aria-label="View Google Software Developer Intern placement drive in Student Dashboard"
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onViewChange('dashboard');
              }
            }}
            title="Click to view Student Dashboard"
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold text-slate-400">
                Recommended Drive
              </span>
              <Badge variant="accent" size="sm">✦ Tier-1 Match</Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-[0_0_12px_rgba(56,189,248,0.3)] shrink-0">
                G
              </div>
              <div className="min-w-0">
                <strong className="block text-sm font-bold text-[#f8fafc] truncate">
                  Software Developer Intern
                </strong>
                <p className="text-xs text-[#94a3b8] truncate">
                  Google • Bengaluru • <span className="text-sky-300 font-mono font-medium">₹30K/mo</span>
                </p>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard
            className="preview-card-two"
            onClick={() => onViewChange('dashboard')}
            role="button"
            tabIndex={0}
            aria-label="View Technical Round 2 interview in Student Dashboard"
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onViewChange('dashboard');
              }
            }}
            title="Click to view Student Dashboard"
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold text-slate-400">
                Application Pipeline
              </span>
              <Badge variant="warning" dot size="sm">Interview</Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300 font-bold text-sm shrink-0">
                🎯
              </div>
              <div className="min-w-0">
                <strong className="block text-sm font-bold text-[#f8fafc] truncate">
                  Technical Round 2
                </strong>
                <p className="text-xs text-[#94a3b8] truncate">
                  Next: <span className="text-amber-300 font-medium">Tomorrow, 10:30 AM</span>
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </main>

      {/* ---------- FEATURED OPPORTUNITIES SECTION ---------- */}
      <section id="opportunities" className="featured-section">
        <div className="featured-heading">
          <span className="featured-heading-kicker">CAREER OPPORTUNITIES</span>
          <h2 className="featured-heading-title">Featured Opportunities</h2>
          <p className="featured-heading-desc">
            Discover opportunities that match your ambitions. Explore active placement drives from
            leading hiring partners.
          </p>
        </div>

        {/* Job grid – unchanged, no ScrollReveal wrapper */}
        <div className="jobs-grid">
          {jobsData.map(job => (
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
  );
}
