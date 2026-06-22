"use client";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

type LeafletMapProps = {
  address: string;
  // 저장된 좌표가 있으면 지오코딩 없이 바로 사용한다.
  lat?: number;
  lon?: number;
};

// 같은 출처(Next 서버) 프록시를 통해 지오코딩한다 → 브라우저 CORS 회피
async function geocode(
  address: string
): Promise<{ lat: number; lon: number } | null> {
  try {
    const res = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (typeof data?.lat === "number" && typeof data?.lon === "number") {
      return { lat: data.lat, lon: data.lon };
    }
  } catch {
    return null;
  }
  return null;
}

function isValidCoord(v?: number): v is number {
  return typeof v === "number" && !Number.isNaN(v) && v !== 0;
}

function LeafletMap({ address, lat, lon }: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || (!address && !(isValidCoord(lat) && isValidCoord(lon))))
      return;
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
        // 저장된 좌표가 있으면 우선 사용, 없으면 주소로 지오코딩
        const coords =
          isValidCoord(lat) && isValidCoord(lon)
            ? { lat: lat as number, lon: lon as number }
            : await geocode(address);
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
  }, [address, lat, lon]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "500px" }} />
  );
}

export default LeafletMap;
