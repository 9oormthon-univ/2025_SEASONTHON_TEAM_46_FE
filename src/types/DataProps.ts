export interface DataProps {
  author: string | null;
  category: string | null;
  categoryMeta: {
    bgColor: string | null;
    color: string | null;
    text: string | null;
  };
  confidence: number | null;
  crawledAt: string;
  emotion: string | null;
  emotionRating: number | null;
  feedUrl: string;
  id: number;
  outlet_img: string | null;
  likeCount: number;
  link: string;
  orientation: null;
  outlet: string;
  published: string | null;
  rationale: string;
  sentiment: string;
  sentimentMeta: {
    bgColor: string | null;
    color: string | null;
    text: string | null;
  };
  summary: string;
  taggedAt: string;
  thumbnail: string;
  title: string;
}
