const API_URL = "http://localhost:3000";

export async function getDestinos(query = "") {
    const res = await fetch(`${API_URL}/destinos${query}`);
    return res.json();
}
