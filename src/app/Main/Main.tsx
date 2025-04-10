"use client";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useRouter } from "next/navigation";
import commuData from "../services/commuData";
import seoulList from "../services/seoulData";
import styles from "./Main.module.scss";
import cn from "classnames/bind";
import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
const cx = cn.bind(styles);

const CafeList = [
  {
    id: 1,
    title: "여기 좋음",
    content:
      "왜 좋은지??좋은지좋은지좋은지좋은지좋은지좋은지좋은지좋은지좋은지좋은지좋은지좋은지좋은지좋좋은지좋은지좋은지좋은지좋은지좋은지좋은지좋은지은지좋은지좋은지좋은지좋은지좋은지좋은지좋은지좋은지좋은지좋좋은지좋은지좋은지좋은지좋은지좋은지좋은지좋은지은지좋은지좋은지좋은지좋은지좋은지좋은지좋은지좋은지",
    cafeName: "써니보울",
    date: "2025-02-04",
  },
  {
    id: 2,
    title: "여기 좋음",
    content: "왜 좋은지??",
    cafeName: "휘게라이프",
    date: "2025-02-04",
  },
];
export default function MainPage() {
  let router = useRouter();
  const [showItems, setShowItems] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      setShowItems(window.innerWidth <= 930 ? 4 : 6);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);
  function randomItem(arr, num) {
    const mix = arr.sort(() => 0.5 - Math.random());
    return mix.slice(0, num);
  }

  const ResList = seoulList.data.filter(
    (item) => item.crtfc_gbn_nm === "채식음식점"
  );
  const randomList = randomItem(ResList, showItems);

  const commuList = commuData.category.filter((item) => item.category);
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
          <div className={cx("SubT")}>
            <h1>요즘 뜨는</h1> <h1>인기 식당</h1>
            <Button
              text={"비건식당 구경하러가기"}
              onClick={() => router.push("/food")}
              backgroundColor="rgb(70, 144, 70)"
            ></Button>
          </div>
          <div className={cx("Cont")}>
            {randomList.map((data: any, index: number) => (
              <ul>
                <li key={index}>
                  <div className={cx("Items")}>
                    <div
                      style={{
                        backgroundColor: "#fdf5e6",
                        boxShadow: "5px 7px 2px lightgray",
                        height: "150px",
                      }}
                    ></div>
                    <p>{data.upso_nm}</p>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </div>

        <div className={cx("Cafe")}>
          <div className={cx("Left")}>
            <h1>
              요즘 뜨는 <br /> 비건 카페
            </h1>
            <Button
              text={"비건카페 구경하러가기"}
              onClick={() => router.push("/Cafe")}
              backgroundColor="rgb(70,144,70)"
            ></Button>
          </div>

          <div className={cx("BoardWrapper")}>
            <div className={cx("Inner")}>
              {CafeList.map((item, index) => (
                <>
                  <ul key={item.id}>
                    <li>
                      <div className={cx("BoardList")}>
                        <div className={cx("Left")}>
                          <h3>{item.cafeName}</h3>
                          <p className={cx("ItemContent")}>{item.content}</p>
                          <p className={cx("Date")}>{item.date}</p>
                        </div>
                        <div className={cx("Right")}>
                          <div className={cx("Image")} />
                        </div>
                      </div>
                    </li>
                  </ul>
                </>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
