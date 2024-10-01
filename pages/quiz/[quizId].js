import Head from "next/head";
import { useRouter } from 'next/router';
import { useState } from 'react';
import { quizData } from '../../data';
import Question from '../../components/Question';
import localFont from "next/font/local";
import styles from '@/styles/Quiz.module.css';

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function QuizPage({ quizId, quiz }) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  // const handleNextQuestion = () => {
  //   submitAnswer(selectedAnswer);
  //   // setScore(score + 1);
  //   if (currentQuestionIndex < quiz.questions.length - 1) {
  //     setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  //   } else {
  //     router.push('/categories');
  //   }
  // };

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
      alert(`Ai obținut ${score} puncte din ${quiz.questions.length - 1} posibile.`);
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
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <div>
            <h1>Chestionar {quizId}</h1>
            <Question
              question={quiz.questions[currentQuestionIndex]}
              onAnswerSelection={setSelectedAnswer}
            />
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