import { Reducer } from 'redux'

export interface SessionType {
  foo: boolean
}

interface SessionActionsType {
  type: string
}

type SessionReducerType = Reducer<SessionType, SessionActionsType>

const sessionReducer: SessionReducerType = (state, action) => {
  return {
    foo: true,
  }
}

export default sessionReducer
