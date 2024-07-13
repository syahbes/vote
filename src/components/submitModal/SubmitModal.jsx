import React, { useState } from 'react';
import './index.css';
import { SquarePlus } from 'lucide-react';

const SubmitProposal = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className='submit-modal-overlay'>
      

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
      <button className="vote-button">Vote</button>
          </div>
    </div>
  );
};

export default SubmitProposal;