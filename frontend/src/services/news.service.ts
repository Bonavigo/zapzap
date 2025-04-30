const API_URL = "http://localhost:8080";

class NewsService {
  async getAllNews(): Promise<any> {
    const response = await fetch(`${API_URL}/news`);

    return response.json();
  }
}

export const newsService = new NewsService();
