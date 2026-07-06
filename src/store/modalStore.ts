import { create } from "zustand";

type ButtonProps = {
  text?: string;
  onClick?: () => void;
};

interface ModalStore {
  modalState: ModalState<ButtonProps> | null;
  showModal: (props: ModalState<ButtonProps>) => void;
  hideModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  //set은 zustand에서 상태를 업데이트하는 함수(react의 setState와 비슷)
  modalState: null, // 상태값
  showModal: (props) => set({ modalState: props }), //상태를 바꾸는 액션
  hideModal: () => set({ modalState: null }),
}));
