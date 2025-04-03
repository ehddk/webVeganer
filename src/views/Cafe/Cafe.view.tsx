"use client";
import { useEffect, useState } from "react";
import SearchBox from "../../components/SearchBox/SearchBox";
import Modal from "../../components/Modal/Modal";
import { useRouter } from "next/navigation";
import seoulList from "@/app/services/seoulData";
import styles from "./Cafe.view.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

export default function CafeView() {
  const router = useRouter();
  const [filteredCafe, setFilteredCafe] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(""); // 선택된 지역 상태 변수 추가
  const [searchCafe, setSearchCafe] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const handleMovePage=()=>{
  //     history.push('/info')
  // }
  const handleModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const filterCafes = () => {
      const filteredByLocation = selectedLocation
        ? seoulList.data.filter(
            (item) =>
              (item.bizcnd_code_nm === "베이커리" ||
                item.bizcnd_code_nm === "제과점영업" ||
                item.bizcnd_code_nm === "까페") &&
              item.cgg_code_nm === selectedLocation
          )
        : seoulList.data.filter(
            (item) =>
              item.bizcnd_code_nm === "베이커리" ||
              item.bizcnd_code_nm === "제과점영업" ||
              item.bizcnd_code_nm === "까페"
          );
      const filteredBySearch = searchCafe
        ? filteredByLocation.filter((item) =>
            item.upso_nm.toLowerCase().includes(searchCafe.toLowerCase())
          )
        : filteredByLocation;

      setFilteredCafe(filteredBySearch);
    };
    filterCafes();
  }, [selectedLocation, searchCafe]);
  const handleSelectedLocation = (selectedCodeNm) => {
    // const filteredCafe=seoulList.data.filter(item=>item.bizcnd_code_nm==="베이커리" && item.cgg_code_nm===selectedCodeNm)
    setSelectedLocation(selectedCodeNm);
  };
  //console.log("cafe",filteredCafe)
  const handleSearch = (e) => {
    setSearchCafe(e.target.value);
  };

  return (
    <>
      {/* <img src="/cafe.png" style={{ width: "100%", height: "300px" }}></img> */}
      <SearchBox
        value={searchCafe}
        onChange={handleSearch}
        placeholder="찾으시는 카페를 입력해주세요"
      />
      <div className={cx("Banner")}>
        <div className={cx("Content")}>
          <h2>원하는 지역을 선택하세요</h2>
          <button className={cx("Button")} onClick={handleModal}>
            지역 찾기
          </button>
          {isModalOpen && (
            <Modal
              onClose={closeModal}
              onSelectedLocation={handleSelectedLocation}
            ></Modal>
          )}
        </div>
      </div>
      <div className={cx("Grid")}>
        {filteredCafe.map((cafe, index) => (
          <div
            key={index}
            onClick={() =>
              router.push(
                `/Cafe/Info?name=${encodeURIComponent(cafe.upso_nm)}&loca=${cafe.cgg_code_nm}`
              )
            }
          >
            <div className={cx("Item")}></div>
            <div className={cx("RestaurantInfo")}>
              {" "}
              {/* 식당 정보 div 추가 */}
              <p>{cafe.upso_nm}</p>
              <p>{cafe.cgg_code_nm}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
