import { ReactNode } from 'react'

export interface UserContextProps {
  userData: {
    avatarUrl: string;
    userId: string;
    userName: string;
  };
  setUserData: React.Dispatch<React.SetStateAction<{
    avatarUrl: string;
    userId: string;
    userName: string;
  }>>;
}

export type UserProviderProps = {
  children: ReactNode
}
