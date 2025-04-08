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
          </div>
          <div className={cx("Content")}>
            <div className={cx("Info")}>
              <ul>
                <li>
                  <h4>회사 정보</h4>
                </li>
                <li>
                  <p>사업자명 : 김동아</p>
                </li>
                <li>
                  <p>대표전화:010-9333-3333</p>
                </li>
                <li>
                  <p>문의 및 추신이메일: bj9147@naver.com</p>
                </li>
              </ul>
            </div>

            <div className={cx("Call")}>
              {/* <h3>고객문의</h3> */}
              <h4>공지사항</h4>
              <p style={{ color: "gray" }}> 대표문의: 010-1111-1111</p>
            </div>
          </div>
          <div className={cx("BottomMenu")}>
            <ul className={cx("Menu")}>
              <li>
                <a>비거너 소개</a>
              </li>
              <li>
                <a>이용약관</a>
              </li>
              <li>
                <a>개인정보보호</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
