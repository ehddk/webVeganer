"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";

import styles from "./RestaurantDetail.view.module.scss";
import cn from "classnames/bind";
import LeafletMap from "@/app/services/LeafletMap";
import Blog from "../../../components/Blog/Blog";
import { Suspense } from "react";
import Item from "@/components/Item/Item";
import { RestaurantImage } from "@/components/RestaurantImage/RestaurantImage";
import { useModal } from "@/hooks/modal/useModal";

import ReviewForm from "@/components/Form/ReviewForm";
import { ScrapMutation } from "@/api/mutation";

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
  const router = useRouter();
  const firstImageUrl = data.image_url?.[0]; // 첫 번째 이미지 (인덱스 0)
  const secondImageUrl = data.image_url?.[1];
  const params = useParams<{ id: string }>();

  const id = params?.id;

  // 낙관적 업데이트: 서버 상태와 별개로 즉시 UI 반영
  const [isScrapped, setIsScrapped] = React.useState<boolean>(
    data.scrapped_by_me ?? false
  );
  const [isScrapPending, startScrapTransition] = React.useTransition();

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

  const handleScrap = () => {
    if (!session) {
      showModal({
        type: "default",
        dimmedColor: "transparent",
        description: "로그인 후 스크랩할 수 있습니다.",
        positive: { text: "확인", onClick: hideModal },
        negative: undefined,
      });
      return;
    }

    // 낙관적 업데이트
    const prev = isScrapped;
    setIsScrapped(!prev);

    startScrapTransition(async () => {
      const res = await ScrapMutation.toggle({
        path: { restaurant_id: String(id) },
      });

      // 에러 응답이면 롤백
      if (res && typeof res === "object" && "statusCode" in res) {
        setIsScrapped(prev);
        showModal({
          type: "default",
          dimmedColor: "transparent",
          description: "스크랩 처리에 실패했습니다.",
          positive: { text: "확인", onClick: hideModal },
          negative: undefined,
        });
        return;
      }

      // 서버 응답으로 최종 상태 확정
      setIsScrapped(res.scrapped);
      router.refresh();
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
            <li
              className={cx("Util", { disabled: isScrapPending })}
              onClick={handleScrap}
            >
              <img
                src={isScrapped ? "/bookmark-filled.svg" : "/bookmark.svg"}
                width={15}
                className={cx("LikeBtn")}
                alt="스크랩"
              />
              <p className={cx("Text")}>{isScrapped ? "스크랩됨" : "스크랩"}</p>
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
