import { useQuery } from "@tanstack/react-query";
import { getBaseUrl } from "../utils/utils";
import { getAuthToken } from "../utils/auth";

const url = getBaseUrl();

const fetchUserVotes = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("Failed to fetch user votes. No token found.");
  }
  const response = await fetch(`${url}/api/votes/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (response.status === 403) {
    throw new Error("Unauthorized access. Please log in again.");
  }
  if (!response.ok) {
    throw new Error("Failed to fetch user votes");
  }
  return response.json();
};

export const useUserVotes = () => {
  return useQuery({
    queryKey: ["userVotes"],
    queryFn: fetchUserVotes,
  });
};
