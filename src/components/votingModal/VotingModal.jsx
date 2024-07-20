import React, { useState } from "react";
import { Clock } from "lucide-react";
import "./index.css";
import { getFormattedWalletAddress, getTimeRemaining } from "../../utils/utils";
import { useSelectedProposal } from "../../hooks/useSelectedProposal";
import { useVoteQuestion } from "../../hooks/useVote";
import { useWeb3Context } from "../../main";

const VotingModal = ({ show, onClose, questionId, openStatsModal }) => {
  const { web3State } = useWeb3Context();
  const [selectedOption, setSelectedOption] = useState(null);
  
  if (!show) return null;
  
  const {
    isPending: isSelectedProposalLoading,
    error: selectedProposalError,
    data: fetchedSelectedProposal,
  } = useSelectedProposal(questionId);
  const voteQuestionMutation = useVoteQuestion(web3State?.userAddress);

  if (isSelectedProposalLoading) {
    return <div>Loading...</div>;
  }

  if (selectedProposalError) {
    return <div>Error: {selectedProposalError.message}</div>;
  }

  const handleVote = async () => {
    if (!selectedOption) {
      alert("Please select an option");
      return;
    }

    if (!web3State?.isConnected) {
      alert("Please connect your wallet");
      return;
    }
    try {
      await voteQuestionMutation.mutateAsync({
        option_id: selectedOption.option_id,
      });
      console.log("Voted successfully");
      onClose();
      openStatsModal();
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const createdBy =
    fetchedSelectedProposal?.category === "Team"
      ? "Team"
      : getFormattedWalletAddress(fetchedSelectedProposal?.question_created_by);
  const timeRemaining = getTimeRemaining(
    fetchedSelectedProposal?.end_voting_time
  );
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2 className="modal-title">
          {fetchedSelectedProposal?.question_text}
        </h2>
        <div className="meta">
          <div className="created-by">
            <span>Created By</span>
            <div className="created-by-avatar">
              <img
                src={fetchedSelectedProposal?.avatar}
                alt="Team"
                className="team-icon"
              />
              <span>{createdBy}</span>
            </div>
          </div>
        </div>
        <div className="voting-options">
          {fetchedSelectedProposal?.options?.map((option) => (
            <button
              key={option?.option_id}
              className={`vote-option ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => setSelectedOption(option)}>
              {option?.option_text}
            </button>
          ))}
        </div>
        <button
          className="vote-button"
          onClick={handleVote}
          disabled={voteQuestionMutation.isPending}>
          {voteQuestionMutation.isPending ? "Voting..." : "Vote"}
        </button>
        <div className="time-remaining">
          <div className="clock-icon-stack">
            <Clock size={16} />
            <span>{timeRemaining}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingModal;
