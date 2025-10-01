"use client";
import router, { useRouter } from "next/navigation";
import styles from "./CommuRegister.view.module.scss";
import cn from "classnames/bind";
import { Controller, Form, useForm } from "react-hook-form";
import { useModal } from "@/hooks/modal/useModal";
import { ArticleMutation } from "@/\bapi/mutation";
const cx = cn.bind(styles);

type FormType = {
  title: string;
  content: string;
  file: FileList | null;
};
export default function CommuWRegisterView() {
  const router = useRouter();
  const { showModal, hideModal, ModalComponent } = useModal();
  const form = useForm<FormType>({
    defaultValues: {
      title: "",
      content: "",
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
  const handleSave = () => {
    showModal({
      type: "default",
      title: "등록 완료",
      description: "등록을 완료하시겠습니까?",
      dimmedColor: "transparent",
      positive: {
        text: "확인",
        onClick: async () => {
          const res = await ArticleMutation.post({
            body: {
              author: "익명",
              author_id: "12",
              title: form.getValues("title"),
              content: form.getValues("content"),
            },
          });

          console.log(res);
          if (!res) {
            alert("등록에 실패했습니다.");
            return;
          }
          alert("등록이 완료되었습니다.");
          //router.push("/commu");
        },
      },
      negative: {
        text: "취소",
        onClick: () => {
          hideModal();
        },
      },
    });
  };
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
                    name="title"
                    className={cx("BoardBody")}
                    placeholder="제목을 입력해주세요"
                  ></input>
                );
              }}
            ></Controller>
          </div>

          <div className={cx("ContentWrapper")}>
            <div className={cx("ListTop")}>
              <div className={cx("FileWrapper")}>
                <ul
                  style={{
                    listStyle: "none",
                  }}
                >
                  <li>
                    <input
                      type="file"
                      accept="image/*"
                      width={100}
                      height={100}
                    />
                  </li>
                </ul>
              </div>

              <textarea name="content" className={cx("BoardContent")} />
            </div>

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
