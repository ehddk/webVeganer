"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { IoClose } from "react-icons/io5";

import styles from "./Header.module.scss";
import cn from "classnames/bind";
import Link from "next/link";
import Dropdown from "../Dropdown/Dropdown";
import { AuthMutation } from "@/api/mutation";

import React from "react";
import { LINK_ROUTE } from "@/constants/link.constants";
const cx = cn.bind(styles);

type SessionProps = {
  isAuthenticated: boolean;
};
export default function Header({ session }: { session: SessionProps }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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
      label: "마이페이지",
      value: LINK_ROUTE.MYPAGE.uri,
    },
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

  const handleMenuOpen = () => {
    if (isClosing) return;
    setMenuOpen(!isMenuOpen);
  };

  const navgationList = React.useMemo(
    () => [
      {
        label: "홈",
        href: LINK_ROUTE.MAIN.uri,
      },
      {
        label: "비거너 소개",
        href: LINK_ROUTE.BRAND.uri,
      },
      {
        label: "음식점",
        href: LINK_ROUTE.RESTAURANT.DEFAULT.uri,
      },
      // {
      //   label: "이벤트",
      //   href: LINK_ROUTE.EVENT.uri,
      // },
      {
        label: "커뮤니티",
        href: LINK_ROUTE.ARTICLE.DEFAULT.uri,
      },
    ],
    []
  );
  const goLogin = React.useCallback(() => {
    router.replace(LINK_ROUTE.LOGIN.uri);
    setMenuOpen(false);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setIsClosing(false);
    }, 250);
  };
  return (
    <div className={cx("Wrapper", { closing: !isMenuOpen })}>
      <div className={cx("Header")}>
        <a href="/">
          <img src="/logo.svg" alt="로고" className={cx("Logo")} />
        </a>
        <nav className={cx("Menu")}>
          <ul className={cx("MenuList", { closing: !isMenuOpen })}>
            {navgationList.map((item) => (
              <Link className={cx("Item")} href={item.href} key={item.label}>
                {" "}
                <span className={cx("Label")}>{item.label}</span>
              </Link>
            ))}
          </ul>
          <IoMenu className={cx("Hamburger")} onClick={handleMenuOpen} />
          {(isMenuOpen || isClosing) && (
            <div className={cx("Content", { closing: isClosing })}>
              <ul className={cx("MobileMenuList")}>
                <div className={cx("HeaderLine")}>
                  <div className={cx("UserInfo")}>
                    {!session.isAuthenticated ? (
                      <>
                        <strong
                          className={cx("UserInfoStrong")}
                          onClick={goLogin}
                        >
                          로그인
                        </strong>
                        <span className={cx("UserInfoSpan")}>해 주세요.</span>
                      </>
                    ) : (
                      <span className={cx("UserInfoStrong")}>환영합니다!</span>
                    )}
                  </div>
                  <IoClose size={30} onClick={handleClose} />
                </div>
                {navgationList.map((item) => (
                  <Link
                    className={cx("Item")}
                    href={item.href}
                    key={item.label}
                    onClick={handleClose}
                  >
                    {" "}
                    <span className={cx("Label")}>{item.label}</span>
                  </Link>
                ))}
              </ul>
            </div>
          )}
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
