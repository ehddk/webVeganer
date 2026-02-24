import { handleServerError } from "@/utils/serverError.util";
import { createServerAjax } from "../instance";
import { cookies } from "next/headers";

export default async function withAuthService<T, S>(
  createService: (serverAjax: ReturnType<typeof createServerAjax>) => S,
  action: (service: S) => Promise<T>
): Promise<T | { statusCode: number; message: string }> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return { statusCode: 401, message: "로그인이 필요합니다" };
    }

    const serverAjax = createServerAjax(accessToken);
    const service = createService(serverAjax);

    return await action(service);
  } catch (error) {
    return await handleServerError(error);
  }
}
