import { configureStore } from "@reduxjs/toolkit";
import usersManagementReducer from "../features/usersManagementSlice";

export const store = configureStore({
  reducer: {
    userManagement: usersManagementReducer,
  },
});
