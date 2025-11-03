import { API_BASE_URL } from "./config";

export async function createDonation(token, data) {
  const res = await fetch(`${API_BASE_URL}/donations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Donation failed");
  return res.json();
}
