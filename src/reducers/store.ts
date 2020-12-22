import { combineReducers, createStore } from 'redux'
import { FormState } from './forms/formInitialState'
import formsReducer from './forms/formsReducer'
import sessionReducer from './session/session'
import { SessionType } from './session/sessionInitialState'

export interface AppState {
  session: SessionType
  forms: FormState
}

const rooReducer = combineReducers({
  session: sessionReducer,
  forms: formsReducer,
})

const w: any = window
const store = createStore(
  rooReducer,
  process.env.NODE_ENV !== 'production' &&
    w.__REDUX_DEVTOOLS_EXTENSION__ &&
    w.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
