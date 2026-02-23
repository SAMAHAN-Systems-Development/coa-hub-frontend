const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetUrl(path: string): string {
  if (!path) return path;

  // Keep absolute/data/blob URLs unchanged.
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith("data:") || path.startsWith("blob:")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${normalizedPath}`;
}

