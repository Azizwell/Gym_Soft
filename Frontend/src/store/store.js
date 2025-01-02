import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./services/userServices";
import appReducer from "./slices/appSlices";
import { superAdminApi } from "./services/superAdminServices";
import { adminApi } from "./services/adminService";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [userApi.reducerPath]: userApi.reducer,
    [superAdminApi.reducerPath]: superAdminApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      superAdminApi.middleware,
      adminApi.middleware
    ),
});

setupListeners(store.dispatch);
