import { apiClient } from "@/api";

export abstract class BaseApiService<T> {
  constructor(protected readonly endpoint: string) {}

  async getAll(): Promise<T[]> {
    const { data } = await apiClient.get<T[]>(this.endpoint);
    return data;
  }

  async getById(id: string | number): Promise<T> {
    const { data } = await apiClient.get<T>(`${this.endpoint}/${id}`);
    return data;
  }

  async create(payload: Partial<T>): Promise<T> {
    const { data } = await apiClient.post<T>(this.endpoint, payload);
    return data;
  }

  async update(
    id: string | number,
    payload: Partial<T>
  ): Promise<T> {
    const { data } = await apiClient.put<T>(
      `${this.endpoint}/${id}`,
      payload
    );

    return data;
  }

  async delete(id: string | number): Promise<void> {
    await apiClient.delete(`${this.endpoint}/${id}`);
  }
}