import { useQuery } from "@tanstack/react-query";
import { getBaseUrl, handelUnauthorized } from "../utils/utils";

const url = getBaseUrl();

const fetchUserVotes = async ({ queryKey }) => {
  const userId = queryKey[1];

  const token = localStorage.getItem("authToken");
  const response = await fetch(`${url}/api/votes/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  // if (response.status === 403) { 
  //   handelUnauthorized();
  // }
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized access. Please log in again.");
    }
    throw new Error("Failed to fetch user votes");
  }
  return response.json();
};

export const useUserVotes = (userId) => {
  return useQuery({
    queryKey: ["userVotes", userId],
    queryFn: fetchUserVotes,
    enabled: !!userId, // Only run the query if userId is provided
  });
};
