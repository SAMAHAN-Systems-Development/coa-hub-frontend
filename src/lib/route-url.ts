const RAW_BASE_PATH: string = "/coahub";

export const BASE_PATH =
  RAW_BASE_PATH && RAW_BASE_PATH !== "/"
    ? `/${RAW_BASE_PATH.replace(/^\/+|\/+$/g, "")}` 
    : "";

function isAbsoluteUrl(path: string): boolean {
  return /^(?:[a-z]+:)?\/\//i.test(path);
}

function normalizePath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

export function withBasePath(path: string): string {
  if (!path || isAbsoluteUrl(path)) return path;
  const normalizedPath = normalizePath(path);
  return BASE_PATH ? `${BASE_PATH}${normalizedPath}` : normalizedPath;
}

export function stripBasePath(path: string): string {
  if (!path || !BASE_PATH) return path;
  if (path === BASE_PATH) return "/";
  return path.startsWith(`${BASE_PATH}/`) ? path.slice(BASE_PATH.length) : path;
}
