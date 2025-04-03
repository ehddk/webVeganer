"use client";
import React from "react";
import cn from "classnames/bind";
import {
  DropdownContext,
  DropdownProviderProps,
  initialState,
} from "./Dropdown.context";
import styles from "./Dropdown.module.scss";

import useDropdownColors from "./Dropdown.colors";
import { usePopper } from "react-popper";

const cx = cn.bind(styles);

type AsProps = {
  isEmpty: boolean;
  placeholder?: string;
  selectedValue: string;
  open?: boolean;
  options?: { value: string; label: string }[];
  variant?: "outlined" | "contained" | "text";
  size?: "small" | "medium" | "large";

  handleTriggerClick?: () => void;
};

type TriggerProps = React.PropsWithChildren<{
  as?: (props: AsProps) => React.ReactNode;
  className?: string;
  variant?: "outlined" | "contained" | "text";
  size?: "small" | "medium" | "large";
}>;

const Trigger = (props: TriggerProps) => {
  const { as, className, variant = "outlined", size = "medium" } = props;
  const {
    value,
    placeholder,
    open,
    options,
    id,
    disabled,
    error,
    accentType,
    handleTriggerClick,
  } = React.use(DropdownContext);

  const colors = useDropdownColors();

  const isEmpty = Array.isArray(value) ? value.length === 0 : !value;

  const colorStatus = React.useMemo(() => {
    if (disabled) return "disabled";
    if (error) return "error";
    if (open) return "focused";
    if (!isEmpty) return "selected";
    return "inactive";
  }, [disabled, error, open, isEmpty]);

  const colorStyle = React.useMemo(() => {
    const result = {
      "--background-color": colors[variant][colorStatus].backgroundColor,
      "--color": colors[variant][colorStatus].color,
      "--border-color": colors[variant][colorStatus].borderColor,
    };

    const textColorControl = () => {
      if (!isEmpty) {
        result["--color"] = colors[variant].selected.color;
      } else {
        result["--color"] = colors[variant].inactive.color;
      }

      if (open) {
        result["--color"] = colors[variant].focused.color;
      }

      if (disabled) {
        result["--color"] = colors[variant].disabled.color;
      }
    };

    const borderColorControl = () => {
      if (!isEmpty) {
        result["--border-color"] = colors[variant].selected.borderColor;
      }

      if (open) {
        result["--border-color"] = colors[variant].focused.borderColor;
      }

      if (disabled) {
        result["--border-color"] = colors[variant].disabled.borderColor;
      }
    };

    if (colorStatus === "error") {
      switch (accentType) {
        case "in":
          result["--color"] = colors[variant].error.color;
          borderColorControl();
          break;
        case "out":
          result["--border-color"] = colors[variant].error.color;
          textColorControl();
          break;
        case "all":
          result["--color"] = colors[variant].error.color;
          result["--border-color"] = colors[variant].error.color;
          break;
      }
    }

    return result;
  }, [colors, variant, colorStatus, open, isEmpty, disabled, accentType]);

  const selectedValue = Array.isArray(value)
    ? options
      ? options
          .filter((option) => value.includes(option.value))
          .map((option) => option.label)
          .join(", ")
      : value.join(", ")
    : options
      ? (options.find((option) => option.value === value)?.label ?? "")
      : value;

  return as ? (
    as({
      isEmpty,
      placeholder,
      selectedValue,
      open,
      options,
      variant,
      size,

      handleTriggerClick,
    })
  ) : (
    <div
      className={cx("DropdownTrigger", className, variant, size)}
      onClick={handleTriggerClick}
      data-name={"trigger"}
      id={id}
    >
      <span className={cx("DropdownTriggerText")}>
        {isEmpty ? placeholder : selectedValue}
      </span>
    </div>
  );
};

type MenuRenderProps = {
  open: boolean;
  id?: string;
  variant?: "shadow" | "line";
  size?: "small" | "medium";
  handleTriggerClick?: () => void;
};

type MenuProps = {
  className?: string;
  variant?: "shadow" | "line";
  size?: "small" | "medium";
  children?: React.ReactNode | ((props: MenuRenderProps) => React.ReactNode);
  boundaryPadding?: number;
};

const Menu = (props: MenuProps) => {
  const {
    className,
    children,
    variant = "shadow",
    size = "medium",
    boundaryPadding = 8,
  } = props;
  const { open, id, referenceState, popperState, handleTriggerClick } =
    React.use(DropdownContext);

  const [referenceElement] = referenceState ?? [];
  const [popperElement, setPopperElement] = popperState ?? [];

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
    modifiers: [
      { name: "offset", options: { offset: [0, 4] } },
      {
        name: "preventOverflow",
        options: {
          padding: boundaryPadding,
        },
      },
    ],
  });

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target;
      const _menu = popperElement;
      if (target instanceof Element) {
        if (_menu && !_menu.contains(target)) {
          if (target.closest("[data-name='trigger']")?.id === id) return;
          handleTriggerClick?.();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleTriggerClick, popperElement, id]);
  if (!open) return null;

  return (
    <ul
      {...attributes.popper}
      ref={setPopperElement}
      className={cx("DropdownMenu", variant, className)}
      style={styles.popper}
    >
      {typeof children === "function"
        ? children({ open, id, variant, size, handleTriggerClick })
        : React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                ...(child.props instanceof Object
                  ? { ...child.props, variant, size }
                  : {}),
              });
            }
            return child;
          })}
    </ul>
  );
};

type ItemProps = React.PropsWithChildren<{
  className?: string;
  value: string;
  label?: string;
  variant?: "shadow" | "line";
  size?: "small" | "medium";
}>;

const Item = (props: ItemProps) => {
  const {
    children,
    className,
    value,
    label,
    variant = "shadow",
    size = "medium",
  } = props;
  const context = React.use(DropdownContext);
  const { onChange } = context;

  const isArray = Array.isArray(context.value);

  const handleClick = React.useCallback(() => {
    const selected = Array.isArray(context.value)
      ? context.value.includes(value)
        ? context.value.filter((v) => v !== value)
        : [...context.value, value]
      : value;

    onChange(selected);
    if (!isArray) {
      context.handleTriggerClick?.();
    }
  }, [context, isArray, onChange, value]);

  const selected = Array.isArray(context.value)
    ? context.value.includes(value)
    : context.value === value;

  const disabled = Array.isArray(context.value)
    ? false
    : context.value === value;

  return (
    <li
      className={cx("DropdownItem", variant, size, className, {
        selected,
        disabled,
      })}
      onClick={handleClick}
    >
      {children ?? label}
    </li>
  );
};

const Root = (props: DropdownProviderProps) => {
  const { children, className } = props;

  const id = React.useId();

  const [open, setOpen] = React.useState(false);

  const referenceState = React.useState<HTMLElement | null>(null);
  const [, referenceElement] = referenceState;
  const popperState = React.useState<HTMLUListElement | null>(null);

  const handleTriggerClick = React.useCallback(() => {
    if (props.disabled) return;
    setOpen((prev) => !prev);
  }, [props.disabled]);

  const contextValue = React.useMemo(
    () => ({
      ...initialState,
      ...props,
      id,
      open,
      referenceState,
      popperState,
      handleTriggerClick,
    }),
    [open, props, referenceState, popperState, id, handleTriggerClick]
  );

  return (
    <DropdownContext value={contextValue}>
      <div ref={referenceElement} className={cx("DropdownRoot", className)}>
        {children}
      </div>
    </DropdownContext>
  );
};

interface IDropdown {
  Trigger: typeof Trigger;
  Menu: typeof Menu;
  Item: typeof Item;
  Root: typeof Root;
}

export default {
  Trigger,
  Menu,
  Item,
  Root,
} as IDropdown;
