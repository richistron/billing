export interface SessionType {
  isSessionValid: boolean
  publicToken: string
  privateToken: string
}

const sessionInitialState: SessionType = {
  isSessionValid: false,
  publicToken: '',
  privateToken: '',
}

export default sessionInitialState
