import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import RestaurantRegisterView from "@/views/Restaurant/Register/RestaurantRegister.view";

export default async function RestaurantRegisterPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const session = {
    user: {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name ?? null,
    },
  };

  return <RestaurantRegisterView session={session} />;
}
