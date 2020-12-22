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
  email: string
  password: string
  token: string
  onError: (error: string) => void
  cb: (res: LoginResponse) => void
}

const loginSubmit = ({ email, password, token, onError, cb }: HandleSubmitOptions) => (
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault()
  if (email && password && token)
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
