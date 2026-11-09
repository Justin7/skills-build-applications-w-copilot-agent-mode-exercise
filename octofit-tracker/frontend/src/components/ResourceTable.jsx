import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function ResourceTable({ columns, endpoint, title }) {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      try {
        setRecords(await fetchCollection(endpoint, controller.signal))
        setError('')
      } catch (loadError) {
        if (loadError.name !== 'AbortError') setError(loadError.message)
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [endpoint])

  return (
    <section>
      <h1 className="display-6 mb-4">{title}</h1>
      {isLoading && <p role="status">Loading {title.toLowerCase()}...</p>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!isLoading && !error && records.length === 0 && (
        <p className="text-secondary">No {title.toLowerCase()} found.</p>
      )}
      {!error && records.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                {columns.map(({ heading }) => <th key={heading} scope="col">{heading}</th>)}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id ?? record.id ?? `${title}-${index}`}>
                  {columns.map(({ heading, render }) => (
                    <td key={heading}>{render(record)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ResourceTable
