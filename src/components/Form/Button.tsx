import React, { ButtonHTMLAttributes } from 'react'

type ButtonAttr = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'>

interface ButtonProps extends ButtonAttr {
  label: string
  submit?: boolean
}

export const Button: React.FC<ButtonProps> = ({ submit, label, ...rest }) => {
  return (
    <div className={'input-row'}>
      <button type={submit ? 'submit' : 'button'} {...rest}>
        {label}
      </button>
    </div>
  )
}
