export type UserType = "AI" | "HUMAN";

export interface ChatMessage {
  id: number;
  type: UserType;
  message: string;
}

export interface Collection {
  collection_name: string;
  asset_type: string;
  embedder_id: string;
  created_time: string;
}

export interface ConversationCreate {
  conversation_name: string;
  collection_name: string;
}

export interface Conversation {
  conversation_id: number;
  conversation_name: string;
  status: string;
  created_time: string;
}
