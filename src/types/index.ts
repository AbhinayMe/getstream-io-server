// Request types
export interface GenerateTokenRequest {
  userId: string;
  callId?: string;
  callType?: string;
  validityInSeconds?: number;
  role?: string;
}

export interface CreateUserRequest {
  id: string;
  name?: string;
  image?: string;
  role?: string;
  custom?: Record<string, any>;
}

export interface UpdateUserRequest {
  name?: string;
  image?: string;
  custom?: Record<string, any>;
}

export interface CreateCallRequest {
  callId: string;
  callType?: string;
  createdBy: string;
  members?: Array<{
    user_id: string;
    role?: string;
  }>;
  settings?: {
    audio?: {
      mic_default_on?: boolean;
      default_device?: string;
    };
    video?: {
      camera_default_on?: boolean;
      enabled?: boolean;
    };
    recording?: {
      mode?: string;
      audio_only?: boolean;
    };
    screensharing?: {
      enabled?: boolean;
    };
  };
}

export interface UpdateCallRequest {
  settings?: {
    audio?: Record<string, any>;
    video?: Record<string, any>;
    recording?: Record<string, any>;
    screensharing?: Record<string, any>;
  };
}

// Response types
export interface TokenResponse {
  token: string;
  userId: string;
  apiKey: string;
  callId?: string;
  callType?: string;
}

export interface UserResponse {
  id: string;
  name?: string;
  image?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
  custom?: Record<string, any>;
}

export interface CallResponse {
  call: {
    id: string;
    type: string;
    cid: string;
    created_by: Record<string, any>;
    created_at: string;
    updated_at: string;
    settings?: Record<string, any>;
    backstage?: boolean;
  };
  members: Array<Record<string, any>>;
  own_capabilities: string[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Webhook types
export interface StreamWebhookEvent {
  type: string;
  created_at: string;
  call_cid?: string;
  call?: Record<string, any>;
  user?: Record<string, any>;
  members?: Array<Record<string, any>>;
  [key: string]: any;
}
