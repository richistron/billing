import { AppState } from '../reducers/store'
import { useSelector } from 'react-redux'

const usePublicToken = () =>
  useSelector<AppState, string>((state: AppState): string => state.session.publicToken)

export default usePublicToken
