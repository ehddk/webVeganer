"use client";
import React, { useCallback, useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ReviewMutation } from "@/\bapi/mutation";
import { useModal } from "@/hooks/modal/useModal";
import { FaImage } from "react-icons/fa";
import styles from "./ReviewForm.module.scss";
import cn from "classnames/bind";
import dayjs from "dayjs";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
const cx = cn.bind(styles);

type FormType = Review.Post.Request["body"] | Review.Put.Request["body"];
type ReviewItemType = Review.GetList.Response["items"][number];

type ReviewFormProps = {
  reviewData: Review.GetList.Response;
  currentUserId?: string | null;
  session: {
    user: {
      id: string;
      email: string | undefined;
    } | null;
  };
};

export default function ReviewForm(props: ReviewFormProps) {
  const { reviewData, currentUserId, session } = props;

  const { showModal, hideModal, ModalComponent } = useModal();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null); // 열린 메뉴의 ID를 저장
  const [isEdit, setIsEdit] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
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

  const { control, handleSubmit, setValue, getValues } = form;

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
    const imageUrls: string[] = [];
    for (const file of imageFiles) {
      const extenstion = file.name.split(".").pop();
      const fileName = `${Date.now()}_${extenstion}`;
      const { error } = await supabase.storage //storage.upload()가 반환하는 객체가 {data,error} 형태임.error만 구조분해한이유 :업로드 후 url은 getPublicUrl()로 따로 가져오는 게 더 편해서 .
        .from("review-images")
        .upload(fileName, file);

      if (!error) {
        const {
          data: { publicUrl },
        } = supabase.storage.from("review-images").getPublicUrl(fileName);
        imageUrls.push(publicUrl);
      }
    }
    const body: Review.Post.Request["body"] = {
      content: formData.content,
      rating: formData.rating ?? 0,
      image: imageUrls,
    };

    const res = await ReviewMutation.post({
      body,
      path: {
        restaurant_id,
      },
    });
    if (res && typeof res === "object" && "statusCode" in res) {
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
    setValue("image", []);
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

  const goDelete = (id: string) => {
    showModal({
      type: "default",
      dimmedColor: "transparent",
      description: "정말 삭제하시겠습니까?\n삭제된 댓글은 복구할 수 없습니다.",
      positive: {
        text: "확인",
        onClick: async () => {
          hideModal();

          const res = await ReviewMutation.deleteReview({
            path: {
              restaurant_id,
              id: String(id),
            },
          });
          const isErrorObject =
            typeof res === "object" && res !== null && "statusCode" in res;

          if (
            isErrorObject &&
            (res as Review.DeleteReview.Response).statusCode >= 400
          ) {
            showModal({
              type: "default",
              dimmedColor: "transparent",
              description: "리뷰 삭제에 실패했습니다",
              positive: {
                text: "확인",
                onClick: hideModal,
              },
              negative: undefined,
            });
            return;
          }
          showModal({
            type: "default",
            dimmedColor: "transparent",
            description: "삭제되었습니다",
            positive: {
              text: "확인",
              onClick: () => {
                hideModal();
                router.refresh();
              },
            },
            negative: undefined,
          });
        },
      },
      negative: undefined,
    });
  };

  const handleUpdate = useCallback(
    async (id: string) => {
      if (!currentUserId || !session) {
        showModal({
          type: "default",
          dimmedColor: "transparent",
          description: "로그인 후 리뷰를 수정할 수 있습니다.",
          positive: { text: "확인", onClick: hideModal },
        });
        return;
      }
      // 폼에서 현재 입력된 값을 직접 가져옵니다.
      const formData = getValues();
      const currentRating = formData.rating;
      const currentContent = formData.content;

      // 별점 체크
      if (currentRating === 0) {
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

      try {
        // API 호출
        const res = await ReviewMutation.put({
          body: {
            content: currentContent,
            rating: currentRating,
          },
          path: {
            restaurant_id,
            id: String(id),
          },
        });

        const isErrorObject =
          typeof res === "object" && res !== null && "statusCode" in res;
        // 응답 처리 (204 No Content는 data: ""로 오므로 res가 객체인지 확인)
        if (isErrorObject && (res as Review.Put.Response).statusCode >= 400) {
          // ... 오류 처리
          // 204가 아닌 다른 에러 응답일 경우
          showModal({
            type: "default",
            dimmedColor: "transparent",
            description: "리뷰 수정에 실패했습니다 (서버 오류)",
            positive: {
              text: "확인",
              onClick: hideModal,
            },
            negative: undefined,
          });
          return;
        }

        // 성공 모달
        showModal({
          type: "default",
          dimmedColor: "transparent",
          description: "수정되었습니다",
          positive: {
            text: "확인",
            onClick: () => {
              // 수정 모드 종료 및 폼 초기화
              setIsEdit(null);
              setValue("content", "");
              setValue("rating", 0);
              setIsClicked([false, false, false, false, false]);
              hideModal();
            },
          },
          negative: undefined,
        });

        // 데이터 새로고침 (이 부분이 렌더링을 유발하지만, 이번에는 안전하게 처리됨)
        router.refresh();
      } catch (error) {
        console.error("리뷰 수정 중 오류:", error);
        showModal({
          type: "default",
          dimmedColor: "transparent",
          description: "리뷰 수정 중 오류가 발생했습니다",
          positive: {
            text: "확인",
            onClick: hideModal,
          },
          negative: undefined,
        });
      }
    },
    [
      getValues,
      restaurant_id,
      showModal,
      hideModal,
      setIsEdit,
      setValue,
      setIsClicked,
      router,
    ]
  );
  // 미리보기 데이터
  const [previewFile, setPreviewFile] = useState<string[]>([]);
  const handleImageClick = () => {
    imageRef.current?.click();
  };
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.currentTarget.files;
    if (!imageFile || imageFile.length === 0) return;
    setImageFiles(Array.from(imageFile)); // ← 추가

    //setPreviewFile([]); //새 데이터 들어오기 전에 명시적으로 비운다. 굳이 이 코드는 없어도 이전새 파일로 교체되긴 함.

    const imageUrls: string[] = [];

    for (let i = 0; i < imageFile.length; i++) {
      const file = imageFile[i];
      const reader = new FileReader();
      //file으ㄹ base64로 전환
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (reader.result) {
          imageUrls.push(reader.result as string);
          if (imageUrls.length === imageFile.length) {
            setPreviewFile([...imageUrls]);
          }
        }
      };
    }
  };

  const handleDelete = (index: number) => {
    setPreviewFile((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <FormProvider {...form}>
      <div className={cx("ReviewWrapper")}>
        {reviewData.items && reviewData.items.length > 0 ? (
          reviewData.items.map((item) => {
            const isCurrentlyEditing = isEdit === item.id;

            const isAuthor =
              session &&
              currentUserId &&
              String(item.user_id) === currentUserId;

            return (
              <ul key={item.id}>
                <li>
                  <div className={cx("ProfileWrapper")}>
                    <img src="/user.svg" className={cx("Profile")} />{" "}
                    <div className={cx("Content")}>
                      <div className={cx("ProfileContent")}>
                        <div>
                          <p className={cx("User")}>{item.user}</p>
                          <div className={cx("Rating")}>
                            {renderStars(item.rating)}

                            <p className={cx("Date")}>
                              {dayjs(item.createdAt.slice(0, 10)).format(
                                "YYYY.MM.DD"
                              )}
                            </p>
                          </div>
                        </div>
                        {item.image && (
                          <div className={cx("ImageWrapper")}>
                            {item.image.map((src, index) => (
                              <div key={index}>
                                <Image
                                  className={cx("ReviewImage")}
                                  src={src}
                                  alt="review image"
                                  objectFit="contain"
                                  width={150}
                                  height={150}
                                />
                              </div>
                            ))}
                          </div>
                        )}

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
                                  onClick={() => handleUpdate(item.id)}
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
                      {isAuthor && (
                        <img
                          src="/dot.svg"
                          width={20}
                          onClick={() => toggleMenu(item.id)}
                        />
                      )}

                      {session && openMenuId === item.id && (
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
                            <img
                              src="/trash.svg"
                              width={15}
                              onClick={() => goDelete(item.id)}
                            />
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
      {session && isEdit === null ? (
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
          <div className={cx("CommentArea")}>
            <Controller
              name="content"
              control={control}
              render={({ field }) => {
                return (
                  <div className={cx("InputWrapper")}>
                    <textarea
                      className={cx("ReviewText")}
                      {...field}
                      value={field.value}
                      placeholder="내용을 입력해주세요"
                    ></textarea>
                  </div>
                );
              }}
            ></Controller>
            {previewFile.length > 0 && (
              <div className={cx("PreivewWrapper")}>
                {previewFile.map((src, index) => (
                  <div key={index} className={cx("PreviewItem")}>
                    <Image
                      src={src}
                      alt={`preview-${index}`}
                      width={100}
                      height={100}
                    ></Image>{" "}
                    <button
                      className={cx("DeleteBtn")}
                      onClick={() => handleDelete(index)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className={cx("BtnWrapper")}>
              <input
                className={cx("ImageInput")}
                type="file"
                name="image"
                multiple
                ref={imageRef}
                onChange={uploadImage}
              />
              <button onClick={handleImageClick} className={cx("ImageBtn")}>
                <FaImage />
              </button>

              <Button
                colorType="primary"
                variant="outlined"
                text="등록"
                onClick={goRegister}
                className={cx("Btn")}
              ></Button>
            </div>
          </div>
        </div>
      ) : (
        !session && (
          <p className={cx("LoginRequired")}>
            후기 작성을 하려면 먼저{" "}
            <Link href="/login" style={{ color: "#288CD2" }}>
              로그인
            </Link>{" "}
            해주세요.
          </p>
        )
      )}
      <ModalComponent />
    </FormProvider>
  );
}
