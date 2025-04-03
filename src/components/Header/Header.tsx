"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

import Logout from "@/views/Logout/Logout";
import styles from "./Header.module.scss";
import cn from "classnames/bind";
import Link from "next/link";
import Dropdown from "../Dropdown/Dropdown";
const cx = cn.bind(styles);

export default function Header({ session }) {
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
  const option = [
    { label: "로그인", value: "/login" },
    { label: "회원가입", value: "/join" },
  ];

  // 상태 관리를 위한 추가 코드
  const [selectedOption, setSelectedOption] = useState("");

  // 드롭다운용 handleChange 함수
  const handleOptionChange = (value) => {
    setSelectedOption(value);
    handleMenuItemClick(value);
  };

  return (
    <div className={cx("Wrapper")}>
      <div
        className={cx("Header")}
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
          <Dropdown.Root value={selectedOption} onChange={handleOptionChange}>
            <Dropdown.Trigger
              as={(props) => (
                <div onClick={props.handleTriggerClick}>
                  {" "}
                  <MdAccountCircle size={25} onClick={handleMenuClick} />
                </div>
              )}
            ></Dropdown.Trigger>
            <Dropdown.Menu size="medium" className={cx("DropdownMenu")}>
              {option.map((item) => (
                <Dropdown.Item key={item.value} value={item.value}>
                  {item.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown.Root>
        </nav>
      </div>

      {/* {isDropdownOpen && (
        <Dropdown.Root value={selectedOption} onChange={handleOptionChange}>
          <Dropdown.Menu>
            {option.map((item) => (
              <Dropdown.Item key={item.value} value={item.value}>
                {item.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Root>
      )} */}
    </div>
  );
}
