import { FC, useMemo } from 'react'
import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
  RouterProviderProps
} from 'react-router-dom'
import { useAuthContext } from '~contexts/auth-context'
import { HomeLayout} from '~layouts/HomeLayout/HomeLayout'
import { OutwardLayout } from '~layouts/OutwardLayout/OutwardLayout'
import { AccountSettingsPage } from '~pages/AccountSettingsPage'
import { AccountSettingsProductDetailsPage } from '~pages/AccountSettingsProductDetailsPage'
import { AdvertisementsCreationPage } from '~pages/AdvertisementsCreationPage'
import { AdvertisementsPage } from '~pages/AdvertisementsPage'
import { AdvertisementsProductDetailsPage } from '~pages/AdvertisementsProductDetailsPage'
import { ChatPage } from '~pages/ChatPage'
import { ForgotPasswordPage } from '~pages/ForgotPasswordPage'
import { LoginPage } from '~pages/LoginPage'
import { RegisterPage } from '~pages/RegisterPage'

type CustomFutureConfig = RouterProviderProps['future'] & {
  v7_relativeSplatPath?: boolean
}

const futureOptions: CustomFutureConfig = {
  v7_startTransition: false,
  v7_relativeSplatPath: false
}

const getRoutes = (isAuthenticated: boolean): RouteObject[] => {
  if (isAuthenticated) {
    return [
      {
        path: '/',
        element: <HomeLayout />,
        children: [
          {
            index: true,
            element: <Navigate replace to='advertisements' />
          },
          {
            path: 'advertisements',
            element: <AdvertisementsPage />
          },
          {
            path: 'advertisements/create',
            element: <AdvertisementsCreationPage />
          },
          {
            path: 'advertisements/product-details/:productId/:userId',
            element: <AdvertisementsProductDetailsPage />
          },
          {
            path: 'chats/:productId?/:userId?',
            element: <ChatPage />
          },
          {
            path: 'accountSettings',
            element: <AccountSettingsPage />
          },
          {
            path: 'accountSettings/product-details/:productId/:userId',
            element: <AccountSettingsProductDetailsPage />
          }
        ]
      },
      {
        path: '*',
        element: <Navigate replace to='/' />
      }
    ]
  } else {
    return [
      {
        path: '/',
        element: <OutwardLayout />,
        children: [
          {
            index: true,
            element: <Navigate replace to='login' />
          },
          {
            path: 'login',
            element: <LoginPage />
          },
          {
            path: '/register/:ReferralCode',
            element: <RegisterPage />
          },
          {
            path: '/forgot-password',
            element: <ForgotPasswordPage />
          },
        ]
      },
      {
        path: '*',
        element: <Navigate replace to='/' />
      }
    ]
  }
}

const RoutesComponent: FC = () => {
  const { isAuthenticated } = useAuthContext()

  const router = useMemo(() => {
    return createBrowserRouter(getRoutes(isAuthenticated))
  }, [isAuthenticated])

  return (
    <RouterProvider
      key={isAuthenticated ? 'auth' : 'guest'} 
      future={futureOptions}
      router={router}
    />
  )
}

export default RoutesComponent
