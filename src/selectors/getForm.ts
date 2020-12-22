import { AppState } from '../reducers/store'
import { FormItem } from '../reducers/forms/formInitialState'
import { emptyForm } from '../reducers/forms/formsReducer'

const getForm = (formName: string = '') => (state: AppState): FormItem =>
  state.forms[formName] || emptyForm()

export default getForm
