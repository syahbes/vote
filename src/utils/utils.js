export function getTimeRemaining(endTime) {
  const now = new Date();
  const end = new Date(endTime);
  const diff = end - now;

  if (diff <= 0) {
    return "Voting ended";
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} remaining`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} remaining`;
  } else {
    return "Less than an hour remaining";
  }
}

export function getFormattedWalletAddress(address) {
  if (!address) return "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function getBaseUrl() {
  return import.meta.env.VITE_SERVER_URL;
  //return "https://votingserver-production.up.railway.app";
}

export async function handleAuthentication(address, message, signature) {
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
      console.log("Authenticated successfully");
      localStorage.setItem("authToken", data.token);
      return data;
    }

    console.log("Authentication failed or token missing");
    handelUnauthorized();
    return null;
  } catch (error) {
    console.error("Error during authentication:", error);
    handelUnauthorized();
    throw error;
  }
}

export function handelUnauthorized() {
  console.log("Unauthorized access. Please log in again.");
  localStorage.removeItem("authToken");
  //  window.location.reload();
}
