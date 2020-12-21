import React, { InputHTMLAttributes } from 'react'

type ButtonAttr = Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'type'>

interface ButtonProps extends ButtonAttr {
  label: string
  submit?: boolean
}

export const Button: React.FC<ButtonProps> = ({ submit, label }) => {
  return (
    <div className={'input-row'}>
      <button type={submit ? 'submit' : 'button'}>{label}</button>
    </div>
  )
}
