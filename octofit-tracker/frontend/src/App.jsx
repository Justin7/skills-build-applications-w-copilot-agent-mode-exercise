import { Link, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const sections = [
  { path: '/users', label: 'Users', Component: Users },
  { path: '/activities', label: 'Activities', Component: Activities },
  { path: '/teams', label: 'Teams', Component: Teams },
  { path: '/leaderboard', label: 'Leaderboard', Component: Leaderboard },
  { path: '/workouts', label: 'Workouts', Component: Workouts },
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
              <NavLink
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                key={path}
                to={path}
              >
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
          {sections.map(({ path, Component }) => (
            <Route element={<Component />} key={path} path={path} />
          ))}
          <Route path="*" element={<h1 className="display-5">Page not found</h1>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
