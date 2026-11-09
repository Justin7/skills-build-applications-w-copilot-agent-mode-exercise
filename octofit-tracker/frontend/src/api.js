const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export async function fetchCollection(resource, signal) {
  const response = await fetch(`${apiBaseUrl}/${resource}/`, { signal })
  if (!response.ok) {
    throw new Error(`Could not load ${resource}: ${response.status} ${response.statusText}`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) return payload

  const collection = payload?.results ?? payload?.items ?? payload?.data
  if (Array.isArray(collection)) return collection
  if (Array.isArray(collection?.results)) return collection.results

  throw new Error(`The ${resource} API returned an unsupported response format`)
}
