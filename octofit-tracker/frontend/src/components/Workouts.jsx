import ResourceTable from './ResourceTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

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
  return <ResourceTable columns={columns} endpoint={endpoint} title="Workouts" />
}

export default Workouts
