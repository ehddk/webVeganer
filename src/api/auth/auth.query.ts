import { handleServerError } from "@/utils/serverError.util";
import { reviewService } from "../services";

export const getList = async (req: Review.GetList.Request) => {
  try {
    const data = await reviewService.getList(req);

    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};
