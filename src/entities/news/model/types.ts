export interface Reactions {
  likes: number;
  dislikes: number;
}

export interface NewsItem {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  userReaction?: "like" | "dislike" | null;
}

export interface NewsSlice {
  news: NewsItem[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  offset: number;
  total: number;
}

export interface NewsApiResponse {
  posts: NewsItem[];
  total: number;
  skip: number;
  limit: number;
}

export interface FetchNewsParams {
  limit?: number;
  offset?: number;
}
