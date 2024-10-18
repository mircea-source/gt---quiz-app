import Head from "next/head";
import Link from 'next/link';
import styles from "@/styles/Category.module.css";

import AddQuestionForm from '../components/AddQuestionForm';
import questionsData from '../public/questions.json';

function Categories() {
  // Extract categories from questionsData
  const categories = Object.keys(questionsData.category);

  return (
    <>
      <Head>
        <title>Chestionar GT</title>
        <meta name="description" content="Categorii chestionar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Alege o categorie</h1>
          <div className={styles.footer}>
            {categories.map((category) => (
              <div className={styles.ctas} key={category}>
                <Link className={styles.primary} href={`/quiz/${category}`}>{category}</Link>
              </div>
            ))}
          </div>

          <hr className={styles.primary} />

          <h2>Adaugă o întrebare suplimentară</h2>
          <AddQuestionForm categories={categories} />

          <h4><Link href="/">← Înapoi la prima pagină</Link></h4>
        </main>
      </div>
    </>
  );
}

export default Categories;