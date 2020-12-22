import { Reducer } from 'redux'
import { SessionActionsType } from './sessionActions'
import sessionInitialState, { SessionType } from './sessionInitialState'

type SessionReducerType = Reducer<SessionType, SessionActionsType>

const sessionReducer: SessionReducerType = (state, action) => {
  if (!state) return { ...sessionInitialState }
  if (!action) return state

  switch (action.type) {
    case 'session_set_public_token':
      return {
        ...state,
        publicToken: action.token,
      }
    case 'session_set_private_token':
      return {
        ...state,
        privateToken: action.token,
      }
    default:
      return state
  }
}

export default sessionReducer
