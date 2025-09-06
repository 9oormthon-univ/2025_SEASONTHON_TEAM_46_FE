import { getData } from "../../hooks/apiHelpers";

export type RawRecommendedNews = {
  id: number;
  outlet: string;
  outlet_img?: string | null;
  feedUrl?: string | null;
  title: string;
  author?: string | null;
  summary?: string | null;
  link?: string | null;
  published?: string | null;
  crawledAt?: string | null;
  category?: string | null;
  sentiment?: string | null;
  confidence?: number | null;
  rationale?: string | null;
  orientation?: string | null;
  emotion?: string | null;
  emotionRating?: number | null;
  thumbnail?: string | null;
  likeCount?: number | null;
  taggedAt?: string | null;
  categoryMeta?: {
    label?: string | null;
    text?: string | null;
    description?: string | null;
    color?: string | null;
    bgColor?: string | null;
  } | null;
};

export function getOpposingEmotionNews(id = 1) {
  return getData<RawRecommendedNews[]>(
    `/api/news/${id}/recommendation/opposing-emotion`,
  );
}

export function getOpposingCategoryNews(id = 1) {
  return getData<RawRecommendedNews[]>(
    `/api/news/${id}/recommendation/opposing-category`,
  );
}
