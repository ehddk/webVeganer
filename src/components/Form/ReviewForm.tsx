"use client";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ReviewMutation } from "@/\bapi/mutation";
import { useModal } from "@/hooks/modal/useModal";

import styles from "./ReviewForm.module.scss";
import cn from "classnames/bind";
import dayjs from "dayjs";
const cx = cn.bind(styles);

type FormType = Review.Post.Request["body"];
type ReviewItemType = Review.GetList.Response["items"][number];

type ReviewFormProps = {
  isAuthenticated: boolean;
  reviewData: Review.GetList.Response;
};

export default function ReviewForm(props: ReviewFormProps) {
  const { isAuthenticated, reviewData } = props;

  const { showModal, hideModal } = useModal();
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
  // 처음에 useFormContext를 사용하여 상위 RestaurantInfoView의 form 인스턴스에 접근하려했으나
  // useFormContext를 사용하면 'is Null'이라는 에러가 났음.
  // 난 직접 이 컴포넌트 안에서 useForm을 생성하고 상위 컴포넌트의 도움없이 독립적인 폼이니까
  // 현재 폼 내부에서 생성한 form(지역 변수) 변수를 사용해야 에러 해결!!

  const { control, handleSubmit, setValue } = form;

  // 별점 관련 로직
  const [isClicked, setIsClicked] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const array = [0, 1, 2, 3, 4];
  let clickedStarNum = isClicked.filter((ele) => true === ele).length;

  const score = (index: number, field: any) => {
    let star = [...isClicked];
    for (let i of array) {
      star[i] = i <= index ? true : false;
    }
    setIsClicked(star);
    field.onChange(index + 1);
  };

  const restaurant_id = params?.id ?? "";

  // 등록 로직
  const goRegister = handleSubmit(async (formData) => {
    // const restaurant_id = params?.id ?? "";

    if (!restaurant_id) {
      console.error("Restaurant ID is missing");
      return;
    }

    // rating 값이 0이면 (별점 선택 안 함) 경고
    if (formData.rating === 0) {
      showModal({
        type: "default",
        dimmedColor: "transparent",
        description: "별점을 선택해 주세요.",
        positive: {
          text: "확인",
          onClick: hideModal,
        },
        negative: undefined,
      });
      return;
    }

    const body: Review.Post.Request["body"] = {
      content: formData.content,
      rating: formData.rating,
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
        description: "리뷰 등록에 실패했습니다",
        positive: {
          text: "확인",
          onClick: hideModal,
        },
        negative: undefined,
      });
    }
    // 성공 시 리뷰 목록 새로고침
    setValue("content", "");
    setValue("rating", 0);
    setIsClicked([false, false, false, false, false]);
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

  const goEdit = (item: ReviewItemType) => {
    //isEdit 상태가 클릭한 댓글의 id와 같다면 null이 되서 수정모드 종료
    const nextEditId = isEdit === item.id ? null : item.id;
    setIsEdit(nextEditId);
    setOpenMenuId(null);

    // null이 아니면 수정모드 진입, 그래서 현재 폼 값에 내가 입력하고 있는 값이 들어가야함.
    if (nextEditId) {
      setValue("content", item.content);
      setValue("rating", item.rating);

      const star = array.map((i) => i < item.rating);
      setIsClicked(star);
    } else {
      //null이면 수정모드 종료되서 입력한 값 초기화.
      setValue("content", "");
      setValue("rating", 0);
      setIsClicked([false, false, false, false, false]);
    }
  };

  const handleReviewUpdate = form.handleSubmit(async (formData) => {
    const res = await ReviewMutation.put({
      body: {
        content: formData.content,
        rating: formData.rating,
      },
      path: {
        restaurant_id,
        id: "13",
      },
    });

    if ("message" in res) {
      alert("실패");
    }
    router.refresh();
  });
  return (
    <FormProvider {...form}>
      <div className={cx("ReviewWrapper")}>
        {reviewData.items && reviewData.items.length > 0 ? (
          reviewData.items.map((item) => {
            const isCurrentlyEditing = isEdit === item.id;
            return (
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

                        <div className={cx("ReviewContent")}>
                          {isCurrentlyEditing ? (
                            <>
                              <Controller
                                name="content"
                                control={control}
                                render={({ field }) => (
                                  <textarea
                                    className={cx("TextArea")}
                                    {...field}
                                    value={field.value}
                                  ></textarea>
                                )}
                              ></Controller>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "8px",
                                  justifyContent: "flex-end",
                                  marginTop: "10px",
                                }}
                              >
                                <Button
                                  size="small"
                                  colorType="primary"
                                  variant="contained"
                                  text="저장"
                                  onClick={handleReviewUpdate} // 수정 저장 함수 호출
                                  className={cx("SaveBtn")}
                                />
                                <Button
                                  size="small"
                                  colorType="primary"
                                  variant="outlined"
                                  text="취소"
                                  // goEdit 함수에 item 전체를 전달하여 수정 취소 로직도 처리
                                  onClick={() => goEdit(item)}
                                  className={cx("CancelBtn")}
                                />
                              </div>
                            </>
                          ) : (
                            item.content
                          )}
                        </div>
                      </div>
                      <img
                        src="/dot.svg"
                        width={20}
                        onClick={() => toggleMenu(item.id)}
                      />
                      {isAuthenticated && openMenuId === item.id && (
                        <div className={cx("EditMenu")}>
                          <div className={cx("MenuIcon")}>
                            <img
                              src="/edit.svg"
                              width={15}
                              onClick={() => goEdit(item)}
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
            );
          })
        ) : (
          // 2. 후기가 없을 경우
          <p>등록된 후기가 없습니다. 첫 후기를 남겨주세요!</p>
        )}
      </div>
      {isAuthenticated && isEdit === null ? (
        <div className={cx("WriteReviewForm")}>
          {" "}
          {/* SCSS에서 정의된 클래스 사용 */}
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
                        isClicked[index] ? "/fillStar.svg" : "/emptyStar.svg"
                      }
                      alt="starIcon"
                      style={{ cursor: "pointer" }}
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
        </div>
      ) : (
        !isAuthenticated && (
          <p className={cx("LoginRequired")}>
            후기 작성을 하려면 먼저{" "}
            <Link href="/login" style={{ color: "#288CD2" }}>
              로그인
            </Link>{" "}
            해주세요.
          </p>
        )
      )}
    </FormProvider>
  );
}
