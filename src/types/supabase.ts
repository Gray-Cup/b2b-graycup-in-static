export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          company: string
          company_size: string
          message: string
          created_at: string
          status: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          company: string
          company_size: string
          message: string
          created_at?: string
          status?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          company?: string
          company_size?: string
          message?: string
          created_at?: string
          status?: string
        }
        Relationships: []
      }
      enterprise_inquiries: {
        Row: {
          id: string
          company_name: string
          website: string
          industry: string
          team_size: string
          contact_name: string
          contact_email: string
          contact_phone: string | null
          budget_range: string
          timeline: string
          requirements: string
          created_at: string
          status: string
        }
        Insert: {
          id?: string
          company_name: string
          website: string
          industry: string
          team_size: string
          contact_name: string
          contact_email: string
          contact_phone?: string | null
          budget_range: string
          timeline: string
          requirements: string
          created_at?: string
          status?: string
        }
        Update: {
          id?: string
          company_name?: string
          website?: string
          industry?: string
          team_size?: string
          contact_name?: string
          contact_email?: string
          contact_phone?: string | null
          budget_range?: string
          timeline?: string
          requirements?: string
          created_at?: string
          status?: string
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          id: string
          company_name: string
          contact_name: string
          email: string
          phone: string | null
          grade: string | null
          quantity: number
          message: string | null
          product_id: string | null
          created_at: string
          status: string
        }
        Insert: {
          id?: string
          company_name: string
          contact_name: string
          email: string
          phone?: string | null
          grade?: string | null
          quantity: number
          message?: string | null
          product_id?: string | null
          created_at?: string
          status?: string
        }
        Update: {
          id?: string
          company_name?: string
          contact_name?: string
          email?: string
          phone?: string | null
          grade?: string | null
          quantity?: number
          message?: string | null
          product_id?: string | null
          created_at?: string
          status?: string
        }
        Relationships: []
      }
      sample_requests: {
        Row: {
          id: string
          company_name: string
          category: string
          other_category: string | null
          gst: string
          phone: string
          email: string | null
          address: string
          selected_products: string[]
          payment_status: string
          created_at: string
        }
        Insert: {
          id?: string
          company_name: string
          category: string
          other_category?: string | null
          gst: string
          phone: string
          email?: string | null
          address: string
          selected_products: string[]
          payment_status?: string
          created_at?: string
        }
        Update: {
          id?: string
          company_name?: string
          category?: string
          other_category?: string | null
          gst?: string
          phone?: string
          email?: string | null
          address?: string
          selected_products?: string[]
          payment_status?: string
          created_at?: string
        }
        Relationships: []
      }
      feedback_submissions: {
        Row: {
          id: string
          company: string
          name: string
          email: string
          feedback_type: string
          rating: string
          feedback: string
          created_at: string
        }
        Insert: {
          id?: string
          company: string
          name: string
          email: string
          feedback_type: string
          rating: string
          feedback: string
          created_at?: string
        }
        Update: {
          id?: string
          company?: string
          name?: string
          email?: string
          feedback_type?: string
          rating?: string
          feedback?: string
          created_at?: string
        }
        Relationships: []
      }
      product_requests: {
        Row: {
          id: string
          company: string
          email: string
          name: string
          phone: string
          category: string
          product_name: string
          quantity: string | null
          details: string | null
          created_at: string
          status: string
        }
        Insert: {
          id?: string
          company: string
          email: string
          name: string
          phone: string
          category: string
          product_name: string
          quantity?: string | null
          details?: string | null
          created_at?: string
          status?: string
        }
        Update: {
          id?: string
          company?: string
          email?: string
          name?: string
          phone?: string
          category?: string
          product_name?: string
          quantity?: string | null
          details?: string | null
          created_at?: string
          status?: string
        }
        Relationships: []
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
