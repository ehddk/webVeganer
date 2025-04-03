"use client";
import { useState, useEffect } from "react";

export default function Comment(props) {
  let [comment, setComment] = useState("");
  let [data, setData] = useState([]);
  let [editCommentId, setEditCommentId] = useState(null); // 현재 수정 중인 댓글의 ID
  let [editCommentContent, setEditCommentContent] = useState(""); // 수정 중인 댓글의 내용

  useEffect(() => {
    fetch(`/api/comment/list?id=${props._id}`)
      .then((r) => r.json())
      .then((result) => {
        console.log(result);
        setData(result);
      });
  }, [props._id]);

  const handleCommentSubmit = () => {
    fetch("/api/comment/new", {
      method: "POST",
      body: JSON.stringify({ comment: comment, _id: props._id }),
    })
      .then(() => {
        fetch(`/api/comment/list?id=${props._id}`)
          .then((r) => r.json())
          .then((result) => {
            setData(result);
            setComment(""); // 입력값을 초기화
          });
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    fetch("/api/comment/delete", {
      method: "POST",
      body: JSON.stringify({ id: id }), // 댓글 ID를 전송
    })
      .then(() => {
        fetch(`/api/comment/list?id=${props._id}`)
          .then((r) => r.json())
          .then((result) => {
            setData(result); // 댓글 목록 갱신
          });
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = (id, content) => {
    setEditCommentId(id);
    setEditCommentContent(content);
  };

  const handleEditSubmit = (id) => {
    fetch("/api/comment/edit", {
      method: "POST",
      body: JSON.stringify({ id: id, comment: editCommentContent }), // 수정된 댓글 내용 전송
    })
      .then(() => {
        fetch(`/api/comment/list?id=${props._id}`)
          .then((r) => r.json())
          .then((result) => {
            setData(result);
            setEditCommentId(null);
            setEditCommentContent("");
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div style={{ padding: "15px" }}>
      <p>댓글</p>
      <div>
        <div style={{ padding: "10px" }}>
          <input
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            style={{ width: "500px", fontSize: "20px" }}
          />
          <button
            onClick={handleCommentSubmit}
            style={{ width: "100px", fontSize: "20px", marginLeft: "10px" }}
          >
            댓글전송
          </button>
        </div>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {data.length > 0
            ? data.map((a, i) => (
                <li key={i} style={{ marginBottom: "10px" }}>
                  <div
                    style={{
                      height: "auto",
                      display: "flex",
                      borderBottom: "0.5px solid gray",
                      padding: "5px",
                    }}
                  >
                    <div style={{ padding: "3px" }}>
                      <img
                        src="/user.png"
                        style={{ width: "45px", paddingTop: "15px" }}
                        alt="user"
                      />
                    </div>
                    <div
                      style={{
                        padding: "0 0 0 20px",
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      {editCommentId === a._id ? (
                        <div>
                          <input
                            value={editCommentContent}
                            onChange={(e) =>
                              setEditCommentContent(e.target.value)
                            }
                            style={{ width: "500px", fontSize: "20px" }}
                          />
                          <button
                            onClick={() => handleEditSubmit(a._id)}
                            style={{
                              width: "100px",
                              fontSize: "20px",
                              marginLeft: "10px",
                            }}
                          >
                            수정완료
                          </button>
                        </div>
                      ) : (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div style={{ display: "flex" }}>
                            <p
                              style={{
                                borderBottom: "1px solid lightgray",
                                width: "30%",
                              }}
                            >
                              {a.author_name}
                            </p>
                            <div
                              style={{
                                width: "70%",
                                textAlign: "right",
                                alignContent: "center",
                                padding: "10px",
                              }}
                            >
                              <button
                                onClick={() => handleEdit(a._id, a.content)}
                                style={{ border: "0", background: "none" }}
                              >
                                수정
                              </button>
                              <button
                                onClick={() => handleDelete(a._id)}
                                style={{ border: "0", background: "none" }}
                              >
                                삭제
                              </button>
                            </div>
                          </div>
                          <p style={{ marginTop: "-5px" }}>{a.date}</p>
                          <p style={{ marginTop: "-10px" }}>{a.content}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))
            : "댓글 없음"}
        </ul>
      </div>
    </div>
  );
}
