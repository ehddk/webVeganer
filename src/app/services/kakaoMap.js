"use client";
import React, { useEffect, useState } from "react";

function KakaoMap({ address }) {
  const [map, setMap] = React.useState(null);
  const [marker, setMarker] = React.useState(null);
  const _map = React.useRef(null);

  React.useEffect(() => {
    kakao.maps.load(() => {
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      var map = new kakao.maps.Map(_map.current, options);
      //지오코딩: 문자열 주소를 위.경도로 변환해주는 것.
      const geocoder = new kakao.maps.services.Geocoder();
      //const markerPosition=new window.kakao.maps.LatLng(coords.lat,coords.lon);

      geocoder.addressSearch(`${address}`, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          var infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">여기!</div>',
          });
          infowindow.open(map, marker);
          map.setCenter(coords);
        }
      });
    });
    // marker.setMap(map);
    //setMap(map);
    setMap(_map);
    setMarker(marker);
  }, [address]); // useEffect의 의존성 배열에 address 추가

  useEffect(() => {
    if (!marker || !map) {
      return;
    }

    const location = new window.kakao.maps.LatLng(coords.lat, coords.lon);

    if (map && marker) {
      map.setCenter(location);
      marker.setPosition(location);
    }
  }, [map, marker]);
  return <div ref={_map} style={{ width: "100%", height: "500px" }}></div>;
}

export default KakaoMap;
