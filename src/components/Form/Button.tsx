import React, { ButtonHTMLAttributes, useEffect } from 'react'

type ButtonAttr = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'>

interface ButtonProps extends ButtonAttr {
  label: string
  submit?: boolean
  formName?: string
}

export const Button: React.FC<ButtonProps> = ({ formName, submit, label, ...rest }) => {
  useEffect(() => {
    console.log('submit form', formName)
  }, [formName])
  return (
    <div className={'input-row'}>
      <button type={submit ? 'submit' : 'button'} {...rest}>
        {label}
      </button>
    </div>
  )
}
