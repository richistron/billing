import React, { InputHTMLAttributes, useRef } from 'react'

type CustomInput = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'>

interface PasswordInput extends CustomInput {
  id: string
  label: string
  onChange?: (value: string) => void
  type: 'password' | 'email'
}

export const Input: React.FC<PasswordInput> = ({ onChange, id, type, label, ...rest }) => {
  const ref = useRef<null | NodeJS.Timeout>(null)

  return (
    <div className={'input-row'}>
      <label htmlFor={id}>{label}</label>
      <input
        {...rest}
        type={type}
        id={id}
        onChange={(e) => {
          const val = e.target.value || ''
          if (ref.current) clearTimeout(ref.current)
          ref.current = setTimeout(() => {
            if (onChange) onChange(val)
          }, 500)
        }}
      />
    </div>
  )
}
