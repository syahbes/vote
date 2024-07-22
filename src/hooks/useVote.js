import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBaseUrl } from "../utils/utils";

const url = getBaseUrl();

const voteQuestion = async (voteData) => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${url}/api/votes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(voteData),
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized access (e.g., token expired)
      throw new Error("Unauthorized access. Please log in again.");
    }
    throw new Error("Failed to vote on question");
  }
  return response.json();
};

export const useVoteQuestion = (user_id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: voteQuestion,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["selectedProposal"] });
      queryClient.invalidateQueries({ queryKey: ["userVotes", user_id] });
    },
  });
};
