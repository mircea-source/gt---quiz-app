import { useRouter } from 'next/router';

export default function Question() {
  const router = useRouter();
  const { quizId, questionId } = router.query;

  const quizData = {
    restApi: {
      questions: [
        {
          question: "Care este metoda HTTP folosită în principal pentru a obține date de la un server?",
          options: ["POST", "PUT", "GET"],
          correctAnswer: "GET"
        },
        {
            question: "Ce reprezintă status code-ul 404 în contextul unui răspuns HTTP?",
            options: ["Resursa a fost creată cu succes.", "Resursa solicitată nu a fost găsită.", "A apărut o eroare internă a serverului."],
            correctAnswer: "Resursa solicitată nu a fost găsită."
          },{
            question: "Ce este un endpoint într-un API REST?",
            options: ["Un server care găzduiește API-ul.", "Un URL specific care permite interacțiunea cu o resursă.", "Un format de date folosit pentru a reprezenta resursele."],
            correctAnswer: "Un URL specific care permite interacțiunea cu o resursă."
          }
      ]
    },
    nextJs: {
        questions: [
            {
              question: "Care este principalul avantaj al utilizării Next.js în comparație cu React tradițional?",
              options: ["Generarea statică a paginilor, îmbunătățind performanța SEO.", "Eliminarea completă a JavaScript-ului din aplicație.", "O mai mare complexitate în configurare."],
              correctAnswer: "Generarea statică a paginilor, îmbunătățind performanța SEO."
            },
            {
                question: "Ce este un <code>data fetching method</code> în Next.js?",
                options: ["O modalitate de a stiliza componentele.", "O metodă de a aduce date pe o pagină, cum ar fi getStaticProps sau getServerSideProps.", "Un instrument pentru depanarea aplicațiilor."],
                correctAnswer: "O metodă de a aduce date pe o pagină, cum ar fi getStaticProps sau getServerSideProps."
              },{
                question: "Care este diferența principală între getStaticProps și getServerSideProps?",
                options: ["getStaticProps se execută la build time, iar getServerSideProps se execută la fiecare request.", "getStaticProps este folosit doar pentru paginile dinamice.", "Nu există nicio diferență semnificativă între cele două."],
                correctAnswer: "getStaticProps se execută la build time, iar getServerSideProps se execută la fiecare request."
              }
          ]
    },
    javascript: {
        questions: [
            {
              question: "Ce tip de dată este <code>null</code> în JavaScript?",
              options: ["String", "Object", "Number"],
              correctAnswer: "Object"
            },
            {
                question: "Ce face funcția <code>console.log()</code> în JavaScript?",
                options: ["Afișează un mesaj de eroare în consolă.", "Afișează un mesaj în consola browserului.", "Oprește execuția scriptului."],
                correctAnswer: "Afișează un mesaj în consola browserului."
              },{
                question: "Ce este hoisting în JavaScript?",
                options: ["Procesul de ridicare a elementelor HTML în DOM.", "Comportamentul prin care declarațiile de variabile și funcții sunt mutate în partea de sus a scope-ului lor.", "O metodă de optimizare a codului."],
                correctAnswer: "Comportamentul prin care declarațiile de variabile și funcții sunt mutate în partea de sus a scope-ului lor."
              }
          ]
    }
  };

  const currentQuestion = quizData[quizId].questions.find(q => q.id === questionId);

  return (
    <div>
      <h2>Întrebarea {questionId}</h2>
      <p>{currentQuestion.question}</p>
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <input type="radio" name="answer" value={option.id} />
            {option.text}
          </li>
        ))}
      </ul>
      <button>Următoarea întrebare</button>
    </div>
  );
}