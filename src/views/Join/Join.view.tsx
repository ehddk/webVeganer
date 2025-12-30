"use client";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import styles from "./Join.view.module.scss";
import cn from "classnames/bind";
import Button from "@/components/Button/Button";
import { useModal } from "@/hooks/modal/useModal";
import { AuthMutation } from "@/\bapi/mutation";
import { LINK_ROUTE } from "@/constants/link.constants";
import { useRouter } from "next/navigation";
const cx = cn.bind(styles);

type FormType = Auth.Post.Request["body"] & { passwordConfirm: string };
export default function JoinView() {
  const { showModal, hideModal, ModalComponent } = useModal();
  const router = useRouter();
  const form = useForm<FormType>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const goRegister = form.handleSubmit((formData) => {
    showModal({
      type: "default",
      dimmedColor: "transparent",
      title: "가입 신청",
      description: "입력하신 정보로 가입 신청하시겠습니까?",
      positive: {
        text: "확인",
        onClick: async () => {
          const body = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };

          const res: any = await AuthMutation.post({
            body: body,
          });

          if (res && (res.details || res.message)) {
            hideModal();

            const errorMessage =
              res.details ||
              res.message ||
              "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

            // 가입 실패 모달 표시
            showModal({
              type: "default",
              title: "가입 실패",
              description: `${errorMessage}`,
              positive: {
                text: "확인",
                onClick: () => {
                  hideModal();
                },
              },
              negative: undefined,
            });
          } else {
            // 2. 성공 응답 확인 및 모달 표시
            showModal({
              type: "default",
              title: "회원가입 완료 ",
              dimmedColor: "transparent",
              description: "회원가입이 되었습니다. 로그인 해주세요",
              positive: {
                text: "확인",
                onClick: () => {
                  router.push(LINK_ROUTE.MAIN.appDir);
                  hideModal();
                },
              },
              negative: undefined,
            });
          }
        },
      },
      negative: {
        text: "취소",
      },
    });
  });

  return (
    <>
      <div className={cx("Wrapper")}>
        <h2>회원가입</h2>

        <FormProvider {...form}>
          <div className={cx("FormContainer")}>
            <Controller
              control={form.control}
              name={"email"}
              render={({ field }) => {
                return (
                  <div className={cx("Item")}>
                    <label className={cx("Label")} htmlFor={field.name}>
                      이메일
                    </label>
                    <input
                      className={cx("Input")}
                      name={field.name}
                      type={"text"}
                      placeholder={"이메일을 입력해 주세요"}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </div>
                );
              }}
            ></Controller>
            <Controller
              control={form.control}
              name={"name"}
              render={({ field }) => {
                return (
                  <div className={cx("Item")}>
                    <label className={cx("Label")} htmlFor={field.name}>
                      닉네임
                    </label>
                    <input
                      className={cx("Input")}
                      name={field.name}
                      type={"text"}
                      placeholder={"이메일을 입력해 주세요"}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </div>
                );
              }}
            ></Controller>
            <Controller
              control={form.control}
              name={"password"}
              render={({ field }) => {
                return (
                  <div className={cx("Item")}>
                    <label className={cx("Label")} htmlFor={field.name}>
                      비밀번호
                    </label>
                    <input
                      className={cx("Input")}
                      name={field.name}
                      type={"password"}
                      placeholder={"비밀번호를 입력해 주세요"}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </div>
                );
              }}
            ></Controller>
            <Controller
              control={form.control}
              name={"passwordConfirm"}
              render={({ field }) => {
                return (
                  <div className={cx("Item")}>
                    <label className={cx("Label")} htmlFor={field.name}>
                      비밀번호확인
                    </label>
                    <input
                      className={cx("Input")}
                      name={field.name}
                      type={"password"}
                      placeholder={"비밀번호를 한번 더 입력해 주세요"}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </div>
                );
              }}
            ></Controller>
          </div>

          <div className={cx("BottomBtns")}>
            <Button
              text="취소"
              colorType="inherit"
              variant="contained"
              size="medium"
              onClick={() => router.push(LINK_ROUTE.MAIN.appDir)}
            ></Button>
            <Button
              text="완료"
              colorType="primary"
              variant="contained"
              size="medium"
              onClick={goRegister}
            ></Button>
          </div>
        </FormProvider>

        <ModalComponent />
      </div>
    </>
  );
}
