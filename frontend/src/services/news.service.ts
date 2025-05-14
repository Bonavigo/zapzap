import { INews } from "../interfaces/news.interface";
import { apiClientService } from "./api-client.service";

class NewsService {
  async getAllNews(): Promise<INews[]> {
    try {
      return await apiClientService.get<INews[]>("/news");
    } catch (error) {
      console.error("Erro ao buscar por notícias:", error);
      return [];
    }
  }
}

export const newsService = new NewsService();
