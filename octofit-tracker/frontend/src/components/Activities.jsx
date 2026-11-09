import ResourceTable from './ResourceTable.jsx'

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
  return <ResourceTable columns={columns} resource="activities" title="Activities" />
}

export default Activities
