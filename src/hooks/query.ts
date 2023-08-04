import { useQuery } from "react-query";
import * as api from "../api";

export const QUERY_KEY_COLLECTIONS = "collections";

export const useQueryCollections = () => {
  return useQuery(QUERY_KEY_COLLECTIONS, api.getCollections);
};
