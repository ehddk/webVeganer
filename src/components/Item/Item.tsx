import seoulList from "@/app/services/seoulData";
import styles from "./Item.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);

type ItemProps = {
  title: string;
  location: string;
  tel: string;
  detail: string;
  style?: React.CSSProperties;
  className?: string;
};
export default function Item(props: ItemProps) {
  const { title, location, tel, detail, style, className } = props;

  return (
    <div className={cx("Wrapper")}>
      <h2>{title}</h2>
      <div className={cx("MenuItem")}>
        <label>위치 </label>
        <p>{location}</p>
      </div>
      <div className={cx("MenuItem")}>
        <label>문의 전화 </label>
        <p>{tel}</p>
      </div>

      <div className={cx("MenuItem")}>
        <label>기타 </label>
        <p>{detail}</p>
      </div>
    </div>
  );
}
