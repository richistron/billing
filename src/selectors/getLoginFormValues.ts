import { AppState } from '../reducers/store'

const getLoginFormValues = (state: AppState): { email: string; password: string } => {
  const form = state.forms['loginForm']
  if (!form)
    return {
      email: '',
      password: '',
    }
  const { email, password } = form.fields
  return {
    email: email.value || '',
    password: password.value || '',
  }
}

export default getLoginFormValues
