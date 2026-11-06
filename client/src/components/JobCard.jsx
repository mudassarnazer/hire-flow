import './JobCard.css'
function JobCard({ title, company, location, type, salary, skills }) {
  return (
    <article className="job-card">
      <div className="job-card-top">
        <div className="company-icon">
          {company.charAt(0)}
        </div>

        <span className="job-type">{type}</span>
      </div>

      <h3>{title}</h3>

      <p className="company-name">{company}</p>

      <div className="job-details">
        <span>📍 {location}</span>
        <span>💰 {salary}</span>
      </div>

      <div className="job-skills">
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <button className="job-apply-btn">
        View Opportunity →
      </button>
    </article>
  )
}

export default JobCard