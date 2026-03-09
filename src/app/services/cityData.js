"use client";
import React, { useState } from "react";
import hangjungdong from "../services/map"; // 경로 확인 필요

export default function CityData({ onSelectLocation }) {
  const [selectedSido, setSelectedSido] = useState(null);
  const [sigugunList, setSigugunList] = useState([]);
  const [selectedSigugun, setSelectedSigugun] = useState(null);
  const [selectedDong, setSelectedDong] = useState(null);
  const [dongList, setDongList] = useState([]);

  const [selectedCodeNm, setSelectedCodeNm] = useState(null);

  // hangjungdong이 유효한 값인지 확인
  if (
    !hangjungdong ||
    !hangjungdong.sido ||
    !Array.isArray(hangjungdong.sido)
  ) {
    return <div>No data available</div>;
  }

  const codeNmList = hangjungdong.sido.map((item) => item.codeNm);

  const handleSidoClick = (sidoCode) => {
    // 선택된 시/도에 해당하는 시/군/구 목록 업데이트
    const selectedSigugunList = hangjungdong.sigugun
      .filter((item) => item.sido === sidoCode)
      .map((item) => ({ sigugun: item.sigugun, codeNm: item.codeNm }));

    setSelectedSido(sidoCode);
    setSigugunList(selectedSigugunList);
    setSelectedSigugun(null); // 시/도가 바뀌면 시/군/구 초기화
    setDongList([]);
  };

  const handleSigugunClick = (sigugunCode, sigugunCodeNm) => {
    // 선택된 시/도와 시/군/구에 해당하는 동 목록 업데이트
    const selectedDongList = hangjungdong.dong
      .filter(
        (item) => item.sido === selectedSido && item.sigugun === sigugunCode
      )
      .map((item) => item.codeNm);

    const selectedSigugunCodeNm = hangjungdong.sigugun.find(
      (item) => item.sido === selectedSido && item.sigugun === sigugunCode
    )?.codeNm;

    setSelectedSigugun(sigugunCode);

    setDongList(selectedDongList);
    setSelectedCodeNm(selectedSigugunCodeNm);
    onSelectLocation(selectedSigugunCodeNm);
  };
  // console.log("click",sigugunList[0].codeNm)

  const handleDongClick = (dongCode) => {
    setSelectedDong(dongCode);
    // onSelectedDong(dongCode);
  };
  console.log("click", selectedCodeNm);
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          borderRight: "3px solid navy",
          width: "200px",
          overflow: "auto",
          maxHeight: "450px",
        }}
      >
        <ul
          style={{ listStyleType: "none", fontSize: "20px", padding: "15px" }}
        >
          {codeNmList.map((codeNm, index) => (
            <li
              key={index}
              onClick={() => handleSidoClick(hangjungdong.sido[index].sido)}
              style={{
                background:
                  selectedSido === hangjungdong.sido[index].sido
                    ? "navy"
                    : "transparent",
                color:
                  selectedSido === hangjungdong.sido[index].sido
                    ? "white"
                    : "black",
                cursor: "pointer",
                padding: "10px",
              }}
            >
              {codeNm}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          overflowY: "auto",
          width: "150px",
          fontSize: "20px",
          padding: "14px 10px 0 0px",
          maxHeight: "430px",
          borderRight: "3px solid navy",
          marginLeft: "5px",
        }}
      >
        <ul style={{ listStyleType: "none" }}>
          {sigugunList.map((sigugun, index) => (
            <li
              key={index}
              onClick={() => handleSigugunClick(sigugun.sigugun)}
              style={{
                background:
                  selectedSigugun === sigugun.sigugun ? "navy" : "transparent",
                color: selectedSigugun === sigugun.sigugun ? "white" : "black",
                cursor: "pointer",
                padding: "10px",
              }}
            >
              {sigugun.codeNm}
            </li>
          ))}
        </ul>
      </div>
      {/* <div style={{ overflowY: "auto", maxHeight: "410px", width: "170px", fontSize: "20px", padding: "15px" }}>
        <ul style={{ listStyleType: "none" }}>
          {dongList.map((dong, index) => (
            <li key={index} onClick={()=> handleDongClick(dong)} style={{
              background: selectedDong === dong? "navy":"transparent",
              color: selectedDong ===  dong ? "white" : "black",
              cursor:"pointer",
              padding:"10px"
            }}>{dong} </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
