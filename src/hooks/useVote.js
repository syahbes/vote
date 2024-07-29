import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBaseUrl } from "../utils/utils";
import { getAuthToken, handleForbiddenAccess } from "../utils/auth";

const url = getBaseUrl();

const voteQuestion = async (voteData) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("failed to vote. no token found.");
  }

  const response = await fetch(`${url}/api/votes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(voteData),
  });

  if (response.status === 403) {
    handleForbiddenAccess();
    throw new Error("Unauthorized access. Please log in again.");
  }
  if (!response.ok) {
    throw new Error("Failed to vote on question");
  }
  return response.json();
};

export const useVoteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: voteQuestion,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["selectedProposal"] });
      queryClient.invalidateQueries({ queryKey: ["userVotes"] });
    },
  });
};
