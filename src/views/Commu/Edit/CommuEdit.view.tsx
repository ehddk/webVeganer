"use client";
import Link from "next/link";
import styles from "./CommuEdit.view.module.scss";
import cn from "classnames/bind";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Button/Button";
import { LINK_ROUTE } from "@/constants/link.constants";
import { useRouter } from "next/navigation";

import "react-quill/dist/quill.snow.css";

import dynamic from "next/dynamic";

import { useModal } from "@/hooks/modal/useModal";
import Divider from "@/components/Divider/Divider";

const cx = cn.bind(styles);

type CommuEditViewProps = {
  data: Article.GetOne.Response;
};
type FormType = Article.Put.Body;
export default function CommuEditView(props: CommuEditViewProps) {
  const { data } = props;
  const router = useRouter();
  const { showModal, hideModal, ModalComponent } = useModal();

  const form = useForm<FormType>({
    defaultValues: {
      title: data.title,
      content: data.content,
    },
  });
  const { control } = form;
  const DynamicQuillEditor = dynamic(() => import("react-quill-new"), {
    ssr: false, //서버에서 렌더링하지 않고 클라이언트에서만 컴포넌트를 마운트
    loading: () => (
      //컴포넌트가 로드되는 동안 보여줄 fallback UI (선택적)
      <div style={{ minHeight: "350px" }}>에디터를 로딩 중...</div>
    ),
  });

  const handleRegister = form.handleSubmit((formData) => {
    showModal({
      type: "default",
      title: "저장",
      dimmedColor: "transparent",
      description: "작성하신 내용으로 수정하시겠습니까?",
      positive: {
        text: "확인",
        onClick: async () => {
          const removeHtmlTags = (html: string): string => {
            // 1. 임시 DOM 요소를 생성하여 HTML을 파싱.
            // DOMParser는 클라이언트(브라우저) 환경에서 사용 가능
            const doc = new DOMParser().parseFromString(html, "text/html");

            const text = doc.body.textContent || "";

            // 3. 불필요한 공백/개행 문자를 정리하여 반환.
            return text.trim();
          };

          const plainContent = removeHtmlTags(formData.content);
          const body = {
            title: formData.title,
            content: plainContent,
          };
          console.log("bbbb", body);
          hideModal();
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
  return (
    <div className={cx("Wrapper")}>
      <FormProvider {...form}>
        <div className={cx("ContentWrapper")}>
          <div className={cx("TitleWrapper")}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  className={cx("Input")}
                  {...field}
                  type="text"
                  placeholder="제목을 입력하세요"
                  value={field.value}
                ></input>
              )}
            />
          </div>
          <Divider />
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <DynamicQuillEditor
                {...field}
                // value={field.value}
                onChange={field.onChange}
                className={cx("ContentEditor")}
              />
            )}
          ></Controller>
        </div>

        <div className={cx("BtnGroup")}>
          <Button
            size="small"
            text="취소"
            colorType="primary"
            variant="contained"
            onClick={() =>
              router.push(LINK_ROUTE.ARTICLE.DETAIL.uri({ id: data.id }))
            }
          />
          <Button
            size="small"
            text="저장"
            colorType="primary"
            variant="outlined"
            onClick={handleRegister}
          />
        </div>
      </FormProvider>
      <ModalComponent />
    </div>
  );
}
