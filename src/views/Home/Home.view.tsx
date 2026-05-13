"use client";
import { useRouter } from "next/navigation";
import styles from "./Home.view.module.scss";
import cn from "classnames/bind";
import { useState } from "react";
import { LINK_ROUTE } from "@/constants/link.constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useIsMobile from "@/hooks/useIsMobile";
import React from "react";
import RestaurantCard from "@/components/RestaurantCard/RestaurantCard";
import Chat from "@/components/Chat/Chat";

const cx = cn.bind(styles);

type HomeViewProps = {
  data: Array<Restaurant.GetList.Response[number]>;
};

export default function HomeView(props: HomeViewProps) {
  const { data } = props;

  let router = useRouter();
  const [showItems, setShowItems] = useState(6);
  const isMobile = useIsMobile();

  function randomItem(arr: any, num: any) {
    if (!Array.isArray(arr)) return [];
    const mix = arr.sort(() => 0.5 - Math.random());
    return mix.slice(0, num);
  }

  const randomResList = React.useMemo(() => {
    return randomItem(data, showItems);
  }, [data, showItems]); //  showItems가 변경될 때만 재계산

  const cafeList = React.useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.filter((item) => item.category === "과자점");
  }, [data]);

  const goDetail = (id: string) => {
    router.push(LINK_ROUTE.RESTAURANT.DETAIL.uri({ id }));
  };

  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const chatAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // 답변이나 로딩 상태 변경 시 채팅 영역 하단으로 자동 스크롤
  React.useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [selectedQuestion, answer, loading]);
  if (!isMounted) {
    return null;
  }

  return (
    <div className={cx("Wrapper")}>
      <section className={cx("Content")}>
        <div className={cx("Popular")}>
          <div className={cx("Header")}>
            <h2>인기 식당</h2>
            <p
              className={cx("More")}
              onClick={() => router.push("/restaurant")}
            >
              더보기
            </p>
          </div>{" "}
          <div className={cx("RestauantContent")}>
            {randomResList.map((item: Restaurant.GetList.Response[number]) => (
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
              slidesPerView={isMobile ? 2 : 3}
              onSwiper={(swiper) => console.log(swiper)}
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
