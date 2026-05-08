"use client";
import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}
type KakaoMapProps = {
  address: string;
};

function KakaoMap({ address }: KakaoMapProps) {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // 카카오맵 스크립트 로드 함수
  const loadKakaoMapScript = () => {
    if (window.kakao && window.kakao.maps) {
      setIsMapLoaded(true);
      return;
    }

    const script = document.createElement("script");
    console.log(
      "NEXT_PUBLIC_KAKAO_MAP_API_KEY",
      process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY
    );
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsMapLoaded(true);
      });
    };
    document.head.appendChild(script);
  };

  // 컴포넌트 마운트 시 스크립트 로드
  useEffect(() => {
    loadKakaoMapScript();
  }, []);

  // 스크립트 로드 완료 및 주소 변경 시 지도 초기화
  useEffect(() => {
    if (isMapLoaded && mapRef.current) {
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapRef.current, options);

      if (address) {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(
          address,
          function (result: { x: any; y: any }[], status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );

              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });

              const infowindow = new window.kakao.maps.InfoWindow({
                content:
                  '<div style="width:150px;text-align:center;padding:6px 0;">여기!</div>',
              });

              infowindow.open(map, marker);
              map.setCenter(coords);
            } else {
              console.error("주소를 찾을 수 없습니다:", address);
            }
          }
        );
      }
    }
  }, [isMapLoaded, address]);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }}></div>;
}

export default KakaoMap;
