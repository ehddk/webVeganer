"use client";

import styles from "./Comment.module.scss";
import cn from "classnames/bind";
import { useState } from "react";
import Button from "../Button/Button";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import dayjs from "dayjs";
import { CommentMutation } from "@/\bapi/mutation";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/modal/useModal";
const cx = cn.bind(styles);
type CommentProps = {
  commentData: Comment.GetList.Response["items"];
  isAuthenticated: boolean;
  currentUserId?: string | null;
  currentUserName?: string | null;
};
type FormType = Comment.Post.Request["body"] | Comment.Put.Request["body"];
type CommentItemType = Comment.GetList.Response["items"][number];

export default function Comment(props: CommentProps) {
  const { commentData, isAuthenticated, currentUserId, currentUserName } =
    props;

  const params = useParams<{ id: string }>();

  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);
  const article_id = params?.id ?? "";

  const [openMenuId, setOpenMenuId] = useState<string | null>(null); // 열린 메뉴의 ID를 저장
  const [isEdit, setIsEdit] = useState<string | null>(null);
  const { showModal, hideModal, ModalComponent } = useModal();
  const router = useRouter();

  const form = useForm<FormType>({
    defaultValues: {
      content: "",
    },
  });

  const { control, setValue, handleSubmit } = form;

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

    // null이 아니면 수정모드 진입, 그래서 현재 폼 값에 내가 입력하고 있는 값이 들어가야함.
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
              id: id,
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
  const isUser = isAuthenticated && currentUserId;

  let inputValue = useWatch({
    name: "content",
    control,
  });

  const handleDelete = () => {
    setValue("content", "");
  };

  return (
    <FormProvider {...form}>
      <div className={cx("Wrapper")}>
        <h3>댓글</h3>
        <div className={cx("CommentWrapper")}>
          <div className={cx("Content")}>
            <div className={cx("InputArea")}>
              {isUser ? (
                <h4>{currentUserName}</h4>
              ) : (
                <p>로그인 후 이용 가능합니다.</p>
              )}
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <input
                    className={cx("Input")}
                    placeholder="댓글을 입력하세요."
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setComment(e.target.value);
                    }}
                    value={field.value}
                  />
                )}
              ></Controller>
              {inputValue && (
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
            {commentData.length > 0
              ? commentData.map((a, i) => (
                  <li key={i} className={cx("CommentItem")}>
                    <div className={cx("CommentBox")}>
                      <img
                        src="/user.svg"
                        alt="user"
                        className={cx("Profile")}
                      />
                      <div className={cx("UserBox")}>
                        <p className={cx("User")}>{a.user}</p>
                        <p className={cx("Date")}>
                          {dayjs(a.createdAt).format("YYYY.MM.DD HH:mm")}
                        </p>
                        <p>{a.content}</p>
                      </div>
                      {isUser && (
                        <img
                          src="/dot.svg"
                          width={20}
                          onClick={() => toggleMenu(a.id)}
                        />
                      )}
                      {isAuthenticated && openMenuId === a.id && (
                        <div className={cx("EditMenu")}>
                          <div className={cx("MenuIcon")}>
                            <img
                              src="/edit.svg"
                              width={15}
                              onClick={() => goEdit(a)}
                            />
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
                ))
              : "댓글 없음"}
          </ul>
        </div>
      </div>
    </FormProvider>
  );
}
