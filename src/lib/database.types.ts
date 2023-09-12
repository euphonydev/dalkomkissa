export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      account: {
        Row: {
          created_at: string | null
          email: string
          id: string
          username: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          username?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "account_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      entry: {
        Row: {
          created_at: string
          deleted_At: string | null
          id: string
          published_at: string | null
          rating_id: number | null
          type_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted_At?: string | null
          id?: string
          published_at?: string | null
          rating_id?: number | null
          type_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted_At?: string | null
          id?: string
          published_at?: string | null
          rating_id?: number | null
          type_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entry_rating_id_fkey"
            columns: ["rating_id"]
            referencedRelation: "entry_rating"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entry_type_id_fkey"
            columns: ["type_id"]
            referencedRelation: "entry_type"
            referencedColumns: ["id"]
          }
        ]
      }
      entry_rating: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      entry_type: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          account_id: string | null
          background: string | null
          bio: string | null
          birthdate: string
          gender: string
          id: string
          name: string
          photo: string | null
        }
        Insert: {
          account_id?: string | null
          background?: string | null
          bio?: string | null
          birthdate: string
          gender?: string
          id: string
          name: string
          photo?: string | null
        }
        Update: {
          account_id?: string | null
          background?: string | null
          bio?: string | null
          birthdate?: string
          gender?: string
          id?: string
          name?: string
          photo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_account_id_fkey"
            columns: ["account_id"]
            referencedRelation: "account"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            referencedRelation: "entry"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
