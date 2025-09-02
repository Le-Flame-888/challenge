function replaceUrlParams(
  path: string,
  params?: Record<string, unknown>,
): string {
  if (!params) return path;
  let url = path;
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, encodeURIComponent(String(value)));
  });
  return url;
}

export { replaceUrlParams };
