import { useRouter } from 'next/router';
import Link from 'next/link';
import { quizData } from '../data';
import Question from './Question';

function QuizPage() {
  const router = useRouter();
  const { quizId } = router.query;
  const quiz = quizData[quizId];

  if (!quiz) {
    return <div>Niciun chestionar.</div>;
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