"use server";
import { handleServerError } from "@/utils/serverError.util";
import { articleService } from "../services";
import { cookies } from "next/headers";
import { createServerAjax } from "../instance";
import { ArticleService } from "./article.service";

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
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    console.log("acccc", accessToken);
    if (!accessToken) {
      return {
        statusCode: 401,
        message: "로그인이 필요합니다",
      };
    }
    const serverAjax = createServerAjax(accessToken);
    const serverArticleService = new ArticleService(serverAjax);

    const data = await serverArticleService.post(req);
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
