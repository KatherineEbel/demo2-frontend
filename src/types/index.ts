import React from 'react'

export type Props = {
  children: React.ReactNode
}

export type User = {
  id?: string
  alias?: string
  email: string
  password: string
  role?: string
  fullName?: string
}

export enum ReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3
}

export type APIConnection = {
  id: string | number
  readyState: ReadyState
  jwt: string | null
}
