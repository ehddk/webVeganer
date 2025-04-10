import { useRouter } from "next/navigation";
import styles from "./Button.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);

type ButtonProps = {
  text: string;
  onClick?: () => void;
  backgroundColor?: string;
};
export default function Button(props: ButtonProps) {
  const { text, onClick, backgroundColor } = props;
  let router = useRouter();

  return (
    <button className={cx("Btn")} onClick={onClick} style={{ backgroundColor }}>
      {text}
    </button>
  );
}
