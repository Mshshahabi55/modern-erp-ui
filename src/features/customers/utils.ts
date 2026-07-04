export function normalize(
  value?: string | number
): string {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[-\s]/g, "");
}