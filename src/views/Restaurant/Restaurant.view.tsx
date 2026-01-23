"use client";
import React, { useEffect, useState } from "react";
import styles from "./Restaurant.view.module.scss";
import cn from "classnames/bind";
import SearchBox from "../../components/SearchBox/SearchBox";
import Modal from "../../components/Modal/Modal";
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

  let router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchFood, setSearchFood] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goDetail = (id: string) => {
    router.push(LINK_ROUTE.RESTAURANT.DETAIL.uri({ id }));
  };
  const handleModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectedLocation = (selectedCityName: string) => {
    // 2. 상태 업데이트
    setSelectedLocation(selectedCityName);
    // 3. 모달 닫기
    closeModal();
  };

  // 검색어 변경 핸들러
  const handleSearch = (e: any) => {
    setSearchFood(e.target.value);
  };

  const filteredRestaurants = React.useMemo(() => {
    if (searchFood) {
      return data.filter((item) =>
        item.upso_name.toLowerCase().includes(searchFood.toLowerCase())
      );
    }
    //검색어가 없을 경우 지역 필터 적용
    else if (selectedLocation) {
      return data.filter((item) => item.cgg_code_name === selectedLocation);
    }

    return data;
  }, [selectedLocation, searchFood, data]);

  return (
    <div className={cx("Wrapper")}>
      <SearchBox
        value={searchFood}
        onChange={handleSearch}
        placeholder="찾으시는 음식점을 입력해주세요"
      />
      <div className={cx("Banner")}>
        <div className={cx("Content")}>
          <h2>원하는 지역을 선택하세요</h2>
          <button onClick={handleModal} className={cx("Button")}>
            {selectedLocation || "지역 찾기"}
          </button>
        </div>
      </div>

      {filteredRestaurants.length > 0 ? (
        <div className={cx("Grid")}>
          {filteredRestaurants.map((restaurant) => {
            const imageUrl = restaurant.initialBlogImages?.[0];
            return (
              <div
                className={cx("Item")}
                key={restaurant.id}
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
      ) : (
        <div className={cx("EmptyPage")}>
          <p>해당 데이터가 없습니다.</p>
        </div>
      )}

      {isModalOpen && (
        <InfoModal onClose={closeModal} responsive={true}>
          <Modal
            onClose={closeModal}
            onSelectLocation={handleSelectedLocation}
            currentSelectedCity={selectedLocation}
          />
        </InfoModal>
      )}
    </div>
  );
}

export default RestaurantView;
