import axios from "axios";
import { API_ENDPOINT, API_TENANT_ID, MOCKING_ENABLED } from "../config";
import * as mockResponses from "../mocks/responses";
import {
  ChatRequest,
  ChatResponse,
  Collection,
  Conversation,
  ConversationCreate,
} from "../types";
import { AssetBase, AssetListItem } from "@/types/assets";

const createUrl = (path: string) => `${API_ENDPOINT}/${path}`;

const commonHeaders = {
  "x-tenant-id": API_TENANT_ID,
};

const execute = async <T>(method: string, path: string): Promise<T> => {
  return axios({ method, url: createUrl(path), headers: commonHeaders }).then(
    (res) => res.data
  );
};

const get = async <T>(path: string): Promise<T> => {
  return axios
    .get(createUrl(path), { headers: commonHeaders })
    .then((res) => res.data);
};

const post = async <T, R>(path: string, data: T): Promise<R> => {
  return axios
    .post(createUrl(path), data, { headers: commonHeaders })
    .then((res) => res.data);
};

// Get Collections
export const getCollections = (): Promise<Collection[]> => {
  if (MOCKING_ENABLED) {
    return mockResponses.getCollections();
  }
  return get<Collection[]>("/collection");
};

// Get Assets
export const getAssets = (collection: string): Promise<AssetListItem[]> => {
  if (MOCKING_ENABLED) {
    return mockResponses.getAssets();
  }
  return get<AssetListItem[]>(`/collection/${collection}/asset`);
};

export const createAsset = (
  collection: string,
  asset: AssetBase
): Promise<AssetBase[]> => {
  if (MOCKING_ENABLED) {
    return mockResponses.createAsset(asset);
  }
  return post<AssetBase[], AssetBase[]>(`/collection/${collection}/asset`, [
    asset,
  ]);
};

export const deleteAsset = (
  collection: string,
  assetId: string
): Promise<void> => {
  if (MOCKING_ENABLED) {
    return mockResponses.deleteAsset();
  }
  return execute<void>("DELETE", `/collection/${collection}/asset/${assetId}`);
};

export const createConversation = (
  data: ConversationCreate
): Promise<Conversation> => {
  if (MOCKING_ENABLED) {
    return mockResponses.createConversation(data);
  }
  return post<ConversationCreate, Conversation>("/conversation", data);
};

export const chat = async (
  conversationId: number,
  query: string
): Promise<ChatResponse> => {
  if (MOCKING_ENABLED) {
    return { query, output: await mockResponses.chat() };
  }
  return post<ChatRequest, ChatResponse>(
    `/conversation/${conversationId}/query`,
    { query, experimental_fields: {} }
  );
};
