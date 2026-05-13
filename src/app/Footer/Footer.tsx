"use client";
import { LINK_ROUTE } from "@/constants/link.constants";
import styles from "./Footer.module.scss";
import cn from "classnames/bind";
import { useRouter } from "next/navigation";
const cx = cn.bind(styles);

export default function Footer() {
  const router = useRouter();
  return (
    <>
      <div className={cx("Wrapper")}>
        <div className={cx("List")}>
          <div className={cx("Logo")}>
            <a href="/">
              <img
                src="/logo.svg"
                alt="로고"
                className={cx("Logo")}
                width={100}
                style={{ opacity: 0.8 }}
              />
            </a>
          </div>
          <div className={cx("Content")}>
            <div className={cx("Info")}>
              <ul className={cx("Menu")}>
                <li>
                  <p onClick={() => router.push(LINK_ROUTE.BRAND.uri)}>
                    회사 소개
                  </p>
                </li>
                <li>
                  <p>이용약관</p>
                </li>
                <li>
                  <p>개인정보보호</p>
                </li>
              </ul>
              <ul>
                <li>
                  <p>
                    대표자 <strong>김동아</strong>
                  </p>
                </li>

                <li>
                  <p>
                    문의 및 추신이메일 <strong>bj9147@naver.com</strong>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
