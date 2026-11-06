import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        HireFlow
      </a>

      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/jobs">Find Jobs</a>
        <a href="/about">About</a>
      </div>

      <button className="navbar-login">
        Login
      </button>
    </nav>
  )
}

export default Navbar