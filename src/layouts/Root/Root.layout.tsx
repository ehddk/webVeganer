import React from "react";
import styles from "./Root.layout.module.scss";
import cn from "classnames/bind";
import Header from "@/components/Header/Header";
import Footer from "@/app/Footer/Footer";
import { cookies } from "next/headers";

const cx = cn.bind(styles);

type RootLayoutProps = React.PropsWithChildren<{}>;

const RootLayout = async (props: RootLayoutProps) => {
  const { children } = props;
  const cookieStore = cookies();
  const isAuthenticated = (await cookieStore).has("accessToken");
  return (
    <html lang="ko">
      <body className={cx("Wrapper")}>
        <Header session={{ isAuthenticated }} />
        <div className={cx("ContentContainer")}>{children}</div>
        <Footer />
      </body>
    </html>
  );
};
export default RootLayout;
