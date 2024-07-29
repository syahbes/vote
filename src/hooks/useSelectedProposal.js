import { useQuery } from "@tanstack/react-query";
import { getBaseUrl } from "../utils/utils";
import { getAuthToken, handleForbiddenAccess } from "../utils/auth";

const url = getBaseUrl();

const fetchSelectedProposal = async (id) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error("failed to fetch proposal. no token found.");
  }

  const response = await fetch(`${url}/api/question/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // Unauthorized access
  if (response.status === 403) {
    handleForbiddenAccess();
    throw new Error("failed to fetch proposal. unauthorized access.");
  }
  if (!response.ok) {
    throw new Error("failed to fetch proposal. response not ok.");
  }

  return response.json();
};

export const useSelectedProposal = (id) => {
  return useQuery({
    queryKey: ["selectedProposal", id],
    queryFn: () => fetchSelectedProposal(id),
    enabled: !!id,
  });
};
