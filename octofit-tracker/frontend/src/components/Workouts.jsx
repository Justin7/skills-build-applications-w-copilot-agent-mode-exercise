import ResourceTable from './ResourceTable.jsx'

const columns = [
  { heading: 'Workout', render: ({ name }) => name },
  { heading: 'Category', render: ({ category }) => category },
  { heading: 'Difficulty', render: ({ difficulty }) => difficulty },
  { heading: 'Duration', render: ({ durationMinutes }) => `${durationMinutes} min` },
  {
    heading: 'Exercises',
    render: ({ exercises }) => exercises?.map(({ name }) => name).join(', ') || '—',
  },
]

function Workouts() {
  return <ResourceTable columns={columns} resource="workouts" title="Workouts" />
}

export default Workouts
