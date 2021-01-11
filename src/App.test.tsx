import React from 'react'
import App from './App'
import renderWithState from './lib/renderWithState'

test('app loading', () => {
  const { getByText } = renderWithState(<App />)
  expect(getByText('loading...')).toBeTruthy()
})
