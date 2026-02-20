import cn from "classnames/bind";
import styles from "./RestaurantImage.view.module.scss";
import Image from "next/image";
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
    <Image
      src={finalSrc}
      alt={alt}
      width={400}
      height={360}
      sizes="(max-width: 600px) 100vw, 429px"
      className={cx("RestaurantImage", { isDefault: isDefault }, className)}
    />
  );
};
