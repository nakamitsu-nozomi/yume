export const apiClient = async (path: string) => {
  const response = await fetch(`https://opendata.resas-portal.go.jp/${path}`, {
    headers: {
      'x-api-key': import.meta.env.VITE_RESAS_API_KEY,
    },
  });
  const data = await response.json();
  return data;
};
