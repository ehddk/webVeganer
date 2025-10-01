// import { connectDB } from "@/util/database";
// import { ObjectId } from "mongodb";
import Link from "next/link";
import Comment from "../../../components/Comment/Comment";
import styles from "./CommuDetail.view.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);

type CommuDetailViewProps = {
  data: Article.GetOne.Response;
};
export default async function CommuDetailView(props: CommuDetailViewProps) {
  const { data } = props;
  console.log("data", data);
  // const db = (await connectDB).db("vegan");
  // let result = await db
  //   .collection("post")
  //   .findOne({ _id: new ObjectId(data.id) });
  // //const filteredList = commuData.category.filter(item => item.category === selectedMenu || selectedMenu === "");
  // console.log(result);

  return (
    <>
      <div className={cx("ViewBoard")}>
        <div className={cx("Btn")}>
          <button className={cx("Btn1")}>
            <Link
              href={"/commu"}
              style={{ textDecoration: "none", color: "white" }}
            >
              목록
            </Link>
          </button>
          <button className={cx("Btn1")}>
            <Link
              href={`/commu/Edit/${data.id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              å 수정
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
                  {data.title}
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
                <p style={{ padding: "10px" }}>{data.content}</p>
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
              <Comment _id={data.id.toString()} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
