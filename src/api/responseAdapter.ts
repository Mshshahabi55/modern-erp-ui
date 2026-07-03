import type { ApiResponse } from "@/types/api.types";

export function unwrapResponse<T>(
  response: ApiResponse<T> | T
): T {
  if (
    typeof response === "object" &&
    response !== null &&
    "data" in response
  ) {
    return (response as ApiResponse<T>).data;
  }

  return response as T;
}