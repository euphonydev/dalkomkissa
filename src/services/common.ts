import { v4 as uuidv4 } from 'uuid'
import { Cover } from '@/types/image.types'
import { AppSupabaseClient } from '@/lib/supabase/types'
import { substringAfterLast } from '@/lib/utils/string'

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
  path: string,
  file: File,
): Promise<boolean> => {
  const { error } = await supabase.storage
    .from(from)
    .upload(path, file, { upsert: true })
  if (!error) {
    return true
  } else {
    return false
  }
}

export const insertCover = async (
  supabase: AppSupabaseClient,
  file: File,
  profileId: string,
  size: string,
  lang: string,
  path: string,
  isPrimary: boolean | null,
): Promise<Cover | null> => {
  const generatedId = uuidv4()
  const fileExtension = substringAfterLast(file.name, '.')
  const pathUrl = `${path}/${generatedId}.${fileExtension}`
  const uploadSuccess = await uploadImage(supabase, 'cover', pathUrl, file)
  if (uploadSuccess) {
    const { error, data } = await supabase
      .from('cover')
      .insert({
        id: generatedId,
        profile_id: profileId,
        size: size,
        url: pathUrl,
        lang: lang,
        is_primary: isPrimary ? isPrimary : false,
      })
      .select()
      .single()
    if (!error && data) {
      return data
    } else {
      return null
    }
  } else {
    return null
  }
}
