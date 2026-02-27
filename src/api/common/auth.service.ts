import { handleServerError } from "@/utils/serverError.util";
import { createServerAjax } from "../instance";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function withAuthService<T, S>(
  createService: (ajax: ReturnType<typeof createServerAjax>) => S,
  action: (service: S, userId: string) => Promise<T>
): Promise<T | { statusCode: number; message: string }> {
  try {
    // const cookieStore = await cookies();
    // const accessToken = cookieStore.get("accessToken")?.value;

    // if (!accessToken) {
    //   return { statusCode: 401, message: "로그인이 필요합니다" };
    // }

    // const serverAjax = createServerAjax(accessToken);
    // const service = createService(serverAjax);

    // return await action(service);
    const supabase = createSupabaseServerClient();
    const { data, error } = await (await supabase).auth.getUser();

    if (error || !data.user) {
      return { statusCode: 401, message: "로그인이 필요합니다" };
    }
    // 세션에서 액세스토큰 가져오기
    const {
      data: { session },
    } = await (await supabase).auth.getSession();

    if (!session) {
      return { statusCode: 401, message: "로그인이 필요합니다" };
    }

    const serverAjax = createServerAjax(session.access_token); // userId 대신 토큰 전달
    const service = createService(serverAjax);
    return await action(service, data.user.id);
  } catch (error) {
    return await handleServerError(error);
  }
}
