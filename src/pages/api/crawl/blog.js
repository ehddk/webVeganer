import axios from "axios";

export default async function handler(req, res) {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    console.log("Search query:", decodeURIComponent(query));

    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const client_id = "qRcfVeJ1UC4E5AydKJHM";
    const client_secret = "eRZrAd2YNA";

    const api_url =
      "https://openapi.naver.com/v1/search/blog?query=" +
      encodeURIComponent(query);

    try {
      const response = await axios.get(api_url, {
        headers: {
          "X-Naver-Client-Id": client_id,
          "X-Naver-Client-Secret": client_secret,
          "Content-Type": "application/json",
        },
      });

      console.log("API response status:", response.status);

      if (response.status === 200) {
        const items = response.data.items.map((item) => ({
          ...item,
          title: item.title.replace(/<b>/g, "").replace(/<\/b>/g, ""),
          description: item.description
            .replace(/<b>/g, "")
            .replace(/<\/b>/g, ""),
        }));

        return res.status(200).json({ items });
      } else {
        return res
          .status(response.status)
          .json({ message: "Error fetching data from Naver API" });
      }
    } catch (error) {
      console.error("Error fetching Naver search results:", error.message);

      if (error.response) {
        return res.status(error.response.status || 500).json({
          message: `Naver API error: ${error.response.status}`,
          error: error.response.data,
        });
      } else if (error.request) {
        console.error("No response received:", error.request);
        return res.status(500).json({
          message: "No response from Naver API",
          error: "Request was made but no response was received",
        });
      } else {
        console.error("Error setting up request:", error.message);
        return res.status(500).json({
          message: "Error setting up request",
          error: error.message,
        });
      }
    }
  } catch (outerError) {
    console.error("Outer error:", outerError);
    return res.status(500).json({
      message: "Server error",
      error: outerError.message,
    });
  }
}
