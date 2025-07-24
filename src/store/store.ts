import { configureStore } from "@reduxjs/toolkit";
import type { ThunkAction, Action } from "@reduxjs/toolkit";
import { newsSlice } from "./slices/newsSlice";

export const store = configureStore({
  reducer: {
    news: newsSlice.reducer,
  },
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
