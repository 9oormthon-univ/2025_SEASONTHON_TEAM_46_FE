export interface NewsTitleProps {
  isImgVisible?: boolean;
  categories: { text: string; color: string }[];
  title: string;
  authorImg: string;
  meta: string;
  thumbnail?: string;
}
