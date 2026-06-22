import { NextRequest, NextResponse } from "next/server";

/**
 * 주소 → 좌표 지오코딩 서버 프록시.
 * 브라우저가 Nominatim 을 직접 호출하면 CORS 에러가 나므로,
 * 같은 출처(Next 서버)에서 대신 호출해 좌표만 내려준다.
 */

const CITY_REGEX =
  /(서울특별시|부산광역시|대구광역시|인천광역시|광주광역시|대전광역시|울산광역시|세종특별자치시|경기도|강원도|강원특별자치도|충청북도|충청남도|전라북도|전북특별자치도|전라남도|경상북도|경상남도|제주특별자치도)/;
const DISTRICT_REGEX = /(\S+?[구시군])/;
const ROAD_REGEX = /(\S*?[로길])\s*(\d+(?:-\d+)?)/;

function buildAddressVariants(raw: string): string[] {
  const city = raw.match(CITY_REGEX)?.[1];
  // 도시명이 자치구 자리에 중복 매칭되는 것을 방지
  const rest = city ? raw.replace(city, "").trim() : raw;
  const district = rest.match(DISTRICT_REGEX)?.[1];
  const roadMatch = raw.match(ROAD_REGEX);
  const road = roadMatch?.[1];
  const num = roadMatch?.[2];

  const variants: string[] = [];
  if (city && district && road && num)
    variants.push(`${city} ${district} ${road} ${num}`);
  if (district && road && num) variants.push(`${district} ${road} ${num}`);
  if (city && road && num) variants.push(`${city} ${road} ${num}`);
  if (road && num) variants.push(`${road} ${num}`);
  variants.push(raw);

  return Array.from(new Set(variants));
}

// 동일 주소 반복 조회를 줄이기 위한 단순 메모리 캐시
const cache = new Map<string, { lat: number; lon: number } | null>();

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address")?.trim();
  if (!address) {
    return NextResponse.json(
      { error: "address 쿼리가 필요합니다." },
      { status: 400 }
    );
  }

  if (cache.has(address)) {
    const cached = cache.get(address);
    return cached
      ? NextResponse.json(cached)
      : NextResponse.json(
          { error: "주소를 찾을 수 없습니다." },
          { status: 404 }
        );
  }

  for (const query of buildAddressVariants(address)) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&limit=1&countrycodes=kr`;
      const res = await fetch(url, {
        headers: {
          "Accept-Language": "ko",
          "User-Agent": "veganer-app/1.0 (restaurant-geocoding)",
        },
        // Nominatim 응답을 하루 캐시
        next: { revalidate: 60 * 60 * 24 },
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const coords = {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        };
        cache.set(address, coords);
        return NextResponse.json(coords);
      }
    } catch {
      // 다음 변형으로 진행
    }
  }

  cache.set(address, null);
  return NextResponse.json(
    { error: "주소를 찾을 수 없습니다." },
    { status: 404 }
  );
}
