import { ChatMessage } from "../types";
import { faker } from "@faker-js/faker";
import { create } from "zustand";

const chatHistory: ChatMessage[] = [...Array(30)].map((_, index: number) => ({
  id: index,
  message: faker.lorem.lines(),
  type: index % 2 == 0 ? "AI" : "HUMAN",
}));

interface ChatState {
  history: ChatMessage[];
}

export const useChatStore = create<ChatState>(() => ({
  history: chatHistory,
}));
