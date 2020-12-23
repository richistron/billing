import { InputValidateProp } from './Input'
import isEmailValid from './isEmailValid'
import isPassWordValid from './isPasswordValid'

interface ValidateInput {
  (value?: string, validate?: InputValidateProp): boolean
}

const isInputValid: ValidateInput = (value = '', validate): boolean => {
  if (validate === 'email') return isEmailValid(value)
  if (validate === 'password') return isPassWordValid(value)
  return true
}

export default isInputValid
