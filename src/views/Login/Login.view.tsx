"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
import styles from "./Login.view.module.scss";
import cn from "classnames/bind";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import React from "react";
const cx = cn.bind(styles);

type LoginInFormRef = {
  form: UseFormReturn<LogInFormType, any, undefined>;
};

interface LoginInfoProps {
  ref?: React.Ref<LoginInFormRef> | null;
}
interface LogInFormType {
  id: string;
  pwd: string;
}

function LoginView() {
  // let session= await getServerSession(authOptions)
  let router = useRouter();

  const form = useForm<LogInFormType>({
    mode: "all",
    defaultValues: {
      id: "",
      pwd: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const onSubmit = (data: LogInFormType) => {
    if (data.id === "" || data.pwd === "") {
      alert("아이디,비밀번호를 확인해주세요");
    } else {
      alert("로그인 성공");
      router.push("/");
    }
  };

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePwd = (e) => {
    setPwd(e.target.value);
  };

  return (
    <>
      {/* {session ? <p>{session.user.name}님</p> : <p>no</p>} */}
      <div className={cx("Wrapper")}>
        <h2>로그인</h2>
        <form className={cx("FormWrapper")} onSubmit={handleSubmit(onSubmit)}>
          <div className={cx("InputWrapper")}>
            <Controller
              control={form.control}
              name="id"
              render={({ field }) => (
                <input
                  type="text"
                  value={id}
                  onChange={handleId}
                  placeholder="아이디를 입력해주세요"
                  className={cx("Input")}
                ></input>
              )}
            ></Controller>

            <Controller
              control={form.control}
              name="pwd"
              render={({ field }) => (
                <input
                  type="password"
                  value={pwd}
                  onChange={handlePwd}
                  placeholder="비밀번호를 입력해주세요"
                  className={cx("Input")}
                ></input>
              )}
            />
          </div>

          <div className={cx("BtnWrapper")}>
            <button className={cx("Btn1")}>로그인</button>
            {/* <button className={cx("Btn1")}>소셜로그인</button> */}
            <button className={cx("Btn2")}>
              <Link
                href="/join"
                style={{ color: "black", textDecoration: "none" }}
              >
                회원가입
              </Link>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default LoginView;
