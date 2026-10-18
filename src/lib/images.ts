const files = import.meta.glob(
  "/src/assets/images/**/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;
export function getImage(key: string): string | undefined {
  const prefix = `/src/assets/images/${key.toLowerCase()}.`;
  return Object.entries(files).find(([path]) =>
    path.toLowerCase().startsWith(prefix),
  )?.[1];
}
