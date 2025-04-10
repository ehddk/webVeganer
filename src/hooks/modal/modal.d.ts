// 공통 모달 타입
type GeneralModal = {
  dimmedColor?: "transparent" | "light" | "dark";
  selector?: string;
  onClose?: () => void;
};

// 기본 모달 타입
type DefaultModalProps<T> = {
  type: "default";
  title?: string;
  description?: string;
  positive: T;
  negative?: T;
} & GeneralModal;

// 모달 상태 타입
type ModalState<T> = DefaultModalProps<T>;
