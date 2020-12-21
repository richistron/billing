import { Reducer } from 'redux'
import sessionInitialState from './sessionInitialState'

export interface SessionType {
  isSessionValid: boolean
}

interface SessionActionsType {
  type: string
}

type SessionReducerType = Reducer<SessionType, SessionActionsType>

const sessionReducer: SessionReducerType = (state, action) => {
  if (!state || !action) {
    return { ...sessionInitialState }
  }

  return state
}

export default sessionReducer
