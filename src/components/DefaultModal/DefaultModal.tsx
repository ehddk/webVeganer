import Button from "@/components/NewButton/NewButton";
import styles from "./DefaultModal.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

type ButtonProps = {
  text?: string;
  onClick?: () => void;
} & React.ComponentProps<typeof Button.Root>;

type DefaultModalProps = {
  title?: string;
  description?: string;
  negative?: ButtonProps;
  positive: ButtonProps;
};
const DefaultModal = (props: DefaultModalProps) => {
  const { title, description, negative, positive = { text: "확인" } } = props;

  return (
    <div
      className={cx("Wrapper")}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={cx("ContentWrapper")}>
        {title && <h2 className={cx("Title")}>{title}</h2>}
        {description && <p className={cx("Description")}>{description}</p>}
      </div>
      <div className={cx("ButtonWrapper")}>
        {negative?.text && (
          <Button.Root
            {...negative}
            className={cx("Button", negative.className)}
            colorType={negative.colorType ?? "inherit"}
            variant={negative.variant ?? "soft"}
            radius={negative.radius ?? 8}
            isFitted={negative.isFitted ?? true}
          >
            <Button.Text>{negative.text}</Button.Text>
          </Button.Root>
        )}
        <Button.Root
          {...positive}
          className={cx("Button", positive.className)}
          variant={positive.variant ?? "soft"}
          radius={positive.radius ?? 8}
          isFitted={positive.isFitted ?? true}
        >
          <Button.Text>{positive.text}</Button.Text>
        </Button.Root>
      </div>
    </div>
  );
};

export default DefaultModal;
