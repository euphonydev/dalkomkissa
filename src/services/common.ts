import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database.types'

export async function getImagePublicUrl(
  from: string,
  url: string,
  callbackUrl: string | null = null,
): Promise<string> {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })
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
