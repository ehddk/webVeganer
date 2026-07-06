import { create } from "zustand";

type ButtonProps = {
  text?: string;
  onClick?: () => void;
};

interface ModalStore {
  modalState: ModalState<ButtonProps> | null; // 무엇을 보여줄지 담은 상태값 (모달이 떠 있는지, 떠있으면 어떤 내용인지를 담는 값)
  showModal: (props: ModalState<ButtonProps>) => void;
  hideModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  //set은 zustand에서 상태를 업데이트하는 함수(react의 setState와 비슷)
  modalState: null, // 상태값
  showModal: (props) => set({ modalState: props }), //상태를 바꾸는 액션
  hideModal: () => set({ modalState: null }),
}));
