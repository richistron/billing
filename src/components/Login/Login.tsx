import React, { useState } from 'react'
import './login.css'
import { Input, Button } from '../Form'
import { useDispatch, useSelector } from 'react-redux'
import loginSubmit from './loginSubmit'
import Form from '../Form/Form'
import { SavePrivateToken } from '../../reducers/session/sessionActions'
import { Dispatch } from 'redux'
import getForm from '../../selectors/getForm'
import usePublicToken from '../../selectors/usePublicToken'

const Login = () => {
  const dispatch = useDispatch<Dispatch<SavePrivateToken>>()
  const formState = useSelector(getForm('loginForm'))
  const token = usePublicToken()
  const email = formState.fields.email || {}
  const password = formState.fields.password || {}
  const [error, setError] = useState<string>('')

  return (
    <div className={'login'}>
      <div className={'container'}>
        <Form
          name={'loginForm'}
          onSubmit={loginSubmit({
            email: email.value || '',
            password: password.value || '',
            token,
            cb: (res) =>
              dispatch({ type: 'session_set_private_token', token: res.user.access_token }),
            onError: () => setError('Invalid email/password combination'),
          })}
        >
          <Input
            id={'email'}
            name={'email'}
            type={'email'}
            label={'Email'}
            validate={'email'}
            error={'email address is not valid'}
          />
          <Input
            id={'password'}
            name={'password'}
            type={'password'}
            label={'Password'}
            autoComplete={'current-password'}
            validate={'password'}
            error={'Invalid Password'}
          />
          {error !== '' && <div className={'error'}>{error}</div>}
          <Button submit label={'Login'} />
        </Form>
      </div>
    </div>
  )
}

export default Login
