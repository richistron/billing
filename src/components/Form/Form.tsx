import React, { createContext, FormHTMLAttributes, ReactNode, useContext, useState } from 'react'

interface FieldShape {
  valid: boolean
  value: string
  name: string
}

type FieldType = { [index: string]: FieldShape }

interface FormContextType {
  typing: boolean
  setTyping: (val: boolean) => void
  fields: FieldType
  setFields: (val: FieldType) => void
  isValid: boolean
  setPristine: (val: boolean) => void
  pristine: boolean
}

const FormContext = createContext<FormContextType>({
  typing: false,
  setTyping: () => {},
  setFields: () => {},
  setPristine: () => {},
  fields: {},
  isValid: false,
  pristine: true,
})

export const useFormContext = () => useContext(FormContext)

type FormAttr = Omit<FormHTMLAttributes<HTMLFormElement>, 'children'>

interface FormProps extends FormAttr {
  children: (context: FormContextType) => ReactNode
}

const Form: React.FC<FormProps> = ({ children, ...rest }) => {
  const [typing, setTyping] = useState<boolean>(false)
  const [pristine, setPristine] = useState<boolean>(true)
  const [fields, setFields] = useState<FieldType>({})
  const isValid = Object.keys(fields).some((k) => !fields[k].valid)
  const context = {
    typing,
    setTyping,
    fields,
    setFields,
    isValid,
    pristine,
    setPristine,
  }
  return (
    <FormContext.Provider value={context}>
      <form {...rest}>{children(context)}</form>
    </FormContext.Provider>
  )
}

export default Form
