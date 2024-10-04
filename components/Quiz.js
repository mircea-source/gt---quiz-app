import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Question from './Question';

function QuizPage() {
  const router = useRouter();
  const { quizId } = router.query;
  const [setQuizData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/questions.json');
            const data = await response.json();
            setQuizData(data);
        };
        fetchData();
    }, []);

  if (!quiz) {
    return <div>Încărcare chestionar...</div>;
  }

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