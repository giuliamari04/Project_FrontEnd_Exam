const DOG_API_URL = "https://api.thedogapi.com/v1/images/search?limit=24&has_breeds=true";
const API_KEY = import.meta.env.VITE_DOG_API_KEY;

async function testDogApi(page=1) {
  const response = await fetch(`${DOG_API_URL}&page=${page}`, {
    headers: {
      "x-api-key": API_KEY
    }
  });

  if (!response.ok) {
    throw new Error("Dog API not working");
  }

  const data = await response.json();
  console.log("DOG API TEST RESPONSE:", data);
  return data; // ritorna i dati, senza hook
}

export default testDogApi;