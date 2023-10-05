'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { UserInfo } from '@/types/user'

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
  const supabase = createClientComponentClient()

  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (session) {
      setIsLoggedIn(true)
      getUserInfo()
    }
  }

  const getUserInfo = async () => {
    const {
      data: { user: userData },
    } = await supabase.auth.getUser()
    if (userData) {
      const { data, error } = await supabase
        .from('user_profile')
        .select('*')
        .eq('account_id', userData.id)
        .single()
      if (!error) {
        setUserInfo(data)
        const { data: role } = await supabase.rpc('get_my_claim', {
          claim: 'userrole',
        })
        setUserRole(role)
        if (data.photo.startsWith('https')) {
          setAvatar(data.photo)
        } else {
          if (data.photo) {
            const { data: photo } = await supabase.storage
              .from('avatar')
              .getPublicUrl(data.photo)
            setAvatar(photo.publicUrl)
          } else {
            setAvatar(`https://robohash.org/${data?.profile_id}.png?set=set3`)
          }
        }
      }
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
