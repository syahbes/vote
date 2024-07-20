import { useQuery } from "@tanstack/react-query";
import { getBaseUrl } from "../utils/utils";
const url = getBaseUrl();
//public - get all questions
const fetchQuestions = async () => {
  const response = await fetch(`${url}/api/questions`);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const useQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
  });
};
