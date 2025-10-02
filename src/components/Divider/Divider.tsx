import React from "react";
import styles from "./Divider.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

export default function Divider() {
  return <div className={cx("Wrapper")} />;
}
