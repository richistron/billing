import React, { InputHTMLAttributes, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { RegisterFieldAction, UserTyping } from '../../reducers/forms/formActions'
import getForm from '../../selectors/getForm'
import isInputValid from './isInputValid'

type CustomInput = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange' | 'name' | 'defaultValue' | 'value'
>

export type InputValidateProp = 'email' | 'password'

interface PasswordInput extends CustomInput {
  id?: string
  label: string
  onChange?: (value: string) => void
  type: 'password' | 'email'
  name: string
  validate?: InputValidateProp
  formName?: string
  defaultValue?: string
}

export const Input: React.FC<PasswordInput> = ({
  validate,
  onChange,
  id,
  type,
  label,
  name,
  formName = '',
  defaultValue = '',
  ...rest
}) => {
  const ref = useRef<null | NodeJS.Timeout>(null)
  const dispatch = useDispatch<Dispatch<RegisterFieldAction | UserTyping>>()
  const { isTyping } = useSelector(getForm(formName))

  useEffect(() => {
    if (formName && name)
      dispatch({
        type: 'form_field_change',
        form: formName,
        name,
        isValid: isInputValid(defaultValue, validate),
        value: defaultValue,
      })
  }, [name, formName, dispatch, defaultValue, validate])

  return (
    <div className={'input-row'}>
      <label htmlFor={id}>{label}</label>
      <input
        {...rest}
        name={name}
        type={type}
        id={id}
        onChange={(e) => {
          const val = e.target.value || ''
          if (!isTyping) dispatch({ type: 'form_user_typing', form: formName, isTyping: true })
          if (ref.current) clearTimeout(ref.current)
          ref.current = setTimeout(() => {
            if (onChange) onChange(val)
            dispatch({
              type: 'form_field_change',
              form: formName,
              isValid: isInputValid(val, validate),
              name,
              value: val,
            })
            dispatch({ type: 'form_user_typing', form: formName, isTyping: false })
          }, 500)
        }}
      />
    </div>
  )
}
