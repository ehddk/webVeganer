"use server";

import { createSupabaseServerClient } from "@/lib/supabaseServer";
import CommuRegisterView from "@/views/Commu/Register/CommuRegister.view";

export default async function CommuRegisterPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const session = {
    user: user
      ? {
          id: user.id,
          email: user.email,
          name: user.user_metadata.name ?? "익명",
        }
      : null,
  };

  return <CommuRegisterView session={session} />;
}
