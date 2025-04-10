"use client";
import City from "@/app/services/cityData";
import { useState } from "react";
import hangjungdongData from "@/app/services/map";
import styles from "./Modal.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);

function Modal({ onCheck, onClose, onSelectedLocation }) {
  //const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSido, setSelectedSido] = useState(null);
  const [selectedSigugun, setSelectedSigugun] = useState(null);
  const [selectedDong, setSelectedDong] = useState(null);
  const [selectedCodeNm, setSelectedCodeNm] = useState(null);

  const ModalContent = {
    width: "700px",
    height: "630px",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",

    // alignItems: "center",
    position: "fixed",
    top: "66px",
    right: "446px",
    // bottom: "190px",
    // left: "380px"
    // margin:"0 auto",
  };
  // const ModalButtons={
  //     display:"flex",
  //     justifyContent:"center",
  //     marginTop:"500px"
  // }
  const CancelButton = {
    width: "68px",
    height: "29px",
    borderRadius: "10px",
    color: "black",
    border: "none",
    cursor: "pointer",
    margin: "0 610px",
  };

  const title = {
    width: "600px",
    height: "40px",
  };

  const left = {
    width: "620px",
    height: "470px",
  };

  const handleCity = () => {};
  const save = {
    width: "100px",
    marginLeft: "270px",
    backgroundColor: "navy",
    color: "white",
    border: "0",
  };
  const handleSelectedLocation = (codeNm) => {
    setSelectedCodeNm(codeNm);
  };
  const handleSave = () => {
    onSelectedLocation(selectedCodeNm);
    onClose();
    // if (selectedSido && selectedSigugun  && selectedDong) {
    //     onSelectedLocation(selectedSido, selectedSigugun, selectedDong);
    //     onClose();
    //   }
  };
  console.log("Modal", selectedCodeNm);
  const handleCitySelection = (sido, sigugun, dong) => {
    setSelectedSido(sido);
    setSelectedSigugun(sigugun);
    setSelectedDong(dong);
  };

  const hangjungdong = hangjungdongData;
  return (
    <div>
      <div className={cx("ModalContent")}>
        <div style={{ margin: "0 auto" }}>
          {/* <button style={CancelButton} onClick={onClose}>
            X
          </button> */}
          <div className={cx("Content")}>
            <div style={title}>
              <p className={cx("Title")}>지역 선택</p>
            </div>
            <div>
              <div style={left}>
                <ul
                  style={{
                    listStyleType: "none",
                    padding: "5px",
                    marginTop: "3px",
                    fontSize: "16px",
                  }}
                >
                  <City
                    hangjungdong={hangjungdong}
                    onSelectLocation={handleSelectedLocation}
                    onSelectedDong={handleCitySelection}
                    style={{ fontSize: "13px" }}
                    onClick={handleCity}
                  />
                </ul>
              </div>
            </div>
            <button style={save} onClick={handleSave}>
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
