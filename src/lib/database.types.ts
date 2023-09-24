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
          email: string
          id: string
          join_date: string | null
          username: string | null
        }
        Insert: {
          email: string
          id: string
          join_date?: string | null
          username?: string | null
        }
        Update: {
          email?: string
          id?: string
          join_date?: string | null
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
          deleted_at: string | null
          id: string
          published_at: string | null
          rating_id: number | null
          type_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          published_at?: string | null
          rating_id?: number | null
          type_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
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
            referencedRelation: "rating"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "entry_type_id_fkey"
            columns: ["type_id"]
            referencedRelation: "type"
            referencedColumns: ["id"]
          }
        ]
      }
      entry_detail: {
        Row: {
          background: string | null
          description: string | null
          entry_id: string
          lang: string
          thumb: string | null
          title: string | null
        }
        Insert: {
          background?: string | null
          description?: string | null
          entry_id: string
          lang?: string
          thumb?: string | null
          title?: string | null
        }
        Update: {
          background?: string | null
          description?: string | null
          entry_id?: string
          lang?: string
          thumb?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "entry_detail_entry_id_fkey"
            columns: ["entry_id"]
            referencedRelation: "entry"
            referencedColumns: ["id"]
          }
        ]
      }
      movie: {
        Row: {
          format: string | null
          id: string
          origin_country: string | null
          release_date: string | null
          runtime: number | null
          status: string
        }
        Insert: {
          format?: string | null
          id: string
          origin_country?: string | null
          release_date?: string | null
          runtime?: number | null
          status: string
        }
        Update: {
          format?: string | null
          id?: string
          origin_country?: string | null
          release_date?: string | null
          runtime?: number | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "movie_id_fkey"
            columns: ["id"]
            referencedRelation: "entry"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          account_id: string | null
          background: string | null
          bio: string | null
          birthdate: string | null
          gender: string
          id: string
          name: string
          photo: string | null
        }
        Insert: {
          account_id?: string | null
          background?: string | null
          bio?: string | null
          birthdate?: string | null
          gender?: string
          id: string
          name: string
          photo?: string | null
        }
        Update: {
          account_id?: string | null
          background?: string | null
          bio?: string | null
          birthdate?: string | null
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
      rating: {
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
      type: {
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
    }
    Views: {
      movie_list: {
        Row: {
          background: string | null
          created_at: string | null
          deleted_at: string | null
          description: string | null
          format: string | null
          id: string | null
          lang: string | null
          origin_country: string | null
          published: string | null
          published_at: string | null
          release_date: string | null
          runtime: number | null
          status: string | null
          thumb: string | null
          title: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "movie_id_fkey"
            columns: ["id"]
            referencedRelation: "entry"
            referencedColumns: ["id"]
          }
        ]
      }
      user_profile: {
        Row: {
          account_id: string | null
          background: string | null
          bio: string | null
          birthdate: string | null
          email: string | null
          gender: string | null
          join_date: string | null
          name: string | null
          photo: string | null
          profile_id: string | null
          username: string | null
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
            columns: ["profile_id"]
            referencedRelation: "entry"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      delete_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: string
      }
      get_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: Json
      }
      get_claims: {
        Args: {
          uid: string
        }
        Returns: Json
      }
      get_movie_list: {
        Args: {
          lang_param?: string
          limit_param?: number
        }
        Returns: {
          id: string
          status: string
          format: string
          runtime: number
          release_date: string
          origin_country: string
          thumb: string
          background: string
          title: string
          description: string
          created_at: string
          published_at: string
          updated_at: string
          deleted_at: string
          published: string
        }[]
      }
      get_my_claim: {
        Args: {
          claim: string
        }
        Returns: Json
      }
      get_my_claims: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      is_claims_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      set_claim: {
        Args: {
          uid: string
          claim: string
          value: Json
        }
        Returns: string
      }
      update_user_profile: {
        Args: {
          user_account_id: string
          new_username: string
          new_name: string
          new_gender: string
          new_birthdate: string
          new_photo: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
