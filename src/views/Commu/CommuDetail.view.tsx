import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Link from "next/link";
import Comment from "../../components/Comment/Comment";
import styles from "./CommuDetail.view.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);

export default async function CommuDetailView(props) {
  const db = (await connectDB).db("vegan");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });
  //const filteredList = commuData.category.filter(item => item.category === selectedMenu || selectedMenu === "");
  console.log(result);

  return (
    <>
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
          <button className={cx("Btn1")}>
            <Link
              href={`/Commu/Edit/${result._id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              수정
            </Link>
          </button>
          {/* <SweetAlert onClick={()=>history.push(`/modify/${title}`)}/> */}
        </div>
        <div className={cx("ViewBoards")}>
          <div>
            <div className={cx("Profile")}>
              <div>
                <img
                  src="/user.png"
                  style={{ width: "40px", paddingTop: "15px" }}
                  alt="user"
                />
              </div>
              <div className={cx("Info")}>
                <p style={{ marginTop: "15px", fontSize: "18px" }}>
                  {result.title}
                </p>
              </div>

              <p
                style={{
                  padding: "29px 0 0 10px",
                  fontSize: "12px",
                  color: "gray",
                }}
              >
                조회{" "}
              </p>
            </div>
            <div>
              <div
                style={{ minHeight: "200px", border: "1px solid lightgray" }}
              >
                <p style={{ padding: "10px" }}>{result.content}</p>
              </div>

              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid lightgray",
                  height: "50px",
                }}
              >
                <p>좋아요</p>
              </div>
              <Comment _id={result._id.toString()} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
