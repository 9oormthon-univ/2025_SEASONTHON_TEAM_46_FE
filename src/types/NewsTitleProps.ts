export interface NewsTitleProps {
  id: number;
  isImgVisible?: boolean;
  categories: { text: string; color: string; bgColor: string }[];
  title: string | undefined;
  authorImg: string | undefined;
  meta: string | undefined;
  thumbnail?: string | undefined;
}
