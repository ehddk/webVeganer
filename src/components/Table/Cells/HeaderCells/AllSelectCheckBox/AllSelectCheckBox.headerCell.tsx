import { HeaderContext } from "@tanstack/react-table";
import styles from "./AllSelectCheckBox.headerCell.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

interface AllSelectCheckBoxHeaderCellProps {
  center?: boolean;
  checked: boolean;
  onToggleAll?: (checked: boolean) => void;
}

const AllSelectCheckBoxHeaderCell = <T extends object>(
  props: HeaderContext<T, unknown> & AllSelectCheckBoxHeaderCellProps
) => {
  const { table, column, center, checked, onToggleAll } = props;
  const handleCheckBox = (isChecked: boolean) => {
    if (onToggleAll) {
      onToggleAll(isChecked);
    } else {
      table.toggleAllRowsSelected(isChecked);
    }
  };

  const isChecked =
    checked !== undefined ? checked : table.getIsAllRowsSelected();
  const isIndeterminate =
    table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected();

  return (
    <div
      className={cx("Wrapper")}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <input
        type="checkbox"
        checked={isChecked}
        ref={(input) => {
          if (input) input.indeterminate = isIndeterminate;
        }}
        onChange={(e) => {
          handleCheckBox(e.target.checked);
        }}
        aria-label="모든 행 선택/해제"
      />
      {/* // <CheckBox.Root
      //   id={`${column.id}-select-all`}
      //   value={table.getIsAllRowsSelected() ? `${column.id}-select-all` : ""}
      //   checked={table.getIsAllRowsSelected()}
      //   onChange={() => {
      //     table.toggleAllRowsSelected(!table.getIsAllRowsSelected());
      //   }}
      //   className={cx("Root", {
      //     center,
      //   })}
      // >
      //   <CheckBox.Trigger />
      // </CheckBox.Root> */}
    </div>
  );
};

export default AllSelectCheckBoxHeaderCell;
