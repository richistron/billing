import { FormEvent } from 'react'
import apiFetch from '../../lib/apiFetch'

interface LoginResponse {
  user: {
    email: string
    id: number
    access_token: string
  }
}

type HandleSubmitOptions = {
  onError: (error: string) => void
  cb: (res: LoginResponse) => void
  token: string
  email: string
  password: string
}

const loginSubmit = ({ token, email, password, onError, cb }: HandleSubmitOptions) => (
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault()
  if (token && email && password)
    apiFetch<LoginResponse>({
      url: '/login',
      method: 'POST',
      token,
      body: {
        email,
        password,
      },
      cb,
      onError,
    })
}

export default loginSubmit
