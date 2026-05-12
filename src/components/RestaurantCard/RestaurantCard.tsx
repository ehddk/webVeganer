import Link from "next/link";
import cn from "classnames/bind";
import { LINK_ROUTE } from "@/constants/link.constants";
import { RestaurantImage } from "@/components/RestaurantImage/RestaurantImage";
import styles from "./RestaurantCard.module.scss";

const cx = cn.bind(styles);

type RestaurantCardProps = {
  restaurant: {
    id: string;
    image_url?: string;
    upso_name: string;
    cgg_code_name: string;
  };

  className?: string;
};

export default function RestaurantCard(props: RestaurantCardProps) {
  const { restaurant, className } = props;
  const imageUrl = restaurant.image_url?.[0];

  return (
    <Link
      className={cx("Link", className)}
      href={LINK_ROUTE.RESTAURANT.DETAIL.uri({ id: restaurant.id })}
    >
      <div className={cx("Thumbnail")}>
        <RestaurantImage src={imageUrl} alt={restaurant.upso_name} />
      </div>
      <div className={cx("Name")}>
        <p>{restaurant.upso_name}</p>
        <p>[{restaurant.cgg_code_name}]</p>
      </div>
    </Link>
  );
}
