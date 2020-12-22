import React, { InputHTMLAttributes, useRef } from 'react'
import { useFormContext } from './Form'

type CustomInput = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'name'>

interface PasswordInput extends CustomInput {
  id?: string
  label: string
  onChange?: (value: string) => void
  type: 'password' | 'email'
  name: string
  validate?: (val: string) => boolean
}

export const Input: React.FC<PasswordInput> = ({
  validate,
  onChange,
  id,
  type,
  label,
  name,
  ...rest
}) => {
  const ref = useRef<null | NodeJS.Timeout>(null)
  const { setTyping, setFields, fields, setPristine } = useFormContext()

  return (
    <div className={'input-row'}>
      <label htmlFor={id}>{label}</label>
      <input
        {...rest}
        name={name}
        type={type}
        id={id}
        onChange={(e) => {
          setTyping(true)
          const val = e.target.value || ''
          if (ref.current) clearTimeout(ref.current)
          ref.current = setTimeout(() => {
            if (onChange) onChange(val)

            const newState = { ...fields }
            newState[name] = {
              valid: validate ? validate(val) : true,
              value: val,
              name,
            }
            setFields(newState)
            setTyping(false)
            setPristine(false)
          }, 500)
        }}
      />
    </div>
  )
}
