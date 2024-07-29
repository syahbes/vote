import { getBaseUrl } from "./utils";

export const AUTH_TOKEN_KEY = "tomi-authToken";

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);
export const setAuthToken = (token) =>
  localStorage.setItem(AUTH_TOKEN_KEY, token);
export const removeAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);

export async function postForToken(address, message, signature) {
  try {
    const response = await fetch(`${getBaseUrl()}/api/auth/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, message, signature }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.authenticated && data.token) {
      console.log("Authenticated successfully - postForToken");
      setAuthToken(data.token);
      return data;
    }

    console.log("Authentication failed or token missing - postForToken");
    return null;
  } catch (error) {
    console.error("Error during authentication - postForToken:", error);
    return null;
  }
}

