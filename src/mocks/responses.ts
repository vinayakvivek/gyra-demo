import { Collection } from "../types";
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
