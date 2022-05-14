import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import classReducer from "../features/class/classSlice";

export const store = configureStore({
  reducer: {
    class: classReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
