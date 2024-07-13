import React, { useState } from "react";
import "./index.css";
import { SquarePlus } from "lucide-react";
import { useWeb3Context } from "../../main";
import { useAddQuestion } from "../../hooks/useAddQuestion"; // Import the new hook

function getRandomCardBg() {
  const backgrounds = ["/cardBg/cardbga.png", "/cardBg/cardbgb.png"];
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  return backgrounds[randomIndex];
}

const SubmitModal = ({ onClose }) => {
  const { web3State } = useWeb3Context();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const addQuestionMutation = useAddQuestion(); // Use the new hook

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleVote = async () => {
    if (!web3State?.isConnected) {
      alert("Please connect your wallet");
      return;
    }
    const createdBy = web3State?.userAddress;

    const endVotingTimestamp = Date.now() + 5 * 24 * 60 * 60 * 1000;
    const endVotingDate = new Date(endVotingTimestamp);
    const end_voting_time = endVotingDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const newQuestion = {
      question_text: question,
      question_title: question.split(" ").slice(0, 3).join(" "),
      question_bg: getRandomCardBg(),
      question_created_by: createdBy,
      options: options.map((option) => ({ option_text: option })),
      end_voting_time: end_voting_time,
    };

    try {
      await addQuestionMutation.mutateAsync(newQuestion);
      console.log("Question added successfully");
      setQuestion("");
      setOptions(["", ""]);
      onClose();
    } catch (error) {
      console.error("Failed to add question:", error);
      alert("Failed to add question. Please try again.");
    }
  };

  return (
    <div className="submit-modal-overlay" onClick={handleOverlayClick}>
      <div className="submit-proposal">
        <h2 className="title">SUBMIT PROPOSAL</h2>
        <div className="input-group">
          <label>Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question"
            className="input"
          />
        </div>
        <div className="input-group">
          <label>Options</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="input"
            />
          ))}
          <button onClick={addOption} className="add-option">
            Add option
            <SquarePlus size={16} />
          </button>
        </div>
        <button
          className="vote-button"
          onClick={handleVote}
          disabled={addQuestionMutation.isPending}>
          {addQuestionMutation.isPending ? "Submitting..." : "Vote"}
        </button>
      </div>
    </div>
  );
};

export default SubmitModal;
