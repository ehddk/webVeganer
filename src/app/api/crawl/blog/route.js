// app/api/crawl/blog/route.js
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  console.log("Search query:", decodeURIComponent(query));

  if (!query) {
    return NextResponse.json(
      { message: "Query parameter is required" },
      { status: 400 }
    );
  }

  const client_id = "j1w22ee4m8";
  const client_secret = "1xCn0bm2CAosYyfKOepENWldgZOKbgJSK4ogp6oy";

  const api_url =
    "https://openapi.naver.com/v1/search/blog?query=" + encodeURI(query);

  try {
    const response = await axios.get(api_url, {
      headers: {
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
      },
    });

    if (response.status === 200) {
      const items = response.data.items.map((item) => ({
        ...item,
        title: item.title.replace(/<b>/g, "").replace(/<\/b>/g, ""),
        description: item.description.replace(/<b>/g, "").replace(/<\/b>/g, ""),
      }));

      return NextResponse.json({ items });
    } else {
      return NextResponse.json(
        { message: "Error fetching data from Naver API" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error fetching Naver search results:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
