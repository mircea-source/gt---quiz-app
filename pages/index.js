import { useEffect, useState } from 'react';
import Head from "next/head";
import Link from 'next/link';
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/questions.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Debugging log
        const categoryNames = Object.keys(data.category);
        setCategories(categoryNames);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <>
      <Head>
        <title>Chestionar GT</title>
        <meta name="description" content="Workout - Quiz app 3 - Modulul 9" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Chestionar cunoștințe generale</h1>
          <p className="category">
            Întrebările sunt grupate pe {categories.length} categorii:&nbsp;
            {categories.map((category, index) => (
              <span key={index}>
                <Link href={`/quiz/${category}`}>{category}</Link>
                {index < categories.length - 1 && ', '}
              </span>
            ))}
          </p>
          <p>Există doar o singură variantă corectă de răspuns pentru fiecare întrebare.
            <br/>Se poate adăuga o întrebare suplimentară, care va fi afișată după încheierea chestionarului.</p>
          <p>Alege o categorie sau începe chestionarul apăsând butonul Start.</p>
          <div className={styles.ctas}>
            <Link href="/categories" className={styles.primary}>Start</Link>
          </div>
        </main>
        <footer className={styles.footer}>
        {categories.map((category, index) => (
              <span key={index}>
                <Link href={`/quiz/${category}`}>{category}</Link>
              </span>
            ))}
        </footer>
      </div>
    </>
  );
}
