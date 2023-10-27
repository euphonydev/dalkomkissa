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

export type Image = {
  account_id: string
  bucket: string
  created_at: string | null
  dimension: string
  id: string
  size: number | null
  url: string
}
