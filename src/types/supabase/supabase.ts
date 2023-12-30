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
      courses: {
        Row: {
          created_at: string
          description: string | null
          folder_name: string | null
          id: string
          image_url: string | null
          name: string | null
          sessions: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          folder_name?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
          sessions?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          folder_name?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
          sessions?: string | null
        }
        Relationships: []
      }
      groups: {
        Row: {
          block_registration: boolean | null
          code: string | null
          created_at: string
          description: string | null
          id: string
          name: string | null
        }
        Insert: {
          block_registration?: boolean | null
          code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
        }
        Update: {
          block_registration?: boolean | null
          code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          block: boolean | null
          full_name: string | null
          group_id: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          block?: boolean | null
          full_name?: string | null
          group_id?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          block?: boolean | null
          full_name?: string | null
          group_id?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      roles: {
        Row: {
          created_at: string
          id: string
          role: string | null
        }
        Insert: {
          created_at?: string
          id: string
          role?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      user_courses: {
        Row: {
          check_date: boolean | null
          course_id: string | null
          created_at: string
          id: string
          profile_id: string | null
          sessions_date: string | null
        }
        Insert: {
          check_date?: boolean | null
          course_id?: string | null
          created_at?: string
          id?: string
          profile_id?: string | null
          sessions_date?: string | null
        }
        Update: {
          check_date?: boolean | null
          course_id?: string | null
          created_at?: string
          id?: string
          profile_id?: string | null
          sessions_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_courses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
