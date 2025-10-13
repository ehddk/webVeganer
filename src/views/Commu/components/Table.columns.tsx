import { AllSelectCheckBoxHeaderCell } from "@/components/Table/Cells/HeaderCells";
import { ColumnDef } from "@tanstack/react-table";
import styles from "./Table.columns.module.scss";
import classNames from "classnames/bind";
import dayjs from "dayjs";

const cx = classNames.bind({ ...styles });
const AUTO_SIZE = "auto" as unknown as number;

type TableType = Article.GetList.Response[number];

export const articleTableColumns: ColumnDef<TableType>[] = [
  {
    header: "순서",
    size: 60,
    cell: (props) => {
      const { row, table } = props;
      const { pageIndex, pageSize } = table.getState().pagination;
      const rowNumber = pageIndex * pageSize + row.index + 1;
      return <div className={cx("OrderCell")}>{rowNumber}</div>;
    },
  },
  {
    header: "제목",
    size: AUTO_SIZE,
    cell: (props) => {
      const { row } = props;
      return <div className={cx("TitleCell")}>{row.original.title}</div>;
    },
  },
  {
    header: "내용",
    size: 150,
    cell: (props) => {
      const { row } = props;
      const content = row.original.content;

      let plainText = "";

      if (typeof content === "object" && content !== null && "ops" in content) {
        plainText = content.ops
          .map((op: any) => op.insert)
          .join("")
          .trim();
      } else if (typeof content === "string") {
        try {
          const deltaContent = JSON.parse(content);
          plainText = deltaContent.ops
            .map((op: any) => op.insert)
            .join("")
            .trim();
        } catch {
          plainText = content;
        }
      } else {
        plainText = String(content);
      }

      return <div className={cx("ContentCell")}>{plainText}</div>;
    },
  },
  {
    header: "작성자",
    size: 120,
    cell: (props) => {
      const { row } = props;
      return <div className={cx("WriterCell")}>{row.original.author}</div>;
    },
  },
  {
    header: "작성일",
    size: 120,
    cell: (props) => {
      const { row } = props;
      return (
        <div className={cx("CreatedAtCell")}>
          {dayjs(row.original.createdAt).format("YYYY.MM.DD")}
        </div>
      );
    },
  },
];
