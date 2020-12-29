import { useSelector } from 'react-redux'
import { AppState } from '../reducers/store'

const usePrivateToken = () => useSelector<AppState, string>((state) => state.session.privateToken)

export default usePrivateToken
