import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBaseUrl } from "../utils/utils";
const url = getBaseUrl();
//const url = import.meta.env.VITE_SERVER_URL;

const voteQuestion = async (voteData) => {
  const response = await fetch(`${url}/api/votes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(voteData),
  });

  if (!response.ok) {
    throw new Error('Failed to vote on question');
  }

  return response.json();
};

export const useVoteQuestion = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: voteQuestion,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['selectedProposal'] });
      queryClient.invalidateQueries({ queryKey: ['userVotes', userId] });
    },
  });
};