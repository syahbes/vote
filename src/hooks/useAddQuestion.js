import { useMutation, useQueryClient } from "@tanstack/react-query";

const url = import.meta.env.VITE_SERVER_URL;

const addQuestion = async (newQuestion) => {
  const response = await fetch(`${url}/api/questions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newQuestion),
  });

  if (!response.ok) {
    throw new Error('Failed to add question');
  }

  return response.json();
};

export const useAddQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addQuestion,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
};