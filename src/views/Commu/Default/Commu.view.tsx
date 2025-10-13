"use client";
import styles from "./Commu.view.module.scss";
import cn from "classnames/bind";

import PostListTable from "../components/Table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { articleTableColumns } from "../components/Table.columns";
import useConditionalState from "@/hooks/useConditionalState";
import { LINK_ROUTE } from "@/constants/link.constants";
import Button from "@/components/Button/Button";

const cx = cn.bind(styles);

interface CommuViewProps {
  data: Article.GetList.Response;
  offset: number;
  //sort:SortOreder;
}

export default function CommuView(props: CommuViewProps) {
  const { data, offset } = props;

  const router = useRouter();
  const [rowSelection, setRowSelection] = useConditionalState({}, {}, [
    offset,
    // sort,
  ]);

  const table = useReactTable({
    data,
    columns: articleTableColumns,
    enableRowSelection: true,
    state: {
      rowSelection,
    },

    getCoreRowModel: getCoreRowModel(),
  });
  // const db = (await connectDB).db("vegan");
  // const result = await db.collection("post").find().toArray();
  // console.log(result);
  const goRegister = () => {
    router.push("/commu/register");
  };
  const goDetail = (id: string) => {
    router.push(LINK_ROUTE.ARTICLE.DETAIL.uri({ id }));
  };
  return (
    <>
      <div className={cx("Wrapper")}>
        <h2>커뮤니티</h2>
        <div className={cx("ButtonWrapper")}>
          <Button
            colorType="primary"
            variant="contained"
            text="글쓰기"
            size="small"
            className={cx("Btn")}
            onClick={goRegister}
          />
        </div>
        <PostListTable table={table} onClick={goDetail} />
      </div>
    </>
  );
}
