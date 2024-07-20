import { useQuery } from "@tanstack/react-query";
import { getBaseUrl } from "../utils/utils";

const url = getBaseUrl();
const token = localStorage.getItem("authToken");

const fetchSelectedProposal = async (id) => {
  // Retrieve the token from localStorage

  const response = await fetch(`${url}/api/question/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Handle unauthorized access (e.g., token expired)
      throw new Error("Unauthorized access. Please log in again.");
    }
    throw new Error("failed to fetch proposal.");
  }

  return response.json();
};

export const useSelectedProposal = (id) => {
  return useQuery({
    queryKey: ["selectedProposal", id],
    queryFn: () => fetchSelectedProposal(id),
    enabled: !!id,
    // Add error handling
    onError: (error) => {
      console.error("Error fetching proposal:", error);
      // You can add additional error handling here, such as showing a notification to the user
    },
  });
};
