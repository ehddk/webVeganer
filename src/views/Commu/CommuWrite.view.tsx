import router from "next/navigation";
import styles from "./CommuWrite.view.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);

export default function CommuWriteView() {
  const handleCancel = () => {
    router.push("/Commu");
  };

  const handlePop = () => {
    if (title.trim() === "") {
      alert("제목을 입력해주세요 ");
    } else if (content.trim() === "") {
      alert("내용을 입력해주세요 ");
    } else {
      alert("등록완료했습니다.");
      //  router.push('/Commu')
    }
  };
  return (
    <>
      <div className={cx("Wrapper")}>
        <h2>글 작성</h2>

        <form action="/api/post/new" method="POST">
          <div className={cx("Board")}>
            <div className={cx("BoardTitle")}>
              <input
                name="title"
                className={cx("BoardBody")}
                placeholder="제목을 입력해주세요"
              ></input>
            </div>
            <div className={cx("ListTop")}>
              <ul style={{ listStyle: "none" }}>
                <li>
                  <input
                    type="file"
                    accept="image/*"
                    width={100}
                    height={100}
                  />
                  <button style={{ marginLeft: "30px" }}>장소</button>
                </li>
              </ul>
            </div>
            <div
              style={{
                //margin: "0 0 0 80px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <textarea name="content" className={cx("BoardContent")} />
              <div className={cx("Con")}>
                <button type="submit" className={cx("Btn")}>
                  등록하기
                </button>
                <button className={cx("Btn")}>취소</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
