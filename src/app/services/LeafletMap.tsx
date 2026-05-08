"use client";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

type LeafletMapProps = {
  address: string;
};

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

      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}&limit=1`;

      try {
        const response = await fetch(url, {
          headers: { "Accept-Language": "ko" },
        });
        const results = await response.json();

        if (cancelled) return;
        if (!Array.isArray(results) || results.length === 0) {
          console.error("주소를 찾을 수 없습니다:", address);
          return;
        }

        const lat = parseFloat(results[0].lat);
        const lon = parseFloat(results[0].lon);

        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }

        const map = L.map(containerRef.current!).setView([lat, lon], 16);
        mapInstanceRef.current = map;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(map);

        L.marker([lat, lon]).addTo(map).bindPopup("여기!").openPopup();
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
