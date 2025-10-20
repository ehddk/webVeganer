"use client";
import React, { useEffect, useState } from "react";
import styles from "./Restaurant.view.module.scss";
import cn from "classnames/bind";
import SearchBox from "../../components/SearchBox/SearchBox";
import Modal from "../../components/Modal/Modal";
import seoulList from "@/app/services/seoulData";
import { useRouter } from "next/navigation";
import InfoModal from "@/components/Modal/InfoModal/InfoModal";
import { LINK_ROUTE } from "@/constants/link.constants";
import { RestaurantImage } from "@/components/RestaurantImage/RestaurantImage";

const cx = cn.bind(styles);

type RestaurantViewProps = {
  data: Array<
    Restaurant.GetList.Response[number] & { initialBlogImages: string[] }
  >;
};

function RestaurantView(props: RestaurantViewProps) {
  const { data } = props;
  console.log("dataaaa00", data);
  let router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchFood, setSearchFood] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goDetail = (id: string) => {
    console.log("hi");
    router.push(LINK_ROUTE.RESTAURANT.DETAIL.uri({ id }));
  };
  const handleModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const handleSelectedLocation = (selectedCodeNm) => {
  //   setSelectedLocation(selectedCodeNm);
  // };

  // 검색어 변경 핸들러
  const handleSearch = (e) => {
    setSearchFood(e.target.value);
  };

  // 데이터 필터링
  useEffect(() => {
    const filterRestaurants = () => {
      const filteredByLocation = selectedLocation
        ? data.filter((item) => item.cgg_code_name === selectedLocation)
        : data;

      // 검색 결과에 따라 데이터 필터링
      const filteredBySearch = searchFood
        ? filteredByLocation.filter((item) =>
            item.upso_name.toLowerCase().includes(searchFood.toLowerCase())
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
        {filteredRestaurants.map((restaurant, index) => {
          const imageUrl = restaurant.initialBlogImages?.[0];
          return (
            <div
              className={cx("Item")}
              key={index}
              onClick={() => goDetail(restaurant.id)}
            >
              <div className={cx("Thumbnail")}>
                <RestaurantImage src={imageUrl} alt={restaurant.upso_name} />
              </div>
              <div className={cx("RestaurantInfo")}>
                <p>{restaurant.upso_name}</p>
                <p>{restaurant.cgg_code_name}</p>
              </div>
            </div>
          );
        })}
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

export default RestaurantView;
