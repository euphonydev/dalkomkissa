import { Database } from '@/types/database.types'

export type UserInfo = {
  avatar: string | null
  role: string | null
} & Database['public']['Views']['user_profile']['Row']
