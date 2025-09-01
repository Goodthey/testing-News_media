import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNewsApi } from "./api";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { NewsSlice, FetchNewsParams, NewsApiResponse } from "./types";

export const fetchNews = createAsyncThunk<
  NewsApiResponse,
  FetchNewsParams,
  { rejectValue: string }
>(
  "news/fetchNews",
  async (
    params: FetchNewsParams = { limit: 10, offset: 0 },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchNewsApi(params.limit, params.offset);
      // при загрузке новостей инициализируем userReaction
      data.posts = data.posts.map((post) => ({
        ...post,
        userReaction: null,
      }));
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("Unknown error");
      }
    }
  }
);

const initialState: NewsSlice = {
  news: [],
  isLoading: false,
  error: null,
  hasMore: true,
  offset: 0,
  total: 0,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNews: (state) => {
      state.news = [];
      state.offset = 0;
      state.hasMore = true;
      state.total = 0;
    },
    toggleReaction: (
      state,
      action: PayloadAction<{ id: number; reaction: "like" | "dislike" }>
    ) => {
      const { id, reaction } = action.payload;
      const item = state.news.find((n) => n.id === id);
      if (!item) return;

      // если уже стоит этот же реакшн → убираем его
      if (item.userReaction === reaction) {
        item.userReaction = null;
        if (reaction === "like") item.reactions.likes -= 1;
        if (reaction === "dislike") item.reactions.dislikes -= 1;
        return;
      }

      // если раньше был противоположный реакшн → убираем его
      if (item.userReaction === "like") {
        item.reactions.likes -= 1;
      }
      if (item.userReaction === "dislike") {
        item.reactions.dislikes -= 1;
      }

      // ставим новый
      item.userReaction = reaction;
      if (reaction === "like") item.reactions.likes += 1;
      if (reaction === "dislike") item.reactions.dislikes += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchNews.fulfilled,
        (state, action: PayloadAction<NewsApiResponse>) => {
          const { posts, total } = action.payload;

          state.isLoading = false;
          state.news.push(...posts);
          state.offset += posts.length;
          state.total = total;

          state.hasMore = state.offset < total;
        }
      )
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export const { clearNews, toggleReaction } = newsSlice.actions;
export default newsSlice.reducer;
