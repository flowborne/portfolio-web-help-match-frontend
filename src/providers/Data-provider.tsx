import { AuthProvider } from '~contexts/auth-context'
import { SocketProvider } from '~contexts/socket-context'   
import { CatigoryProvider } from '~contexts/catigory-context'
import { ProductProvider } from '~contexts/product-context'
import { SnackbarProvider } from '~hooks/snackbar.hook'
import { DataProviderProps } from '~types/dataProvider'
import { UserProvider } from '~contexts/user-context'

export const DataProvider = ({ children }: DataProviderProps) => {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <SocketProvider>    
            <UserProvider>      
          <CatigoryProvider>
            <ProductProvider>
              {children}
            </ProductProvider>
          </CatigoryProvider>
            </UserProvider>
        </SocketProvider>
      </AuthProvider>
    </SnackbarProvider>
  )
}
