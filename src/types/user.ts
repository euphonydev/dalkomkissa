import { Database } from '@/lib/database.types'

export type UserInfo = {
  account_id: string
  background: string | null
  bio: string | null
  birthdate: string | null
  email: string
  gender: string
  hometown: string | null
  join_date: string
  name: string
  photo: string | null
  profile_id: string | null
  username: string
}
