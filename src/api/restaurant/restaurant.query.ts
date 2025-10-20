"use server";
import { handleServerError } from "@/utils/serverError.util";
import { restaurantService } from "../services";

export const getList = async (req: Restaurant.GetList.Request) => {
  try {
    const { data } = await restaurantService.getList(req);
    console.log("getList data", data);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};
export const getOne = async (req: Restaurant.GetOne.Request) => {
  try {
    const data = await restaurantService.getOne(req);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};
