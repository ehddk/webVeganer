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
    id: "select",
    size: 70,
    header: (props) => {
      const { table } = props;
      const isAllSelected = table.getIsAllRowsSelected();
      const isSomeSelected = table.getIsSomeRowsSelected();

      <AllSelectCheckBoxHeaderCell
        {...props}
        // checked={false} // Replace with actual logic to determine the checked state
        checked={isAllSelected}
        // indeterminate 상태도 전달할 수 있도록 확장 가능
        onToggleAll={(checked) => {
          table.toggleAllRowsSelected(checked);
        }}
      />;
    },
    cell: RowSelectCheckBoxCell
    // (props) => {
    //   const { row } = props;
    //   return <div className={cx("SelectCell")}>{row.original.id}</div>;
    // },
  },
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
      return <div className={cx("ContentCell")}>{row.original.content}</div>;
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
