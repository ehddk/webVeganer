"use client";

import { useSearchParams } from "next/navigation";
import seoulList from "../../services/seoulData";
import styles from "./CafeInfo.view.module.scss";
import cn from "classnames/bind";
import { FaRegThumbsUp } from "react-icons/fa6";
import KakaoMap from "../../services/kakaoMap";
import Blog from "@/app/components/blog";
import { useState, useEffect } from "react";
import Item from "@/app/components/Item/Item";
import Divider from "@/app/components/Divider/Divider";
const cx = cn.bind(styles);

export default function CafeInfoView() {
  const params = useSearchParams();
  const cafeName = params.get("name");
  const location = params.get("loca");

  const [menu, setMenu] = useState([]);

  const getInfo = (cafeName, location) => {
    const cafeData = seoulList.data.find(
      (item) => item.upso_nm === cafeName && item.cgg_code_nm === location
    );
    return cafeData || {};
  };

  const handleMenu = async (name) => {
    try {
      const res = await fetch(`/api/menu?name=${encodeURIComponent(name)}`);
      const data = await res.json();
      if (data.menu) {
        setMenu(data.menu);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const CafeInfo = getInfo(cafeName, location);

  const Review = [
    {
      id: 1,
      author: "익명1",
      date: "2022-01-01",
      content: "ㄴ암암ㄴ암낭만ㅇ만ㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ",
    },
    {
      id: 2,
      author: "익명2",
      date: "2022-01-01",
      content: "ㄴ암암ㄴ암낭만ㅇ만ㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ",
    },
  ];
  return (
    <>
      <div className={cx("Banner")} />
      <div
        style={{ margin: "0 auto", backgroundColor: "#f9f9f9", width: "80%" }}
      >
        <div className={cx("Item")}>
          <h3>{cafeName}</h3>
          <p>
            {location} | {CafeInfo.bizcnd_code_nm}
          </p>
          <p>별점</p>
          <ul className={cx("Ul")}>
            <li>좋아요</li>
            <li>하트</li>
            <li>공유</li>
          </ul>
        </div>
        <div className={cx("Item")}>
          <Item
            title={"운영 시간"}
            location={CafeInfo.rdn_code_nm}
            tel={CafeInfo.tel_no}
            detail={"예약, 포장, 반려동물 동반 가능"}
          ></Item>
        </div>
        <div className={cx("Item")}>
          <h2>메뉴 소개</h2>
          <button onClick={() => handleMenu(cafeName)}>더보기</button>

          {menu && (
            <div>
              {menu.map((item, index) => (
                <p key={index}>{item.name}</p>
              ))}
            </div>
          )}
        </div>
        <div className={cx("Item")}>
          <h2>방문자 후기</h2>
          <div className={cx("Review")}>
            <div
              style={{
                padding: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {Review.map((review) => (
                <>
                  <div
                    key={review.id}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>{review.author}님의 리뷰입니다</p>
                    <p>{review.date}</p>
                  </div>
                  <span>{review.content}</span>
                  <FaRegThumbsUp />
                  <Divider />
                </>
              ))}
            </div>
          </div>
          <div className={cx("Item")}>
            <h2>지도</h2>
            <KakaoMap address={CafeInfo.rdn_code_nm}></KakaoMap>
          </div>
          <div
            style={{
              borderTop: "1px solid black",
              padding: "50px",
              width: "85%",
              margin: "0 auto",
            }}
          >
            <h2>블로그 후기</h2>
            <div
              style={{
                borderRadius: "5px",
                width: "85%",
                height: "auto",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              <Blog query={cafeName} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
