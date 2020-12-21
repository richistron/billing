export interface ApiFetchType<T> {
  (cb: (response: T) => void): () => void
}

type ApiFetchParams<T> = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  cb: (response: T) => void
  body?: any
  token?: string
  onError?: (error: string) => void
}

const apiFetch = <T>({ url, method, cb, body, token, onError = () => {} }: ApiFetchParams<T>) => {
  const controller = new AbortController()
  const headers: { [index: string]: string } = {
    'Content-Type': 'application/json',
  }
  if (token) headers['Authorization'] = `Token ${token}`
  fetch('http://localhost:3000' + url, {
    signal: controller.signal,
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers,
  })
    .then((res) => {
      if (res.status === 401) throw new Error('Unauthorized')
      if (res.status === 404) throw new Error('NotFound')
      res.json().then((json_response) => cb(json_response))
    })
    .catch((e) => onError(e.message))
  return () => controller.abort()
}

export default apiFetch
