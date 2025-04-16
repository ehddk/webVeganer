"use client";
import React, { useEffect, useState } from "react";
import styles from "./Food.view.module.scss";
import cn from "classnames/bind";
import SearchBox from "../../components/SearchBox/SearchBox";
import Modal from "../../components/Modal/Modal";
import seoulList from "@/app/services/seoulData";
import { useRouter } from "next/navigation";
import InfoModal from "@/components/Modal/InfoModal/InfoModal";

const cx = cn.bind(styles);

function FoodView() {
  let router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchFood, setSearchFood] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectedLocation = (selectedCodeNm) => {
    setSelectedLocation(selectedCodeNm);
  };

  // 검색어 변경 핸들러
  const handleSearch = (e) => {
    setSearchFood(e.target.value);
  };

  // 데이터 필터링
  useEffect(() => {
    const filterRestaurants = () => {
      const filteredByLocation = selectedLocation
        ? seoulList.data.filter(
            (item) =>
              item.crtfc_gbn_nm === "채식음식점" &&
              item.cgg_code_nm === selectedLocation
          )
        : seoulList.data.filter((item) => item.crtfc_gbn_nm === "채식음식점");

      // 검색 결과에 따라 데이터 필터링
      const filteredBySearch = searchFood
        ? filteredByLocation.filter((item) =>
            item.upso_nm.toLowerCase().includes(searchFood.toLowerCase())
          )
        : filteredByLocation;

      setFilteredRestaurants(filteredBySearch);
    };
    filterRestaurants();
  }, [selectedLocation, searchFood]);

  return (
    <>
      <SearchBox
        value={searchFood}
        onChange={handleSearch}
        placeholder="찾으시는 음식점을 입력해주세요"
      />
      <div className={cx("Banner")}>
        <div className={cx("Content")}>
          <h2>원하는 지역을 선택하세요</h2>
          <button onClick={handleModal} className={cx("Button")}>
            지역 찾기
          </button>
        </div>
      </div>

      <div className={cx("Grid")}>
        {filteredRestaurants.map((restaurant, index) => (
          <div
            className={cx("Item")}
            key={index}
            onClick={() =>
              router.push(
                `/Food/info?name=${restaurant.upso_nm}&loca=${restaurant.cgg_code_nm}`
              )
            }
          >
            <div className={cx("Thumbnail")}>
              <img src="https://picsum.photos/200/200" />
            </div>
            <div className={cx("RestaurantInfo")}>
              <p>{restaurant.upso_nm}</p>
              <p>{restaurant.cgg_code_nm}</p>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <InfoModal onClose={closeModal} responsive={true}>
          <Modal
            onCheck={undefined}
            onClose={undefined}
            onSelectedLocation={undefined}
          />
        </InfoModal>
      )}
    </>
  );
}

export default FoodView;
