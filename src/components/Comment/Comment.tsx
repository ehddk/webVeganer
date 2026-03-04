"use client";

import styles from "./Comment.module.scss";
import cn from "classnames/bind";
import { useCallback, useState } from "react";
import Button from "../Button/Button";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import dayjs from "dayjs";
import { CommentMutation } from "@/\bapi/mutation";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/modal/useModal";
import Link from "next/link";
const cx = cn.bind(styles);
type CommentProps = {
  commentData: Comment.GetList.Response["items"];
  session: {
    user: {
      id: string;
      email: string | undefined;
    } | null;
  };
  currentUserId?: string | null;
  currentUserName?: string | null;
};
type FormType = Comment.Post.Request["body"] | Comment.Put.Request["body"];
type CommentItemType = Comment.GetList.Response["items"][number];

export default function Comment(props: CommentProps) {
  const { commentData, session, currentUserId, currentUserName } = props;

  const params = useParams<{ id: string }>();

  const article_id = params?.id ?? "";
  const isMyComment = session && currentUserId === session.user?.id;
  const [openMenuId, setOpenMenuId] = useState<string | null>(null); // 열린 메뉴의 ID를 저장
  const [isEdit, setIsEdit] = useState<string | null>(null);
  const { showModal, hideModal, ModalComponent } = useModal();
  const router = useRouter();
  const form = useForm<FormType>({
    defaultValues: {
      content: "",
    },
  });

  const { control, setValue, handleSubmit, getValues } = form;

  const toggleMenu = (item: string) => {
    setOpenMenuId(openMenuId === item ? null : item);
  };

  const handleCommentSubmit = handleSubmit(async (formData) => {
    if (inputValue.trim() === "") {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    const res = await CommentMutation.post({
      body: {
        content: formData.content,
      },
      path: { article_id: article_id },
    });

    if (res && typeof res === "object" && "statusCode" in res) {
      showModal({
        type: "default",
        dimmedColor: "transparent",
        description: "댓글 등록에 실패했습니다",
        positive: {
          text: "확인",
          onClick: hideModal,
        },
        negative: undefined,
      });
    }

    setValue("content", "");
    router.refresh();
  });
  const goEdit = (item: CommentItemType) => {
    //isEdit 상태가 클릭한 댓글의 id와 같다면 null이 되서 수정모드 종료
    const nextEditId = isEdit === item.id ? null : item.id;
    setIsEdit(nextEditId);
    setOpenMenuId(null);

    // // null이 아니면 수정모드 진입, 그래서 현재 폼 값에 내가 입력하고 있는 값이 들어가야함.
    if (nextEditId) {
      setValue("content", item.content);
    } else {
      //null이면 수정모드 종료되서 입력한 값 초기화.
      setValue("content", "");
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

          const res = await CommentMutation.deleteComment({
            path: {
              article_id: article_id,
              id: String(id),
            },
          });
          console.log("resss", res);
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
  const isUser = session && currentUserId;

  let inputValue = useWatch({
    name: "content",
    control,
  });

  const handleDelete = () => {
    setValue("content", "");
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

      const currentContent = formData.content;

      try {
        // API 호출
        const res = await CommentMutation.put({
          body: {
            content: currentContent,
          },
          path: {
            article_id,
            id: String(id),
          },
        });

        const isErrorObject =
          typeof res === "object" && res !== null && "statusCode" in res;
        // 응답 처리 (204 No Content는 data: ""로 오므로 res가 객체인지 확인)
        if (isErrorObject && (res as Comment.Put.Response).statusCode >= 400) {
          // ... 오류 처리
          // 204가 아닌 다른 에러 응답일 경우
          showModal({
            type: "default",
            dimmedColor: "transparent",
            description: "댓글 수정에 실패했습니다 (서버 오류)",
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

              hideModal();
            },
          },
          negative: undefined,
        });

        // 데이터 새로고침 (이 부분이 렌더링을 유발하지만, 이번에는 안전하게 처리됨)
        router.refresh();
      } catch (error) {
        console.error("댓글 수정 중 오류:", error);
        showModal({
          type: "default",
          dimmedColor: "transparent",
          description: "댓글 수정 중 오류가 발생했습니다",
          positive: {
            text: "확인",
            onClick: hideModal,
          },
          negative: undefined,
        });
      }
    },
    [showModal, hideModal, setIsEdit, setValue, router]
  );

  return (
    <FormProvider {...form}>
      <div className={cx("Wrapper")}>
        <div className={cx("IconWrapper")}>
          <h3>댓글</h3>
          <div className={cx("IconBox")}>
            <img src="/comment.svg" className={cx("Icon")} />
            <p>{commentData.length}</p>
          </div>
        </div>

        <div className={cx("CommentWrapper")}>
          <div className={cx("Content", { isEdit: !!isEdit })}>
            <div className={cx("InputArea")}>
              {isUser && isEdit === null ? (
                <h4>{currentUserName}</h4>
              ) : (
                !isMyComment &&
                isEdit === null && (
                  <p className={cx("LoginRequired")}>
                    댓글 작성을 하려면 먼저{" "}
                    <Link href="/login" style={{ color: "#288CD2" }}>
                      로그인
                    </Link>{" "}
                    해주세요.
                  </p>
                )
              )}
              {/* 2. 등록 폼 Controller (isUser이고 isEdit이 아닐 때만 렌더링) */}
              {isUser && isEdit === null && (
                <div className={cx("WriteReviewForm")}>
                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => {
                      return (
                        <textarea
                          className={cx("Input")}
                          {...field}
                          // value={field.value}
                          placeholder="댓글을 입력해주세요"
                        ></textarea>
                      );
                    }}
                  ></Controller>
                </div>
              )}

              {inputValue && isEdit === null && (
                <div className={cx("ButtonArea")}>
                  <Button
                    colorType="primary"
                    variant="outlined"
                    text="취소"
                    onClick={handleDelete}
                    size="small"
                  ></Button>
                  <Button
                    colorType="primary"
                    variant="contained"
                    text="완료"
                    size="small"
                    onClick={handleCommentSubmit}
                  ></Button>
                </div>
              )}
            </div>
          </div>

          <ul className={cx("CommentList")}>
            {commentData.map((a, i) => {
              const isCurrentlyEditing = isEdit === a.id;
              const isMyComment = session?.user?.id === a.user_id;
              return (
                <li key={i} className={cx("CommentItem")}>
                  <div className={cx("CommentBox")}>
                    <img src="/user.svg" alt="user" className={cx("Profile")} />
                    <div className={cx("UserBox")}>
                      <p className={cx("User")}>{a.user}</p>
                      <p className={cx("Date")}>
                        {dayjs(a.createdAt).format("YYYY.MM.DD HH:mm")}
                      </p>
                      {isCurrentlyEditing ? (
                        <>
                          <Controller
                            name="content"
                            control={control}
                            render={({ field }) => (
                              <textarea
                                className={cx("EditInput")}
                                {...field}
                                value={field.value}
                              />
                            )}
                          ></Controller>
                          <div className={cx("EditButtonArea")}>
                            <Button
                              size="small"
                              colorType="primary"
                              variant="contained"
                              text="저장"
                              onClick={() => handleUpdate(a.id)}
                              className={cx("SaveBtn")}
                            />
                            <Button
                              size="small"
                              colorType="primary"
                              variant="outlined"
                              text="취소"
                              // goEdit 함수에 item 전체를 전달하여 수정 취소 로직도 처리
                              onClick={() => goEdit(a)}
                              className={cx("CancelBtn")}
                            />
                          </div>
                        </>
                      ) : (
                        <p>{a.content}</p>
                      )}
                    </div>
                    {isUser && isMyComment && (
                      <img
                        src="/dot.svg"
                        width={20}
                        onClick={() => toggleMenu(a.id)}
                      />
                    )}
                    {isMyComment && openMenuId === a.id && (
                      <div className={cx("EditMenu")}>
                        <div
                          className={cx("MenuIcon")}
                          onClick={() => goEdit(a)}
                        >
                          <img src="/edit.svg" width={15} />
                          <span>수정</span>
                        </div>
                        <div className={cx("MenuIcon")}>
                          <img
                            src="/trash.svg"
                            width={15}
                            onClick={() => goDelete(a.id)}
                          />
                          <span>삭제</span>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <ModalComponent />
        </div>
      </div>
    </FormProvider>
  );
}
