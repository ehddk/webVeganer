import React from "react";
import { Table } from "@tanstack/react-table";

export const useRowResize = <TData extends object>(table: Table<TData>) => {
  const [columnsSize, setColumnsSize] = React.useState(
    Array.from(
      { length: table.getRowModel().rows.length + 1 },
      () => table.options.defaultColumn?.size ?? 150
    )
  );

  const [isResizing, setIsResizing] = React.useState(false);

  const handleResize = (columnIndex: number) => {
    const startSize = columnsSize[columnIndex];
    let startX: number;

    const onMouseMove = (e: MouseEvent) => {
      if (!startX) {
        startX = e.clientX;
        return;
      }

      const currentX = e.clientX;
      const diff = currentX - startX;
      const newSize = Math.max(50, startSize + diff);

      setColumnsSize((prev) => {
        const newSizes = [...prev];
        newSizes[columnIndex] = newSize;
        return newSizes;
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      setIsResizing(false);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    setIsResizing(true);
  };

  return {
    columnsSize,
    isResizing,
    handleResize,
  };
};
