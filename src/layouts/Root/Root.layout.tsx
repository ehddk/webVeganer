'use client";';
import React from "react";
import styles from "./Root.layout.module.scss";
import cn from "classnames/bind";
import Header from "@/components/Header/Header";

const cx = cn.bind(styles);

type RootLayoutProps = React.PropsWithChildren<{}>;

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;
  return (
    <html lang="ko">
      <body>
        <div>
          <Header session={undefined} />
          <div className={cx("ContentContainer")}>{children}</div>
        </div>
      </body>
    </html>
  );
};
export default RootLayout;
