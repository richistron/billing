import { Reducer } from 'redux'
import { FormActions, RegisterFieldAction, UserTyping } from './formActions'
import formInitialState, { FormField, FormItem, FormState } from './formInitialState'

export const emptyForm = (): FormItem => ({ fields: {}, isTyping: false })

export const emptyField = (): FormField => ({ value: '', isValid: true })

const updateFieldValue = (
  field: FormField = emptyField(),
  action: RegisterFieldAction
): FormField => {
  return { ...field, value: action.value, isValid: action.isValid }
}

const setFieldChange = (form: FormItem = emptyForm(), action: RegisterFieldAction): FormItem => {
  const newState = { ...form }
  newState.fields[action.name] = updateFieldValue(newState.fields[action.name], action)
  return { ...form, ...newState }
}

const setFormChange = (forms: FormState, action: RegisterFieldAction) => {
  const newState = { ...forms }
  newState[action.form] = setFieldChange(newState[action.form], action)
  return { ...forms, ...newState }
}

type formsReducerType = Reducer<FormState, FormActions>

function setFormTyping(state: FormState, action: UserTyping): FormState {
  const newState = { ...state }
  const form = newState[action.form] || emptyForm()
  newState[action.form] = {
    ...form,
    isTyping: action.isTyping,
  }
  return { ...newState }
}

const formsReducer: formsReducerType = (state, action) => {
  if (!state) return { ...formInitialState }
  if (!action) return state
  switch (action.type) {
    case 'form_field_change':
      return setFormChange(state, action)
    case 'form_user_typing':
      return setFormTyping(state, action)
    default:
      return state
  }
}

export default formsReducer
