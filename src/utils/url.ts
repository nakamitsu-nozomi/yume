export const objectToUrlSearch = (object: object) => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(object)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        searchParams.append(`${key}[]`, String(v));
      }
    } else {
      searchParams.append(key, String(value));
    }
  }
  return searchParams;
};
