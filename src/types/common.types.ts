import { Overwrite } from '@/lib/utils/type'

export type LockedField = {
  locked: boolean
}

export type TranslatedField = {
  language: string
  is_primary?: boolean
}

export type ImageInput = {
  id?: string
  url: string
  dimension: string
  size: number
}

export type Image = Overwrite<
  ImageInput,
  {
    id: string
    account_id: string
    created_at: string
  }
>
