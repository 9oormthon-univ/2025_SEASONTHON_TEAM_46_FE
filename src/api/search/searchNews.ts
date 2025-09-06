import { getData } from "../../hooks/apiHelpers";
import type { SearchNewsPageResponse } from "../../types/search";

export function searchNews(
  keyword: string,
  page = 0,
  size = 10,
  category?: string,
) {
  const params = new URLSearchParams();
  params.set("keyword", keyword);
  params.set("page", String(page));
  params.set("size", String(size));
  if (category) params.set("category", category);

  return getData<SearchNewsPageResponse>(`/search/news?${params}`);
}
