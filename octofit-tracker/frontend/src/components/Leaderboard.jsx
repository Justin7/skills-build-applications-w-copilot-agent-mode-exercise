import ResourceTable from './ResourceTable.jsx'

const columns = [
  { heading: 'Rank', render: ({ rank }) => rank },
  { heading: 'Athlete', render: ({ user }) => user?.username ?? 'Unknown athlete' },
  { heading: 'Team', render: ({ team }) => team?.name ?? '—' },
  { heading: 'Points', render: ({ points }) => points },
  { heading: 'Period', render: ({ period }) => period },
]

function Leaderboard() {
  return <ResourceTable columns={columns} resource="leaderboard" title="Leaderboard" />
}

export default Leaderboard
