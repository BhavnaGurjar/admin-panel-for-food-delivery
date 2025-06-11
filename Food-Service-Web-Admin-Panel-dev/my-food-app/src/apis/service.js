import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

// create mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "http://3.6.227.166/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// refresh token
const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  const refreshToken = localStorage.getItem("refreshToken");

  if (result.error && result.error.status === 401 && refreshToken) {
    localStorage.removeItem("token");
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // Attempt to refresh the token
        const refreshResult = await baseQuery(
          {
            url: "v1/auth/refreshToken/",
            method: "POST",
            body: { refresh: refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          // Store new tokens
          localStorage.setItem("token", refreshResult.data.access);
          localStorage.setItem("refreshToken", refreshResult.data.refresh);

          // Retry the initial query
          result = await baseQuery(args, api, extraOptions);
        }
      } finally {
        // release the mutex
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const service = createApi({
  reducerPath: "service",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["ApprovalVerification"],
  endpoints: (builder) => ({}),
});
