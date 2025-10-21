"use client";

import { useState } from "react";

import styles from "./Modal.module.scss";
import cn from "classnames/bind";
import { CITIES } from "@/constants/cityData.contants";
import Button from "../Button/Button";

const cx = cn.bind(styles);

type ModalProps = {
  currentSelectedCity?: string; // 현재 선택된 구 이름
  onClose?: () => void;
  onSelectLocation: (cityName: string) => void;
};
function Modal(props: ModalProps) {
  const { onClose, currentSelectedCity, onSelectLocation } = props;

  const [selectedCity, setSelectedCity] = useState("");

  const handleSelectedLocation = (cityName: string) => {
    setSelectedCity(cityName);
  };
  const handleSave = () => {
    if (selectedCity && onSelectLocation) {
      onSelectLocation(selectedCity);
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div className={cx("Wrapper")}>
      <h2>서울 지역 선택</h2>
      <div className={cx("Content")}>
        {CITIES.map((city) => (
          <button
            key={city.id}
            onClick={() => handleSelectedLocation(city.name)}
            className={cx(
              "CityButton",
              selectedCity === city.name ? "Selected" : ""
            )}
          >
            {city.name}
          </button>
        ))}
      </div>{" "}
      <Button
        colorType="primary"
        variant="contained"
        text="선택 완료"
        onClick={handleSave}
        className={cx("SubmitBtn")}
      />
    </div>
  );
}

export default Modal;
