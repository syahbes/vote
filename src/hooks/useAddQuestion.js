import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBaseUrl } from "../utils/utils";
import { getAuthToken, handleForbiddenAccess } from "../utils/auth";

const url = getBaseUrl();

const addQuestion = async (newQuestion) => {
  const token = getAuthToken();
  if (!token) { 
    throw new Error("failed to add question. no token found.");
  }

  const response = await fetch(`${url}/api/question`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,      
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newQuestion),
  }); 

  if (response.status === 403) {
    handleForbiddenAccess();
    throw new Error("Unauthorized access. Please log in again.");
  }
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