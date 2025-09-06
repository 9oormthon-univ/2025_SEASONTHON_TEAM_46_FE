export interface NewsDetailProps {
  titleData: {
    id: number;
    isImgVisible: boolean;
    categories: { text: string; color: string; bgColor: string }[];
    title: string | undefined;
    authorImg: string | undefined;
    meta: string;
    thumbnail?: string;
  };
  summary: string | undefined;
  content: string | undefined;
  imgSrc: string | undefined;
  likes: number | undefined;
  comments: number | undefined;
}
