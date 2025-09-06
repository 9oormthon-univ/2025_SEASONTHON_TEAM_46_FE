export type HotNewsRes = {
  id: number;
  outlet: string;
  title: string;

  likeCount: number;

  summary?: string;
  politicalOrientation?: string;
  image?: string;
  categoryMeta?: {
    label?: string;
    text?: string;
    description?: string;
    color?: string;
    bgColor?: string;
  };
  sentimentMeta?: {
    code?: string;
    text?: string;
    description?: string;
    color?: string;
    bgColor?: string;
  };
};
