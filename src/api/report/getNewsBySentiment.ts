import { getData } from "../../hooks/apiHelpers";

export type SentimentCode =
  | "HOPE_ENCOURAGE"
  | "ANGER_CRITICISM"
  | "ANXIETY_CRISIS"
  | "SAD_SHOCK"
  | "NEUTRAL_FACTUAL"
  | "FUN_INTEREST";

export type SentimentNewsItem = {
  id: number;
  outlet: string;
  title: string;
  summary?: string;
  thumbnail?: string;
  category?: string;
  sentiment: SentimentCode;
  orientation?: string;
};

export type PageResp<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export function getNewsBySentiment(
  sentiment: SentimentCode,
  page = 0,
  size = 10,
) {
  const params = new URLSearchParams({
    sentiment,
    page: String(page),
    size: String(size),
  });
  return getData<PageResp<SentimentNewsItem>>(
    `/api/news/sentiment?${params.toString()}`,
  );
}
