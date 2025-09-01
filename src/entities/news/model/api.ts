import type { NewsApiResponse } from "./types";

export const fetchNewsApi = async (
  limit = 10,
  offset = 0
): Promise<NewsApiResponse> => {
  try {
    console.log("🔄 Запрос к API: limit=", limit, "skip=", offset);
    const response = await fetch(
      `https://dummyjson.com/posts?limit=${limit}&skip=${offset}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NewsApiResponse = await response.json();
    console.log("✅ Ответ: posts=", data.posts.length, "total=", data.total);
    return data;
  } catch (e) {
    console.error("❌ Ошибка:", e);
    throw e;
  }
};
