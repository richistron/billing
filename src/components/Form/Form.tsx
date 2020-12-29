import React, { FormHTMLAttributes, ReactElement } from 'react'
import { Button } from './Button'
import { Input } from './Input'

type FormAttr = Omit<FormHTMLAttributes<HTMLFormElement>, 'children'>

interface FormProps extends FormAttr {
  children: Array<ReactElement | boolean>
  name: string
}

const Form: React.FC<FormProps> = ({ name, children, ...rest }) => {
  const res = Array.isArray(children)
    ? children.map((child) => {
        if (typeof child === 'boolean') return child
        switch (child.type) {
          case Input:
            return <Input {...child.props} formName={name} key={'field-' + child.props.name} />
          case Button:
            return <Button {...child.props} formName={name} key={'button-' + name} />
          default:
            return child
        }
      })
    : children
  return <form {...rest}>{res}</form>
}

export default Form
