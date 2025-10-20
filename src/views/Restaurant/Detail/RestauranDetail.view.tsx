"use client";

import { useSearchParams } from "next/navigation";
import seoulList from "@/app/services/seoulData";
import styles from "./RestaurantDetail.view.module.scss";
import cn from "classnames/bind";
import KakaoMap from "@/app/services/kakaoMap";
import Blog from "../../../components/Blog/blog";
import { Suspense, useEffect, useState } from "react";
import Item from "@/components/Item/Item";
import Divider from "@/components/Divider/Divider";
import { RestaurantImage } from "@/components/RestaurantImage/RestaurantImage";

const cx = cn.bind(styles);

type RestaurantInfoViewProps = {
  data: Restaurant.GetOne.Response & { initialBlogImages: string[] };
};
export default function RestaurantInfoView(props: RestaurantInfoViewProps) {
  const { data } = props;

  const [blogImages, setBlogImages] = useState<string[]>([]);
  const [menu, setMenu] = useState([]);

  // const handleMenu = async (name) => {
  //   try {
  //     const res = await fetch(`/api/menu?name=${encodeURIComponent(name)}`);
  //     const data = await res.json();
  //     if (data.menu) {
  //       setMenu(data.menu);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const imageUrl = data.initialBlogImages?.[0];
  return (
    <>
      <div className={cx("Banner")}>
        <RestaurantImage src={imageUrl} alt={data.upso_name} />
        {/* <img
          src={blogImages[0] || "/defaultBanner.jpg"}
          alt={data.upso_name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        /> */}
      </div>
      <div>
        <div className={cx("Item")}>
          <div className={cx("Header")}>
            <h3>{data.upso_name}</h3>
            <p>[{data.cgg_code_name}]</p>
          </div>

          <p>별점</p>
          <ul className={cx("Ul")}>
            <li className={cx("Util")}>
              <img src="/like.svg" width={15} />
              좋아요
            </li>

            <li className={cx("Util")}>
              {" "}
              <img src="/share.svg" width={15} />
              공유
            </li>
          </ul>
        </div>

        <div className={cx("Item")}>
          <Item
            title={"운영 시간"}
            location={data.rdn_code}
            tel={data.tel_no}
            detail={"예약, 포장, 반려동물 동반 가능"}
          ></Item>
        </div>
        {/* <div className={cx("Item")}>
          <h2>메뉴 소개</h2>
          <button onClick={() => handleMenu(cafeName)}>더보기</button>

          {menu && (
            <div>
              {menu.map((item, index) => (
                <p key={index}>{item.name}</p>
              ))}
            </div>
          )}
        </div> */}
        <div className={cx("Item")}>
          <h2>방문자 후기</h2>
          <div className={cx("Items")}>
            <div style={{ padding: "10px" }}>
              <p>작성자</p>
              <ul>
                <li>별점</li>
                <li>날짜</li>
                <li>좋아요</li>
              </ul>
              <p>여기...맛집...</p>
              {/* Add images with valid src */}
              <img src="/path/to/image.jpg" alt="사진" />
              <img src="/path/to/image.jpg" alt="사진" />
              <img src="/path/to/image.jpg" alt="사진" />
              <img src="/path/to/image.jpg" alt="사진" />
            </div>
          </div>
        </div>
        <div className={cx("Item")}>
          <h2>지도</h2>

          <Suspense fallback={<div>지도를 불러오는 중...</div>}>
            <KakaoMap address={data.rdn_code} />
          </Suspense>
          {/* <div id='myMap' style={{ width: '100%', height: '500px' }}></div> */}
        </div>
        <div className={cx("Item")}>
          <h2>블로그 후기</h2>
          <div>
            <Blog query={data.upso_name} />
          </div>
        </div>
      </div>
    </>
  );
}
