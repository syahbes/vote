import React, { useState } from "react";
import { Clock } from "lucide-react";
import "./index.css";
import { getTimeRemaining } from "../../utils/utils";
import { useSelectedProposal } from "../../hooks/useSelectedProposal";

const VotingModal = ({ onClose, questionId }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const {
    isPending: isSelectedProposalLoading,
    error: selectedProposalError,
    data: fetchedSelectedProposal,
  } = useSelectedProposal(questionId);

  if (isSelectedProposalLoading) {
    return <div>Loading...</div>;
  }

  if (selectedProposalError) {
    return <div>Error: {selectedProposalError.message}</div>;
  }

  const handleVote = () => {
    // Handle the voting logic here
    console.log("Voted:", selectedOption);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const createdBy =
    fetchedSelectedProposal?.category === "Team"
      ? "Team"
      : fetchedSelectedProposal?.question_created_by.slice(0, 6) +
        "..." +
        fetchedSelectedProposal?.question_created_by.slice(-4);
  const timeRemaining = getTimeRemaining(fetchedSelectedProposal?.end_time);

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2 className="modal-title">{fetchedSelectedProposal?.question_text}</h2>
        <div className="meta">
          <div className="created-by">
            <span>Created By</span>
            <div className="created-by-avatar">
              <img src={fetchedSelectedProposal?.avatar} alt="Team" className="team-icon" />
              <span>{createdBy}</span>
            </div>
          </div>
        </div>
        <div className="voting-options">
          {fetchedSelectedProposal?.options.map((option) => (
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
        <button className="vote-button" onClick={handleVote}>
          Vote
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
