import React, { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getPublicToken from '../selectors/getPublicToken'
import apiFetch from '../lib/apiFetch'
import { SavePublicToken } from '../reducers/sessionActions'
import { Dispatch } from 'redux'

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
  const isSessionValid = false
  const [isLoading, setLoading] = useState<boolean>(true)
  const token = useSelector(getPublicToken)
  const dispatch = useDispatch<Dispatch<SavePublicToken>>()

  useEffect(() => {
    if (!token) {
      setLoading(true)
      loadPublicToken((res) => {
        dispatch({ type: 'set_public_token', token: res.access_token })
        setLoading(false)
      })
    }
  }, [token, dispatch])

  return (
    <>
      {children({
        isSessionValid,
        isLoading,
      })}
    </>
  )
}

export default Session
