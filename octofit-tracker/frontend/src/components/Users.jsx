import ResourceTable from './ResourceTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

const columns = [
  { heading: 'Username', render: ({ username }) => username },
  {
    heading: 'Name',
    render: ({ firstName, lastName }) => [firstName, lastName].filter(Boolean).join(' '),
  },
  { heading: 'Email', render: ({ email }) => email },
  {
    heading: 'Joined',
    render: ({ joinedAt }) => (joinedAt ? new Date(joinedAt).toLocaleDateString() : '—'),
  },
]

function Users() {
  return <ResourceTable columns={columns} endpoint={endpoint} title="Users" />
}

export default Users
