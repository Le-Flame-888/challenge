function buildQueryString(query?: Record<string, unknown>): string {
  if (!query || Object.keys(query).length === 0) return "";
  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, String(item)));
      } else if (typeof value === "object") {
        // Handle nested objects like filters
        Object.entries(value as Record<string, unknown>).forEach(
          ([nestedKey, nestedValue]) => {
            if (nestedValue !== undefined && nestedValue !== null) {
              const paramKey = `${key}.${nestedKey}`;
              if (Array.isArray(nestedValue)) {
                nestedValue.forEach((item) =>
                  searchParams.append(paramKey, String(item)),
                );
              } else {
                searchParams.append(paramKey, String(nestedValue));
              }
            }
          },
        );
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  return `?${searchParams.toString()}`;
}

export { buildQueryString };
