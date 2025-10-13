"use server";
import { handleServerError } from "@/utils/serverError.util";
import { articleService } from "../services";

export const getList = async (req: Article.GetList.Request) => {
  try {
    const data = await articleService.getList(req);
    console.log("getList data", data);
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
