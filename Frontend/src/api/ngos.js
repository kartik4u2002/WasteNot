import { API_BASE_URL } from "./config";

export async function fetchNGOs() {
  const res = await fetch(`${API_BASE_URL}/ngos`);
  if (!res.ok) throw new Error("Failed to fetch NGOs");
  return res.json();
}
