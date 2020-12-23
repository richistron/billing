export interface RegisterFieldAction {
  type: 'form_field_change'
  form: string
  name: string
  isValid: boolean
  value: string
}

export interface UserTyping {
  type: 'form_user_typing'
  form: string
  isTyping: boolean
}

export type FormActions = RegisterFieldAction | UserTyping
