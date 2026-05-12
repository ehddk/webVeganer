import cn from "classnames/bind";
import styles from "./EmptyState.module.scss";

const cx = cn.bind(styles);

type EmptyStateProps = {
  /** 메인 메시지 */
  title: string;
  /** 부가 설명 (선택) */
  description?: string;
  /** 아이콘 이미지 경로 (선택) */
  iconSrc?: string;
  /** 컨테이너에 추가할 className */
  className?: string;
};

export default function EmptyState(props: EmptyStateProps) {
  const { title, description, iconSrc, className } = props;

  return (
    <div className={cx("Wrapper", className)}>
      {iconSrc && (
        <img src={iconSrc} alt="" className={cx("Icon")} aria-hidden="true" />
      )}
      <p className={cx("Title")}>{title}</p>
      {description && <p className={cx("Description")}>{description}</p>}
    </div>
  );
}
