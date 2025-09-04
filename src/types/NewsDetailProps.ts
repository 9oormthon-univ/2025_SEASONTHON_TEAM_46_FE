export interface NewsDetailProps {
  titleData: {
    isImgVisible?: boolean;
    categories: { text: string; color: string }[];
    title: string;
    authorImg: string;
    meta: string;
    thumbnail?: string;
  };
  summary: string;
  content: string;
  imgSrc: string;
  likes: number;
  comments: number;
}
