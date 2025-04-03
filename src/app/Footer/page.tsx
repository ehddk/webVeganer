"use client";
import styles from "./Footer.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);

export default function Footer() {
  return (
    <>
      <div className={cx("Wrapper")}>
        <div className={cx("List")}>
          <div className={cx("Logo")}>
            <h2>Veganner</h2>
            <h4>비거너 소개 | 이용약관 | 개인정보보호</h4>
            <h4>사업자명 : 김동아</h4>
            <h4>주소: 경기도 ㅤ 대표전화:010-9333-3333</h4>
            <h4>문의 및 추신이메일: bj9147@naver.com</h4>
          </div>
          <div className={cx("Time")}>
            <h3>운영시간</h3>
            <h4> 평일 9:00~18:00</h4>
            <h4>주말 9:00~18:00 </h4>
            <h4>점심:12:00~1:00 </h4>
          </div>
          <div className={cx("Call")}>
            <h3>고객문의</h3>
            <h4>공지사항</h4>
            <h4> 대표문의: 010-1111-1111</h4>
          </div>
        </div>
      </div>
    </>
  );
}
