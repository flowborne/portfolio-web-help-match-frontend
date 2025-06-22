import { createContext, useContext, useEffect, useState } from 'react'
import { useHTTP } from '~hooks/http.hook'
import { getUserData } from '~services/authorizationService'

import { UserContextProps, UserProviderProps } from '~types/userContext'
import { useAuthContext } from './auth-context'


const UserContext = createContext<UserContextProps>({
    userData: {
      avatarUrl: "", 
      userId: "", 
      userName: ""
    },
    setUserData: () => {}
})

const UserProvider = ({ children }: UserProviderProps) => {
 const { request } = useHTTP()
 const {access_token} = useAuthContext()

 const [userData, setUserData] = useState({
   avatarUrl: "",
   userId: "",
   userName: ""
 })
    useEffect(() => {
      if (access_token) {
      const user = async () => {
        const data = await getUserData(request) as { avatarUrl: string; userId: string; userName: string }
        setUserData(data)
      }
      user()
      }
    }, [])
  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

const useUserContext = () => useContext(UserContext)

export { UserProvider, useUserContext }
