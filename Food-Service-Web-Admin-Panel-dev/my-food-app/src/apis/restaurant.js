import { service } from "./service";

const restaurantService = service.injectEndpoints({
  endpoints: (builder) => ({
    //get restaurant by restaurantId
    getRestaurantByRestaurantId: builder.query({
      query: ({ restaurantId, stepCount }) => ({
        url: `/v1/restaurants/get/${restaurantId}`,
        method: "GET",
        headers: {
          stepCount: stepCount.toString(),
        },
      }),
    }),
  }),
});

export const { useGetRestaurantByRestaurantIdQuery } = restaurantService;
