import ResourceTable from './ResourceTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

const columns = [
  { heading: 'Rank', render: ({ rank }) => rank },
  { heading: 'Athlete', render: ({ user }) => user?.username ?? 'Unknown athlete' },
  { heading: 'Team', render: ({ team }) => team?.name ?? '—' },
  { heading: 'Points', render: ({ points }) => points },
  { heading: 'Period', render: ({ period }) => period },
]

function Leaderboard() {
  return <ResourceTable columns={columns} endpoint={endpoint} title="Leaderboard" />
}

export default Leaderboard
