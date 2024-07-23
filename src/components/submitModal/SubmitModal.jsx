import React, { useState } from "react";
import { SquarePlus } from "lucide-react";
import { useAddQuestion } from "../../hooks/useAddQuestion";
import { useAccount } from "wagmi";

import "./index.css";

const CATEGORIES = [
  {
    name: "Browser",
    bg: "1.png",
  },
  {
    name: "Domains",
    bg: "2.png",
  },
  {
    name: "Wallet",
    bg: "3.png",
  },
  {
    name: "Storage",
    bg: "4.png",
  },
  {
    name: "Depin",
    bg: "5.png",
  },
  {
    name: "General",
    bg: "6.png",
  },
  {
    name: "Website",
    bg: "7.png",
  },
  {
    name: "CDN",
    bg: "8.png",
  },
  {
    name: "Compute",
    bg: "9.png",
  },
];

function getRandomCardBg() {
  const backgrounds = ["/cardBg/cardbga.png", "/cardBg/cardbgb.png"];
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  return backgrounds[randomIndex];
}

const getCategoryBg = (categoryName) => {
  const category = CATEGORIES.find((cat) => cat.name === categoryName);
  return category ? `/cardBg/${category.bg}` : getRandomCardBg();
};

const SubmitModal = ({ show, onClose }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].name);
  const addQuestionMutation = useAddQuestion();
  const { isConnected } = useAccount();

  if (!show) return null;

  const validToSubmit = () => {
    return question.length > 0 && options.every((option) => option.length > 0);
  };

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
    if (!isConnected) {
      alert("Please connect your wallet");
      return;
    }
    const endVotingTimestamp = Date.now() + 5 * 24 * 60 * 60 * 1000;
    const endVotingDate = new Date(endVotingTimestamp);
    const end_voting_time = endVotingDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const newQuestion = {
      question_text: question,
      question_title: question.split(" ").slice(0, 3).join(" "),
      question_bg: getCategoryBg(selectedCategory),
      options: options.map((option) => ({ option_text: option })),
      end_voting_time: end_voting_time,
    };

    try {
      await addQuestionMutation.mutateAsync(newQuestion);
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
          <div
            className="input-group"
            style={{ marginTop: "20px", padding: "0px" }}>
            <label>Category</label>
            <select
              className="input"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}>
              {CATEGORIES.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="vote-button"
          onClick={handleVote}
          disabled={addQuestionMutation.isPending || !validToSubmit()}>
          {addQuestionMutation.isPending ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default SubmitModal;
