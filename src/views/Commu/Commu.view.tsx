// import { connectDB } from "@/util/database";
import Link from "next/link";
// import DetailLink from "../../Commu/DetailLink";

export default async function CommuView() {
  // const db = (await connectDB).db("vegan");
  // const result = await db.collection("post").find().toArray();
  // console.log(result);
  return (
    <>
      <div style={{ padding: "120px" }}>
        <h2>커뮤니티</h2>
        <div>
          <div
            style={{
              display: "flex",
              listStyle: "none",
              gap: "35px",
              padding: "30px 0 0 0",
            }}
          >
            <li>
              <button
                style={{ border: "0", background: "white", fontSize: "18px" }}
              >
                {" "}
                전체
              </button>{" "}
            </li>
          </div>
          <div>
            <table
              style={{
                width: "1400px",
                height: "auto",
                border: "1px solid lightgray",
              }}
            >
              <colgroup>
                <col width="50px"></col>
                <col width="200px"></col>
                <col width="100px"></col>
                <col width="100px"></col>
                <col width="50px"></col>
              </colgroup>

              <thead>
                <tr>
                  <th
                    style={{ padding: "10px", borderBottom: "1px solid #eee" }}
                  >
                    분류
                  </th>
                  <th style={{ borderBottom: "1px solid #eee" }}>제목</th>
                  <th style={{ borderBottom: "1px solid #eee" }}>작성자</th>
                  <th style={{ borderBottom: "1px solid #eee" }}>작성일</th>
                  <th style={{ borderBottom: "1px solid #eee" }}>조회수</th>
                </tr>
              </thead>

              {/* <tbody>
                {result.map((a, i) => {
                  return (
                    <tr key={i}>
                      <td style={{ textAlign: "center" }}></td>
                      <td style={{ textAlign: "center" }}>
                        <Link
                          prefetch={false}
                          href={`/Commu/detail/${result[i]._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          {result[i].title}
                        </Link>
                        <DetailLink />
                      </td>
                      <td style={{ textAlign: "center" }}></td>
                      <td style={{ textAlign: "center" }}></td>
                      <td style={{ textAlign: "center" }}></td>
                    </tr>
                  );
                })}
              </tbody> */}
            </table>
            <div
              style={{ marginTop: "15px", float: "right", marginRight: "35px" }}
            >
              <Link href="/Commu/Write">
                <button
                  style={{
                    padding: "10px",
                    fontSize: "15px",
                    color: "white",
                    background: "green",
                    border: "0",
                    borderRadius: "5px",
                  }}
                >
                  글쓰기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
