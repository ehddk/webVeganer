"use client";
import React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
import dayjs from "dayjs";
import Button from "@/components/Button/Button";
import { useModal } from "@/hooks/modal/useModal";
import { LINK_ROUTE } from "@/constants/link.constants";
import Link from "next/link";
import { ReviewMutation } from "@/\bapi/mutation";
import ReviewForm from "@/components/Form/ReviewForm";

const cx = cn.bind(styles);

type FormType =
  | Review.GetList.Response
  | Review.Post.Request["body"]
  | Review.Put.Request["body"];
type RestaurantInfoViewProps = {
  data: Restaurant.GetOne.Response & { initialBlogImages: string[] };
  reviewData: Review.GetList.Response;
  isAuthenticated: boolean;
};
export default function RestaurantInfoView(props: RestaurantInfoViewProps) {
  const { data, reviewData, isAuthenticated } = props;
  const { showModal, hideModal, ModalComponent } = useModal();
  const firstImageUrl = data.initialBlogImages?.[0]; // 첫 번째 이미지 (인덱스 0)
  const secondImageUrl = data.initialBlogImages?.[1];
  const params = useParams<{ id: string }>();

  const id = params;
  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    showModal({
      type: "default",
      description: "링크가 복사되었습니다.",
      dimmedColor: "transparent",
      title: "복사",
      positive: {
        text: "확인",
        onClick: () => {
          hideModal();
        },
      },
    });
  };
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
              <img
                src="/share.svg"
                width={15}
                onClick={() =>
                  handleCopy(`http://localhost:3000/restaurant/${id}`)
                }
              />
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

        <div className={cx("Item")}>
          <h2>{`리뷰 및 평가 (${reviewData.total})`}</h2>
          <ReviewForm
            isAuthenticated={!!isAuthenticated}
            reviewData={reviewData}
          />
        </div>
        <div className={cx("Item")}>
          <h2>지도</h2>

          <Suspense fallback={<div>지도를 불러오는 중...</div>}>
            <KakaoMap address={data.rdn_code} />
          </Suspense>
        </div>
        <div className={cx("Item")}>
          <h2>블로그 후기</h2>
          <div>
            <Blog query={data.upso_name} />
          </div>
        </div>
        <ModalComponent />
      </div>
    </>
  );
}
