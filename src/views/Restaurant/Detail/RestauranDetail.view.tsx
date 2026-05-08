"use client";
import React from "react";
import { useParams } from "next/navigation";

import styles from "./RestaurantDetail.view.module.scss";
import cn from "classnames/bind";
import LeafletMap from "@/app/services/LeafletMap";
import Blog from "../../../components/Blog/Blog";
import { Suspense } from "react";
import Item from "@/components/Item/Item";
import { RestaurantImage } from "@/components/RestaurantImage/RestaurantImage";
import { useModal } from "@/hooks/modal/useModal";

import ReviewForm from "@/components/Form/ReviewForm";

const cx = cn.bind(styles);

type RestaurantInfoViewProps = {
  data: Restaurant.GetOne.Response;
  reviewData: Review.GetList.Response;
  session: {
    user: {
      id: string;
      email: string | undefined;
    } | null;
  };
  currentUserId?: string | null;
};
export default function RestaurantInfoView(props: RestaurantInfoViewProps) {
  const { data, reviewData, session, currentUserId } = props;
  const { showModal, hideModal, ModalComponent } = useModal();
  const firstImageUrl = data.image_url?.[0]; // 첫 번째 이미지 (인덱스 0)
  const secondImageUrl = data.image_url?.[1];
  const params = useParams<{ id: string }>();

  const id = params?.id;

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
      <section className={cx("Content")}>
        <div className={cx("Item")}>
          <div className={cx("Header")}>
            <h3>{data.upso_name}</h3>
            <p>[{data.cgg_code_name}]</p>
          </div>

          <ul className={cx("Ul")}>
            <li className={cx("Util")}>
              <img src="/like.svg" width={15} />
              좋아요
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
            session={session}
            reviewData={reviewData}
            currentUserId={currentUserId}
          />
        </div>
        <div className={cx("Item")}>
          <h2>지도</h2>

          <Suspense fallback={<div>지도를 불러오는 중...</div>}>
            <LeafletMap address={data.rdn_code} />
          </Suspense>
        </div>
        <div className={cx("Item")}>
          <h2>블로그 후기</h2>
          <div>
            <Blog query={data.upso_name} />
          </div>
        </div>
        <ModalComponent />
      </section>
    </>
  );
}
