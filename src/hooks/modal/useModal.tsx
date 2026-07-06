import { useModalStore } from "@/store/modalStore";

export const useModal = () => {
  // store에서 modalState를 가져오고, showModal과 hideModal 함수를 반환하는 커스텀 훅
  const showModal = useModalStore((state) => state.showModal);
  const hideModal = useModalStore((state) => state.hideModal);

  return {
    showModal,
    hideModal,
  };
};
