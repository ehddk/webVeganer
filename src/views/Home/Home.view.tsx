"use client";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useRouter } from "next/navigation";
import commuData from "../../app/services/commuData";
import seoulList from "../../app/services/seoulData";
import styles from "./Home.view.module.scss";
import cn from "classnames/bind";
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
const cx = cn.bind(styles);

type HomeViewProps = {
  data: Restaurant.GetList.Response[number][];
};

export default function HomeView(props: HomeViewProps) {
  const { data } = props;

  let router = useRouter();
  const [showItems, setShowItems] = useState(6);

  //   useEffect(() => {
  //     const handleResize = () => {
  //       setShowItems(window.innerWidth <= 930 ? 4 : 6);
  //     };
  //     window.addEventListener("resize", handleResize);
  //     handleResize();
  //   }, []);
  function randomItem(arr: any, num: any) {
    const mix = arr.sort(() => 0.5 - Math.random());
    return mix.slice(0, num);
  }

  const randomResList = randomItem(data, showItems);

  const cafeList = data.filter((item) => item.category === "과자점");
  const randomCafeList = randomItem(cafeList, showItems);
  console.log("data:", data);
  return (
    <div className={cx("Wrapper")}>
      <div className={cx("Banner")} />
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
            {randomResList.map((data: any, index: number) => (
              <ul>
                <li key={index}>
                  <div className={cx("Image")}></div>
                  <p>{data.upso_name}</p>
                </li>
              </ul>
            ))}{" "}
          </div>
        </div>

        <div className={cx("CafeWrapper")}>
          <div className={cx("Header")}>
            <h2>요즘 뜨는 비건 카페</h2>
            <p className={cx("More")} onClick={() => router.push("/cafe")}>
              &gt; 더보기
            </p>
          </div>

          <div className={cx("CafeContent")}>
            {randomCafeList?.map((item: any, index: any) => (
              <ul key={index}>
                <li>
                  <div className={cx("Image")} />

                  <button className={cx("Name")}>
                    <p>{item.upso_name}</p>
                  </button>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
