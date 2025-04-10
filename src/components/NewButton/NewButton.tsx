/* eslint-disable react-refresh/only-export-components */
import React from "react";
import cn from "classnames/bind";
import styles from "./NewButton.module.scss";

import {
  ButtonContext,
  ButtonProvider,
  ButtonProviderProps,
} from "./NewButton.context";
import useButtonColors from "./NewButton.colors";

const cx = cn.bind(styles);

type TextProps = React.PropsWithChildren<{
  className?: string;
}>;

const Text = (props: TextProps) => {
  const { className } = props;
  const { isLoading, loadingText, spinner, colorType } =
    React.useContext(ButtonContext);
  const { size, variant, disabled } = React.useContext(ButtonContext);
  const buttonColors = useButtonColors();
  const colorSet = buttonColors[disabled ? "disabled" : colorType];

  return (
    <span
      className={cx("ButtonText", variant, size, className, {
        disabled,
      })}
      style={
        {
          "--color": colorSet[variant].color,
        } as React.CSSProperties
      }
    >
      {isLoading ? (
        <React.Fragment>
          {spinner}
          {loadingText}
        </React.Fragment>
      ) : (
        props.children
      )}
    </span>
  );
};

/** 버튼 컴포넌트 */
const Root = (
  props: ButtonProviderProps & {
    radius?: number;
    rounded?: boolean;
    circle?: boolean;
  } & React.JSX.IntrinsicElements["button"]
) => {
  const {
    className,
    children,
    radius = 4,
    circle,
    colorType = "primary",
    isFitted = false,
    ...rest
  } = props;
  const context = React.useContext(ButtonContext);

  const variant = props.variant || "contained";
  const buttonColors = useButtonColors();
  const colorSet = buttonColors[colorType];

  const size = props.size ?? context.size;
  const disabled = props.disabled ?? context.disabled;
  const isLoading = props.isLoading ?? context.isLoading;

  // 버튼 색상
  const defaultColor = !disabled
    ? colorSet[variant].backgroundColor
    : buttonColors["disabled"][variant].backgroundColor;
  const borderColor = !disabled
    ? colorSet[variant].borderColor
    : buttonColors["disabled"][variant].borderColor;
  const hoverColor = colorSet[variant].hover.color;
  const activeColor = colorSet[variant].hover.backgroundColor;
  const hoverBackgroundColor = colorSet[variant].hover.backgroundColor;

  return (
    <ButtonProvider {...props} colorType={colorType}>
      <button
        {...rest}
        className={cx("ButtonRoot", variant, size, className, {
          loading: isLoading,
          disabled,
          circle,
          isFitted,
        })}
        style={
          {
            "--radius": `${radius}px`,
            "--default-color": defaultColor,
            "--hover-color": hoverColor,
            "--active-color": activeColor,
            "--hover-bg-color": hoverBackgroundColor,
            "--border-color": borderColor,
          } as React.CSSProperties
        }
        disabled={disabled}
        onClick={props.onClick}
      >
        {children}
      </button>
    </ButtonProvider>
  );
};

interface IButton {
  Text: typeof Text;

  Root: typeof Root;
}

export default {
  Text,

  Root,
} as IButton;
