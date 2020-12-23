import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react'
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
  error?: string
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
  error,
  ...rest
}) => {
  const ref = useRef<null | NodeJS.Timeout>(null)
  const dispatch = useDispatch<Dispatch<RegisterFieldAction | UserTyping>>()
  const { isTyping } = useSelector(getForm(formName))
  const [hasError, setError] = useState<boolean>(isInputValid(defaultValue, validate))

  useEffect(() => {
    if (formName && name)
      dispatch({
        type: 'form_field_change',
        form: formName,
        name,
        isValid: !hasError,
        value: defaultValue,
      })
  }, [name, formName, dispatch, defaultValue, hasError])

  return (
    <div className={`input-row ${hasError ? 'error' : ''}`}>
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
            const isValid = isInputValid(val, validate)
            setError(!isValid)
            dispatch({
              type: 'form_field_change',
              form: formName,
              isValid,
              name,
              value: val,
            })
            dispatch({ type: 'form_user_typing', form: formName, isTyping: false })
          }, 500)
        }}
      />
      {hasError && (
        <div className={'error-message'}>
          <span>*</span>
          {` ${error || 'Invalid Field'}`}
        </div>
      )}
    </div>
  )
}
