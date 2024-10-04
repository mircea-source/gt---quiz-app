import Head from "next/head";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { quizData } from '../../data';
import Question from '../../components/Question';
import styles from '@/styles/Quiz.module.css';

export default function QuizPage({ quizId, quiz }) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  const handleNextQuestion = () => {
    submitAnswer(selectedAnswer);

    if (selectedAnswer === quiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      console.log("Current question index:", currentQuestionIndex);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null); // Reset selected answer for the next question

    } else {
      router.push('/categories');
    }
  };

  const submitAnswer = (answer) => {
    console.log("Selected answer:", answer);
  };

  return (
    <>
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
            <Question
              question={quiz.questions[currentQuestionIndex]}
              onAnswerSelection={setSelectedAnswer}
            />
            <hr className={styles.primary} />
            <p>Punctaj: <strong>{score}</strong> din {quiz.questions.length - 1} puncte posibile.</p>
            <div className={styles.ctas}>
              <button onClick={handleNextQuestion} className={styles.primary}>Înainte →</button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const quizIds = Object.keys(quizData);
  const paths = quizIds.map((id) => ({ params: { quizId: id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const quiz = quizData[params.quizId];
  return { props: { quizId: params.quizId, quiz } };
}
