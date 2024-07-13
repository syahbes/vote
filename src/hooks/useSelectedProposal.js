// src/hooks/useSelectedProposal.js
import { useQuery } from "@tanstack/react-query";
const BASE_URL = "http://localhost:4227";

const fetchSelectedProposal = async (id) => {
  const response = await fetch(`${BASE_URL}/api/questions/${id}`);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const useSelectedProposal = (id) => {
  return useQuery({
    queryKey: ["selectedProposal", id],
    queryFn: () => fetchSelectedProposal(id),
    enabled: !!id,
  });
};
