import React, { ButtonHTMLAttributes } from 'react'
import { useSelector } from 'react-redux'
import getForm from '../../selectors/getForm'

type ButtonAttr = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'type'>

interface ButtonProps extends ButtonAttr {
  label: string
  submit?: boolean
  formName?: string
}

export const Button: React.FC<ButtonProps> = ({ formName, submit, label, ...rest }) => {
  const { isTyping } = useSelector(getForm(formName))

  return (
    <div className={'input-row'}>
      <button {...rest} type={submit ? 'submit' : 'button'} disabled={isTyping || rest.disabled}>
        {label}
      </button>
    </div>
  )
}
