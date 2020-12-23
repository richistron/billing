import React from 'react'
import './login.css'
import { Input, Button } from '../Form'
import { useSelector } from 'react-redux'
import getPublicToken from '../../selectors/getPublicToken'
import loginSubmit from './loginSubmit'
import Form from '../Form/Form'
import getLoginFormValues from '../../selectors/getLoginFormValues'

const isFormValid = ({ password, email }: { password: string; email: string }) => {
  if (password.length < 6) return false
  if (!email.match(/\S+@\S+\.\S+/)) return false
  return true
}

const Login = () => {
  const { email, password } = useSelector(getLoginFormValues)
  const token = useSelector(getPublicToken)

  return (
    <div className={'login'}>
      <div className={'container'}>
        <Form
          name={'loginForm'}
          onSubmit={loginSubmit({
            email,
            password,
            token,
            cb: (res) => {
              console.log(res.user)
            },
            onError: (e) => {
              console.log('login failed', e)
            },
          })}
        >
          <Input id={'email'} name={'email'} type={'email'} label={'Email'} validate={'email'} />
          <Input
            id={'password'}
            name={'password'}
            type={'password'}
            label={'Password'}
            autoComplete={'current-password'}
          />
          <Button submit label={'Login'} disabled={isFormValid({ email, password })} />
        </Form>
      </div>
    </div>
  )
}

export default Login
