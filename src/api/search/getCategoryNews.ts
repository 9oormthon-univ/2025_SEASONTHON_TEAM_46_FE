import api from "../../hooks/api";
import type { SearchNewsPageResponse } from "../../types/search";

export function getNewsByCategory(categoryCode: string, page = 0, size = 10) {
  return api
    .get<SearchNewsPageResponse>("/api/news/category", {
      params: { category: categoryCode, page, size },
    })
    .then((res) => res.data);
}
