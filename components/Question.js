import React from 'react';

function Question({ question, selectedAnswer, onAnswerSelection }) {
  return (
    <div>
      <p>{question.question}</p>
      <div className="category">
        {question.options.map((option) => (
          <label key={option} style={{ display: 'block' }}>
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswerSelection(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Question;