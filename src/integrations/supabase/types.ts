export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      approvals: {
        Row: {
          application_id: string
          created_at: string
          decided_at: string | null
          decided_by: string | null
          decision: string
          id: string
          reason: string | null
        }
        Insert: {
          application_id: string
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          decision?: string
          id?: string
          reason?: string | null
        }
        Update: {
          application_id?: string
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          decision?: string
          id?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "approvals_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "lc_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          application_id: string | null
          created_at: string
          details: string
          id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          application_id?: string | null
          created_at?: string
          details?: string
          id?: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          application_id?: string | null
          created_at?: string
          details?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "lc_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      clarifications: {
        Row: {
          application_id: string
          created_at: string
          created_by: string | null
          id: string
          question: string
          responded_by: string | null
          response: string | null
          status: string
        }
        Insert: {
          application_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          question: string
          responded_by?: string | null
          response?: string | null
          status?: string
        }
        Update: {
          application_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          question?: string
          responded_by?: string | null
          response?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "clarifications_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "lc_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_flags: {
        Row: {
          application_id: string
          created_at: string
          decision_reason: string | null
          flag_reason: string
          id: string
          review_status: string
          reviewed_at: string | null
          reviewed_by: string | null
          risk_priority: string
          screening_status: string
        }
        Insert: {
          application_id: string
          created_at?: string
          decision_reason?: string | null
          flag_reason?: string
          id?: string
          review_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_priority?: string
          screening_status?: string
        }
        Update: {
          application_id?: string
          created_at?: string
          decision_reason?: string | null
          flag_reason?: string
          id?: string
          review_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_priority?: string
          screening_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "compliance_flags_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "lc_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_cases: {
        Row: {
          amount: number
          applicant: string
          application_type: string
          beneficiary: string
          confidence: number
          created_at: string
          currency: string
          id: string
          incoterms: string
          priority: string
          reference: string
          special_instructions: string
          stage: string
          status: string
          validity: string
        }
        Insert: {
          amount: number
          applicant: string
          application_type: string
          beneficiary: string
          confidence: number
          created_at?: string
          currency: string
          id?: string
          incoterms: string
          priority: string
          reference: string
          special_instructions: string
          stage: string
          status: string
          validity: string
        }
        Update: {
          amount?: number
          applicant?: string
          application_type?: string
          beneficiary?: string
          confidence?: number
          created_at?: string
          currency?: string
          id?: string
          incoterms?: string
          priority?: string
          reference?: string
          special_instructions?: string
          stage?: string
          status?: string
          validity?: string
        }
        Relationships: []
      }
      discrepancies: {
        Row: {
          application_id: string
          application_value: string
          created_at: string
          criterion: string
          document_value: string
          id: string
          resolution_reason: string | null
          resolved_by: string | null
          rule_reference: string
          status: string
        }
        Insert: {
          application_id: string
          application_value?: string
          created_at?: string
          criterion: string
          document_value?: string
          id?: string
          resolution_reason?: string | null
          resolved_by?: string | null
          rule_reference?: string
          status?: string
        }
        Update: {
          application_id?: string
          application_value?: string
          created_at?: string
          criterion?: string
          document_value?: string
          id?: string
          resolution_reason?: string | null
          resolved_by?: string | null
          rule_reference?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "discrepancies_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "lc_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      email_outbox: {
        Row: {
          application_id: string | null
          body: string
          created_at: string
          id: string
          mode: string
          recipient_id: string
          subject: string
        }
        Insert: {
          application_id?: string | null
          body: string
          created_at?: string
          id?: string
          mode?: string
          recipient_id: string
          subject: string
        }
        Update: {
          application_id?: string | null
          body?: string
          created_at?: string
          id?: string
          mode?: string
          recipient_id?: string
          subject?: string
        }
        Relationships: []
      }
      extracted_fields: {
        Row: {
          application_id: string
          confidence: number
          created_at: string
          field_name: string
          field_value: string
          id: string
          reviewed_by: string | null
          source_document: string
        }
        Insert: {
          application_id: string
          confidence: number
          created_at?: string
          field_name: string
          field_value: string
          id?: string
          reviewed_by?: string | null
          source_document?: string
        }
        Update: {
          application_id?: string
          confidence?: number
          created_at?: string
          field_name?: string
          field_value?: string
          id?: string
          reviewed_by?: string | null
          source_document?: string
        }
        Relationships: [
          {
            foreignKeyName: "extracted_fields_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "lc_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      lc_applications: {
        Row: {
          amount: number
          applicant: string
          application_type: string
          assigned_officer: string | null
          beneficiary: string
          created_at: string
          currency: string
          customer_id: string | null
          id: string
          incoterms: string
          priority: string
          reference: string
          special_instructions: string
          stage: string
          status: string
          updated_at: string
          validity: string
        }
        Insert: {
          amount: number
          applicant: string
          application_type?: string
          assigned_officer?: string | null
          beneficiary: string
          created_at?: string
          currency?: string
          customer_id?: string | null
          id?: string
          incoterms?: string
          priority?: string
          reference?: string
          special_instructions?: string
          stage?: string
          status?: string
          updated_at?: string
          validity?: string
        }
        Update: {
          amount?: number
          applicant?: string
          application_type?: string
          assigned_officer?: string | null
          beneficiary?: string
          created_at?: string
          currency?: string
          customer_id?: string | null
          id?: string
          incoterms?: string
          priority?: string
          reference?: string
          special_instructions?: string
          stage?: string
          status?: string
          updated_at?: string
          validity?: string
        }
        Relationships: []
      }
      lc_documents: {
        Row: {
          application_id: string
          created_at: string
          document_type: string
          id: string
          mime_type: string
          name: string
          processing_status: string
          size_bytes: number
          storage_path: string
          uploaded_by: string
        }
        Insert: {
          application_id: string
          created_at?: string
          document_type?: string
          id?: string
          mime_type: string
          name: string
          processing_status?: string
          size_bytes: number
          storage_path: string
          uploaded_by: string
        }
        Update: {
          application_id?: string
          created_at?: string
          document_type?: string
          id?: string
          mime_type?: string
          name?: string
          processing_status?: string
          size_bytes?: number
          storage_path?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "lc_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "lc_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          application_id: string | null
          body: string
          channel: string
          created_at: string
          id: string
          read_at: string | null
          recipient_id: string
          title: string
        }
        Insert: {
          application_id?: string | null
          body?: string
          channel?: string
          created_at?: string
          id?: string
          read_at?: string | null
          recipient_id: string
          title: string
        }
        Update: {
          application_id?: string | null
          body?: string
          channel?: string
          created_at?: string
          id?: string
          read_at?: string | null
          recipient_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "lc_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string
          id: string
          organisation: string
        }
        Insert: {
          created_at?: string
          full_name?: string
          id: string
          organisation?: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          organisation?: string
        }
        Relationships: []
      }
      tradeflow_settings: {
        Row: {
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_tradeflow_role: {
        Args: { _role: Database["public"]["Enums"]["app_role"]; _user: string }
        Returns: undefined
      }
      decide_approval: {
        Args: { _decision: string; _id: string; _reason: string }
        Returns: undefined
      }
      decide_discrepancy: {
        Args: { _id: string; _reason: string }
        Returns: undefined
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: { _user_id: string }; Returns: boolean }
      list_tradeflow_users: {
        Args: never
        Returns: {
          full_name: string
          id: string
          organisation: string
          role: Database["public"]["Enums"]["app_role"]
        }[]
      }
      mark_extraction_reviewed: { Args: { _id: string }; Returns: undefined }
      register_customer: {
        Args: { _name: string; _organisation: string }
        Returns: undefined
      }
      request_approval: { Args: { _app: string }; Returns: undefined }
      respond_clarification: {
        Args: { _id: string; _response: string }
        Returns: undefined
      }
      review_compliance_flag: {
        Args: { _decision: string; _id: string; _reason: string }
        Returns: undefined
      }
      set_tradeflow_setting: {
        Args: { _key: string; _value: Json }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "customer" | "officer" | "approver" | "compliance" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["customer", "officer", "approver", "compliance", "admin"],
    },
  },
} as const
