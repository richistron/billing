export interface FormField {
  value: string
}

export interface FormItem {
  fields: { [index: string]: FormField }
}

export type FormState = { [index: string]: FormItem }

const formInitialState: FormState = {}

export default formInitialState
