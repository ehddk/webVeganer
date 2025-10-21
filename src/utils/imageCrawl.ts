// 💡 src/utils/imageCrawler.ts (완성)

export async function fetchImagesForRestaurant(
  upsoName: string
): Promise<string[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // 🚀 수정된 API 라우트 호출
    const res = await fetch(
      `${baseUrl}/api/crawl/image?query=${encodeURIComponent(upsoName)}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      return [];
    }

    const json = await res.json();

    if (json.items) {
      // API 라우트에서 반환된 items 배열의 link를 사용
      //thumbnail보다 Link를 사용해야 고화질 이미지 !!!
      return json.items.map((item: { link: string }) => item.link);
    }
  } catch (error) {
    console.error(`Error fetching images for ${upsoName}:`, error);
  }
  return [];
}
