import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export const useUser = () => {
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<any | null>(null)
  const [avatar, setAvatar] = useState<string>()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string>('user')

  useEffect(() => {
    const getUser = async () => {
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
          setUser(data)
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

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        setIsLoggedIn(true)
        getUser()
      }
    }

    checkSession()
  }, [supabase])

  return {
    user,
    avatar,
    isLoggedIn,
    userRole,
  }
}

export default useUser
