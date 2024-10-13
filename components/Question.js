import React, { useState } from 'react';

function Question({ question, selectedAnswer, onAnswerSelection }) {

  return (
    <div>
      <p>{question.question}</p>
      <div className="category">
        {question.options.map((option) => (
<<<<<<< HEAD
          <label key={option} style={{ display: 'block' }}>
            <input type="radio" name="answer" value={option} checked={selectedAnswer === option} onChange={() => handleAnswerClick(option)} />
=======
          <p key={option}>
            <input type="radio" name="answer" value={option} checked={selectedAnswer === option} onChange={() => onAnswerSelection(option)} />
>>>>>>> 34d088c612181b6bf418e74045b5ca70e83b1308
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Question;