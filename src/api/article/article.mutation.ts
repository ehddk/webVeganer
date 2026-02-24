"use server";
import { handleServerError } from "@/utils/serverError.util";
import { articleService } from "../services";
import { ArticleService } from "./article.service";
import withAuthService from "../common/auth.service";

export const put = async (req: Article.Put.Request) => {
  try {
    return withAuthService(
      (ajax) => new ArticleService(ajax),
      (service) => service.put(req)
    );
  } catch (error) {
    return await handleServerError(error);
  }
};
export const post = async (req: Article.Post.Request) => {
  try {
    return withAuthService(
      (ajax) => new ArticleService(ajax),
      (service) => service.post(req)
    );
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};

export const deleteArticle = async (req: Article.Delete.Request) => {
  try {
    return withAuthService(
      (ajax) => new ArticleService(ajax),
      (service) => service.delete(req)
    );
    const data = await articleService.delete(req);
    return data;
  } catch (error) {
    const data = await handleServerError(error);
    return data;
  }
};
