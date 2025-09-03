function buildQueryString(params?: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) return '';

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return; // Skip undefined and null values
    }

    if (Array.isArray(value)) {
      // Handle array values
      value.forEach(item => {
        if (item !== undefined && item !== null) {
          searchParams.append(key, String(item));
        }
      });
    } else if (typeof value === 'object') {
      // Handle nested objects (if needed)
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        if (nestedValue !== undefined && nestedValue !== null) {
          searchParams.append(`${key}[${nestedKey}]`, String(nestedValue));
        }
      });
    } else {
      // Handle primitive values
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

export { buildQueryString };
