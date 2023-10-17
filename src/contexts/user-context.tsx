'use client'

import { getCurrentSession, getCurrentUser } from '@/services/auth'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { UserInfo } from '@/types/user.types'
import { supabase } from '@/lib/supabase/clients/client-component-client'

interface UserContextType {
  userInfo: UserInfo | null
  userRole: string | null
  avatar: string | undefined
  isLoggedIn: boolean | null
  getUserInfo: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [avatar, setAvatar] = useState<string>()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string>('user')

  const checkSession = async () => {
    const session = await getCurrentSession(supabase)
    if (session) {
      setIsLoggedIn(true)
      getUserInfo()
    }
  }

  const getUserInfo = async () => {
    const data = await getCurrentUser(supabase)
    if (data) {
      setIsLoggedIn(true)
      setUserInfo(data)
      data.role && setUserRole(data.role)
      data.avatar && setAvatar(data.avatar)
    } else {
      setIsLoggedIn(false)
      setUserInfo(null)
      setUserRole('user')
      setAvatar(undefined)
    }
  }

  useEffect(() => {
    checkSession()
  }, [supabase])

  return (
    <UserContext.Provider
      value={{ userInfo, getUserInfo, userRole, avatar, isLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}
