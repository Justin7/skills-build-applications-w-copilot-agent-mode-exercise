import ResourceTable from './ResourceTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

const columns = [
  { heading: 'Team', render: ({ name }) => name },
  { heading: 'Description', render: ({ description }) => description },
  {
    heading: 'Members',
    render: ({ members }) => members?.map((member) => member.username).join(', ') || 'No members',
  },
]

function Teams() {
  return <ResourceTable columns={columns} endpoint={endpoint} title="Teams" />
}

export default Teams
