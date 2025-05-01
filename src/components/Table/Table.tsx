import Link from "next/link";

export default function Table() {
  return (
    <div>
      <table
        style={{
          margin: "0 auto",
          maxWidth: "1250px",
          width: "100%",
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
            <th style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
              분류
            </th>
            <th style={{ borderBottom: "1px solid #eee" }}>제목</th>
            <th style={{ borderBottom: "1px solid #eee" }}>작성자</th>
            <th style={{ borderBottom: "1px solid #eee" }}>작성일</th>
            <th style={{ borderBottom: "1px solid #eee" }}>조회수</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{ textAlign: "center" }}>qad</td>
            <td style={{ textAlign: "center" }}>
              sad
              {/* <Link
                prefetch={false}
                //href={`/Commu/detail/${result[i]._id}`}
                style={{ textDecoration: "none" }}
              ></Link> */}
              {/* <DetailLink /> */}
            </td>
            <td style={{ textAlign: "center" }}>sd</td>
            <td style={{ textAlign: "center" }}>sd</td>
            <td style={{ textAlign: "center" }}>sd</td>
          </tr>
        </tbody>
      </table>
      <div style={{ marginTop: "15px", float: "right", marginRight: "35px" }}>
        <Link href="/commu/Write">
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
  );
}
