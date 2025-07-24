import type { INewsApiResponse } from "../../types/news";

export const fetchNewsApi = async (
  limit = 10,
  skip = 0
): Promise<INewsApiResponse> => {
  try {
    const response = await fetch(
      `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: INewsApiResponse = await response.json();
    return data;
  } catch (e) {
    console.error("Error fetching news:", e);
    throw e;
  }
};
