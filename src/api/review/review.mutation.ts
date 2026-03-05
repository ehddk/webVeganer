"use server";
import { ReviewService } from "./review.service";
import withAuthService from "../common/auth.service";

export async function post(req: Review.Post.Request) {
  return withAuthService(
    (ajax) => new ReviewService(ajax),
    (service) => service.post(req)
  );
}

export async function put(req: Review.Put.Request) {
  return withAuthService(
    (ajax) => new ReviewService(ajax),
    (service) => service.put(req)
  );
}
export async function deleteReview(req: Review.DeleteReview.Request) {
  return withAuthService(
    (ajax) => new ReviewService(ajax),
    (service) => service.delete(req)
  );
}
