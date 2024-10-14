import Head from "next/head";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Question from '../../components/Question';
import styles from '@/styles/Quiz.module.css';

export default function QuizPage({ quizId, initialQuestions }) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quiz, setQuiz] = useState({ questions: initialQuestions });

  useEffect(() => {
    if (quizId && typeof window !== 'undefined' && window.localStorage) {
      const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
      const filteredQuestions = storedQuestions.filter(question => question.category === quizId);
      setQuiz({ questions: filteredQuestions });
    }
  }, [quizId]);

  const handleNextQuestion = () => {
    submitAnswer(selectedAnswer);

    if (selectedAnswer === quiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null); // Reset selected answer for the next question
    } else {
      router.push('/categories');
    }
  };

  const submitAnswer = (answer) => {
    console.log("Selected answer:", answer);
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  if (!quizId) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Chestionar GT</title>
        <meta name="description" content="Chestionar GT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        className={styles.page}
      >
        <main className={styles.main}>
          <div>
            <h1>Chestionar {quizId}</h1>
      {quiz.questions.length > 0 && (
        <Question
          question={quiz.questions[currentQuestionIndex]}
          selectedAnswer={selectedAnswer}
          onAnswerSelection={handleAnswerSelection}
        />
      )}
      <hr className={styles.primary} />
            <p>Punctaj: <strong>{score}</strong> din {quiz.questions.length - 1} puncte posibile.</p>
            <div className={styles.ctas}>
              <button onClick={handleNextQuestion} className={styles.primary}>Înainte →</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { quizId } = context.params;

  // Fetch questions from local storage or a database
  let initialQuestions = [];
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    initialQuestions = storedQuestions.filter(question => question.category === quizId);
  }

  return {
    props: {
      quizId,
      initialQuestions,
    },
  };
}
