import { useState, useEffect } from 'react';
import Link from 'next/link';
import Question from '../../components/Question';

function QuizPage() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/questions');
        const apiQuestions = await response.json();

        let localStorageQuestions = [];
        if (typeof window !== 'undefined' && window.localStorage) {
          const storedQuestions = localStorage.getItem('questions');
          if (storedQuestions) {
            localStorageQuestions = JSON.parse(storedQuestions);
          }
        }

        const combinedQuestions = [...apiQuestions, ...localStorageQuestions];
        setQuestions(combinedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <h1>Chestionar</h1>
        {questions.map((question, index) => (
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