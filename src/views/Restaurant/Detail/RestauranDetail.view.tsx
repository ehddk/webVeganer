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
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null); // 열린 메뉴의 ID를 저장
  const [isEdit, setIsEdit] = useState<string | null>(null);
  const form = useForm<FormType>({
    defaultValues: {
      content: "",
      rating: 0,
    },
  });
  const firstImageUrl = data.initialBlogImages?.[0]; // 첫 번째 이미지 (인덱스 0)
  const secondImageUrl = data.initialBlogImages?.[1];

  const { control } = form;

  const [isClicked, setIsClicked] = React.useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const array = [0, 1, 2, 3, 4];

  //화면에 표시할 별점 갯수
  let clickedStarNum = isClicked.filter((ele) => true === ele).length;

  //별점 반영
  const score = (index: number, field: any) => {
    let star = [...isClicked];
    for (let i of array) {
      star[i] = i <= index ? true : false;
    }
    setIsClicked(star);
    field.onChange(index + 1);
  };

  const goRegister = form.handleSubmit(async (formData) => {
    const restaurant_id = params?.id ?? "";

    if (!restaurant_id) {
      console.error("Restaurant ID is missing");
      return;
    }
    const body = {
      ...(formData as Review.Post.Request["body"]),
    };
    const res = await ReviewMutation.post({
      body,
      path: {
        restaurant_id,
      },
    });
    if ("message" in res) {
      showModal({
        type: "default",
        dimmedColor: "transparent",
        description: "등록에 실패했습니다",
        positive: {
          text: "확인",
          onClick: hideModal,
        },

        negative: undefined,
      });
    }
    router.refresh();
  });

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <img
          key={`review-star-${i}`}
          src={i < rating ? "/fillStar.svg" : "/emptyStar.svg"}
          alt={`${rating}`}
          width={15}
        />
      );
    }
    return (
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}
      >
        {stars}
      </div>
    );
  };

  const toggleMenu = (item: string) => {
    setOpenMenuId(openMenuId === item ? null : item);
  };

  const goEdit = (item: string) => {
    setIsEdit(isEdit === item ? null : item);
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

        <div className={cx("Item")}>
          <h2>{`리뷰 및 평가 (${reviewData.total})`}</h2>
          <ReviewForm
            isAuthenticated={!!isAuthenticated}
            reviewData={reviewData}
          />
          {/* <div className={cx("ReviewWrapper")}>
            {reviewData.items && reviewData.items.length > 0 ? (
              reviewData.items.map((item) => (
                <ul key={item.id}>
                  <li>
                    <div className={cx("ProfileWrapper")}>
                      <img src="/user.svg" className={cx("Profile")} />{" "}
                      <div className={cx("Content")}>
                        <div className={cx("ProfileContent")}>
                          <div>
                            <p className={cx("User")}>{item.user_id}</p>
                            {renderStars(item.rating)}

                            <p className={cx("Date")}>
                              {dayjs(item.createdAt.slice(0, 10)).format(
                                "YYYY.MM.DD"
                              )}
                            </p>
                          </div>

                          <p className={cx("ReviewContent")}>
                            {isEdit ? (
                              <div>
                                <textarea
                                  {...field}
                                  control={control}
                                  value={field.value}
                                ></textarea>
                              </div>
                            ) : (
                              item.content
                            )}
                          </p>
                        </div>
                        <img
                          src="/dot.svg"
                          width={20}
                          onClick={() => toggleMenu(item.id)}
                        />
                        {openMenuId === item.id && (
                          <div className={cx("EditMenu")}>
                            <div className={cx("MenuIcon")}>
                              <img
                                src="/edit.svg"
                                width={15}
                                onClick={() => goEdit(item.id)}
                              />
                              <span>수정</span>
                            </div>
                            <div className={cx("MenuIcon")}>
                              <img src="/trash.svg" width={15} />
                              <span>삭제</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                </ul>
              ))
            ) : (
              // 2. 후기가 없을 경우
              <p>등록된 후기가 없습니다. 첫 후기를 남겨주세요!</p>
            )}
          </div>
          <FormProvider {...form}>
            {isAuthenticated ? (
              <>
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => {
                    return (
                      <div className={cx("StarWrapper")}>
                        {array.map((index) => (
                          <img
                            key={index}
                            onClick={() => score(index, field)}
                            width={20}
                            src={
                              isClicked[index]
                                ? "/fillStar.svg"
                                : "/emptyStar.svg"
                            }
                            alt="starIcon"
                          />
                        ))}
                        <p> {clickedStarNum}/5</p>
                      </div>
                    );
                  }}
                ></Controller>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => {
                    return (
                      <textarea
                        className={cx("ReviewText")}
                        {...field}
                        value={field.value}
                        placeholder="내용을 입력해주세요"
                      ></textarea>
                    );
                  }}
                ></Controller>
                <Button
                  size="small"
                  colorType="primary"
                  variant="contained"
                  text="등록"
                  onClick={goRegister}
                  className={cx("Btn")}
                ></Button>
              </>
            ) : (
              <p className={cx("LoginRequired")}>
                후기 작성을 하려면 먼저{" "}
                <Link href="/login" style={{ color: "#288CD2" }}>
                  로그인
                </Link>{" "}
                해주세요.
              </p>
            )}
          </FormProvider> */}
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
