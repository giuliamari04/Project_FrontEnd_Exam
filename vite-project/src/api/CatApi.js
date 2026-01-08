const CAT_API_URL = "https://api.thecatapi.com/v1/images/search?limit=24&has_breeds=true";
const API_KEY = import.meta.env.VITE_CAT_API_KEY;

async function CatApi(page=1) {
  const response = await fetch(`${CAT_API_URL}&page=${page}`, {
    headers: {
      "x-api-key": API_KEY
    }
  });

  if (!response.ok) {
    throw new Error("CAT API not working");
  }

  const data = await response.json();
  console.log("CAT API TEST RESPONSE:", data);
  return data; // ritorna i dati, senza hook
}

export default CatApi;