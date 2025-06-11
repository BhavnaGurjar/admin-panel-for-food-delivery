import { service } from "./service";

const contentAndTermsService = service.injectEndpoints({
  endpoints: (builder) => ({
    getTaxAndCommissions: builder.query({
      query: () => `/v1/admin/taxCommissionMaster`,
      providesTags: ["ContentAndTerms"],
    }),
    updateTaxAndCommissions: builder.mutation({
      query: (payload) => ({
        url: `/v1/admin/taxCommissionMaster/${payload.id}`,
        method: "PUT",
        body: payload.body,
      }),
      invalidatesTags: ["ContentAndTerms"],
    }),
    AddTaxAndCommissions: builder.mutation({
      query: (payload) => ({
        url: `/v1/admin/taxCommissionMaster`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["ContentAndTerms"],
    }),
  }),
});

export const {
  useGetTaxAndCommissionsQuery,
  useUpdateTaxAndCommissionsMutation,
  useAddTaxAndCommissionsMutation,
} = contentAndTermsService;
