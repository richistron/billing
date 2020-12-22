import { AppState } from '../reducers/store'

const getPublicToken = (state: AppState) => state.session.publicToken

export default getPublicToken
