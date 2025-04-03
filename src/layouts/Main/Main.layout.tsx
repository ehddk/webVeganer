import React from "react";
import styles from "./Main.layout.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);
type MainLayoutProps = React.PropsWithChildren<{}>;

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;

  return <div className={cx("Wrapper")}>{children}</div>;
};

export default MainLayout;
