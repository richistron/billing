export interface SessionType {
  isSessionValid: boolean
  publicToken: string
}

const sessionInitialState: SessionType = {
  isSessionValid: false,
  publicToken: '',
}

export default sessionInitialState
