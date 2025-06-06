"use client";
import styles from "./Commu.view.module.scss";
import cn from "classnames/bind";
import Table from "@/components/Table/Table";
import Tables from "@/components/Tables/Table";
import PostListTable from "./components/Table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

const cx = cn.bind(styles);
export default function CommuView() {
  const router = useRouter();
  const table = useReactTable({
    data: [
      {
        title: "제목",
        content: "내용",
        writer: "작성자",
        createdAt: "2023-10-01",
        view: 100,
        category: "분류",
      },
    ],

    columns: [
      {
        accessorKey: "category",
        header: "분류",
      },
      {
        accessorKey: "title",
        header: "제목",
      },
      {
        accessorKey: "writer",
        header: "작성자",
      },
      {
        accessorKey: "createdAt",
        header: "작성일",
      },
      {
        accessorKey: "view",
        header: "조회수",
      },
    ],
    getCoreRowModel: getCoreRowModel(),
  });
  // const db = (await connectDB).db("vegan");
  // const result = await db.collection("post").find().toArray();
  // console.log(result);
  const goRegister = () => {
    router.push("/commu/Register");
  };
  return (
    <>
      <div className={cx("Wrapper")}>
        <h2>커뮤니티</h2>
        <button className={cx("RegisterButton")} onClick={goRegister}>
          글쓰기
        </button>
        <PostListTable table={table} />
      </div>
    </>
  );
}
