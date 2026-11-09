import ResourceTable from './ResourceTable.jsx'

const columns = [
  { heading: 'Team', render: ({ name }) => name },
  { heading: 'Description', render: ({ description }) => description },
  {
    heading: 'Members',
    render: ({ members }) => members?.map((member) => member.username).join(', ') || 'No members',
  },
]

function Teams() {
  return <ResourceTable columns={columns} resource="teams" title="Teams" />
}

export default Teams
