"use client";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

type LeafletMapProps = {
  address: string;
};

const CITY_REGEX =
  /(서울특별시|부산광역시|대구광역시|인천광역시|광주광역시|대전광역시|울산광역시|세종특별자치시|경기도|강원도|강원특별자치도|충청북도|충청남도|전라북도|전북특별자치도|전라남도|경상북도|경상남도|제주특별자치도)/;
const DISTRICT_REGEX = /(\S+?[구시군])/;
const ROAD_REGEX = /(\S*?[로길])\s*(\d+(?:-\d+)?)/;

function buildAddressVariants(raw: string): string[] {
  const city = raw.match(CITY_REGEX)?.[1];
  const district = raw.match(DISTRICT_REGEX)?.[1];
  const roadMatch = raw.match(ROAD_REGEX);
  const road = roadMatch?.[1];
  const num = roadMatch?.[2];

  const variants: string[] = [];

  if (city && district && road && num) {
    variants.push(`${city} ${district} ${road} ${num}`);
  }
  if (district && road && num) {
    variants.push(`${district} ${road} ${num}`);
  }
  if (road && num) {
    variants.push(`${road} ${num}`);
  }
  variants.push(raw);

  return Array.from(new Set(variants));
}

async function geocode(
  address: string
): Promise<{ lat: number; lon: number } | null> {
  for (const query of buildAddressVariants(address)) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&limit=1&countrycodes=kr`;
    const res = await fetch(url, { headers: { "Accept-Language": "ko" } });
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
    }
  }
  return null;
}

function LeafletMap({ address }: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || !address) return;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;

      // Next.js 번들러에서 기본 마커 아이콘이 깨지는 이슈 우회
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      try {
        const coords = await geocode(address);
        if (cancelled) return;
        if (!coords) {
          console.error("주소를 찾을 수 없습니다:", address);
          return;
        }

        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }

        const map = L.map(containerRef.current!).setView(
          [coords.lat, coords.lon],
          16
        );
        mapInstanceRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(map);

        L.marker([coords.lat, coords.lon])
          .addTo(map)
          .bindPopup("여기!")
          .openPopup();
      } catch (err) {
        console.error("지도 로딩 실패:", err);
      }
    })();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [address]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "500px" }} />
  );
}

export default LeafletMap;
