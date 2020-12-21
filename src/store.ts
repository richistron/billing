import { combineReducers, createStore } from 'redux'
import sessionReducer from './reducers/session'
import { SessionType } from './reducers/sessionInitialState'

export interface AppState {
  session: SessionType
}

const rooReducer = combineReducers({
  session: sessionReducer,
})

const w: any = window
const store = createStore(
  rooReducer,
  process.env.NODE_ENV !== 'production' &&
    w.__REDUX_DEVTOOLS_EXTENSION__ &&
    w.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
