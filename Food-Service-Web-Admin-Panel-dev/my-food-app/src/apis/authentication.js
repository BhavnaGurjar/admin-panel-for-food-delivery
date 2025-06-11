import { service } from "./service.js";

const authenticationService = service.injectEndpoints({
  endpoints: (builder) => ({
    //login
    login: builder.mutation({
      query: (payload) => ({
        url: `/v1/auth/login`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation } = authenticationService;
