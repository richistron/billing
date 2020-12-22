export interface FormField {
  value: string
}

export interface FormItem {
  fields: { [index: string]: FormField }
  isTyping: boolean
}

export type FormState = { [index: string]: FormItem }

const formInitialState: FormState = {}

export default formInitialState
