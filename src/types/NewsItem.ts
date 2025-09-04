export interface NewsItem {
  id: number;
  title: string;
  content: string;
  imgSrc: string;
  categories: { text: string; color: string }[];
}
