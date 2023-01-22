import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import machineTypereducer from "./machineTypeSlice";
import machineItemReducer from "./machineItemSlice";

const store = configureStore({
  reducer: {
    machineType: machineTypereducer,
    machineItem: machineItemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
