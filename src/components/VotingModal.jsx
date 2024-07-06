import React, { useState } from "react";
import { Clock } from "lucide-react";

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
        <div className="created-by">
          <span>Created By</span>
          <div className="creator-info">
            <img src={createdByAvatar} alt="Avatar" className="avatar" />
            <span>{createdBy}</span>
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

const styles = `
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .modal-content {
    background-color: #1e1e1e;
    border-radius: 8px;
    padding: 24px;
    width: 100%;
    max-width: 440px;
  }

  .modal-title {
    color: white;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .created-by {
    color: #a0a0a0;
    font-size: 14px;
    margin-bottom: 16px;
  }

  .creator-info {
    display: flex;
    align-items: center;
    margin-top: 4px;
  }

  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .voting-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-bottom: 30px;
  }

  .vote-option {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border-radius: 9999px;
    border: 1px solid #4a4a4a;
    background-color: transparent;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .vote-option.selected {
    background-color: #ff1493;
    border-color: #ff1493;
  }

  .vote-button {
    width: 100%;
    background-color: #ff1493;
    color: white;
    padding: 12px;
    border-radius: 9999px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 16px;
  }

  .time-remaining {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a0a0a0;
    font-size: 14px;
  }

  .clock-icon-stack {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    gap: 4px;
    width: 100%;
  }

  .time-remaining svg {
    margin-right: 8px;
  }
`;

export default ({
  question,
  createdBy,
  createdByAvatar,
  timeRemaining,
  onClose,
  votingOption,
}) => (
  <>
    <style>{styles}</style>
    <VotingModal
      onClose={onClose}
      question={question}
      createdBy={createdBy}
      timeRemaining={timeRemaining}
      votingOption={votingOption}
      createdByAvatar={createdByAvatar}
    />
  </>
);
