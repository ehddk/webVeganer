"use client";
import React from "react";
import ReactDOM from "react-dom";

type DimmedProps = React.PropsWithChildren<{
  dimmedColor: "transparent" | "light" | "dark";
  onClose?: () => void;
}>;

const Dimmed = (props: DimmedProps) => {
  const { children, dimmedColor, onClose } = props;

  const backgroundColor = {
    transparent: "transparent",
    light: "#00000033",
    dark: "#0000007a",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100dvw",
        height: "100dvh",
        zIndex: 1000,
        backgroundColor: backgroundColor[dimmedColor],
      }}
      onClick={onClose}
    >
      {children}
    </div>
  );
};

type ModalProps = React.PropsWithChildren<{
  visible?: boolean;
  dimmedColor?: "transparent" | "light" | "dark";
  selector?: string;
  onClose?: () => void;
}>;

const Modal = (props: ModalProps) => {
  const {
    children,
    visible,
    dimmedColor = "dark",
    selector = "body",
    onClose,
  } = props;

  const [portalElement, setPortalElement] = React.useState<Element | null>(
    null
  );

  React.useEffect(() => {
    setPortalElement(document.querySelector(selector));
  }, [selector]);

  return (
    <React.Fragment>
      {portalElement && visible ? (
        ReactDOM.createPortal(
          <Dimmed onClose={onClose} dimmedColor={dimmedColor}>
            {children}
          </Dimmed>,
          portalElement
        )
      ) : (
        <React.Fragment />
      )}
    </React.Fragment>
  );
};

export default Modal;
