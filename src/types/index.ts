export type UserType = "AI" | "HUMAN";

export interface ChatMessage {
  id: number;
  type: UserType;
  message: string;
}
