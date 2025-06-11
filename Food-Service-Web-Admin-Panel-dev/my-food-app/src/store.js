import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { service } from "./apis/service";

const store = configureStore({
  reducer: {
    [service.reducerPath]: service.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(service.middleware),
});

setupListeners(store.dispatch);

export default store;
