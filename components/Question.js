import React, { useState } from 'react';

function Question({ question, selectedAnswer, onAnswerSelection }) {

  return (
    <div>
      <p>{question.question}</p>
      <div className="category">
        {question.options.map((option) => (
          <p key={option}>
            <input type="radio" name="answer" value={option} checked={selectedAnswer === option} onChange={() => onAnswerSelection(option)} />
            {option}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Question;