import type { RootState } from "@/app/store";

export const selectNewsItems = (state: RootState) => state.news.news;
export const selectNewsStatus = (state: RootState) => state.news.isLoading;
export const selectNewsError = (state: RootState) => state.news.error;
export const selectNewsHasMore = (state: RootState) => state.news.hasMore;
export const selectNewsOffset = (state: RootState) => state.news.offset;
export const selectNewsTotal = (state: RootState) => state.news.total;
