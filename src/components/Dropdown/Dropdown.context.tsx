import React from "react";

type DropdownContextType = {
  /** value,  */
  value: string | string[];
  /** searchable */
  searchable?: boolean;
  /** placeholder */
  placeholder?: string;
  /** searchText */
  searchText?: string;
  /** open */
  open?: boolean;
  /** options */
  options?: { value: string; label: string }[];
  /** id */
  id?: string;
  /** disabled */
  disabled?: boolean;
  /** error */
  error?: boolean;
  /** accentType */
  accentType?: "in" | "out" | "all";
  /** referenceState */
  referenceState?: [
    HTMLElement | null,
    React.Dispatch<React.SetStateAction<HTMLElement | null>>
  ];
  /** popperState */
  popperState?: [
    HTMLUListElement | null,
    React.Dispatch<React.SetStateAction<HTMLUListElement | null>>
  ];
  /** onChange */
  onChange: (value: string | string[]) => void;
  /** handleTriggerClick */
  handleTriggerClick?: () => void;
};

export const initialState: DropdownContextType = {
  value: "",
  searchable: false,
  placeholder: "",
  searchText: "",
  open: false,
  disabled: false,
  error: false,
  accentType: "in",
  onChange: () => {},
};

export const DropdownContext =
  React.createContext<DropdownContextType>(initialState);

export type DropdownProviderProps = React.PropsWithChildren<
  Partial<
    Omit<DropdownContextType, "open" | "referenceState" | "popperState">
  > & {
    className?: string;
    onSearchChange?: (searchText: string) => void;
  }
>;
