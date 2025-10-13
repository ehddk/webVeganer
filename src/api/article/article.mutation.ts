"use server";
import { handleServerError } from "@/utils/serverError.util";
import { articleService } from "../services";

export const put = async (req: Article.Put.Request) => {
  try {
    const data = await articleService.put(req);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};
export const post = async (req: Article.Post.Request) => {
  try {
    const data = await articleService.post(req);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};

export const deleteArticle = async (req: Article.Delete.Request) => {
  try {
    const data = await articleService.delete(req);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};
