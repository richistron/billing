import { combineReducers, createStore, Store } from 'redux'
import formInitialState, { FormState } from './forms/formInitialState'
import formsReducer from './forms/formsReducer'
import sessionReducer from './session/session'
import sessionInitialState, { SessionType } from './session/sessionInitialState'
import { SessionActionsType } from './session/sessionActions'
import { FormActions } from './forms/formActions'

export interface AppState {
  session: SessionType
  forms: FormState
}

export type AppActions = SessionActionsType & FormActions

export const initialState = {
  session: { ...sessionInitialState },
  forms: { ...formInitialState },
}

const rooReducer = combineReducers({
  session: sessionReducer,
  forms: formsReducer,
})

const w: any = window
const store: Store<AppState, AppActions> = createStore(
  rooReducer,
  process.env.NODE_ENV !== 'production' &&
    w.__REDUX_DEVTOOLS_EXTENSION__ &&
    w.__REDUX_DEVTOOLS_EXTENSION__()
)

export const createTestingStore = (defaultState = {}) =>
  createStore(rooReducer, { ...defaultState })

export default store
