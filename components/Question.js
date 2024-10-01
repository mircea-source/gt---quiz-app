import React, { useState } from 'react';

function Question({ question, onAnswerSelection }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    onAnswerSelection(answer);
  };

  return (
    <div>
      <p>{question.question}</p>
      <div className="category">
        {question.options.map((option) => (
          <p key={option}>
            <input type="radio" name="answer" value={option} checked={selectedAnswer === option} onChange={() => handleAnswerClick(option)} />
            {option}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Question;