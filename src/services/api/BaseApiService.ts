import { apiClient } from "@/api";
import { unwrapResponse } from "@/api/responseAdapter";

export abstract class BaseApiService<T> {
  constructor(protected readonly endpoint: string) {}

  async getAll(): Promise<T[]> {
    const { data } = await apiClient.get(this.endpoint);

    return unwrapResponse<T[]>(data);
  }

  async getById(id: string | number): Promise<T> {
    const { data } = await apiClient.get(`${this.endpoint}/${id}`);

    return unwrapResponse<T>(data);
  }

  async create(payload: Partial<T>): Promise<T> {
    const { data } = await apiClient.post(this.endpoint, payload);

    return unwrapResponse<T>(data);
  }

  async update(
    id: string | number,
    payload: Partial<T>
  ): Promise<T> {
    const { data } = await apiClient.put(
      `${this.endpoint}/${id}`,
      payload
    );

    return unwrapResponse<T>(data);
  }

  async delete(id: string | number): Promise<void> {
    await apiClient.delete(`${this.endpoint}/${id}`);
  }
}