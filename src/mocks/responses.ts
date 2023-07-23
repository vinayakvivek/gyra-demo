import { faker } from "@faker-js/faker";
import { Collection, Conversation, ConversationCreate } from "../types";
import collections from "./data/collections.json";

const timer = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

const waitRandom = async () => {
  await timer(500 + Math.random() * 1000);
};

export const getCollections = async (): Promise<Collection[]> => {
  await waitRandom();
  return collections;
};

export const createConversation = async (
  data: ConversationCreate
): Promise<Conversation> => {
  await waitRandom();
  return {
    conversation_id: faker.number.int(100),
    conversation_name: data.conversation_name,
    status: "active",
    created_time: faker.date.anytime().toISOString(),
  };
};

export const chat = async () => {
  await waitRandom();
  return faker.lorem.lines(5);
};
