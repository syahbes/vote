import React from "react";
import { Clock } from "lucide-react";
import "./index.css";
import { getFormattedWalletAddress, getTimeRemaining } from "../../utils/utils";
import { useSelectedProposal } from "../../hooks/useSelectedProposal";

const StatsModal = ({ show, onClose, questionId }) => {
  const {
    isPending: isSelectedProposalLoading,
    error: selectedProposalError,
    data: fetchedSelectedProposal,
  } = useSelectedProposal(questionId);

  if (!show) return null;

  if (isSelectedProposalLoading) {
    return <div style={{ display: "none" }} />;
  }

  if (selectedProposalError) {
    return <div>Error: {selectedProposalError.message}</div>;
  }

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
    <div className="stats-modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2 className="modal-title">
          {fetchedSelectedProposal?.question_text}
        </h2>
        <div className="meta">
          <div className="created-by">
            Created By:
            <img
              src={fetchedSelectedProposal?.avatar}
              alt="Team"
              className="team-icon"
            />
            <span>{createdBy}</span>
          </div>
        </div>
        <div className="voting-options">
          {fetchedSelectedProposal?.options.map((option) => (
            <div key={option.option_id} className="vote-option">
              <div
                className="vote-bar-wrapper"
                style={{ maxWidth: `${option.vote_percentage}%` }}>
                <div className="vote-bar" />
              </div>
              <span
                className="vote-text"
                style={{
                  color: option.vote_percentage > 40 ? "#1e1e1e" : "white",
                }}>
                {option.option_text}
              </span>
              <span
                className="vote-percentage"
                style={{
                  color: option.vote_percentage > 90 ? "#1e1e1e" : "white",
                }}>
                {option.vote_percentage}%
              </span>
            </div>
          ))}
        </div>
        <div className="time-remaining">
          <Clock size={16} />
          <span>{timeRemaining}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsModal;
