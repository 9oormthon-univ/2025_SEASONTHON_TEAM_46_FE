export type CategoryTag = {
  text: string | null;
  color: string | null;
  bgColor: string | null;
} | null;

export type NewsItem = {
  id: number;
  title: string;
  content: string;
  imgSrc: string;

  category: CategoryTag;
  sentiment: CategoryTag;
};


