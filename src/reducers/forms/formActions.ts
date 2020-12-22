export interface RegisterFieldAction {
  type: 'form_field_change'
  form: string
  name: string
  value: string
}

export type FormActions = RegisterFieldAction
