"use server";
import { handleServerError } from "@/utils/serverError.util";
import { restaurantService } from "../services";

export const put = async (req: Restaurant.Put.Request) => {
  try {
    const data = await restaurantService.put(req);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};
export const post = async (req: Restaurant.Post.Request) => {
  try {
    const data = await restaurantService.post(req);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};

// export const deleteRestaurant = async (req: Restaurant.Delete.Request) => {
//   try {
//     const data = await RestaurantService.delete(req);
//     return data;
//   } catch (error) {
//     const data = await handleServerError(error);
//     return data;
//   }
// };
