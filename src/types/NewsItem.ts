export interface NewsItem {
  id: number;
  title: string;
  content: string;
  imgSrc: string;
  categories: {
    text: string | null;
    color: string | null;
    bgColor: string | null;
  };
}
