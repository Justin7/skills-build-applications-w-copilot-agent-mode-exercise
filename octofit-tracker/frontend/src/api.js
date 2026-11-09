export async function fetchCollection(endpoint, signal) {
  const response = await fetch(endpoint, { signal })
  if (!response.ok) {
    throw new Error(`Could not load ${endpoint}: ${response.status} ${response.statusText}`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) return payload

  const collection = payload?.results ?? payload?.items ?? payload?.data
  if (Array.isArray(collection)) return collection
  if (Array.isArray(collection?.results)) return collection.results

  throw new Error(`The API at ${endpoint} returned an unsupported response format`)
}
