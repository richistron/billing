export interface FormField {
  value: string
  isValid: boolean
}

export interface FormItem {
  fields: { [index: string]: FormField }
  isTyping: boolean
}

export type FormState = { [index: string]: FormItem }

const formInitialState: FormState = {}

export default formInitialState
