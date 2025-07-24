import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNewsApi } from "../../services/api/newsApi";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  INewsSlice,
  FetchNewsParams,
  INewsApiResponse,
} from "../../types/news";

export const fetchNews = createAsyncThunk<
  INewsApiResponse,
  FetchNewsParams,
  { rejectValue: string }
>(
  "news/fetchNews",
  async (
    params: FetchNewsParams = { limit: 10, skip: 0 },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchNewsApi(params.limit, params.skip);
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

const initialState: INewsSlice = {
  news: [],
  isLoading: false,
  error: null,
  hasMore: true,
  skip: 0,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNews: (state) => {
      state.news = [];
      state.skip = 0;
      state.hasMore = true;
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
        (state, action: PayloadAction<INewsApiResponse>) => {
          const { posts, total } = action.payload;

          state.isLoading = false;
          state.news.push(...posts);
          state.skip += posts.length;

          if (state.news.length >= total || posts.length < 10) {
            state.hasMore = false;
          }
        }
      )
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string" ? action.payload : "Unknown error";
      });
  },
});

export const { clearNews } = newsSlice.actions;
export default newsSlice.reducer;
