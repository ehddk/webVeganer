"use client";
import commuData from "../../../app/services/commuData";

import { useRouter } from "next/navigation";
// import SweetAlert from "../../sweetAlert";
function View(props) {
  const router = useRouter();
  // const [selectedMenu, setSelectedMenu] = useState('');
  //  const params=useSearchParams()
  //  const title=params.get('title')
  //  const id=params.get('id')

  //const filteredList = commuData.category.filter(item => item.category === selectedMenu || selectedMenu === "");

  const viewBoard = {
    width: "80%",
    height: "auto",
    padding: "80px",
    margin: "0 auto",
  };
  const category = {
    fontSize: "15px",
    color: "green",
  };
  const profile = {
    height: "auto",
    borderBottom: "1px solid lightgray",
    display: "flex",
  };
  const btn = {
    marginLeft: "90%",
    padding: "10px",
    width: "1000px",
  };
  const btn1 = {
    fontSize: "15px",
    color: "white",
    backgroundColor: "green",
    borderRadius: "5px",
    border: "0",
    padding: "5px",
    width: "60px",
    marginRight: "7px",
  };
  const viewBoards = { border: "1px solid lightgray", padding: "10px" };
  const info = {
    padding: "0 0 0 10px",
    display: "flex",
    flexDirection: "column",
  };
  const comment = {
    padding: "20px",
    border: "1px solid lightgray",
    display: "flex",
    flexDirection: "column",
  };

  const filteredBoard = commuData.category.filter(
    (item) => item.title === title && item.id.toString() === id
  );
  //console.log("????",filteredBoard)
  return (
    <>
      <div style={viewBoard}>
        <div style={btn}>
          <button style={btn1} onClick={() => router.push("/Commu")}>
            목록
          </button>
          <button
            style={btn1}
            onClick={() => router.push(`/Commu/modify?title=${title}&id=${id}`)}
          >
            수정
          </button>
          {/* <SweetAlert onClick={()=>history.push(`/modify/${title}`)}/> */}
        </div>

        <div style={viewBoards}>
          {filteredBoard.map((item, index) => (
            <div key={index}>
              <h4 style={category}>{item.category}</h4>
              <h2>{item.title}</h2>
              <div style={profile}>
                <div>
                  <img
                    src="/user.png"
                    style={{ width: "40px", paddingTop: "15px" }}
                    alt="user"
                  ></img>
                </div>
                <div style={info}>
                  <p>{item.author}</p>
                  <p
                    style={{
                      marginTop: "-10px",
                      fontSize: "12px",
                      color: "gray",
                    }}
                  >
                    {item.date}
                  </p>
                </div>
                <p
                  style={{
                    padding: "29px 0 0 10px",
                    fontSize: "12px",
                    color: "gray",
                  }}
                >
                  조회 {item.view}
                </p>
              </div>
              <div>
                <h1>내용들</h1>
                <div
                  style={{
                    display: "flex",
                    borderBottom: "1px solid lightgray",
                    height: "50px",
                  }}
                >
                  <p>좋아요</p>
                </div>
                <div style={comment}>
                  <p>댓글</p>
                  <ul style={{ listStyleType: "none", padding: "0" }}>
                    <li>
                      <div style={profile}>
                        <div>
                          <img
                            src="/user.png"
                            style={{ width: "45px", paddingTop: "15px" }}
                            alt="user"
                          ></img>
                        </div>
                        <div style={info}>
                          <p>{item.author}</p>
                          <p style={{ marginTop: "-7px" }}>ㄴ내용들~~~~~</p>
                          <p
                            style={{
                              marginTop: "-10px",
                              fontSize: "12px",
                              color: "gray",
                            }}
                          >
                            {item.date}
                          </p>
                        </div>
                        <p
                          style={{
                            padding: "58px 0 0 10px",
                            fontSize: "12px",
                            color: "gray",
                          }}
                        >
                          조회 {item.view}
                        </p>
                      </div>
                    </li>
                    <li>
                      <div style={profile}>
                        <div>
                          <img
                            src="/user.png"
                            style={{ width: "45px", paddingTop: "15px" }}
                            alt="user"
                          ></img>
                        </div>
                        <div style={info}>
                          <p>{item.author}</p>
                          <p style={{ marginTop: "-7px" }}>ㄴ내용들~~~~~</p>
                          <p
                            style={{
                              marginTop: "-10px",
                              fontSize: "12px",
                              color: "gray",
                            }}
                          >
                            {item.date}
                          </p>
                        </div>
                        <p
                          style={{
                            padding: "58px 0 0 10px",
                            fontSize: "12px",
                            color: "gray",
                          }}
                        >
                          조회 {item.view}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default View;
