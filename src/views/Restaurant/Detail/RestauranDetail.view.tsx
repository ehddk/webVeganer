"use client";

import { useSearchParams } from "next/navigation";
import seoulList from "@/app/services/seoulData";
import styles from "./RestaurantDetail.view.module.scss";
import cn from "classnames/bind";
import KakaoMap from "@/app/services/kakaoMap";
import Blog from "../../../components/Blog/Blog";
import { Suspense, useEffect, useState } from "react";
import Item from "@/components/Item/Item";
import Divider from "@/components/Divider/Divider";
import { RestaurantImage } from "@/components/RestaurantImage/RestaurantImage";
import { Controller, FormProvider, useForm } from "react-hook-form";

const cx = cn.bind(styles);

type FormType =
  | Review.GetList.Response
  | Review.Post.Request["body"]
  | Review.Put.Request["body"];
type RestaurantInfoViewProps = {
  data: Restaurant.GetOne.Response & { initialBlogImages: string[] };
  reviewData: Review.GetList.Response;
};
export default function RestaurantInfoView(props: RestaurantInfoViewProps) {
  const { data, reviewData } = props;

  console.log("리뷰 뭐?", reviewData);
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

  const form = useForm<FormType>({
    defaultValues: {},
  });
  const firstImageUrl = data.initialBlogImages?.[0]; // 첫 번째 이미지 (인덱스 0)
  const secondImageUrl = data.initialBlogImages?.[1];
  return (
    <>
      <div className={cx("Banner")}>
        {/* 첫 번째 이미지 (메인) */}
        <RestaurantImage
          src={firstImageUrl}
          alt={`${data.upso_name} 이미지 1`}
          className={cx("RestaurantImage")}
        />

        {/* 🚀 두 번째 이미지가 있을 경우에만 표시 */}
        {secondImageUrl && (
          <RestaurantImage
            src={secondImageUrl}
            alt={`${data.upso_name} 이미지 2`}
            className={cx("RestaurantImage")}
          />
        )}
      </div>
      <div>
        <div className={cx("Item")}>
          <div className={cx("Header")}>
            <h3>{data.upso_name}</h3>
            <p>[{data.cgg_code_name}]</p>
          </div>

          <p>별점!!!!</p>

          <ul className={cx("Ul")}>
            <li className={cx("Util")}>
              <img src="/like.svg" width={15} />
              좋아요!!!
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
              <div className={cx("ProfileWrapper")}>
                <img src="/user.svg" width={20} className={cx("Profile")} />
                <p className={cx("User")}>작성자</p>
              </div>
              {/* <FormProvider {...form}>


                  
                 </FormProvider>
              <Controller control={control} render={(field)}>  */}

              {reviewData.items.map((item) => (
                <ul key={item.id}>
                  <li>
                    <p>{item.content}</p>
                  </li>
                </ul>
              ))}
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
