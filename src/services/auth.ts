import { getUserAvatar } from './user'
import { UserInfo } from '@/types/user.types'
import { AppSupabaseClient } from '@/lib/supabase/types'

export const signInWithEmailAndPassword = async (
  supabase: AppSupabaseClient,
  email: string,
  password: string,
): Promise<Boolean> => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
  if (!error) {
    return true
  } else {
    return false
  }
}

export const signInWithUsernameAndPassword = async (
  supabase: AppSupabaseClient,
  username: string,
  password: string,
): Promise<Boolean> => {
  const { data } = await supabase
    .from('account')
    .select('email')
    .eq('username', username)
    .single()
  if (data) {
    return await signInWithEmailAndPassword(supabase, data.email, password)
  } else {
    return false
  }
}

export const signUpWithEmailAndPassword = async (
  supabase: AppSupabaseClient,
  email: string,
  password: string,
): Promise<Boolean> => {
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: `${location.origin}/auth/callback`,
    },
  })
  if (!error) {
    return true
  } else {
    return false
  }
}

export const changeUserPassword = async (
  supabase: AppSupabaseClient,
  password: string,
): Promise<Boolean> => {
  const { error } = await supabase.auth.updateUser({
    password: password,
  })
  if (!error) {
    return true
  } else {
    return false
  }
}

export const sendPasswordRecoveryEmail = async (
  supabase: AppSupabaseClient,
  email: string,
): Promise<Boolean> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${location.origin}/auth/callback?next=/reset-password`,
  })
  if (!error) {
    return true
  } else {
    return false
  }
}

export const signOut = async (
  supabase: AppSupabaseClient,
): Promise<Boolean> => {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    return true
  } else {
    return false
  }
}

export const getCurrentSession = async (
  supabase: AppSupabaseClient,
): Promise<Boolean> => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (session) {
    return true
  } else {
    return false
  }
}
export const getCurrentUserId = async (
  supabase: AppSupabaseClient,
): Promise<string | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    return user.id
  } else {
    return null
  }
}

export const getCurrentUser = async (
  supabase: AppSupabaseClient,
): Promise<UserInfo | null> => {
  const {
    data: { user: userData },
  } = await supabase.auth.getUser()
  if (userData) {
    const { data: userInfo } = await supabase
      .from('user_profile')
      .select('*')
      .eq('account_id', userData.id)
      .single()
    const { data: role } = await supabase.rpc('get_my_claim', {
      claim: 'userrole',
    })
    if (userInfo) {
      const avatar = await getUserAvatar(
        supabase,
        userInfo.photo,
        userInfo.profile_id!,
      )
      const userRole = role ? role.toString() : 'user'
      // @ts-ignore
      return {
        ...userInfo,
        avatar: avatar,
        role: userRole,
      }
    } else {
      return null
    }
  } else {
    return null
  }
}
export const signInWithGoogle = async (supabase: AppSupabaseClient) => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })
}
