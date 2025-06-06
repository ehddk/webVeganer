"use client";
import City from "@/app/services/cityData";
import { useState } from "react";
import hangjungdongData from "@/app/services/map";
import styles from "./Modal.module.scss";
import cn from "classnames/bind";
const cx = cn.bind(styles);

type ModalProps = {
  onCheck?: boolean;
  onClose?: () => void;
  onSelectedLocation?: (location: string) => void;
};
function Modal(props: ModalProps) {
  const { onSelectedLocation, onClose, onCheck } = props;
  //const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSido, setSelectedSido] = useState(null);
  const [selectedSigugun, setSelectedSigugun] = useState(null);
  const [selectedDong, setSelectedDong] = useState(null);
  const [selectedCodeNm, setSelectedCodeNm] = useState(null);

  const handleCity = () => {};

  const handleSelectedLocation = (codeNm) => {
    console.log("선택된 지역:", codeNm);
    setSelectedCodeNm(codeNm);
  };
  const handleSave = () => {
    console.log("완료 버튼 클릭, 선택된 지역:", selectedCodeNm);
    if (onSelectedLocation && selectedCodeNm) {
      onSelectedLocation(selectedCodeNm);
    }
    if (onClose) {
      onClose();
    }
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
        <div>
          <div className={cx("Content")}>
            <div>
              <p className={cx("Title")}>지역 선택</p>
            </div>
            <div>
              <div>
                <ul className={cx("CityList")}>
                  <City
                    hangjungdong={hangjungdong}
                    onSelectLocation={handleSelectedLocation}
                    onSelectedDong={handleCitySelection}
                    // style={{ fontSize: "13px" }}
                    onClick={handleCity}
                  />
                </ul>
              </div>
            </div>
            <div className={cx("Button")}>
              {" "}
              <button className={cx("Save")} onClick={handleSave}>
                완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
