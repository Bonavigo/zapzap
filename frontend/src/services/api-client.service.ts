import { reactive } from "vue";

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { IChatRoom } from "../interfaces/chat-room.interface";

class ApiClientService {
  private axiosInstance: AxiosInstance;
  private baseURL = "http://localhost:8080";

  chatRooms = reactive<IChatRoom[]>([]);

  getBaseURL() {
    return this.baseURL;
  }

  setBaseURL(url: string) {
    this.baseURL = url;
    this.axiosInstance.defaults.baseURL = url;
  }

  constructor() {
    // Create axios instance with default config
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.fetchChatRooms();
  }

  // Generic request methods that can be used by other services
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  fetchChatRooms() {
    this.chatRooms = [
      { id: "geral" },
      { id: "desmatamento" },
      { id: "mudanças climáticas" },
      { id: "poluição" },
    ];
  }
}

export const apiClientService = new ApiClientService();
