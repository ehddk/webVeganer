"use client";
/* eslint-disable react-refresh/only-export-components */

import React from "react";
import cn from "classnames/bind";
import styles from "./Table.module.scss";
import { TableContext, TableProviderProps } from "./Table.context";
import { useRowResize } from "./Table.hook";

const cx = cn.bind(styles);

type TableRowProps = React.PropsWithChildren<React.JSX.IntrinsicElements["tr"]>;

const Row = (props: TableRowProps) => {
  const { className, children, ref, ...rest } = props;
  const { variant } = React.use(TableContext);

  return (
    <tr {...rest} className={cx("Row", variant, className)} ref={ref}>
      {children}
    </tr>
  );
};

type TableCellProps = React.PropsWithChildren<
  {
    size?: number;
    isSelected?: boolean;
  } & React.JSX.IntrinsicElements["td"]
>;

const Cell = (props: TableCellProps) => {
  const { className, children, size, ref, isSelected, ...rest } = props;
  const { variant } = React.use(TableContext);

  return (
    <td
      {...rest}
      ref={ref}
      className={cx("Cell", variant, className, {
        isSelected,
      })}
      style={{
        ...rest.style,
        ...(size ? { width: size } : {}),
      }}
    >
      {children}
    </td>
  );
};

type TableBodyProps = React.PropsWithChildren<
  React.JSX.IntrinsicElements["tbody"]
>;

const Body = (props: TableBodyProps) => {
  const { className, children, ref, ...rest } = props;

  return (
    <tbody {...rest} ref={ref} className={cx("Body", className)}>
      {children}
    </tbody>
  );
};

type TableHeaderCellProps = React.PropsWithChildren<
  {
    size?: number;
  } & React.JSX.IntrinsicElements["th"]
>;

const HeaderCell = (props: TableHeaderCellProps) => {
  const { className, children, size, ref, ...rest } = props;
  const { variant } = React.use(TableContext);

  return (
    <th
      {...rest}
      ref={ref}
      className={cx("HeaderCell", variant, className)}
      style={{
        ...rest.style,
        ...(size ? { width: size } : {}),
      }}
    >
      {children}
    </th>
  );
};

type TableHeaderProps = React.PropsWithChildren<
  React.JSX.IntrinsicElements["thead"]
>;

const Header = (props: TableHeaderProps) => {
  const { className, children, ref, ...rest } = props;

  return (
    <thead {...rest} ref={ref} className={cx("Header", className)}>
      {children}
    </thead>
  );
};

type TableRootProps = TableProviderProps & React.JSX.IntrinsicElements["table"];

const Root = (props: TableRootProps) => {
  const { children, className, variant = "default", ...rest } = props;

  const contextValue = React.useMemo(
    () => ({
      variant,
    }),
    [variant]
  );

  return (
    <TableContext value={contextValue}>
      <table {...rest} className={cx("Root", className)}>
        {children}
      </table>
    </TableContext>
  );
};

interface ITable {
  Root: typeof Root;
  Header: typeof Header;
  Body: typeof Body;
  Row: typeof Row;
  Cell: typeof Cell;
  HeaderCell: typeof HeaderCell;
  useRowResize: typeof useRowResize;
  TableRootProps: TableRootProps;
}

export type { TableRootProps };

export default {
  Root,
  Header,
  Body,
  Row,
  Cell,
  HeaderCell,
  useRowResize,
} as ITable;
