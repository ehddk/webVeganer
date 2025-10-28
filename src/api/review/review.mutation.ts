import { handleServerError } from "@/utils/serverError.util";
import { reviewService } from "../services";

export const post = async (req: Review.Post.Request) => {
  try {
    const data = await reviewService.post(req);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};

export const put = async (req: Review.Put.Request) => {
  try {
    const data = await reviewService.put(req);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};

export const deleteReview = async (req: Review.DeleteReview.Request) => {
  try {
    const data = await reviewService.delete(req);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};
