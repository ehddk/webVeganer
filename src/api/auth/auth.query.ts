import { handleServerError } from "@/utils/serverError.util";
import { authService, reviewService } from "../services";

export const getOne = async (req: Auth.GetOne.Request) => {
  try {
    const data = await authService.getOne(req);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};
