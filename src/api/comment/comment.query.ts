"use server";
import { handleServerError } from "@/utils/serverError.util";
import { commentService } from "../services";

export const getList = async (req: Comment.GetList.Request) => {
  try {
    const data = await commentService.getList(req);

    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};
