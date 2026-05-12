"use server";
import { ScrapService } from "./scrap.service";
import withAuthService from "../common/auth.service";

export async function getList(req: Scrap.GetList.Request) {
  return withAuthService(
    (ajax) => new ScrapService(ajax),
    (service) => service.getList(req)
  );
}
