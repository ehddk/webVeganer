"use server";
import { handleServerError } from "@/utils/serverError.util";
import { articleService } from "../services";

export const getList = async (req: Article.GetList.Request) => {
  try {
    const data = await articleService.getList(req);

    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};
export const getOne = async (req: Article.GetOne.Request) => {
  try {
    const data = await articleService.getOne(req);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};

export const getByAuthorId = async (req: Article.GetByAuthorId.Request) => {
  try {
    const data = await articleService.getByAuthorId(req);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};
