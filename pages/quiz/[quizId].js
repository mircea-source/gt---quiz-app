import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import styles from '../../styles/Quiz.module.css'; // Adjust the path as necessary

export default function Quiz({ initialQuestions }) {
  const router = useRouter();
  const { quizId } = router.query;
  const [questions, setQuestions] = useState(initialQuestions || []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const allQuestions = JSON.parse(localStorage.getItem('questions')) || [];
      const categoryQuestions = allQuestions.filter(q => q.category.toLowerCase() === quizId.toLowerCase());
      setQuestions(categoryQuestions);
    }
  }, [quizId]);

  if (!quizId || questions.length === 0) {
    return <p>Invalid quiz category or no questions available</p>;
  }

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
          <h1>{quizId} Quiz</h1>
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
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { quizId } = context.params;
  const filePath = path.join(process.cwd(), 'public', 'questions.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const questionsData = JSON.parse(fileContents);
  const initialQuestions = questionsData.category[quizId]?.questions || [];

  return {
    props: {
      initialQuestions,
    },
  };
}
