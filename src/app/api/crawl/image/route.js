// import axios from "axios";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//   const url = new URL(request.url);
//   const query = url.searchParams.get("query");
//   if (!query) {
//     return NextResponse.json(
//       { message: "Query parameter is required" },
//       { status: 400 }
//     );
//   }

//   const client_id = "ClEKLai7dCr4uthTSBFO";
//   const client_secret = "W5QAxO73yq";
//   // const refinedQuery = `${query} 음식점`;

//   const api_url = `https://openapi.naver.com/v1/search/image?query=${encodeURIComponent(refinedQuery)}&display=10&start=1&sort=sim`;

//   try {
//     const response = await axios.get(api_url, {
//       headers: {
//         "X-Naver-Client-Id": client_id,
//         "X-Naver-Client-Secret": client_secret,
//       },
//     });

//     if (response.status === 200) {
//       const items = response.data.items.map((item) => ({
//         ...item,
//         title: item.title.replace(/<b>/g, "").replace(/<\/b>/g, ""),
//         link: item.link,
//         thumbnail: item.thumbnail,
//         sizeheight: item.sizeheight,
//         sizewidth: item.sizewidth,
//       }));
//       return NextResponse.json({ items });
//     } else {
//       return NextResponse.json(
//         { message: "Error fetching data from Naver API" },
//         { status: response.status }
//       );
//     }
//   } catch (error) {
//     console.error("Error fetching Naver search results:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
