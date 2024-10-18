import Head from "next/head";
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Quiz.module.css';
import questionsData from '../../public/questions.json';

export default function Quiz() {
  const router = useRouter();
  const { quizId } = router.query;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  if (!quizId || !questionsData.category[quizId]) {
    return <p>Invalid quiz category</p>;
  }

  const questions = questionsData.category[quizId].questions;
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
    setShowAnswer(true);
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setSelectedAnswer('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Gata. Ai terminat chestionarul. Felicitări! Scorul tău este: ${score}/${questions.length}`);
      router.push('/');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Chestionar GT</title>
        <meta name="description" content="Chestionar GT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <div>
            <h1>Chestionar {quizId}</h1>
            <p>{currentQuestion.question}</p>
            <div>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className={styles.option}>
                  <label>
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() => handleOptionClick(option)}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
            <div className={styles.ctas}>
              {showAnswer && (
                <div>
                  <hr className={styles.primary} />
                  <p>
                    {selectedAnswer === currentQuestion.correctAnswer
                      ? 'Răspuns corect!'
                      : `Răspuns greșit! Răspunsul corect este: ${currentQuestion.correctAnswer}`}
                  </p>
                  <button onClick={handleNextQuestion} className={styles.primary}>Înainte →</button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
