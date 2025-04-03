"use client";

import { useRouter, useSearchParams } from "next/navigation";
import seoulList from "../../services/seoulData";
import styles from "./FoodInfo.view.module.scss";
import cn from "classnames/bind";
import KakaoMap from "../../services/kakaoMap";
import Blog from "../../components/blog";
import { Suspense } from "react";

const cx = cn.bind(styles);

export default function FoodInfoView() {
  const params = useSearchParams();
  const restaurantName = params.get("name");
  const location = params.get("loca");

  const getInfo = (restaurantName, location) => {
    const restaurantData = seoulList.data.find(
      (item) => item.upso_nm === restaurantName && item.cgg_code_nm === location
    );
    return restaurantData || {};
  };

  const restaurantInfo = getInfo(restaurantName, location);

  if (!restaurantInfo.upso_nm) {
    return <p>해당 식당 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <>
      <div className={cx("Banner")} />
      <div
        style={{ margin: "0 auto", backgroundColor: "#f9f9f9", width: "80%" }}
      >
        <div style={{ padding: "50px" }}>
          <h3>{restaurantName}</h3>
          <p>
            {location} | {restaurantInfo.bizcnd_code_nm}
          </p>
          <p>별점</p>
          <ul className={cx("Ul")}>
            <li>좋아요</li>
            <li>하트</li>
            <li>공유</li>
          </ul>
        </div>
        <div className={cx("Item")}>
          <p>운영 시간</p>
          <p>위치 : {restaurantInfo.rdn_code_nm}</p>
          <p>문의 전화 : {restaurantInfo.tel_no}</p>
          <p>홈페이지</p>
          <p>예약, 포장, 반려동물 동반 가능</p>
        </div>
        <div className={cx("Item")}>
          <h2>메뉴 소개</h2>
          <div className={cx("Items")}>
            <h3>애피타이저</h3>
            <p>메뉴</p>
            <h3>메인</h3>
            <p>메뉴</p>
          </div>
        </div>
        <div className={cx("Item")}>
          <h2>방문자 후기</h2>
          <div className={cx("Items")}>
            <div style={{ padding: "10px" }}>
              <p>작성자</p>
              <ul
                style={{
                  display: "flex",
                  gap: "20px",
                  listStyle: "none",
                  marginLeft: "-40px",
                }}
              >
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
            <KakaoMap address={restaurantInfo.rdn_code_nm} />
          </Suspense>
          {/* <div id='myMap' style={{ width: '100%', height: '500px' }}></div> */}
        </div>
        <div className={cx("Item")}>
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
            <Blog query={restaurantName} />
          </div>
        </div>
      </div>
    </>
  );
}
