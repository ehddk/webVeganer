import cn from "classnames/bind";
import styles from "./RestaurantImage.view.module.scss";

const cx = cn.bind(styles);
type RestaurantImageProps = {
  src?: string;
  alt: string;
  className?: string;
};

export const RestaurantImage = (props: RestaurantImageProps) => {
  const { src, alt, className } = props;
  const finalSrc = src || "/cafe.png";
  const isDefault = !src;
  return (
    <img
      src={finalSrc}
      alt={alt}
      className={cx("RestaurantImage", { isDefault: isDefault }, className)}
    />
  );
};
