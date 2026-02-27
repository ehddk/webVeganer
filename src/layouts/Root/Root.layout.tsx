import React from "react";
import styles from "./Root.layout.module.scss";
import cn from "classnames/bind";
import Header from "@/components/Header/Header";
import Footer from "@/app/Footer/Footer";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

const cx = cn.bind(styles);

type RootLayoutProps = React.PropsWithChildren<{}>;

const RootLayout = async (props: RootLayoutProps) => {
  const { children } = props;
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient();
  const { data } = await (await supabase).auth.getUser();
  const session = {
    isAuthenticated: !!data.user,
    user: data.user
      ? {
          id: data.user.id,
          email: data.user.email,
        }
      : null,
  };
  return (
    <html lang="ko">
      <body className={cx("Wrapper")}>
        <Header session={session} />
        <div className={cx("ContentContainer")}>{children}</div>
        <Footer />
      </body>
    </html>
  );
};
export default RootLayout;
