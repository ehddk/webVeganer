import React from "react";
type Variant = "outlined" | "contained" | "soft" | "text";

type ButtonContextType = {
  // colorScheme: ColorScheme;
  /** Color Type */
  colorType: "primary" | "inherit" | "red";
  variant: Variant;
  isLoading: boolean;
  spinner?: React.ReactNode;
  loadingText: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  isFitted?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const initialState: ButtonContextType = {
  // colorScheme: "gray",
  colorType: "primary",
  variant: "contained",
  isLoading: false,
  loadingText: "Loading...",
  disabled: false,
  size: "medium",
  isFitted: false,
};

export const ButtonContext =
  React.createContext<ButtonContextType>(initialState);

export type ButtonProviderProps = React.PropsWithChildren<
  Partial<ButtonContextType>
> & {
  className?: string;
};

export const ButtonProvider = (props: ButtonProviderProps) => {
  const { children, ...rest } = props;
  return (
    <ButtonContext.Provider value={{ ...initialState, ...rest }}>
      {children}
    </ButtonContext.Provider>
  );
};
