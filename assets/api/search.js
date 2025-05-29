import API from "./api";

export const searchGlobal = async (query) => {
  console.log(`🔗 URL solicitada: /search?query=${query}`);
  const response = await API.get('/search', {
    params: { query },
  });
  return response.data; 
};