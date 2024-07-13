// src/hooks/useQuestions.js
import { useQuery } from "@tanstack/react-query";
const BASE_URL = "http://localhost:4227";

const fetchQuestions = async () => {
  const response = await fetch(`${BASE_URL}/api/questions`);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const useQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
  });
};
