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
            foreignKeyName: 'account_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
        ]
      }
      age_rating: {
        Row: {
          id: number
          min_age: number | null
          name: string
        }
        Insert: {
          id?: number
          min_age?: number | null
          name: string
        }
        Update: {
          id?: number
          min_age?: number | null
          name?: string
        }
        Relationships: []
      }
      alternative_name: {
        Row: {
          id: number
          lang: string
          name: string
          type: string
        }
        Insert: {
          id: number
          lang: string
          name: string
          type: string
        }
        Update: {
          id?: number
          lang?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      character: {
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
            foreignKeyName: 'character_id_fkey'
            columns: ['id']
            referencedRelation: 'entry'
            referencedColumns: ['id']
          },
        ]
      }
      character_alternative_name: {
        Row: {
          alternative_name_id: number
          character_id: string
        }
        Insert: {
          alternative_name_id: number
          character_id: string
        }
        Update: {
          alternative_name_id?: number
          character_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'character_alternative_name_alternative_name_id_fkey'
            columns: ['alternative_name_id']
            referencedRelation: 'alternative_name'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'character_alternative_name_character_id_fkey'
            columns: ['character_id']
            referencedRelation: 'character'
            referencedColumns: ['id']
          },
        ]
      }
      character_image: {
        Row: {
          character_id: string
          image_id: string
        }
        Insert: {
          character_id: string
          image_id: string
        }
        Update: {
          character_id?: string
          image_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'character_image_character_id_fkey'
            columns: ['character_id']
            referencedRelation: 'character'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'character_image_image_id_fkey'
            columns: ['image_id']
            referencedRelation: 'image'
            referencedColumns: ['id']
          },
        ]
      }
      character_translation: {
        Row: {
          character_id: string
          description: string
          lang: string
          name: string
        }
        Insert: {
          character_id: string
          description: string
          lang: string
          name: string
        }
        Update: {
          character_id?: string
          description?: string
          lang?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'character_translation_character_id_fkey'
            columns: ['character_id']
            referencedRelation: 'character'
            referencedColumns: ['id']
          },
        ]
      }
      cover: {
        Row: {
          created_at: string | null
          id: string
          is_primary: boolean
          lang: string
          profile_id: string
          size: string
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_primary?: boolean
          lang: string
          profile_id: string
          size: string
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_primary?: boolean
          lang?: string
          profile_id?: string
          size?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: 'cover_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'cover_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'user_profile'
            referencedColumns: ['profile_id']
          },
        ]
      }
      entry: {
        Row: {
          age_rating_id: number
          created_at: string
          deleted_at: string | null
          id: string
          published_at: string | null
          type_id: number | null
          updated_at: string | null
        }
        Insert: {
          age_rating_id?: number
          created_at?: string
          deleted_at?: string | null
          id?: string
          published_at?: string | null
          type_id?: number | null
          updated_at?: string | null
        }
        Update: {
          age_rating_id?: number
          created_at?: string
          deleted_at?: string | null
          id?: string
          published_at?: string | null
          type_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'entry_age_rating_id_fkey'
            columns: ['age_rating_id']
            referencedRelation: 'age_rating'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'entry_type_id_fkey'
            columns: ['type_id']
            referencedRelation: 'type'
            referencedColumns: ['id']
          },
        ]
      }
      episode: {
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
            foreignKeyName: 'episode_id_fkey'
            columns: ['id']
            referencedRelation: 'entry'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'episode_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'episode_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie_entry'
            referencedColumns: ['id']
          },
        ]
      }
      episode_image: {
        Row: {
          episode_id: string
          image_id: string
        }
        Insert: {
          episode_id: string
          image_id: string
        }
        Update: {
          episode_id?: string
          image_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'episode_image_episode_id_fkey'
            columns: ['episode_id']
            referencedRelation: 'episode'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'episode_image_image_id_fkey'
            columns: ['image_id']
            referencedRelation: 'image'
            referencedColumns: ['id']
          },
        ]
      }
      episode_translation: {
        Row: {
          description: string
          episode_id: string
          lang: string
          name: string
        }
        Insert: {
          description: string
          episode_id: string
          lang: string
          name: string
        }
        Update: {
          description?: string
          episode_id?: string
          lang?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'episode_translation_episode_id_fkey'
            columns: ['episode_id']
            referencedRelation: 'episode'
            referencedColumns: ['id']
          },
        ]
      }
      genre: {
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
      image: {
        Row: {
          created_at: string | null
          id: string
          is_primary: boolean
          profile_id: string
          size: string
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_primary?: boolean
          profile_id: string
          size: string
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_primary?: boolean
          profile_id?: string
          size?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: 'image_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'image_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'user_profile'
            referencedColumns: ['profile_id']
          },
        ]
      }
      link: {
        Row: {
          id: number
          provider: string
          type: string | null
          url: string
        }
        Insert: {
          id?: number
          provider: string
          type?: string | null
          url: string
        }
        Update: {
          id?: number
          provider?: string
          type?: string | null
          url?: string
        }
        Relationships: []
      }
      movie: {
        Row: {
          default_cover_id: string | null
          id: string
          language: string
          origin_country: string | null
          origin_name: string
          release_date: string | null
          runtime: number | null
          status: Database['public']['Enums']['publication_status']
          type: Database['public']['Enums']['movie_type'] | null
        }
        Insert: {
          default_cover_id?: string | null
          id: string
          language: string
          origin_country?: string | null
          origin_name: string
          release_date?: string | null
          runtime?: number | null
          status: Database['public']['Enums']['publication_status']
          type?: Database['public']['Enums']['movie_type'] | null
        }
        Update: {
          default_cover_id?: string | null
          id?: string
          language?: string
          origin_country?: string | null
          origin_name?: string
          release_date?: string | null
          runtime?: number | null
          status?: Database['public']['Enums']['publication_status']
          type?: Database['public']['Enums']['movie_type'] | null
        }
        Relationships: [
          {
            foreignKeyName: 'movie_default_cover_id_fkey'
            columns: ['default_cover_id']
            referencedRelation: 'cover'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_id_fkey'
            columns: ['id']
            referencedRelation: 'entry'
            referencedColumns: ['id']
          },
        ]
      }
      movie_alternative_name: {
        Row: {
          alternative_name_id: number
          movie_id: string
        }
        Insert: {
          alternative_name_id: number
          movie_id: string
        }
        Update: {
          alternative_name_id?: number
          movie_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'movie_alternative_name_alternative_name_id_fkey'
            columns: ['alternative_name_id']
            referencedRelation: 'alternative_name'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_alternative_name_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_alternative_name_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie_entry'
            referencedColumns: ['id']
          },
        ]
      }
      movie_character: {
        Row: {
          character_id: string
          id: number
          lang: string
          movie_id: string
          profile_id: string
          type: string
        }
        Insert: {
          character_id: string
          id?: number
          lang: string
          movie_id: string
          profile_id: string
          type: string
        }
        Update: {
          character_id?: string
          id?: number
          lang?: string
          movie_id?: string
          profile_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: 'movie_character_character_id_fkey'
            columns: ['character_id']
            referencedRelation: 'character'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_character_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_character_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie_entry'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_character_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_character_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'user_profile'
            referencedColumns: ['profile_id']
          },
        ]
      }
      movie_company: {
        Row: {
          id: number
          movie_id: string
          profile_id: string
          type: number
        }
        Insert: {
          id?: number
          movie_id: string
          profile_id: string
          type: number
        }
        Update: {
          id?: number
          movie_id?: string
          profile_id?: string
          type?: number
        }
        Relationships: [
          {
            foreignKeyName: 'movie_company_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_company_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie_entry'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_company_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_company_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'user_profile'
            referencedColumns: ['profile_id']
          },
        ]
      }
      movie_cover: {
        Row: {
          cover_id: string
          movie_id: string
        }
        Insert: {
          cover_id: string
          movie_id: string
        }
        Update: {
          cover_id?: string
          movie_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'movie_cover_cover_id_fkey'
            columns: ['cover_id']
            referencedRelation: 'cover'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_cover_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_cover_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie_entry'
            referencedColumns: ['id']
          },
        ]
      }
      movie_genre: {
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
            foreignKeyName: 'movie_genre_genre_id_fkey'
            columns: ['genre_id']
            referencedRelation: 'genre'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_genre_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_genre_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie_entry'
            referencedColumns: ['id']
          },
        ]
      }
      movie_image: {
        Row: {
          image_id: string
          movie_id: string
        }
        Insert: {
          image_id: string
          movie_id: string
        }
        Update: {
          image_id?: string
          movie_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'movie_image_image_id_fkey'
            columns: ['image_id']
            referencedRelation: 'image'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_image_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_image_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie_entry'
            referencedColumns: ['id']
          },
        ]
      }
      movie_link: {
        Row: {
          link_id: number
          movie_id: string
        }
        Insert: {
          link_id: number
          movie_id: string
        }
        Update: {
          link_id?: number
          movie_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'movie_link_link_id_fkey'
            columns: ['link_id']
            referencedRelation: 'link'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_link_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_link_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie_entry'
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
            foreignKeyName: 'movie_list_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_list_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie_entry'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_list_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
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
      movie_review: {
        Row: {
          movie_id: string
          review_id: string
        }
        Insert: {
          movie_id: string
          review_id: string
        }
        Update: {
          movie_id?: string
          review_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'movie_review_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_review_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie_entry'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_review_review_id_fkey'
            columns: ['review_id']
            referencedRelation: 'review'
            referencedColumns: ['id']
          },
        ]
      }
      movie_staff: {
        Row: {
          id: number
          movie_id: string
          profile_id: string
          staff_position_id: number
        }
        Insert: {
          id?: number
          movie_id: string
          profile_id: string
          staff_position_id: number
        }
        Update: {
          id?: number
          movie_id?: string
          profile_id?: string
          staff_position_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'movie_staff_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_staff_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie_entry'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_staff_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_staff_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'user_profile'
            referencedColumns: ['profile_id']
          },
          {
            foreignKeyName: 'movie_staff_staff_position_id_fkey'
            columns: ['staff_position_id']
            referencedRelation: 'staff_position'
            referencedColumns: ['id']
          },
        ]
      }
      movie_tag: {
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
            foreignKeyName: 'movie_tag_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_tag_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie_entry'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_tag_theme_id_fkey'
            columns: ['theme_id']
            referencedRelation: 'tag'
            referencedColumns: ['id']
          },
        ]
      }
      movie_translation: {
        Row: {
          description: string
          lang: string
          movie_id: string
          name: string
          tagline: string | null
        }
        Insert: {
          description: string
          lang: string
          movie_id: string
          name: string
          tagline?: string | null
        }
        Update: {
          description?: string
          lang?: string
          movie_id?: string
          name?: string
          tagline?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'movie_translation_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_translation_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie_entry'
            referencedColumns: ['id']
          },
        ]
      }
      movie_video: {
        Row: {
          movie_id: string
          video_id: string
        }
        Insert: {
          movie_id: string
          video_id: string
        }
        Update: {
          movie_id?: string
          video_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'movie_video_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_video_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie_entry'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'movie_video_video_id_fkey'
            columns: ['video_id']
            referencedRelation: 'video'
            referencedColumns: ['id']
          },
        ]
      }
      profile: {
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
            foreignKeyName: 'profile_account_id_fkey'
            columns: ['account_id']
            referencedRelation: 'account'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_id_fkey'
            columns: ['id']
            referencedRelation: 'entry'
            referencedColumns: ['id']
          },
        ]
      }
      profile_follow: {
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
            foreignKeyName: 'profile_follow_follow_fkey'
            columns: ['follow']
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_follow_follow_fkey'
            columns: ['follow']
            referencedRelation: 'user_profile'
            referencedColumns: ['profile_id']
          },
          {
            foreignKeyName: 'profile_follow_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_follow_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'user_profile'
            referencedColumns: ['profile_id']
          },
        ]
      }
      profile_link: {
        Row: {
          link_id: number
          profile_id: string
        }
        Insert: {
          link_id: number
          profile_id: string
        }
        Update: {
          link_id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profile_link_link_id_fkey'
            columns: ['link_id']
            referencedRelation: 'link'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_link_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_link_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'user_profile'
            referencedColumns: ['profile_id']
          },
        ]
      }
      related_entry: {
        Row: {
          entry_id: string
          related_to: string
          type: string
        }
        Insert: {
          entry_id: string
          related_to: string
          type: string
        }
        Update: {
          entry_id?: string
          related_to?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: 'related_entry_entry_id_fkey'
            columns: ['entry_id']
            referencedRelation: 'entry'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'related_entry_related_to_fkey'
            columns: ['related_to']
            referencedRelation: 'entry'
            referencedColumns: ['id']
          },
        ]
      }
      review: {
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
            foreignKeyName: 'review_id_fkey'
            columns: ['id']
            referencedRelation: 'entry'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'review_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'profile'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'review_profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'user_profile'
            referencedColumns: ['profile_id']
          },
        ]
      }
      season: {
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
            foreignKeyName: 'season_id_fkey'
            columns: ['id']
            referencedRelation: 'entry'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'season_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'season_movie_id_fkey'
            columns: ['movie_id']
            referencedRelation: 'movie_entry'
            referencedColumns: ['id']
          },
        ]
      }
      season_episode: {
        Row: {
          episode_id: string
          season_id: string
        }
        Insert: {
          episode_id: string
          season_id: string
        }
        Update: {
          episode_id?: string
          season_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'season_episode_episode_id_fkey'
            columns: ['episode_id']
            referencedRelation: 'episode'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'season_episode_season_id_fkey'
            columns: ['season_id']
            referencedRelation: 'season'
            referencedColumns: ['id']
          },
        ]
      }
      season_translation: {
        Row: {
          cover_id: string
          description: string
          lang: string
          name: string
          season_id: string
        }
        Insert: {
          cover_id: string
          description: string
          lang: string
          name: string
          season_id: string
        }
        Update: {
          cover_id?: string
          description?: string
          lang?: string
          name?: string
          season_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'season_translation_season_id_fkey'
            columns: ['season_id']
            referencedRelation: 'season'
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
      tag: {
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
      video: {
        Row: {
          id: string
          lang: string
          provider: string
          quality: string | null
          type: string
          url: string
        }
        Insert: {
          id?: string
          lang: string
          provider: string
          quality?: string | null
          type: string
          url: string
        }
        Update: {
          id?: string
          lang?: string
          provider?: string
          quality?: string | null
          type?: string
          url?: string
        }
        Relationships: []
      }
    }
    Views: {
      movie_entry: {
        Row: {
          average_score: number | null
          cover_url: string | null
          created_at: string | null
          deleted_at: string | null
          description: string | null
          id: string | null
          lang: string | null
          origin_country: string | null
          published: number | null
          published_at: string | null
          release_date: string | null
          runtime: number | null
          status: Database['public']['Enums']['publication_status'] | null
          title: string | null
          type: Database['public']['Enums']['movie_type'] | null
          updated_at: string | null
          watch_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'movie_id_fkey'
            columns: ['id']
            referencedRelation: 'entry'
            referencedColumns: ['id']
          },
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
          hometown: string | null
          join_date: string | null
          name: string | null
          photo: string | null
          profile_id: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'profile_account_id_fkey'
            columns: ['account_id']
            referencedRelation: 'account'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'profile_id_fkey'
            columns: ['profile_id']
            referencedRelation: 'entry'
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
