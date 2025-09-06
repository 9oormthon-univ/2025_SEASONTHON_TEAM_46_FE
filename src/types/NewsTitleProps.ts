export interface NewsTitleProps {
  isImgVisible?: boolean;
  categories: { text: string; color: string; bgColor: string }[];
  title: string;
  authorImg: string;
  meta: string;
  thumbnail?: string;
}
