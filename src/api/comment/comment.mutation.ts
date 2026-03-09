"use server";

import { CommentService } from "./comment.service";
import withAuthService from "../common/auth.service";

export const post = async (req: Comment.Post.Request) => {
  return withAuthService(
    (ajax) => new CommentService(ajax),
    (service) => service.post(req)
  );
};

export const put = async (req: Comment.Put.Request) => {
  return withAuthService(
    (ajax) => new CommentService(ajax),
    (service) => service.put(req)
  );
};
export const deleteComment = async (req: Comment.deleteComment.Request) => {
  return withAuthService(
    (ajax) => new CommentService(ajax),
    (service) => service.delete(req)
  );
};
