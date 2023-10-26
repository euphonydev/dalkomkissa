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

export const insertImage = async (
  supabase: AppSupabaseClient,
  file: File,
  bucket: string,
  path: string,
  dimension: string,
  size: number,
  accountId: string,
): Promise<Cover | null> => {
  const generatedId = uuidv4()
  const fileExtension = substringAfterLast(file.name, '.')
  const pathUrl = `${path}/${generatedId}.${fileExtension}`
  const uploadSuccess = await uploadImage(supabase, bucket, pathUrl, file)
  if (uploadSuccess) {
    const { error, data } = await supabase
      .from('images')
      .insert({
        id: generatedId,
        bucket: bucket,
        dimension: dimension,
        size: size,
        url: pathUrl,
        account_id: accountId,
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
