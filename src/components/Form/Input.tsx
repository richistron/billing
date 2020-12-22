import React, { InputHTMLAttributes, useEffect, useRef } from 'react'

type CustomInput = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'name'>

interface PasswordInput extends CustomInput {
  id?: string
  label: string
  onChange?: (value: string) => void
  type: 'password' | 'email'
  name: string
  validate?: (val: string) => boolean
  formName?: string
}

export const Input: React.FC<PasswordInput> = ({
  validate,
  onChange,
  id,
  type,
  label,
  name,
  formName,
  ...rest
}) => {
  const ref = useRef<null | NodeJS.Timeout>(null)

  useEffect(() => {
    console.log(formName + ':' + name)
  }, [name, formName])

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
          }, 500)
        }}
      />
    </div>
  )
}
