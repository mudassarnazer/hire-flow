/**
 * HIRE-FLOW — Flagship Landing Page (Stage G2)
 * Executive Product Experience for Campus Recruitment & Placement
 * Developer Attribution: MUDASSAR NAZER
 *
 * NOTE: All student records, company listings, interview schedules, and offer
 * details presented across this landing page are sample demonstration data
 * for UI evaluation and prototyping. No live institutional backend or database
 * is connected.
 */

import { useState } from 'react'
import Button from './common/Button'
import Badge from './common/Badge'
import SpotlightCard from './glass/SpotlightCard'
import JobCard from './JobCard'
import jobsData from '../jobsData'
import { mockStudentData } from '../data/studentData'
import { StatusBeacon, ScrollReveal } from './ObsidianGlassUI'

export default function LandingPage({ onViewChange }) {
  const [activeShowcaseTab, setActiveShowcaseTab] = useState('pipeline')
  const [jobFilter, setJobFilter] = useState('all')

  const filteredJobs = jobsData.filter((job) => {
    if (jobFilter === 'all') return true
    return job.type === jobFilter
  })

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div id="home" className="landing-root">
      {/* ====================================================================
          1. HERO SECTION — Asymmetric Executive Presentation
          ==================================================================== */}
      <main className="hero-section" aria-label="Hero section">
        <div className="hero-content">
          <div className="hero-badge-wrap">
            <Badge variant="hero" dot size="md">
              ✦ CAMPUS RECRUITMENT OPERATING SYSTEM
            </Badge>
          </div>

          <h1 className="hero-title">
            Discover Opportunities.<br />
            <span className="hero-title-gradient">Accelerate Your Placement.</span>
          </h1>

          <p className="hero-description">
            HIRE-FLOW is an interactive campus recruitment operating system engineered for engineering cohorts.
            Experience deterministic multi-stage application tracking, simulated interview schedules,
            and structured placement drives in a unified, high-clarity interface.
          </p>

          <div className="hero-actions">
            <Button
              variant="primary"
              size="lg"
              magnetic
              onClick={() => onViewChange('dashboard')}
              aria-label="Launch Student Portal Dashboard"
            >
              <span>Launch Student Portal</span>
              <span aria-hidden="true">→</span>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection('opportunities')}
              aria-label="Explore Placement Drives"
            >
              <span>Explore Placement Drives</span>
              <span aria-hidden="true">↓</span>
            </Button>
          </div>

          {/* Capability-based Indicators (Audited for authenticity) */}
          <div className="hero-capabilities" role="list" aria-label="Platform capabilities">
            <div className="capability-item" role="listitem">
              <span className="capability-value">Multi-Round</span>
              <span className="capability-label">Deterministic Stage Tracking</span>
            </div>

            <div className="capability-item" role="listitem">
              <span className="capability-value">Curated</span>
              <span className="capability-label">Structured Role Profiles</span>
            </div>

            <div className="capability-item" role="listitem">
              <span className="capability-value">Live Sync</span>
              <span className="capability-label">Interview Schedules & Agendas</span>
            </div>
          </div>
        </div>

        {/* Asymmetric Visual Preview Composition */}
        <div
          className="hero-visual"
          role="region"
          aria-label="Interactive placement preview highlights"
        >
          {/* Main Specular Drive Preview Card */}
          <SpotlightCard
            className="preview-card-one"
            onClick={() => onViewChange('dashboard')}
            role="button"
            tabIndex={0}
            aria-label="View Google Software Developer Intern sample drive in Student Dashboard"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onViewChange('dashboard')
              }
            }}
            title="Click to view Student Dashboard"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[var(--text-secondary)]">
                Sample Opportunity Drive
              </span>
              <Badge variant="neutral" size="sm">Demo Record</Badge>
            </div>

            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[#4338CA] flex items-center justify-center text-white font-extrabold text-base shadow-[var(--shadow-accent)] shrink-0 border border-white/20">
                G
              </div>
              <div className="min-w-0">
                <strong className="block text-sm font-bold text-[var(--text-primary)] truncate">
                  Software Developer Intern
                </strong>
                <p className="text-xs text-[var(--text-secondary)] truncate">
                  Google • Bengaluru • <span className="text-[var(--color-accent)] font-mono font-medium">₹30K/mo</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-[var(--glass-border)]">
              <span className="text-[10.5px] px-2 py-0.5 rounded-md bg-[var(--surface-card)] text-[var(--text-secondary)] border border-[var(--glass-border)]">React</span>
              <span className="text-[10.5px] px-2 py-0.5 rounded-md bg-[var(--surface-card)] text-[var(--text-secondary)] border border-[var(--glass-border)]">JavaScript</span>
              <span className="text-[10.5px] px-2 py-0.5 rounded-md bg-[var(--surface-card)] text-[var(--text-secondary)] border border-[var(--glass-border)]">Node.js</span>
              <span className="ml-auto text-[11px] font-semibold text-[var(--color-accent)] flex items-center gap-1">
                View in Portal →
              </span>
            </div>
          </SpotlightCard>

          {/* Secondary Floating Round Status Card */}
          <SpotlightCard
            className="preview-card-two"
            onClick={() => onViewChange('dashboard')}
            role="button"
            tabIndex={0}
            aria-label="View Technical Round 2 simulated interview in Student Dashboard"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onViewChange('dashboard')
              }
            }}
            title="Click to view Student Dashboard"
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold text-[var(--text-secondary)]">
                Sample Interview Pipeline
              </span>
              <Badge variant="warning" dot size="sm">Interview Scheduled</Badge>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300 font-bold text-sm shrink-0">
                🎯
              </div>
              <div className="min-w-0">
                <strong className="block text-sm font-bold text-[var(--text-primary)] truncate">
                  Technical Round 2
                </strong>
                <p className="text-xs text-[var(--text-secondary)] truncate">
                  Schedule: <span className="text-amber-400 font-medium font-mono">Tomorrow, 10:30 AM</span>
                </p>
              </div>
            </div>
          </SpotlightCard>

          {/* Prototype Demonstration Status Pill */}
          <div className="preview-status-pill">
            <StatusBeacon variant="emerald" label="Interactive Prototype Active" />
          </div>
        </div>
      </main>

      {/* ====================================================================
          2. PRODUCT & INTERFACE SHOWCASE — Authentic Student Cockpit
          ==================================================================== */}
      <section id="showcase" className="showcase-section" aria-labelledby="showcase-heading">
        <ScrollReveal>
          <div className="section-header text-center">
            <span className="section-kicker">INTERACTIVE INTERFACE EXPERIENCE</span>
            <h2 id="showcase-heading" className="section-title">
              A Unified Control Center for Campus Placement
            </h2>
            <p className="section-subtitle">
              The interactive cockpit below demonstrates the HIRE-FLOW student interface using simulated
              records. Review active applications, scheduled rounds, and placement milestones in one coherent view.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="showcase-cockpit">
            {/* Cockpit Window Header */}
            <div className="cockpit-header">
              <div className="cockpit-dots" aria-hidden="true">
                <span className="dot dot--red" />
                <span className="dot dot--amber" />
                <span className="dot dot--emerald" />
              </div>

              <div className="cockpit-search">
                <span className="search-icon" aria-hidden="true">🔍</span>
                <span className="search-text">Search active applications, rounds, companies...</span>
              </div>

              <div className="cockpit-profile">
                <div className="profile-chip">
                  <span className="profile-initials">PS</span>
                  <span className="profile-name">Priya Sharma • Sample Profile</span>
                  <Badge variant="neutral" size="sm">Demo Data</Badge>
                </div>
              </div>
            </div>

            {/* Metrics Strip */}
            <div className="cockpit-metrics">
              {mockStudentData.metrics.map((metric) => (
                <div key={metric.id} className="cockpit-metric-card">
                  <div className="metric-header">
                    <span className="metric-icon" aria-hidden="true">{metric.icon}</span>
                    <span className="metric-trend">{metric.trend}</span>
                  </div>
                  <div className="metric-value">{metric.value}</div>
                  <div className="metric-label">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Interactive Showcase Tabs */}
            <div className="cockpit-tabs-bar">
              <div className="cockpit-tabs" role="tablist" aria-label="Showcase dashboard views">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeShowcaseTab === 'pipeline'}
                  className={`cockpit-tab ${activeShowcaseTab === 'pipeline' ? 'cockpit-tab--active' : ''}`}
                  onClick={() => setActiveShowcaseTab('pipeline')}
                >
                  <span>Active Applications Pipeline</span>
                  <span className="tab-count">{mockStudentData.applications.length}</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeShowcaseTab === 'schedule'}
                  className={`cockpit-tab ${activeShowcaseTab === 'schedule' ? 'cockpit-tab--active' : ''}`}
                  onClick={() => setActiveShowcaseTab('schedule')}
                >
                  <span>Upcoming Round Schedule</span>
                  <span className="tab-count">{mockStudentData.upcomingSchedule.length}</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeShowcaseTab === 'offers'}
                  className={`cockpit-tab ${activeShowcaseTab === 'offers' ? 'cockpit-tab--active' : ''}`}
                  onClick={() => setActiveShowcaseTab('offers')}
                >
                  <span>Simulated Offer Summary</span>
                  <span className="tab-count">1</span>
                </button>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => onViewChange('dashboard')}
                aria-label="Switch to Student Dashboard"
              >
                <span>Launch Live Portal</span>
                <span aria-hidden="true">→</span>
              </Button>
            </div>

            {/* Tab Panels */}
            <div className="cockpit-panel" role="tabpanel">
              {activeShowcaseTab === 'pipeline' && (
                <div className="pipeline-table">
                  <div className="pipeline-header-row">
                    <span className="col-company">Company & Role</span>
                    <span className="col-stage">Current Stage</span>
                    <span className="col-status">Status</span>
                    <span className="col-action">Next Action</span>
                  </div>

                  {mockStudentData.applications.map((app) => (
                    <div key={app.id} className="pipeline-row">
                      <div className="col-company">
                        <div className="app-company-wrap">
                          <div className="app-company-badge">
                            {app.company.charAt(0)}
                          </div>
                          <div>
                            <strong className="app-role">{app.role}</strong>
                            <span className="app-meta">{app.company} • {app.location} • {app.stipend}</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-stage">
                        <span className="stage-pill">{app.currentStage}</span>
                      </div>

                      <div className="col-status">
                        <Badge
                          variant={app.statusVariant === 'warning' ? 'warning' : app.statusVariant === 'success' ? 'success' : app.statusVariant === 'accent' ? 'accent' : 'neutral'}
                          dot
                          size="sm"
                        >
                          {app.status}
                        </Badge>
                      </div>

                      <div className="col-action">
                        <span className="action-text">{app.nextAction}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeShowcaseTab === 'schedule' && (
                <div className="schedule-preview-list">
                  {mockStudentData.upcomingSchedule.map((item) => (
                    <div key={item.id} className="schedule-preview-card">
                      <div className="schedule-icon-wrap" aria-hidden="true">📅</div>
                      <div className="schedule-details">
                        <div className="schedule-top">
                          <strong className="schedule-company">{item.company} — {item.role}</strong>
                          <Badge variant="warning" size="sm">Sample Round</Badge>
                        </div>
                        <p className="schedule-round">{item.round}</p>
                        <div className="schedule-meta-row">
                          <span className="meta-time">🕒 Tomorrow, 10:30 AM – 11:30 AM IST</span>
                          <span className="meta-link">📹 Meeting Preview (Simulation)</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeShowcaseTab === 'offers' && (
                <div className="offers-preview-box">
                  <div className="offer-celebration-badge">
                    <span aria-hidden="true">🏆</span>
                    <span>1 Simulated Offer Record (Demonstration Data)</span>
                  </div>

                  <div className="offer-summary-card">
                    <div className="offer-company-info">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-extrabold text-lg">
                        A
                      </div>
                      <div>
                        <h4 className="offer-role-title">Cloud Support Associate</h4>
                        <p className="offer-sub">Amazon • Remote • Sample Offer Record</p>
                      </div>
                    </div>

                    <div className="offer-terms">
                      <div className="term-item">
                        <span className="term-label">Sample CTC Package</span>
                        <strong className="term-value text-[var(--color-accent)] font-mono">₹8–12 LPA</strong>
                      </div>
                      <div className="term-item">
                        <span className="term-label">Demonstration Status</span>
                        <strong className="term-value text-emerald-400">Sample Record (UI Prototype)</strong>
                      </div>
                      <div className="term-item">
                        <span className="term-label">Decision Timeline</span>
                        <strong className="term-value">28 Nov 2026</strong>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onViewChange('dashboard')}
                      className="mt-4"
                    >
                      <span>Review Offer in Dashboard</span>
                      <span aria-hidden="true">→</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Showcase Footnote */}
            <div className="cockpit-footer">
              <span className="footer-status-text">
                ✦ Displaying mock student data for UI demonstration. No live backend database or external authentication is connected.
              </span>
              <button
                type="button"
                className="footer-portal-link"
                onClick={() => onViewChange('dashboard')}
              >
                Access Full Interactive Student Portal →
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ====================================================================
          3. HOW IT WORKS — Structured 4-Step Recruitment Journey
          ==================================================================== */}
      <section id="workflow" className="workflow-section" aria-labelledby="workflow-heading">
        <ScrollReveal>
          <div className="section-header text-center">
            <span className="section-kicker">RECRUITMENT WORKFLOW DESIGN</span>
            <h2 id="workflow-heading" className="section-title">
              Four Steps from Registration to Offer Review
            </h2>
            <p className="section-subtitle">
              A structured workflow model designed to replace fragmented email chains
              and spreadsheet chaos with clear stage visibility.
            </p>
          </div>
        </ScrollReveal>

        <div className="workflow-grid">
          <ScrollReveal delay={80}>
            <div className="workflow-step-card">
              <div className="step-number" aria-hidden="true">01</div>
              <div className="step-badge-wrap">
                <Badge variant="primary" size="sm">Profile Baseline</Badge>
              </div>
              <h3 className="step-title">Academic & Skill Profiling</h3>
              <p className="step-desc">
                Organize academic coursework, CGPA records, and technical proficiencies
                into a standardized recruitment profile for placement evaluation.
              </p>
              <div className="step-footer-tag">
                <span className="tag-dot" aria-hidden="true" />
                <span>Eligibility Threshold Modeling</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <div className="workflow-step-card">
              <div className="step-number" aria-hidden="true">02</div>
              <div className="step-badge-wrap">
                <Badge variant="accent" size="sm">Curated Drives</Badge>
              </div>
              <h3 className="step-title">Explore Structured Placement Drives</h3>
              <p className="step-desc">
                Browse corporate placement opportunities. Review clear stipend details,
                skill requirements, and submit applications directly through the portal.
              </p>
              <div className="step-footer-tag">
                <span className="tag-dot" aria-hidden="true" />
                <span>Explicit Compensation Structures</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <div className="workflow-step-card">
              <div className="step-number" aria-hidden="true">03</div>
              <div className="step-badge-wrap">
                <Badge variant="warning" size="sm">Deterministic Tracking</Badge>
              </div>
              <h3 className="step-title">Multi-Round Pipeline Tracking</h3>
              <p className="step-desc">
                Track progress through screening, assessments, and technical interviews
                with clear stage status indicators and interview preparation reminders.
              </p>
              <div className="step-footer-tag">
                <span className="tag-dot" aria-hidden="true" />
                <span>Scheduled Agenda Previews</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={320}>
            <div className="workflow-step-card">
              <div className="step-number" aria-hidden="true">04</div>
              <div className="step-badge-wrap">
                <Badge variant="success" size="sm">Offer Finalization</Badge>
              </div>
              <h3 className="step-title">Offer Management & Decision</h3>
              <p className="step-desc">
                Review offer documentation, package breakdowns, and decision deadlines
                within the application dashboard.
              </p>
              <div className="step-footer-tag">
                <span className="tag-dot" aria-hidden="true" />
                <span>Workflow-Driven Offer Tracking</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ====================================================================
          4. CORE FEATURES & CAPABILITIES — Asymmetric Bento Treatment
          ==================================================================== */}
      <section id="features" className="features-section" aria-labelledby="features-heading">
        <ScrollReveal>
          <div className="section-header text-center">
            <span className="section-kicker">SYSTEM CAPABILITY MATRIX</span>
            <h2 id="features-heading" className="section-title">
              Built for Interface Clarity & Student Focus
            </h2>
            <p className="section-subtitle">
              Features designed to eliminate placement ambiguity, streamline workflow
              communication, and empower engineering cohorts.
            </p>
          </div>
        </ScrollReveal>

        <div className="bento-grid">
          {/* Bento Card 1: Large Asymmetric Card (Span 2) */}
          <ScrollReveal delay={80} className="bento-col-span-2">
            <SpotlightCard className="bento-card bento-card--large">
              <div className="bento-card-content">
                <div className="bento-eyebrow">
                  <Badge variant="primary" dot size="sm">PIPELINE TRANSPARENCY</Badge>
                </div>
                <h3 className="bento-title">Stage-by-Stage Visibility Across Every Round</h3>
                <p className="bento-desc">
                  Traditional placement processes leave students uncertain about application status.
                  HIRE-FLOW maps corporate applications into discrete progress stages—from initial
                  submission to screening, coding evaluations, technical interviews, and final HR sign-off.
                </p>

                {/* Stage Progression Micro-Widget */}
                <div className="stage-tracker-widget" aria-label="Application stage progression example">
                  <div className="tracker-step tracker-step--done">
                    <span className="step-indicator">✓</span>
                    <span className="step-name">Applied</span>
                  </div>
                  <div className="tracker-divider tracker-divider--done" />
                  <div className="tracker-step tracker-step--done">
                    <span className="step-indicator">✓</span>
                    <span className="step-name">Screening</span>
                  </div>
                  <div className="tracker-divider tracker-divider--done" />
                  <div className="tracker-step tracker-step--done">
                    <span className="step-indicator">✓</span>
                    <span className="step-name">Coding Assessment</span>
                  </div>
                  <div className="tracker-divider tracker-divider--active" />
                  <div className="tracker-step tracker-step--active">
                    <span className="step-indicator">⚡</span>
                    <span className="step-name">Technical Round 2</span>
                  </div>
                  <div className="tracker-divider" />
                  <div className="tracker-step tracker-step--pending">
                    <span className="step-indicator">○</span>
                    <span className="step-name">HR & Offer</span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          {/* Bento Card 2: Interview Scheduling */}
          <ScrollReveal delay={160}>
            <SpotlightCard className="bento-card">
              <div className="bento-eyebrow">
                <Badge variant="warning" dot size="sm">CALENDAR SYNCHRONIZATION</Badge>
              </div>
              <h3 className="bento-title">Synchronized Interview Agendas</h3>
              <p className="bento-desc">
                Never lose an interview link in your inbox. Receive precise time windows, meeting links,
                and interviewer briefs synchronized directly to your student dashboard.
              </p>
              <div className="mini-schedule-box">
                <div className="schedule-clock">🕒 Simulated Round: In 14h 22m</div>
                <div className="schedule-topic">Google Technical Round 2: Algorithms & System Design</div>
                <span className="meet-pill">📹 Meeting Preview (Sample Record)</span>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          {/* Bento Card 3: Transparent Compensation */}
          <ScrollReveal delay={240}>
            <SpotlightCard className="bento-card">
              <div className="bento-eyebrow">
                <Badge variant="accent" dot size="sm">COMPENSATION MODELING</Badge>
              </div>
              <h3 className="bento-title">Structured Compensation & Criteria</h3>
              <p className="bento-desc">
                Placement drives present transparent stipend and full-time conversion structures upfront.
                Compensation figures below are illustrative sample values.
              </p>
              <div className="mini-compensation-box">
                <div className="comp-row">
                  <span>Sample Stipend:</span>
                  <strong className="text-[var(--color-accent)] font-mono font-bold">₹30K – ₹45K / mo</strong>
                </div>
                <div className="comp-row">
                  <span>Sample CTC Conversion:</span>
                  <strong className="text-emerald-400 font-mono font-bold">₹8 LPA – ₹24 LPA</strong>
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          {/* Bento Card 4: Dual-Theme Engineering (Span 2) */}
          <ScrollReveal delay={320} className="bento-col-span-2">
            <SpotlightCard className="bento-card bento-card--large">
              <div className="bento-card-content">
                <div className="bento-eyebrow">
                  <Badge variant="hero" dot size="sm">DUAL-THEME ERGONOMICS</Badge>
                </div>
                <h3 className="bento-title">Engineered for Extended Preparation Sessions</h3>
                <p className="bento-desc">
                  Calibrated for long study and interview review sessions. Switch effortlessly between daylight-optimized
                  <strong> Iridescent Chrome</strong> (#7C3AED electric violet on luminous surfaces) and the focused
                  clarity of <strong>Anodized Dark</strong> (#CCF381 neon lime on obsidian). Persistent state retention
                  ensures your visual environment matches your study rhythms.
                </p>

                <div className="theme-contrast-preview">
                  <div className="theme-chip theme-chip--light">
                    <span className="theme-chip-dot bg-[#7C3AED]" />
                    <span className="theme-chip-title">Iridescent Chrome</span>
                    <span className="theme-chip-desc">Electric Violet • Daylight Contrast</span>
                  </div>

                  <div className="theme-chip theme-chip--dark">
                    <span className="theme-chip-dot bg-[#CCF381]" />
                    <span className="theme-chip-title">Anodized Dark</span>
                    <span className="theme-chip-desc">Neon Lime • Deep Obsidian Focus</span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ====================================================================
          5. FEATURED OPPORTUNITIES — Live Drives Grid with Filter Tabs
          ==================================================================== */}
      <section id="opportunities" className="featured-section" aria-labelledby="opportunities-heading">
        <ScrollReveal>
          <div className="featured-heading-wrap">
            <div className="featured-heading">
              <span className="featured-heading-kicker">CAREER OPPORTUNITIES</span>
              <h2 id="opportunities-heading" className="featured-heading-title">Active Placement Drives</h2>
              <p className="featured-heading-desc">
                Explore sample placement and internship opportunities from hiring partners.
                Review compensation, required skill profiles, and role details.
              </p>
            </div>

            {/* Dynamic Filter Controls */}
            <div className="filter-tabs" role="tablist" aria-label="Filter opportunities by role type">
              <button
                type="button"
                role="tab"
                aria-selected={jobFilter === 'all'}
                className={`filter-btn ${jobFilter === 'all' ? 'filter-btn--active' : ''}`}
                onClick={() => setJobFilter('all')}
              >
                All Opportunities ({jobsData.length})
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={jobFilter === 'Internship'}
                className={`filter-btn ${jobFilter === 'Internship' ? 'filter-btn--active' : ''}`}
                onClick={() => setJobFilter('Internship')}
              >
                Internships ({jobsData.filter(j => j.type === 'Internship').length})
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={jobFilter === 'Full-time'}
                className={`filter-btn ${jobFilter === 'Full-time' ? 'filter-btn--active' : ''}`}
                onClick={() => setJobFilter('Full-time')}
              >
                Full-Time ({jobsData.filter(j => j.type === 'Full-time').length})
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Job Grid using Existing JobCard */}
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
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

        <div className="opportunities-footer-note">
          <StatusBeacon variant="cyan" label="Sample Opportunities Feed (Mock Data)" />
          <p className="footer-note-text">
            Listings reflect sample corporate opportunities designed for interface evaluation. Apply directly within the student dashboard prototype.
          </p>
        </div>
      </section>

      {/* ====================================================================
          6. CONVERSION CTA BANNER — High-Impact Final Call
          ==================================================================== */}
      <section className="cta-section" aria-label="Call to action">
        <ScrollReveal>
          <div className="cta-banner">
            <div className="cta-badge-wrap">
              <Badge variant="hero" dot size="md">CAMPUS PLACEMENT PROTOTYPE</Badge>
            </div>

            <h2 className="cta-title">
              Ready to Explore the Student Portal Experience?
            </h2>

            <p className="cta-desc">
              Access the interactive student dashboard to test active application tracking,
              review upcoming interview schedules, and explore placement drive interfaces.
            </p>

            <div className="cta-actions">
              <Button
                variant="primary"
                size="lg"
                magnetic
                onClick={() => onViewChange('dashboard')}
                aria-label="Enter Student Portal Dashboard"
              >
                <span>Launch Student Portal</span>
                <span aria-hidden="true">→</span>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => scrollToSection('opportunities')}
                aria-label="Review Active Drives"
              >
                <span>Review Active Drives</span>
                <span aria-hidden="true">↓</span>
              </Button>
            </div>

            <p className="cta-subtext">
              ✦ Prototype Student Portal Interface • Client-Side Demonstration Experience
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ====================================================================
          7. PROFESSIONAL FOOTER — Comprehensive Architectural Closing
          ==================================================================== */}
      <footer className="landing-footer" role="contentinfo">
        <div className="footer-main">
          {/* Brand & Attribution Column */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <span className="logo-spark" aria-hidden="true">✦</span>
              <span className="logo-text">HIRE-FLOW</span>
            </div>
            <p className="footer-tagline">
              The unified campus recruitment and placement operating system for engineering cohorts.
            </p>

            <div className="footer-status-badge">
              <StatusBeacon variant="emerald" label="Client-Side Prototype Operational" />
            </div>

            <div className="footer-dev-attribution">
              <span>Developer Attribution:</span>
              <strong className="text-[var(--text-primary)]">MUDASSAR NAZER</strong>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-links-list">
              <li>
                <button type="button" onClick={() => onViewChange('dashboard')} className="footer-link-btn">
                  Student Portal Dashboard
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('opportunities')} className="footer-link-btn">
                  Active Placement Drives
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('workflow')} className="footer-link-btn">
                  Recruitment Workflow
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToSection('features')} className="footer-link-btn">
                  System Capabilities
                </button>
              </li>
            </ul>
          </div>

          {/* Architectural Specifications Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Architecture</h4>
            <ul className="footer-links-list">
              <li>
                <span className="footer-static-item">Iridescent Chrome (Light Mode)</span>
              </li>
              <li>
                <span className="footer-static-item">Anodized Dark (Dark Mode)</span>
              </li>
              <li>
                <span className="footer-static-item">Fluid Semantic CSS Tokens</span>
              </li>
              <li>
                <span className="footer-static-item">Accessible Kinetic Primitives</span>
              </li>
            </ul>
          </div>

          {/* Platform Reference Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Documentation</h4>
            <ul className="footer-links-list">
              <li>
                <span className="footer-static-item">Prototype Technical Scope</span>
              </li>
              <li>
                <span className="footer-static-item">UI Design Token Specification</span>
              </li>
              <li>
                <span className="footer-static-item">Component Architecture</span>
              </li>
              <li>
                <span className="footer-static-item">Student Dashboard Preview</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Sub-bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © 2026 HIRE-FLOW Recruitment Platform. All rights reserved.
          </p>

          <span className="stage-tag">
            Stage G2 Production Landing Page • Developer: MUDASSAR NAZER
          </span>

          <button
            type="button"
            className="back-to-top-btn"
            onClick={() => scrollToSection('home')}
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </footer>
    </div>
  )
}
