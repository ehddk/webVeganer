"use client";
import Link from "next/link";
import Comment from "../../../components/Comment/Comment";
import styles from "./CommuDetail.view.module.scss";
import cn from "classnames/bind";
import Divider from "@/components/Divider/Divider";
import Button from "@/components/Button/Button";
import { LINK_ROUTE } from "@/constants/link.constants";
import { useParams, useRouter } from "next/navigation";

const cx = cn.bind(styles);

type CommuDetailViewProps = {
  data: Article.GetOne.Response;
};
export default async function CommuDetailView(props: CommuDetailViewProps) {
  const { data } = props;
  console.log("data", data);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { id } = params;
  // const db = (await connectDB).db("vegan");
  // let result = await db
  //   .collection("post")
  //   .findOne({ _id: new ObjectId(data.id) });
  // //const filteredList = commuData.category.filter(item => item.category === selectedMenu || selectedMenu === "");
  // console.log(result);

  return (
    <>
      <div className={cx("Wrapper")}>
        <div className={cx("BtnGroup")}>
          {/* <button className={cx("Btn")}>
            <Link
              href={"/commu"}
              style={{ textDecoration: "none", color: "white" }}
            >
              목록
            </Link>
          </button> */}
          <Button
            size="small"
            text="목록"
            colorType="primary"
            variant="contained"
            onClick={() => router.push(LINK_ROUTE.ARTICLE.DEFAULT.uri)}
          />
          {/* <button className={cx("Btn")}>
            <Link href={`/commu/Edit/${data.id}`}>수정</Link>
          </button> */}
          <Button
            size="small"
            text="수정"
            colorType="primary"
            variant="outlined"
            onClick={() => router.push(LINK_ROUTE.ARTICLE.EDIT.uri({ id }))}
          />
        </div>
        <div className={cx("Content")}>
          <div>
            <div className={cx("TitleWrapper")}>
              <h2 className={cx("Title")}>{data.title}</h2>
              <div className={cx("Profile")}>
                <img src="/user.svg" alt="user" width={20} />
                <p>{data.author} </p>
              </div>
            </div>

            <div>
              <div className={cx("Content")}>
                <p style={{ padding: "10px" }}>{data.content}</p>
              </div>
              <Divider />
              <div className={cx("CommentWrapper")}>
                <p>좋아요</p>
              </div>
              <Comment _id={data.id.toString()} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
