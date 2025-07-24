export interface IReactions {
  likes: number;
  dislikes: number;
}

export interface INewsItem {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: IReactions;
}

export interface INewsSlice {
  news: INewsItem[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  skip: number;
}

export interface INewsApiResponse {
  posts: INewsItem[];
  total: number;
  skip: number;
  limit: number;
}

export interface FetchNewsParams {
  limit?: number;
  skip?: number;
}
