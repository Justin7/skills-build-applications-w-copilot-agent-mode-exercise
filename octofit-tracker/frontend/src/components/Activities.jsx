import ResourceTable from './ResourceTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

const columns = [
  {
    heading: 'Athlete',
    render: ({ user }) => user?.username ?? 'Unknown athlete',
  },
  { heading: 'Activity', render: ({ type }) => type },
  { heading: 'Duration', render: ({ durationMinutes }) => `${durationMinutes} min` },
  { heading: 'Distance', render: ({ distanceKm }) => `${distanceKm} km` },
  { heading: 'Calories', render: ({ calories }) => calories },
  {
    heading: 'Date',
    render: ({ date }) => (date ? new Date(date).toLocaleDateString() : '—'),
  },
]

function Activities() {
  return <ResourceTable columns={columns} endpoint={endpoint} title="Activities" />
}

export default Activities
