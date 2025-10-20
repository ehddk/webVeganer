"use client";
import styles from "./Commu.view.module.scss";
import cn from "classnames/bind";

import PostListTable from "../components/Table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { articleTableColumns } from "../components/Table.columns";
import useConditionalState from "@/hooks/useConditionalState";
import { LINK_ROUTE } from "@/constants/link.constants";
import Button from "@/components/Button/Button";

const cx = cn.bind(styles);

interface CommuViewProps {
  data: Article.GetList.Response;
  offset?: number;
}

export default function CommuView(props: CommuViewProps) {
  const { data, offset } = props;
  const { items, total } = data;

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentLimit = 15; // 하드코딩된 limit 값
  const handlePageChange = (newPage: number) => {
    // 새 offset 계산: (페이지 번호 - 1) * limit
    const newOffset = (newPage - 1) * currentLimit;

    // 3. URL 업데이트: router.push를 사용하여 offset 파라미터를 변경합니다.
    const params = new URLSearchParams(searchParams?.toString());
    params.set("offset", newOffset.toString());
    params.set("limit", currentLimit.toString()); // limit도 명시적으로 유지

    // URL을 새로운 쿼리 파라미터로 업데이트합니다.
    router.push(`?${params.toString()}`);

    // URL이 변경되면 Next.js는 새로운 데이터를 fetch하고 CommuView를 리렌더링합니다.
  };
  const [rowSelection, setRowSelection] = useConditionalState({}, {}, [
    offset,
    // sort,
  ]);

  const table = useReactTable({
    data: items,
    columns: articleTableColumns,
    enableRowSelection: true,
    state: {
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  const goRegister = () => {
    router.push("/commu/register");
  };
  const goDetail = (id: string) => {
    router.push(LINK_ROUTE.ARTICLE.DETAIL.uri({ id }));
  };
  return (
    <>
      <div className={cx("Wrapper")}>
        <div className={cx("TopSection")}>
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
        </div>

        <PostListTable
          table={table}
          onClick={goDetail}
          total={total}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
