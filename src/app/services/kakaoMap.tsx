// import React, { useEffect, useState, useRef } from "react";

// declare global {
//   interface Window {
//     naver: any;
//   }
// }

// const NAVER_CLIENT_ID = "jwjhld9nul";

// function naverMap({ address }) {
//   const [map, setMap] = useState(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const initMap = () => {
//       if (window.naver && mapRef.current) {
//         const mapOptions = {
//           center: new window.naver.maps.LatLng(33.450701, 126.570667),
//           zoom: 14,
//           // zoomControl: true,
//           // zoomControlOptions: {
//           //   position: window.naver.maps.Position.TOP_RIGHT,
//           // },
//         };

//         const map = new window.naver.maps.Map(mapRef.current, mapOptions);
//         setMap(map);

//         //  주소가 있고 지오코딩 서비스가 로드되었다면 실행
//         if (address && window.naver.maps.Service) {
//           const geocoder = new window.naver.maps.Service.Geocoder();

//           geocoder.geocode(
//             {
//               query: address,
//             },
//             function (status, response) {
//               if (status === window.naver.maps.Service.Status.ERROR) {
//                 return console.error("주소 변환 중 오류 발생");
//               }

//               if (response.v2.meta.totalCount > 0) {
//                 const item = response.v2.addresses[0];
//                 const point = new window.naver.maps.LatLng(item.y, item.x);

//                 // 마커 생성
//                 const marker = new window.naver.maps.Marker({
//                   position: point,
//                   map: map,
//                 });

//                 // 지도 중심 이동
//                 map.setCenter(point);
//               }
//             }
//           );
//         }
//       }
//     };

//     const loadNaverMapScript = () => {
//       const isScriptExist = document.getElementById("naver-map-script");

//       if (!isScriptExist) {
//         const script = document.createElement("script");
//         script.id = "naver-map-script"; // ⭐ id 부여
//         script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=jwjhld9nul`;
//         script.async = true;
//         script.onload = initMap;
//         document.head.appendChild(script);
//       } else {
//         // 이미 스크립트 있으면 바로 지도 초기화
//         initMap();
//       }
//     };

//     // 네이버 지도 API가 로드되었는지 확인
//     if (window.naver && window.naver.maps) {
//       initMap();
//     } else {
//       // 네이버 지도 API 로드
//       loadNaverMapScript();
//     }
//     return () => {
//       setMap(null);
//     };
//   }, [address]);

//   return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
// }

// export default naverMap;

"use client";
import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

function KakaoMap({ address }) {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // 카카오맵 스크립트 로드 함수
  const loadKakaoMapScript = () => {
    if (window.kakao && window.kakao.maps) {
      setIsMapLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=3194bc88619c6b9c355339ca479ff975&autoload=false&libraries=services`;
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

        geocoder.addressSearch(address, function (result, status) {
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
        });
      }
    }
  }, [isMapLoaded, address]);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }}></div>;
}

export default KakaoMap;
