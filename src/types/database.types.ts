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
      accounts: {
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
            foreignKeyName: 'accounts_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      characters: {
        Row: {
          birthdate: string | null
          gender: string | null
          id: string
          name: string
        }
        Insert: {
          birthdate?: string | null
          gender?: string | null
          id: string
          name: string
        }
        Update: {
          birthdate?: string | null
          gender?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'characters_id_fkey'
            columns: ['id']
            referencedRelation: 'entries'
            referencedColumns: ['id']
          },
        ]
      }
      entries: {
        Row: {
          created_at: string
          deleted_at: string | null
          id: string
          is_adult: boolean
          published_at: string | null
          type_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_adult?: boolean
          published_at?: string | null
          type_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          id?: string
          is_adult?: boolean
          published_at?: string | null
          type_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'entries_type_id_fkey'
            columns: ['type_id']
            referencedRelation: 'type'
            referencedColumns: ['id']
          },
        ]
      }
      episodes: {
        Row: {
          episode_number: number
          id: string
          movie_id: string
          release_date: string | null
          runtime: number | null
        }
        Insert: {
          episode_number: number
          id: string
          movie_id: string
          release_date?: string | null
          runtime?: number | null
        }
        Update: {
          episode_number?: number
          id?: string
          movie_id?: string
          release_date?: string | null
          runtime?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'episodes_id_fkey'
            columns: ['id']
            referencedRelation: 'entries'
            referencedColumns: ['id']
          },
        ]
      }
      follows: {
        Row: {
          follow: string
          follow_date: string
          profile_id: string
        }
        Insert: {
          follow: string
          follow_date: string
          profile_id: string
        }
        Update: {
          follow?: string
          follow_date?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'follows_follow_fkey'
            columns: ['follow']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'follows_follow_fkey'
            columns: ['follow']
            referencedRelation: 'user_profile'
            referencedColumns: ['profile_id']
          },
          {
            foreignKeyName: 'follows_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'follows_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'user_profile'
            referencedColumns: ['profile_id']
          },
        ]
      }
      genres: {
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
      images: {
        Row: {
          account_id: string
          bucket: string
          created_at: string | null
          dimension: string
          id: string
          size: number | null
          url: string
        }
        Insert: {
          account_id: string
          bucket: string
          created_at?: string | null
          dimension: string
          id?: string
          size?: number | null
          url: string
        }
        Update: {
          account_id?: string
          bucket?: string
          created_at?: string | null
          dimension?: string
          id?: string
          size?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: 'images_account_id_fkey'
            columns: ['account_id']
            referencedRelation: 'accounts'
            referencedColumns: ['id']
          },
        ]
      }
      movie_genres: {
        Row: {
          genre_id: number
          movie_id: string
        }
        Insert: {
          genre_id: number
          movie_id: string
        }
        Update: {
          genre_id?: number
          movie_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'movie_genres_genre_id_fkey'
            columns: ['genre_id']
            referencedRelation: 'genres'
            referencedColumns: ['id']
          },
        ]
      }
      movie_list: {
        Row: {
          end_date: string
          movie_id: string
          note: string
          profile_id: string
          progress: number
          start_date: string
          status: string
        }
        Insert: {
          end_date: string
          movie_id: string
          note: string
          profile_id: string
          progress: number
          start_date: string
          status: string
        }
        Update: {
          end_date?: string
          movie_id?: string
          note?: string
          profile_id?: string
          progress?: number
          start_date?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: 'movie_list_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_list_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'user_profile'
            referencedColumns: ['profile_id']
          },
        ]
      }
      movie_tags: {
        Row: {
          movie_id: string
          theme_id: number
        }
        Insert: {
          movie_id: string
          theme_id: number
        }
        Update: {
          movie_id?: string
          theme_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'movie_tags_theme_id_fkey'
            columns: ['theme_id']
            referencedRelation: 'tags'
            referencedColumns: ['id']
          },
        ]
      }
      movies: {
        Row: {
          age_rating: Json | null
          alternative_title: Json | null
          covers: Json | null
          description: Json | null
          format: Json
          id: string
          original_airdate: Json | null
          original_country: Json
          original_language: Json
          original_title: Json
          reviews: Json | null
          runtime: Json | null
          status: Json
          tagline: Json | null
        }
        Insert: {
          age_rating?: Json | null
          alternative_title?: Json | null
          covers?: Json | null
          description?: Json | null
          format: Json
          id: string
          original_airdate?: Json | null
          original_country: Json
          original_language: Json
          original_title: Json
          reviews?: Json | null
          runtime?: Json | null
          status: Json
          tagline?: Json | null
        }
        Update: {
          age_rating?: Json | null
          alternative_title?: Json | null
          covers?: Json | null
          description?: Json | null
          format?: Json
          id?: string
          original_airdate?: Json | null
          original_country?: Json
          original_language?: Json
          original_title?: Json
          reviews?: Json | null
          runtime?: Json | null
          status?: Json
          tagline?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: 'movies_id_fkey'
            columns: ['id']
            referencedRelation: 'entries'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          account_id: string | null
          background: string | null
          bio: string | null
          birthdate: string | null
          gender: string
          hometown: string | null
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
          hometown?: string | null
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
          hometown?: string | null
          id?: string
          name?: string
          photo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_account_id_fkey'
            columns: ['account_id']
            referencedRelation: 'accounts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            referencedRelation: 'entries'
            referencedColumns: ['id']
          },
        ]
      }
      reviews: {
        Row: {
          id: string
          profile_id: string
          review: string
          score: number
        }
        Insert: {
          id: string
          profile_id: string
          review: string
          score: number
        }
        Update: {
          id?: string
          profile_id?: string
          review?: string
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: 'reviews_id_fkey'
            columns: ['id']
            referencedRelation: 'entries'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reviews_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'reviews_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'user_profile'
            referencedColumns: ['profile_id']
          },
        ]
      }
      seasons: {
        Row: {
          id: string
          movie_id: string
          release_date: string | null
          season_number: number
        }
        Insert: {
          id: string
          movie_id: string
          release_date?: string | null
          season_number: number
        }
        Update: {
          id?: string
          movie_id?: string
          release_date?: string | null
          season_number?: number
        }
        Relationships: [
          {
            foreignKeyName: 'seasons_id_fkey'
            columns: ['id']
            referencedRelation: 'entries'
            referencedColumns: ['id']
          },
        ]
      }
      staff_position: {
        Row: {
          id: number
          name: string
          type: string
        }
        Insert: {
          id: number
          name: string
          type: string
        }
        Update: {
          id?: number
          name?: string
          type?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          id: number
          name: string
          type: string | null
        }
        Insert: {
          id?: number
          name: string
          type?: string | null
        }
        Update: {
          id?: number
          name?: string
          type?: string | null
        }
        Relationships: []
      }
      type: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id: number
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
      user_profile: {
        Row: {
          account_id: string | null
          background: string | null
          bio: string | null
          birthdate: string | null
          email: string | null
          gender: string | null
          hometown: string | null
          join_date: string | null
          name: string | null
          photo: string | null
          profile_id: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_account_id_fkey'
            columns: ['account_id']
            referencedRelation: 'accounts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'entries'
            referencedColumns: ['id']
          },
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
      get_movie_entries: {
        Args: {
          lang: string
        }
        Returns: {
          id: string
          title: string
          description: string
          original_country: string
          original_language: string
          original_airdate: string
          cover_url: string
          format: string
          status: string
          runtime: string
          average_score: number
          is_adult: boolean
          created_at: string
          published_at: string
          updated_at: string
          deleted_at: string
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
      movie_type: 'series' | 'featured_film' | 'short_film' | 'mini_series'
      publication_status:
        | 'upcoming'
        | 'ongoing'
        | 'returning'
        | 'cancelled'
        | 'ended'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
