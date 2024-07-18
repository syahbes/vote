import { useQuery } from "@tanstack/react-query";
import { getBaseUrl } from "../utils/utils";
const url = getBaseUrl();
//const url = import.meta.env.VITE_SERVER_URL;

const fetchUserVotes = async (user_id) => {
  const response = await fetch(`${url}/api/votes/user/${user_id}`);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const useUserVotes = (userId) => {
  return useQuery({
    queryKey: ["userVotes", userId],
    queryFn: () => fetchUserVotes(userId),
    enabled: !!userId, // Only run the query if userId is provided
  });
};