import { AppSupabaseClient } from '@/lib/supabase/types'

export const getImagePublicUrl = async (
  supabase: AppSupabaseClient,
  from: string,
  url: string,
  callbackUrl: string | null = null,
): Promise<string> => {
  const { data } = await supabase.storage.from(from).getPublicUrl(url)
  if (data) {
    return data.publicUrl
  } else {
    if (callbackUrl) {
      return callbackUrl
    } else {
      return ''
    }
  }
}

export const removeImage = async (
  supabase: AppSupabaseClient,
  from: string,
  fileName: string,
): Promise<boolean> => {
  const { error } = await supabase.storage.from(from).remove([fileName])
  if (!error) {
    return true
  } else {
    return false
  }
}

export const uploadImage = async (
  supabase: AppSupabaseClient,
  from: string,
  fileName: string,
  file: File,
): Promise<boolean> => {
  const { error } = await supabase.storage
    .from(from)
    .upload(fileName, file, { upsert: true })
  if (!error) {
    return true
  } else {
    return false
  }
}
