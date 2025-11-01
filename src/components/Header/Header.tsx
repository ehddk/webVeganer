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
import { AuthMutation } from "@/\bapi/mutation";
const cx = cn.bind(styles);

type SessionProps = {
  isAuthenticated: boolean;
};
export default function Header({ session }: { session: SessionProps }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleMenuClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = (path: any) => {
    router.push(path);
    setDropdownOpen(false);
  };
  const loggedInOptions = [
    {
      label: "로그아웃",
      value: "/logout",
    },
  ];

  const option = [
    { label: "로그인", value: "/login" },
    { label: "회원가입", value: "/join" },
  ];

  const options = session.isAuthenticated ? loggedInOptions : option;

  // 상태 관리를 위한 추가 코드
  const [selectedOption, setSelectedOption] = useState("");

  // 드롭다운용 handleChange 함수
  const handleOptionChange = async (value: string | string[]) => {
    const selectedValue = Array.isArray(value) ? value[0] : value;
    setSelectedOption(selectedValue);

    if (selectedValue === "/logout") {
      const res = await AuthMutation.logout({});
      if (res) {
        router.push("/");
        router.refresh();
      }
    } else {
      handleMenuItemClick(selectedValue);
    }
  };

  return (
    <div className={cx("Wrapper")}>
      <div className={cx("Header")}>
        <a href="/">
          <h1>Veganer</h1>
        </a>
        <nav className={cx("Menu")}>
          <ul className={cx("MenuList")}>
            <li>
              <a onClick={() => router.push("/brand")}>브랜드</a>
            </li>

            <li>
              <Link href={"/restaurant"}>음식점</Link>
            </li>
            <li>
              <Link href={"/event/menu1"}>이벤트</Link>
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
              {options.map((item) => (
                <Dropdown.Item key={item.value} value={item.value}>
                  {item.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown.Root>
        </nav>
      </div>
    </div>
  );
}
