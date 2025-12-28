"use client";
import React from "react";
import styles from "./Main.layout.module.scss";
import cn from "classnames/bind";
import { LINK_ROUTE } from "@/constants/link.constants";
import { usePathname } from "next/navigation";
const cx = cn.bind(styles);
type MainLayoutProps = React.PropsWithChildren<{}>;

const PATHS_WITHOUT_PADDING = [
  LINK_ROUTE.RESTAURANT.DEFAULT.uri,
  LINK_ROUTE.BRAND.uri,
];
const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;
  const pathname = usePathname() ?? "";

  const noPadding = PATHS_WITHOUT_PADDING.some((path) =>
    pathname.startsWith(path)
  );
  return (
    <div className={cx("Wrapper", { "Wrapper-NoPadding": noPadding })}>
      {children}
    </div>
  );
};

export default MainLayout;
