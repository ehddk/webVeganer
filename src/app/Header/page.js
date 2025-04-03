"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import Logout from "../Logout/page";
import styles from "./Header.module.scss";
import cn from "classnames/bind";
import Link from "next/link";
const cx = cn.bind(styles);

export default function NavBar({ session }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleMenuClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const headerStyle = {
    display: "flex",
    lineHeight: "center",
    alignItems: "center",
    height: "50px",
    justifyContent: "space-between",
    padding: "15px",
    margin: "0 100px",
  };

  const menu = {
    display: "flex",
    gap: "100px",
    listStyleType: "none",
    marginTop: "40px",
    fontSize: "20px",
  };

  const loginUl = {
    listStyleType: "none",
    display: "flex",
    gap: "10px",
    color: "gray",
    position: "absolute", // 수정된 부분: position을 fixed로 변경
    right: "20px",
    top: "-10px",
    zIndex: "9999",
  };

  const dropdownStyle = {
    background: "lightgray",
    width: "120px",
    height: "70px",
    marginTop: "-10px",
    borderRadius: "10px",
    position: "absolute",
    left: "83%", // Center the dropdown horizontally
    transform: "translateX(-50%)", // Adjust for centering
    zIndex: "9999",
    listStyleType: "none",
  };

  const handleMenuItemClick = (path) => {
    router.push(path);
    setDropdownOpen(false);
  };

  return (
    <div style={{ borderBottom: "0.5px solid green" }}>
      {/* <header style={headerStyle}>
        <a href="/" style={{ textDecoration: "none" }}>
          <h1>Veganer</h1>
        </a>
        <ul style={menu}>
          <a
            href="/Brand"
            style={{ textDecoration: "none", color: "black" }}
          >
            브랜드
          </a>
          <a href="/Cafe" style={{ textDecoration: "none", color: "black" }}>
            카페
          </a>
          <a href="/Food" style={{ textDecoration: "none", color: "black" }}>
            음식점
          </a>
          <li onClick={handleMenuClick}>행사</li>
          <a
            href="/Commu"
            style={{ textDecoration: "none", color: "black" }}
          >
            커뮤니티
          </a>
        </ul>
      </header> */}
      <div
        style={{
          //  width: "calc(100%-160px)",
          display: "flex",
          // flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Veganer</h1>
        <nav className={cx("Menu")}>
          <ul className={cx("MenuList")}>
            <li>
              <a onClick={() => router.push("/brand")}>브랜드</a>
            </li>
            <li>
              <Link href={"/cafe"}>카페</Link>
            </li>
            <li>
              <Link href={"/food"}>음식점</Link>
            </li>
            <li>
              <Link href={"/event"}>이벤트</Link>
            </li>
            <li>
              <Link href={"/commu"}>커뮤니티</Link>
            </li>
          </ul>
          <IoMenu className={cx("Hamburger")} />
        </nav>
      </div>
      <ul style={loginUl}>
        {session ? (
          <div
            style={{ width: "170px", display: "flex", margin: "0 0 0 30px" }}
          >
            <p>{session.user.name}님</p>
            <Logout />
          </div>
        ) : (
          <>
            <Link href="/Login" className={cx("UtilMenu")}>
              <li>로그인ㅤ |</li>
            </Link>
            <Link href="/Join" className={cx("UtilMenu")}>
              <li>회원가입</li>
            </Link>
          </>
        )}
      </ul>
      {isDropdownOpen && (
        <ul style={dropdownStyle}>
          <li
            style={{ marginTop: "10px" }}
            onClick={() => handleMenuItemClick("/event/tab1")}
          >
            페어 / 페스타
          </li>
          <li onClick={() => handleMenuItemClick("/event/tab2")}>강의</li>
        </ul>
      )}
    </div>
  );
}
