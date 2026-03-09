"use client";
import styles from "./CommuEdit.view.module.scss";
import cn from "classnames/bind";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Button from "@/components/Button/Button";
import { LINK_ROUTE } from "@/constants/link.constants";
import { useParams, useRouter } from "next/navigation";

import "react-quill/dist/quill.snow.css";

import dynamic from "next/dynamic";

import { useModal } from "@/hooks/modal/useModal";
import Divider from "@/components/Divider/Divider";
import { ArticleMutation } from "@/api/mutation";

const cx = cn.bind(styles);

type CommuEditViewProps = {
  data: Article.GetOne.Response;
};
type FormType = Article.Put.Body;
export default function CommuEditView(props: CommuEditViewProps) {
  const { data } = props;
  const router = useRouter();
  const { showModal, hideModal, ModalComponent } = useModal();
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const getDeltaContent = () => {
    const content = data.content;
    if (typeof content === "object" && content !== null && "ops" in content) {
      return content;
    }
    if (typeof content === "string") {
      try {
        return JSON.parse(content);
      } catch {
        return { ops: [{ insert: content }] };
      }
    }
  };
  const form = useForm<FormType>({
    defaultValues: {
      title: data.title,
      content:
        typeof data.content === "string"
          ? data.content
          : JSON.stringify(data.content),
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

          //const plainContent = removeHtmlTags(formData.content);

          if (!id) {
            showModal({
              type: "default",
              description: "잘못된 요청입니다. 다시 시도해주세요.",
              dimmedColor: "transparent",
              positive: {
                text: "확인",
                onClick: () => {
                  hideModal();
                },
              },
            });
            return;
          }

          const res = await ArticleMutation.put({
            path: { id },
            body: {
              title: formData.title,
              content: formData.content,
            },
          });

          if (res.statusCode >= 400) {
            showModal({
              type: "default",
              description: "수정에 실패했습니다.\n다시 시도해주세요.",
              dimmedColor: "transparent",
              positive: {
                text: "확인",
                onClick: () => {
                  hideModal();
                },
              },
            });
            return;
          }
          hideModal();
          router.push(LINK_ROUTE.ARTICLE.DEFAULT.appDir);
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
                //}
                onChange={(content) => {
                  // Quill은 onChange 시 HTML 문자열을  인자로 줌.
                  // onChange={field.onChange}로 했을때 첫번째 인자인
                  // content 문자열을 제대로 처리하지 못하거나 불필요한
                  // 이벤트 객체 정보가 들어가면서 꼬일 수 있고 렌더링 시 즉시 실행됨.
                  // 화살표 함수로 감싸면 onChange에 함수를 전달하고,사용자가 에디터에서 입력할때마다
                  // Quill이 content를 넘겨주고 그 값을 form에 정상 전달함.
                  field.onChange(content);
                }}
                className={cx("ContentEditor")}
              />
            )}
          ></Controller>
        </div>

        <div className={cx("BtnGroup")}>
          <Button
            size="large"
            text="취소"
            colorType="primary"
            variant="contained"
            onClick={() =>
              router.push(LINK_ROUTE.ARTICLE.DETAIL.uri({ id: data.id }))
            }
          />
          <Button
            size="large"
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
