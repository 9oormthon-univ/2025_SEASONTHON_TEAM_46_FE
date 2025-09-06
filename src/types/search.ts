export type SearchNewsItem = {
  id: number;
  outlet: string;
  title: string;
  orientation: string;
  likeCount: number;
};

export type SearchNewsPageResponse = {
  content: SearchNewsItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};
