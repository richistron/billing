import React, { ReactNode, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import apiFetch from '../lib/apiFetch'
import { SavePublicToken } from '../reducers/session/sessionActions'
import { Dispatch } from 'redux'
import usePublicToken from '../selectors/usePublicToken'
import usePrivateToken from '../selectors/usePrivateToken'

type SessionRenderProps = {
  isSessionValid: boolean
  isLoading: boolean
}

interface SessionProps {
  children: (options: SessionRenderProps) => ReactNode
}

const loadPublicToken = (cb: (response: { access_token: string }) => void) =>
  apiFetch<{ access_token: string }>({
    url: '/sup',
    method: 'POST',
    cb,
  })

const Session: React.FC<SessionProps> = ({ children }) => {
  const [isLoading, setLoading] = useState<boolean>(true)
  const dispatch = useDispatch<Dispatch<SavePublicToken>>()
  const privateToken = usePrivateToken()
  const publicToken = usePublicToken()

  useEffect(() => {
    if (!publicToken) {
      setLoading(true)
      loadPublicToken((res) => {
        dispatch({ type: 'session_set_public_token', token: res.access_token })
        setLoading(false)
      })
    }
  }, [publicToken, dispatch])

  return (
    <>
      {children({
        isSessionValid: privateToken !== '',
        isLoading,
      })}
    </>
  )
}

export default Session
