export interface ApiFetchType<T> {
  (cb: (response: T) => void): () => void
}

const apiFetch = <T>({
  url,
  method,
  cb,
}: {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  cb: (response: T) => void
}) => {
  const controller = new AbortController()
  fetch('http://localhost:3000' + url, { signal: controller.signal, method }).then((res) => {
    res.json().then((json_response) => cb(json_response))
  })
  return () => controller.abort()
}

export default apiFetch
