export interface EmptyAction {
  type: 'no_action'
}

export interface SavePublicToken {
  type: 'session_set_public_token'
  token: string
}

export interface SavePrivateToken {
  type: 'session_set_private_token'
  token: string
}

export type SessionActionsType = EmptyAction | SavePublicToken | SavePrivateToken
