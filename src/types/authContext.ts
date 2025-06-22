import { ReactNode } from 'react'

export type AuthContextProps = {
  access_token: string | null
  refresh_token: string | null
  login: (jwtToken: string, jwtRefreshToken: string) => void
  logout: () => void
  updateTokens: (newAccessToken: string, jwtRefreshToken: string) => void
  isAuthenticated: boolean
  userId: string | null
}

export type AuthProviderProps = {
  children: ReactNode
}

export interface DecodedToken {
  exp: number
  sub: string
}
