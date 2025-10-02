"use client";
import { useRouter } from "next/navigation";
import styles from "./Button.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);

type ButtonProps = {
  text: string;
  onClick?: () => void;
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  colorType: "inherit" | "primary" | "error";
  variant: "contained" | "outlined" | "soft";
};
export default function Button(props: ButtonProps) {
  const {
    text,
    onClick,
    backgroundColor,
    size,
    colorType = "primary",
    variant,
  } = props;
  let router = useRouter();

  return (
    <button className={cx("Btn", size, colorType, variant)} onClick={onClick}>
      {text}
    </button>
  );
}
