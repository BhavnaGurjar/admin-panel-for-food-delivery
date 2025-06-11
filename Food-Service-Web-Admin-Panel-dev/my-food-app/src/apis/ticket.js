import { service } from "./service";

const ticketService = service.injectEndpoints({
  endpoints: (builder) => ({
    //get all tickets for verification
    getTicketsForVerification: builder.query({
      query: ({ type, filter }) =>
        `/v1/admin/ticket/?ticketType=${type}&filter=${filter}`,
      providesTags: ["ApprovalVerification"],
    }),
    //update ticket status
    updateTicket: builder.mutation({
      query: (payload) => ({
        url: `/v1/admin/ticket/changeStatus`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["ApprovalVerification"],
    }),
  }),
});

export const { useGetTicketsForVerificationQuery, useUpdateTicketMutation } =
  ticketService;
