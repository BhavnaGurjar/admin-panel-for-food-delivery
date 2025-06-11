import { service } from "./service";

const restaurantService = service.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurantByRestaurantId: builder.query({
      query: ({ restaurantId, stepCount }) => ({
        url: `/v1/restaurants/get/${restaurantId}`,
        method: "GET",
        headers: {
          stepCount: stepCount.toString(),
        },
      }),
      providesTags: (result, error, { restaurantId }) => [
        { type: "ApprovalVerification", id: restaurantId },
      ],
    }),

    getOnboardingData: builder.query({
      query: ({ filter }) => ({
        url: `/v1/admin/onboarding/all?filter=${filter}`,
        method: "GET",
      }),
      providesTags: (result, error, { filter }) => [{ type: "ApprovalVerification", id: filter }],
    }),

    getOnboardingFirstData: builder.query({
      query: ({ id, type, filter }) => ({
        url: `/v1/admin/onboarding/getMenu/${id}/?type=${type}&filter=${filter}`,
        method: "GET",
      }),
      providesTags: (result, error, { id, type }) => [
        { type: "ApprovalVerification", id: `${id}-${type}` },
      ],
    }),

    stepVerification: builder.mutation({
      query: (payload) => ({
        url: `/v1/admin/onboarding/stepVerfication?onboardingType=menu`,
        method: "POST",
        body: payload,
      }),
      // Invalidate the specific onboarding menu cache so it refetches after mutation
      invalidatesTags: (result, error, arg) => [
        { type: "ApprovalVerification", id: `${arg.restaurantId || "all"}-menu` },
      ],
    }),

    getProfileDetails: builder.query({
      query: ({ id }) => ({
        url: `v1/admin/onboarding/getRestaurantProfileSetupDetails/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [{ type: "Profile", id }],
    }),

    getTaxAndCommisionDetails: builder.query({
      query: () => ({
        url: `v1/admin/taxCommissionMaster`,
        method: "GET",
      }),
      providesTags: ["Tax"],
    }),

    getBankDetails: builder.query({
      query: ({ id }) => ({
        url: `v1/admin/onboarding/getBankDetails/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [{ type: "Bank", id }],
    }),

    postStepData: builder.mutation({
      query: ({ onboardingType, payload }) => ({
        url: `/v1/admin/onboarding/stepVerfication?onboardingType=${onboardingType}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, { onboardingType, payload }) => [
        { type: "ApprovalVerification", id: `${payload.restaurantId || "all"}-${onboardingType}` },
      ],
    }),
  }),
});

export const {
  usePostStepDataMutation,
  useGetProfileDetailsQuery,
  useGetBankDetailsQuery,
  useGetTaxAndCommisionDetailsQuery,
  useStepVerificationMutation,
  useGetRestaurantByRestaurantIdQuery,
  useGetOnboardingDataQuery,
  useGetOnboardingFirstDataQuery,
} = restaurantService;
