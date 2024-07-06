import React, { useState } from "react";
import { Clock } from "lucide-react";
import './index.css'

const VotingModal = ({
  onClose,
  question,
  createdBy,
  createdByAvatar,
  timeRemaining,
  votingOption,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

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
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <h2 className="modal-title">{question}</h2>
        <div className="meta">
          <div className="created-by">
            <span>Created By</span>
            <div className="created-by-avatar">
              <img src={createdByAvatar} alt="Team" className="team-icon" />
              <span>{createdBy}</span>
            </div>
          </div>
        </div>
        <div className="voting-options">
          {votingOption.map((option) => (
            <button
              key={option}
              className={`vote-option ${
                selectedOption === option ? "selected" : ""
              }`}
              onClick={() => setSelectedOption(option)}>
              {option}
            </button>
          ))}
        </div>
        <button className="vote-button" onClick={handleVote}>
          Vote
        </button>
        <div className="time-remaining">
          <div className="clock-icon-stack">
          <Clock size={16} />
          <span>{timeRemaining} remaining</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingModal;