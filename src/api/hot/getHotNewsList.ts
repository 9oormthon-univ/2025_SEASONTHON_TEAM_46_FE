import { getData } from "../../hooks/apiHelpers";
import type { HotNewsRes } from "../../types/hot";

export function fetchHotNewsList() {
  return getData<HotNewsRes[]>("/top-likes-list");
}
