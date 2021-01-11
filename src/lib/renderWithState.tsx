import { AppState, createTestingStore, initialState } from '../reducers/store'
import React, { ReactNode } from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

const newState = () => ({
  ...initialState,
})

const renderWithState = (children: ReactNode, initialState: AppState = newState()) => {
  const store = createTestingStore(initialState)
  return {
    ...render(<Provider store={store}>{children}</Provider>),
    store,
  }
}

export default renderWithState
