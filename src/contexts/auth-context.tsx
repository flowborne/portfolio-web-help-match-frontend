import { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { AuthContextProps, AuthProviderProps, DecodedToken } from '~types/authContext'
import { useAuth } from '~hooks/auth.hook'

const AuthContext = createContext<AuthContextProps>({
  access_token: null,
  refresh_token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  userId: null,
  updateTokens: () => {}
})

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { access_token, refresh_token, login, logout, isReady, updateTokens } =
    useAuth()
  const [userId, setUserId] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  

  const isAuthenticated = !!access_token

  useEffect(() => {
    const verifyToken = async () => {
      if (access_token) {
        try {
          const decoded = jwtDecode<DecodedToken>(access_token)
          const currentTime = Date.now() / 1000

          if (decoded.exp < currentTime) {
            console.warn('Token expired, attempting refresh')
            if (refresh_token) {
              try {
                const refreshUrl = `/api/auth/refresh?refresh=${encodeURIComponent(refresh_token)}`
                const refreshResponse = await fetch(refreshUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' }
                })
                if (refreshResponse.ok) {
                  const refreshData: { access_token: string } =
                    await refreshResponse.json()
                  updateTokens(refreshData.access_token, refresh_token)
                  const newDecoded = jwtDecode<DecodedToken>(
                    refreshData.access_token
                  )
                  setUserId(newDecoded.sub)
                } else {
                  logout()
                }
              } catch (err) {
                console.error('Token refresh error:', err)
                logout()
              }
            } else {
              logout()
            }
          } else {
            setUserId(decoded.sub)
          }
        } catch (error) {
          console.error('Invalid token:', error)
          logout()
        }
      } else {
        setUserId(null)
      }
      setCheckingAuth(false)
    }

    verifyToken()
  }, [access_token, refresh_token, logout, updateTokens])
  if (!isReady || checkingAuth) return null

  return (
    <AuthContext.Provider
      value={{
        access_token,
        refresh_token,
        login,
        logout,
        isAuthenticated,
        userId,
        updateTokens
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuthContext = () => useContext(AuthContext)

export { AuthProvider, useAuthContext }
