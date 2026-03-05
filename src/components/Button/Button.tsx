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
  className?: string;
};
export default function Button(props: ButtonProps) {
  const {
    text,
    onClick,

    size,
    colorType = "primary",
    variant,
    className,
  } = props;

  return (
    <button
      className={cx("Btn", size, colorType, variant, className)}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
