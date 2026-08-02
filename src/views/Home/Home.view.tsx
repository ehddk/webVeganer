"use client";
import { useRouter } from "next/navigation";
import styles from "./Home.view.module.scss";
import cn from "classnames/bind";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import React from "react";
import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import Chat from "@/components/Chat/Chat";
import { LINK_ROUTE } from "@/constants/link.constants";

const cx = cn.bind(styles);

/** useIsMobile(1200)을 대체. JS 상태가 아닌 Swiper 자체 breakpoint로 처리해야
 *  서버 렌더 결과와 클라이언트 첫 렌더가 어긋나지 않는다. */
const SWIPER_BREAKPOINTS = {
  0: { slidesPerView: 2 },
  1201: { slidesPerView: 3 },
};

type HomeViewProps = {
  data: Restaurant.GetList.Response;
  /** 서버에서 미리 추첨해 내려준 인기 식당 목록 */
  popular: Restaurant.GetList.Response;
};

export default function HomeView(props: HomeViewProps) {
  const { data, popular } = props;

  const router = useRouter();

  const cafeList = React.useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.filter((item) => item.category === "과자점");
  }, [data]);

  return (
    <div className={cx("Wrapper")}>
      <section className={cx("Content")}>
        <div className={cx("Popular")}>
          <div className={cx("Header")}>
            <h2>인기 식당</h2>
            <p
              className={cx("More")}
              onClick={() => router.push(LINK_ROUTE.RESTAURANT.DEFAULT.uri)}
            >
              더보기
            </p>
          </div>{" "}
          <div className={cx("RestauantContent")}>
            {popular.map((item) => (
              <RestaurantCard key={item.id} restaurant={item} />
            ))}
          </div>
        </div>

        <div className={cx("CafeWrapper")}>
          <div className={cx("Header")}>
            <h2>비건 카페</h2>
          </div>

          <div className={cx("CafeContent")}>
            <Swiper
              className={cx("Swiper")}
              wrapperClass={cx("SwipperWrapper")}
              spaceBetween={50}
              slidesPerView={3}
              breakpoints={SWIPER_BREAKPOINTS}
              pagination={{ clickable: true, dynamicBullets: true }}
              modules={[Autoplay, Pagination]}
            >
              {cafeList?.map((item) => (
                <SwiperSlide key={item.id} className={cx("Slide")}>
                  <RestaurantCard restaurant={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <Chat />
      </section>
    </div>
  );
}
