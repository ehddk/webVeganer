"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { STRING_LITERAL_DROP_BUNDLE } from "next/dist/shared/lib/constants";
import { signUp } from "../../utils/signUp";
import styles from "./Join.view.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);

type JoinFormType = {
  email: string;
  id: string;
  password: string;
  passwordConfirm: string;
  terms: string[];
};
export default function JoinView() {
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");
  const form = useForm<JoinFormType>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      terms: [],
    },
  });

  const handleSubmit = async (data: JoinFormType) => {
    const { email, password } = data;
    // console.log('data',data)
    try {
      const result = await signUp(email, password);
      // console.log('resu',result)
      setSuccess(result.message);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className={cx("Wrapper")}>
        <h2>회원가입</h2>
        <form className={cx("Form")} onSubmit={form.handleSubmit(handleSubmit)}>
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
                      placeholder={"이메일"}
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
                      placeholder={"비밀번호"}
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
                      placeholder={"비밀번호확인"}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </div>
                );
              }}
            ></Controller>
          </div>

          <div className={cx("BottomBtns")}>
            <button className={cx("CancelButton")} type="submit">
              취소
            </button>
            <button className={cx("Button")} type="submit">
              완료
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
