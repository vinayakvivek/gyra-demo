import axios from "axios";
import { API_ENDPOINT, MOCKING_ENABLED } from "../config";
import * as mockResponses from "../mocks/responses";
import { Collection, Conversation, ConversationCreate } from "../types";

const createUrl = (path: string) => `${API_ENDPOINT}/${path}`;

const get = async <T>(path: string): Promise<T> => {
  return axios.get(createUrl(path)).then((res) => res.data);
};

const post = async <T, R>(path: string, data: T): Promise<R> => {
  return axios.post(createUrl(path), data).then((res) => res.data);
};

// Get Collections
export const getCollections = (): Promise<Collection[]> => {
  if (MOCKING_ENABLED) {
    return mockResponses.getCollections();
  }
  return get<Collection[]>("/collection");
};

export const createConversation = (
  data: ConversationCreate
): Promise<Conversation> => {
  if (MOCKING_ENABLED) {
    return mockResponses.createConversation(data);
  }
  return post<ConversationCreate, Conversation>("/conversation", data);
};
