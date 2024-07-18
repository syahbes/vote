import { useQuery } from "@tanstack/react-query";
import { getBaseUrl } from "../utils/utils";
const url = getBaseUrl();
//const url = import.meta.env.VITE_SERVER_URL;

const fetchUserVotes = async (user_id) => {
  const response = await fetch(`${url}/api/votes/user/${user_id}`);
  if (!response.ok) throw new Error("Network response was not ok");
  console.log(response.json());
  return response.json();
};

export const useUserVotes = () => {
  return useQuery({
    queryKey: ["userVotes"],
    queryFn: fetchUserVotes,
  });
};
