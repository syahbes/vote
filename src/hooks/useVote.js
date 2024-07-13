import { useMutation, useQueryClient } from "@tanstack/react-query";

const url = import.meta.env.VITE_SERVER_URL;

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

export const useVoteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: voteQuestion,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['selectedProposal'] });
    },
  });
};