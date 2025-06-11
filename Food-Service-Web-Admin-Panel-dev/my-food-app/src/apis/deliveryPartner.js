import { service } from "./service";

const deliveryPartnerService = service.injectEndpoints({
  endpoints: (builder) => ({
    //get delivery partner by deliveryPartnerId
    getDeliveryPartnerByDeliveryPartnerId: builder.query({
      query: ({ id, stepCount }) => ({
        url: `/v1/deliverypartner/get/${id}`,
        method: "GET",
        headers: {
          stepCount: stepCount.toString(),
        },
      }),
    }),
  }),
});

export const { useGetDeliveryPartnerByDeliveryPartnerIdQuery } =
  deliveryPartnerService;
