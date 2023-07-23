import { ChatMessage, UserType } from "../types";
import { faker } from "@faker-js/faker";
import { create } from "zustand";

const chatHistory: ChatMessage[] = [...Array(30)].map((_, index: number) => ({
  id: index,
  message: faker.lorem.lines(),
  type: index % 2 == 0 ? "AI" : "HUMAN",
}));

interface ChatState {
  history: ChatMessage[];
  resetHistory: () => void;
  setHistory: (history: ChatMessage[]) => void;
  addMessage: (message: string, userType: UserType) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  history: chatHistory,
  resetHistory: () => set({ history: [] }),
  setHistory: (history) => set({ history }),
  addMessage: (message: string, userType: UserType) => {
    const id = get().history.length + 1;
    set({
      history: [...get().history, { id, message, type: userType }],
    });
  },
}));
