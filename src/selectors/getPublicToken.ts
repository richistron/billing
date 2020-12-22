import { AppState } from '../reducers/store'

const getPublicToken = (state: AppState): string => state.session.publicToken

export default getPublicToken
