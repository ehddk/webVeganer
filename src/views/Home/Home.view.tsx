"use client";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useRouter } from "next/navigation";
import styles from "./Home.view.module.scss";
import cn from "classnames/bind";
import { useState } from "react";
import { LINK_ROUTE } from "@/constants/link.constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Link from "next/link";
import { RestaurantImage } from "@/components/RestaurantImage/RestaurantImage";
import useIsMobile from "@/hooks/useIsMobile";

const cx = cn.bind(styles);

type HomeViewProps = {
  data: Array<
    Restaurant.GetList.Response[number] & { initialBlogImages: string[] }
  >;
};

export default function HomeView(props: HomeViewProps) {
  const { data } = props;

  let router = useRouter();
  const [showItems, setShowItems] = useState(6);
  const isMobile = useIsMobile();
  function randomItem(arr: any, num: any) {
    const mix = arr.sort(() => 0.5 - Math.random());
    return mix.slice(0, num);
  }

  const randomResList = randomItem(data, showItems);

  const cafeList = data.filter((item) => item.category === "과자점");
  const randomCafeList = randomItem(cafeList, showItems);
  const goDetail = (id: string) => {
    router.push(LINK_ROUTE.RESTAURANT.DETAIL.uri({ id }));
  };
  return (
    <div className={cx("Wrapper")}>
      <div className={cx("Banner")}>
        <img src="/vegan.png" alt="배너이미지" width={300} height={350} />
        <img src="/vegan2.png" alt="배너이미지" width={300} height={350} />
        <img src="/vegan3.png" alt="배너이미지" width={300} height={350} />
        <img src="/vegan4.png" alt="배너이미지" width={290} height={350} />
      </div>
      <SearchBox
        placeholder="음식점,카페, 제품 등등을 검색해보세요"
        value={undefined}
        onChange={undefined}
      />
      <section className={cx("Content")}>
        <div className={cx("Popular")}>
          <div className={cx("Header")}>
            <h2>요즘 뜨는 인기 식당</h2>
            <p
              className={cx("More")}
              onClick={() => router.push("/restaurant")}
            >
              &gt; 더보기
            </p>
          </div>{" "}
          <div className={cx("RestauantContent")}>
            {randomResList.map((data: any, index: number) => {
              const imageUrl = data.initialBlogImages?.[0];
              return (
                <ul key={index}>
                  <li>
                    <Link
                      className={cx("Link")}
                      href={LINK_ROUTE.RESTAURANT.DETAIL.uri({ id: data.id })}
                    >
                      <div className={cx("Thumbnail")}>
                        <RestaurantImage src={imageUrl} alt={data.upso_name} />
                      </div>
                      <button className={cx("Name")}>
                        <p>{data.upso_name} </p>
                        <p>[{data.cgg_code_name}]</p>
                      </button>
                    </Link>
                  </li>
                </ul>
              );
            })}{" "}
          </div>
        </div>

        <div className={cx("CafeWrapper")}>
          <div className={cx("Header")}>
            <h2>비건 카페</h2>
            <p className={cx("More")} onClick={() => router.push("/cafe")}>
              &gt; 더보기
            </p>
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
              {cafeList?.map((item) => {
                const imageUrl = item.initialBlogImages?.[0];
                return (
                  <SwiperSlide key={item.id} className={cx("Slide")}>
                    <Link
                      className={cx("Link")}
                      href={LINK_ROUTE.RESTAURANT.DETAIL.uri({ id: item.id })}
                    >
                      <div className={cx("Thumbnail")}>
                        <RestaurantImage src={imageUrl} alt={item.upso_name} />
                      </div>
                      <button className={cx("Name")}>
                        <p>{item.upso_name} </p>
                        <p>[{item.cgg_code_name}]</p>
                      </button>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
}
