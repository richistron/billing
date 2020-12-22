import React, { useState } from 'react'
import './login.css'
import { Input, Button } from '../Form'
import { useSelector } from 'react-redux'
import getPublicToken from '../../selectors/getPublicToken'
import loginSubmit from './loginSubmit'
import Form from '../Form/Form'

const Login = () => {
  const [email] = useState<string>('')
  const [password] = useState<string>('')
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
          <Input
            id={'email'}
            name={'email'}
            type={'email'}
            label={'Email'}
            validate={(val) => val.length > 5}
          />
          <Input
            id={'password'}
            name={'password'}
            type={'password'}
            label={'Password'}
            autoComplete={'current-password'}
            validate={(val) => val.length > 5}
          />
          <Button
            submit
            label={'Login'}
            // disabled={typing || pristine || !isValid}
          />
        </Form>
      </div>
    </div>
  )
}

export default Login
