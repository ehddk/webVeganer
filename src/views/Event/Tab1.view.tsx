"use client";

import styles from "./Tab1.view.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);

export default function Tab1View() {
  return (
    <>
      {/* <SearchBox/> */}
      <div className={cx("OptionContainer")}>
        <ul className={cx("MenuList")}>
          <li>전체</li>
          <li>페어</li>
          <li>페스타</li>
          <li>마켓</li>
        </ul>
      </div>
      <div className={cx("GridContainer")}>
        <div className={cx("ItemContainer")}>
          <div></div>
          <div className={cx("ItemInfo")}>
            <p>이름</p>
            <p>메뉴명</p>
          </div>
        </div>
        <div className={cx("ItemContainer")}>
          <div></div>
          <div className={cx("ItemInfo")}>
            <p>이름</p>
            <p>메뉴명</p>
          </div>
        </div>
      </div>
    </>
  );
}
