import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Link from "next/link";
import styles from "./CommuEdit.view.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);

export default async function CommuEditView(props) {
  const db = (await connectDB).db("vegan");
  const result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  const handleComplete = () => {
    alert("수정완료");
  };
  return (
    <div className={cx("ViewBoard")}>
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
          <input type="hidden" name="id" value={props.params.id} />
          <button type="submit" className={cx("Btn1")}>
            삭제
          </button>
        </form>
      </div>

      <div className={cx("ViewBoards")}>
        <div>
          <h4 className={cx("Category")}>수정</h4>
          <div style={{ display: "flex" }}>
            <img
              src="/user.png"
              style={{ width: "50px", paddingTop: "5px", height: "60px" }}
              alt="user"
            ></img>
            <form action="/api/post/edit" method="POST">
              <input
                className={cx("Title")}
                name="title"
                defaultValue={result.title}
              ></input>{" "}
              {/* value=> input에 미리 입력된 값 */}
              <input
                name="id"
                defaultValue={result._id}
                style={{ display: "none" }}
              />
              {/* 서버한테 보낼 수정하고 싶은 글의 id */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px 0 0 10px",
                }}
              >
                <input
                  style={{ width: "1000px", height: "300px" }}
                  name="content"
                  defaultValue={result.content}
                />
                <button
                  style={{ width: "100px", padding: "15px", marginTop: "10px" }}
                  type="submit"
                >
                  버튼
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
