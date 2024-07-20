import { useQuery } from "@tanstack/react-query";
import { getBaseUrl } from "../utils/utils";

const url = getBaseUrl();
const token = localStorage.getItem("authToken");

const fetchUserVotes = async () => {
  const response = await fetch(`${url}/api/votes/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized access (e.g., token expired)
      throw new Error("Unauthorized access. Please log in again.");
    }
    throw new Error("Failed to fetch user votes");
  }
  return response.json();
};

export const useUserVotes = (userId) => {
  return useQuery({
    queryKey: ["userVotes", userId],
    queryFn: () => fetchUserVotes(userId),
    enabled: !!userId, // Only run the query if userId is provided
  });
};
