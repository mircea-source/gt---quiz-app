import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Question from './Question';

function QuizPage() {
  const [questions, setQuizData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/questions');
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
      fetchData();
    }, []);

  return (
    <>
      <div>
        <h1>Chestionar {quizId}</h1>
        {quiz.questions.map((question, index) => (
          <Question key={index} question={question} />
        ))}
      </div>
      <div>
        <h4><Link href="/">← Înapoi la prima pagină</Link></h4>
      </div>
    </>
  );
}

export default QuizPage;