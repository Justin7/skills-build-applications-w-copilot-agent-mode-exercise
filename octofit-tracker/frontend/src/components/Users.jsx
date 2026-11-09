import ResourceTable from './ResourceTable.jsx'

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
  return <ResourceTable columns={columns} resource="users" title="Users" />
}

export default Users
