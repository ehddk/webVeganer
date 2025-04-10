import React from "react";
import Modal from "@/components/NewModal/NewModal";
import DefaultModal from "@/components/DefaultModal/DefaultModal";

type ButtonProps = {
  text?: string;
  onClick?: () => void;
};

export const useModal = () => {
  const [modalState, setModalState] =
    React.useState<ModalState<ButtonProps> | null>(null);

  const showModal = (props: ModalState<ButtonProps>) => {
    setModalState(props);
  };

  const hideModal = () => {
    setModalState(null);
  };

  const ModalComponent = () => {
    if (!modalState) return null;
    const { dimmedColor, onClose } = modalState;

    const handleClose = () => {
      if (onClose) onClose();
      hideModal();
    };

    switch (modalState.type) {
      case "default":
      default:
        return (
          <Modal visible={true} dimmedColor={dimmedColor} onClose={handleClose}>
            <DefaultModal
              title={modalState.title}
              description={modalState.description}
              positive={modalState.positive}
              negative={modalState.negative}
            />
          </Modal>
        );
    }
  };

  return {
    showModal,
    hideModal,
    ModalComponent,
  };
};
