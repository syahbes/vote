// src/hooks/useSelectedProposal.js
import { useQuery } from "@tanstack/react-query";
const url = import.meta.env.VITE_SERVER_URL;

const fetchSelectedProposal = async (id) => {
  const response = await fetch(`${url}/api/questions/${id}`);
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
