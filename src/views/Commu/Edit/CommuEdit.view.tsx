import Link from "next/link";
import styles from "./CommuEdit.view.module.scss";
import cn from "classnames/bind";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
const cx = cn.bind(styles);

type CommuEditViewProps = {
  data: Article.GetOne.Response;
};
type FormType = Article.Put.Body;
export default async function CommuEditView(props: CommuEditViewProps) {
  const { data } = props;
  const { control } = useFormContext<FormType>();

  const form = useForm<FormType>({
    defaultValues: {
      title: data.title,
      content: data.content,
    },
  });
  return (
    <div className={cx("Wrapper")}>
      <div className={cx("Btn")}>
        <button className={cx("Btn1")}>
          <Link
            href={"/Commu"}
            style={{ textDecoration: "none", color: "white" }}
          >
            목록
          </Link>
        </button>
        <form action="/api/post/delete" method="POST">
          {/* <input type="hidden" name="id" value={data.id} /> */}
          <button type="submit" className={cx("Btn1")}>
            삭제
          </button>
        </form>
      </div>

      <FormProvider {...form}>
        <div className={cx("Content")}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <input value={field.value}></input>}
          />
        </div>
      </FormProvider>
    </div>
  );
}
