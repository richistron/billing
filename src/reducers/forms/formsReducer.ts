import { Reducer } from 'redux'
import { FormActions, RegisterFieldAction } from './formActions'
import formInitialState, { FormField, FormItem, FormState } from './formInitialState'

const emptyForm = (): FormItem => ({ fields: {} })

const emptyField = (): FormField => ({ value: '' })

const updateFieldValue = (
  field: FormField = emptyField(),
  action: RegisterFieldAction
): FormField => {
  return { ...field, value: action.value }
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

const formsReducer: formsReducerType = (state, action) => {
  if (!state) return { ...formInitialState }
  if (!action) return state
  switch (action.type) {
    case 'form_field_change':
      return setFormChange(state, action)
    default:
      return state
  }
}

export default formsReducer
