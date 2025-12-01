"use server";
import { handleServerError } from "@/utils/serverError.util";
import { createServerAjax } from "../instance";
import { cookies } from "next/headers";
import { CommentService } from "./comment.service";

async function withAuthService<T>(
  action: (service: CommentService) => Promise<T>
): Promise<T | { statusCode: number; message: string }> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { statusCode: 401, message: "로그인이 필요합니다" };
    }

    const serverAjax = createServerAjax(accessToken);
    const service = new CommentService(serverAjax);

    return await action(service);
  } catch (error) {
    return await handleServerError(error);
  }
}

export const post = async (req: Comment.Post.Request) => {
  return withAuthService((service) => service.post(req));
};

export const put = async (req: Comment.Put.Request) => {
  return withAuthService((service) => service.put(req));
};
export const deleteComment = async (req: Comment.deleteComment.Request) => {
  return withAuthService((service) => service.delete(req));
};
