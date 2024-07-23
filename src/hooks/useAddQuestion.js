import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBaseUrl } from "../utils/utils";

const url = getBaseUrl();

const addQuestion = async (newQuestion) => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${url}/api/question`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,      
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newQuestion),
  }); 

  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized access (e.g., token expired)
      throw new Error("Unauthorized access. Please log in again.");
    }
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