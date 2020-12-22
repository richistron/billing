import React, { InputHTMLAttributes, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { RegisterFieldAction } from '../../reducers/forms/formActions'

type CustomInput = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange' | 'name' | 'defaultValue'
>

interface PasswordInput extends CustomInput {
  id?: string
  label: string
  onChange?: (value: string) => void
  type: 'password' | 'email'
  name: string
  validate?: (val: string) => boolean
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
  const dispatch = useDispatch<Dispatch<RegisterFieldAction>>()

  useEffect(() => {
    if (formName && name)
      dispatch({
        type: 'form_field_change',
        form: formName,
        name,
        value: defaultValue,
      })
  }, [name, formName, dispatch, defaultValue])

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
          if (ref.current) clearTimeout(ref.current)
          ref.current = setTimeout(() => {
            if (onChange) onChange(val)
            dispatch({
              type: 'form_field_change',
              form: formName,
              name,
              value: val,
            })
          }, 500)
        }}
      />
    </div>
  )
}
