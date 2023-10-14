import { getImagePublicUrl, removeImage } from '@/services/common'
import { AppSupabaseClient } from '@/lib/supabase/types'

export const getUserAvatar = async (
  supabase: AppSupabaseClient,
  url: string | null,
  id: string,
): Promise<string> => {
  if (url) {
    if (url.startsWith('https')) {
      return url
    } else {
      return await getImagePublicUrl(supabase, 'avatar', url)
    }
  } else {
    return `https://robohash.org/${id}.png?set=set3`
  }
}

export const removeUserAvatar = async (
  supabase: AppSupabaseClient,
  fileName: string,
  accountId: string,
): Promise<Boolean> => {
  const success = await removeImage(supabase, 'avatar', fileName)
  if (success) {
    const { error } = await supabase
      .from('profile')
      .update({ photo: '' })
      .eq('account_id', accountId)
    if (!error) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export const checkUsernameAvailability = async (
  supabase: AppSupabaseClient,
  username: string,
): Promise<Boolean> => {
  const { data } = await supabase
    .from('account')
    .select('id')
    .eq('username', username)
    .single()
  if (data) {
    return true
  } else {
    return false
  }
}

export const updateUserProfile = async (
  supabase: AppSupabaseClient,
  accountId: string,
  username: string,
  fullName: string,
  gender: string,
  birthDate: string,
  fileName: string,
): Promise<Boolean> => {
  const { error } = await supabase.rpc('update_user_profile', {
    user_account_id: accountId,
    new_username: username,
    new_name: fullName,
    new_gender: gender,
    new_birthdate: birthDate,
    new_photo: fileName,
  })
  if (!error) {
    return true
  } else {
    return false
  }
}
