import React from "react";
import styles from "./InfoModal.module.scss";
import cn from "classnames/bind";
import Button from "@/components/NewButton/NewButton";
import { IoMdClose } from "react-icons/io";

const cx = cn.bind(styles);

interface IModalProps {
  onClose: () => void;
  responsive?: boolean;
}

const IModal = (props: React.PropsWithChildren<IModalProps>) => {
  const { children, onClose, responsive = false } = props;

  return (
    <div
      className={cx("Wrapper", { responsive })}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={cx("Header")}>
        <Button.Root
          className={cx("CloseBtn")}
          variant="text"
          colorType="inherit"
          onClick={onClose}
        >
          <IoMdClose />
        </Button.Root>
      </div>

      {children}
    </div>
  );
};

export default IModal;
