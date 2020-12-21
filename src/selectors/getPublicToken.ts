import { AppState } from '../store'

const getPublicToken = (state: AppState) => state.session.publicToken

export default getPublicToken
