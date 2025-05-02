import { flexRender, Table as TableType } from "@tanstack/react-table";
import cn from "classnames/bind";
import styles from "./Table.module.scss";

import Tables from "@/components/Tables/Table";

const cx = cn.bind(styles);

type PostListResponse = {
  id?: string;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
  view: number;
  category: string;
};

type CommunityTableProps = {
  table: TableType<PostListResponse>;
};

const PostListTable = (props: CommunityTableProps) => {
  const { table } = props;

  // Add a check to make sure table exists before trying to use it
  if (!table) {
    return (
      <div className={cx("Wrapper")}>
        <div className={cx("EmptyTable")}>
          <p
            style={{
              textAlign: "center",
              color: "#919EAB",
              fontSize: 14,
              lineHeight: "24px",
            }}
          >
            테이블 데이터를 불러올 수 없습니다.
          </p>
        </div>
      </div>
    );
  }

  const rowsExist = table.getRowModel().rows.length > 0;

  return (
    <div className={cx("Wrapper")}>
      <Tables.Root>
        {rowsExist && (
          <Tables.Header className={cx("Header")}>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tables.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Tables.HeaderCell
                    key={header.id}
                    size={header.column.getSize()}
                    className={cx("HeaderCell")}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Tables.HeaderCell>
                ))}
              </Tables.Row>
            ))}
          </Tables.Header>
        )}
        {rowsExist && (
          <Tables.Body>
            {table.getRowModel().rows.map((row) => (
              <Tables.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Tables.Cell
                    key={cell.id}
                    size={cell.column.getSize()}
                    className={cx("Cell")}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Tables.Cell>
                ))}
              </Tables.Row>
            ))}
          </Tables.Body>
        )}
      </Tables.Root>
      {!rowsExist && (
        <div className={cx("EmptyTable")}>
          <p
            style={{
              textAlign: "center",
              color: "#919EAB",
              fontSize: 14,
              lineHeight: "24px",
            }}
          >
            등록된 정보가 없습니다.
            <br />
            정보를 등록하여 관리를 시작해 보세요.
          </p>
        </div>
      )}
    </div>
  );
};

export default PostListTable;
