import { Database } from '@/types/database.types'
import { Overwrite } from '@/lib/utils/type'

export type UserInfo = Overwrite<
  Database['public']['Views']['user_profile']['Row'],
  {
    avatar: string | null
    role: string
    account_id: string
    background: string | null
    bio: string | null
    birthdate: Date | null
    email: string
    gender: string
    hometown: string | null
    join_date: Date
    name: string
    photo: string | null
    profile_id: string | null
    username: string
  }
>
