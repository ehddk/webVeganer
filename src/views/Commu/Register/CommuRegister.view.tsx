"use client";
import router, { useRouter } from "next/navigation";
import styles from "./CommuRegister.view.module.scss";
import cn from "classnames/bind";
import { Controller, Form, useForm } from "react-hook-form";
import { useModal } from "@/hooks/modal/useModal";
import { ArticleMutation } from "@/\bapi/mutation";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { LINK_ROUTE } from "@/constants/link.constants";

const cx = cn.bind(styles);

type FormType = {
  title: string;
  content: any;
  file: FileList | null;
};
export default function CommuWRegisterView() {
  const router = useRouter();
  const { showModal, hideModal, ModalComponent } = useModal();
  const form = useForm<FormType>({
    defaultValues: {
      title: "",
      content: { ops: [] }, // Delta 초기값
      file: null,
    },
  });

  const handleCancel = () => {
    router.push("/Commu");
  };

  const { control } = form;

  // const handlePop = () => {
  //   if (title.trim() === "") {
  //     alert("제목을 입력해주세요 ");
  //   } else if (content.trim() === "") {
  //     alert("내용을 입력해주세요 ");
  //   } else {
  //     alert("등록완료했습니다.");
  //     //  router.push('/Commu')
  //   }
  // };

  const DynamicQuillEditor = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => (
      <div style={{ minHeight: "350px" }}>에디터를 로딩 중...</div>
    ),
  });

  const handleSave = form.handleSubmit((formData) => {
    showModal({
      type: "default",
      title: "등록 완료",
      description: "등록을 완료하시겠습니까?",
      dimmedColor: "transparent",
      positive: {
        text: "확인",
        onClick: async () => {
          const text = formData.content.ops
            .map((op: any) => op.insert)
            .join("")
            .trim();

          const res = await ArticleMutation.post({
            body: {
              author: "익명",
              author_id: "12",
              title: formData.title,
              content: text,
            },
          });
          console.log("bodu", res);

          if (!res || res.statusCode >= 400) {
            alert("등록에 실패했습니다. 서버 오류가 발생했습니다.");
            return;
          } else {
            showModal({
              type: "default",
              description: "등록 완료했습니다",
              dimmedColor: "transparent",
              positive: {
                text: "확인",
                onClick: () => {
                  hideModal();
                  router.push(LINK_ROUTE.ARTICLE.DEFAULT.uri);
                },
              },
            });
          }

          // router.push("/commu");
        },
      },
      negative: {
        text: "취소",
        onClick: () => {
          hideModal();
        },
      },
    });
  });

  const handleDelete = () => {
    router.push("/commu");
  };
  return (
    <>
      <div className={cx("Wrapper")}>
        <h2>글 작성</h2>

        <div className={cx("Board")}>
          <div className={cx("BoardTitle")}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => {
                return (
                  <input
                    {...field}
                    className={cx("BoardBody")}
                    placeholder="제목을 입력해주세요"
                  ></input>
                );
              }}
            ></Controller>
          </div>

          <div className={cx("ContentWrapper")}>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <DynamicQuillEditor
                  value={field.value}
                  onChange={(content, value, delta, editor) => {
                    field.onChange(editor.getContents());
                  }}
                  className={cx("ContentEditor")}
                />
              )}
            ></Controller>
            <div className={cx("Con")}>
              <button onClick={handleSave} className={cx("Btn")}>
                등록하기
              </button>
              <button className={cx("Btn")} onClick={handleDelete}>
                취소
              </button>
            </div>
          </div>
        </div>
        <ModalComponent />
      </div>
    </>
  );
}
