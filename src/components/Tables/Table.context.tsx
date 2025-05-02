import React from "react";

type TableVariant =
  | "default" // 기본 스타일
  | "bordered" // 테두리가 있는 스타일
  | "striped" // 줄무늬 패턴
  | "compact"; // 좁은 패딩

export interface TableContextType {
  variant?: TableVariant;
}

const initialState: TableContextType = {
  variant: "default",
};

export const TableContext = React.createContext<TableContextType>(initialState);

export type TableProviderProps = React.PropsWithChildren<
  TableContextType & {
    className?: string;
  }
>;
