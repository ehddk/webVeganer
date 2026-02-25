"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
import styles from "./Login.view.module.scss";
import cn from "classnames/bind";
import {
  Controller,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import React from "react";
import Button from "@/components/Button/Button";
import { useModal } from "@/hooks/modal/useModal";
import { AuthMutation } from "@/\bapi/mutation";
import { LINK_ROUTE } from "@/constants/link.constants";
import { createClient } from "@/utils/client";
const cx = cn.bind(styles);

type LogInFormType = Auth.Post.Request["body"];

function LoginView() {
  const { showModal, hideModal, ModalComponent } = useModal();
  const router = useRouter();

  const form = useForm<LogInFormType>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { control } = form;

  const goRegister = form.handleSubmit(async (formData) => {
    const body = {
      email: formData.email,
      password: formData.password,
    };
    const res = await AuthMutation.login({
      body: body,
    });
    if ("message" in res) {
      showModal({
        type: "default",
        title: "로그인 실패",
        description: "로그인에 실패했습니다.\n다시 시도해주세요",
        positive: {
          text: "확인",
          onClick: hideModal,
        },
        negative: undefined,
      });
    } else {
      hideModal();
      router.push(LINK_ROUTE.MAIN.appDir);
      router.refresh();
    }
  });

  const supabase = createClient();
  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <FormProvider {...form}>
      <div className={cx("Wrapper")}>
        <h2>로그인</h2>

        <div className={cx("InputWrapper")}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <input
                type="text"
                value={field.value}
                onChange={field.onChange}
                placeholder="아이디를 입력해주세요"
                className={cx("Input")}
              ></input>
            )}
          ></Controller>

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <input
                type="password"
                value={field.value}
                onChange={field.onChange}
                placeholder="비밀번호를 입력해주세요"
                className={cx("Input")}
              ></input>
            )}
          />
        </div>

        <div className={cx("BtnWrapper")}>
          <Button
            colorType="primary"
            variant="contained"
            text="       로그인"
            onClick={handleGithubLogin}
          ></Button>

          <Button
            colorType="primary"
            variant="outlined"
            text="회원가입"
            onClick={() => {
              router.push(LINK_ROUTE.JOIN.appDir);
            }}
          ></Button>
        </div>
      </div>
      <ModalComponent />
    </FormProvider>
  );
}
export default LoginView;
