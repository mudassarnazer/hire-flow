import './Navbar.css'

function Navbar({ activeView = 'landing', onViewChange = () => {} }) {
  const handleNavClick = (view, e) => {
    if (e) e.preventDefault()
    onViewChange(view)
  }

  return (
    <nav className="navbar">
      <a
        href="/"
        className="navbar-logo"
        onClick={(e) => handleNavClick('landing', e)}
      >
        HireFlow
      </a>

      <div className="navbar-links">
        <a
          href="/"
          className={activeView === 'landing' ? 'active-nav-link' : ''}
          onClick={(e) => handleNavClick('landing', e)}
        >
          Home
        </a>
        <a
          href="#dashboard"
          className={activeView === 'dashboard' ? 'active-nav-link' : ''}
          onClick={(e) => handleNavClick('dashboard', e)}
        >
          Student Dashboard
        </a>
        <a
          href="#opportunities"
          onClick={(e) => {
            if (activeView === 'dashboard') {
              handleNavClick('landing', e)
              setTimeout(() => {
                const el = document.querySelector('.featured-section')
                el?.scrollIntoView({ behavior: 'smooth' })
              }, 100)
            }
          }}
        >
          Find Jobs
        </a>
      </div>

      <div className="navbar-actions">
        {activeView === 'landing' ? (
          <button
            type="button"
            className="navbar-login"
            onClick={() => onViewChange('dashboard')}
          >
            Student Portal →
          </button>
        ) : (
          <button
            type="button"
            className="navbar-login navbar-login--back"
            onClick={() => onViewChange('landing')}
          >
            ← Public View
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
