export const queryKeys = {
  customers: {
    all: ["customers"] as const,

    list: (search?: string) =>
      ["customers", "list", search] as const,

    detail: (id: number | string) =>
      ["customers", "detail", id] as const,
  },
} as const;