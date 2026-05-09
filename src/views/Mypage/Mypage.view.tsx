"use client";
import styles from "./Mypage.view.module.scss";
import cn from "classnames/bind";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import PostListTable from "@/views/Commu/components/Table";
import { articleTableColumns } from "@/views/Commu/components/Table.columns";
import useConditionalState from "@/hooks/useConditionalState";
import { LINK_ROUTE } from "@/constants/link.constants";
import Button from "@/components/Button/Button";
import { AuthMutation } from "@/api/mutation";

const cx = cn.bind(styles);

interface MypageViewProps {
  data: Article.GetByAuthorId.Response;
  offset?: number;
  userName: string;
  userEmail: string;
}

export default function MypageView(props: MypageViewProps) {
  const { data, offset, userName, userEmail } = props;
  const { items, total } = data;

  const router = useRouter();
  const searchParams = useSearchParams();

  const currentLimit = 15;
  const handlePageChange = (newPage: number) => {
    const newOffset = (newPage - 1) * currentLimit;
    const params = new URLSearchParams(searchParams?.toString());
    params.set("offset", newOffset.toString());
    params.set("limit", currentLimit.toString());
    router.push(`?${params.toString()}`);
  };

  const [rowSelection, setRowSelection] = useConditionalState({}, {}, [offset]);

  const table = useReactTable({
    data: items,
    columns: articleTableColumns,
    enableRowSelection: true,
    state: { rowSelection },
    getCoreRowModel: getCoreRowModel(),
  });

  const goDetail = (id: string) => {
    router.push(LINK_ROUTE.ARTICLE.DETAIL.uri({ id }));
  };

  const handleLogout = async () => {
    await AuthMutation.logout({});
    router.push(LINK_ROUTE.MAIN.appDir);
    router.refresh();
  };

  return (
    <div className={cx("Wrapper")}>
      <h2>마이페이지</h2>

      <div className={cx("ProfileBox")}>
        <div className={cx("ProfileInfo")}>
          <span className={cx("UserName")}>{userName}</span>
          <span className={cx("UserEmail")}>{userEmail}</span>
        </div>
        <Button
          colorType="primary"
          variant="outlined"
          text="로그아웃"
          size="small"
          onClick={handleLogout}
        />
      </div>

      <div className={cx("SectionTitle")}>
        <h3>내가 쓴 글 ({total})</h3>
      </div>

      {items.length === 0 ? (
        <div className={cx("Empty")}>아직 작성한 글이 없습니다.</div>
      ) : (
        <PostListTable
          table={table}
          onClick={goDetail}
          total={total}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
