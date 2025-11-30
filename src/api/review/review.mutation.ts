"use server";

import { handleServerError } from "@/utils/serverError.util";

import { cookies } from "next/headers";

import { createServerAjax } from "../instance";

import { ReviewService } from "./review.service";

async function withAuthService<T>(
  action: (service: ReviewService) => Promise<T>
): Promise<T | { statusCode: number; message: string }> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { statusCode: 401, message: "로그인이 필요합니다" };
    }

    const serverAjax = createServerAjax(accessToken);
    const service = new ReviewService(serverAjax);

    return await action(service);
  } catch (error) {
    return await handleServerError(error);
  }
}

export async function post(req: Review.Post.Request) {
  return withAuthService((service) => service.post(req));
}

export async function put(req: Review.Put.Request) {
  return withAuthService((service) => service.put(req));
}
export async function deleteReview(req: Review.DeleteReview.Request) {
  return withAuthService((service) => service.delete(req));
}
