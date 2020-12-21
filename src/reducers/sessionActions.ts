export interface EmptyAction {
  type: 'no_action'
}

export interface SavePublicToken {
  type: 'set_public_token'
  token: string
}

export interface SavePrivateToken {
  type: 'set_private_token'
  token: string
}

export type SessionActionsType = EmptyAction | SavePublicToken | SavePrivateToken
