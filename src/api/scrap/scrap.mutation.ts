"use server";
import { ScrapService } from "./scrap.service";
import withAuthService from "../common/auth.service";

export async function toggle(req: Scrap.Toggle.Request) {
  return withAuthService(
    (ajax) => new ScrapService(ajax),
    (service) => service.toggle(req)
  );
}
