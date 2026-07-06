import { useModalStore } from "@/store/modalStore";

export const useModal = () => {
  const showModal = useModalStore((state) => state.showModal);
  const hideModal = useModalStore((state) => state.hideModal);

  return {
    showModal,
    hideModal,
  };
};
