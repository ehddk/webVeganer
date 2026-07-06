"use client";

import Modal from "@/components/NewModal/NewModal";
import DefaultModal from "@/components/DefaultModal/DefaultModal";
import { useModalStore } from "@/store/modalStore";

export default function GlobalModal() {
  const modalState = useModalStore((state) => state.modalState); // modalstate가 바뀔 때만 컴포넌트가 리렌더링됨
  const hideModal = useModalStore((state) => state.hideModal);

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
}
