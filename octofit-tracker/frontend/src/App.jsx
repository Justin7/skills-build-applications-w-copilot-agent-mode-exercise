import { Link, NavLink, Route, Routes } from 'react-router-dom'

const sections = [
  { path: '/activities', label: 'Activities' },
  { path: '/teams', label: 'Teams' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src="/octofitapp-small.png" alt="" width="36" height="36" />
            OctoFit Tracker
          </Link>
          <div className="navbar-nav">
            {sections.map(({ path, label }) => (
              <NavLink className="nav-link" key={path} to={path}>
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <main className="container py-5">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="display-5">Welcome to OctoFit Tracker</h1>
                <p className="lead">
                  Track your activities, connect with a team, and reach your fitness goals.
                </p>
              </>
            }
          />
          {sections.map(({ path, label }) => (
            <Route
              element={<h1 className="display-5">{label}</h1>}
              key={path}
              path={path}
            />
          ))}
          <Route path="*" element={<h1 className="display-5">Page not found</h1>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
