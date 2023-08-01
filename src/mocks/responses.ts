import { faker } from "@faker-js/faker";
import { Collection, Conversation, ConversationCreate } from "../types";
import collections from "./data/collections.json";
import assets from "./data/assets.json";
import { AssetBase, AssetListItem } from "@/types/assets";

const timer = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms));
};

const waitRandom = async (min = 500) => {
  await timer(min + Math.random() * 1000);
};

export const getCollections = async (): Promise<Collection[]> => {
  await waitRandom();
  return collections;
};

export const getAssets = async (): Promise<AssetListItem[]> => {
  await waitRandom();
  return assets;
};

export const createAsset = async (asset: AssetBase): Promise<AssetBase> => {
  await waitRandom();
  return asset;
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
  await waitRandom(5000);
  return faker.lorem.lines(5);
};
