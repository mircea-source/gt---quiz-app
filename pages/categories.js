import { useState } from 'react'
import Head from "next/head";
import Link from 'next/link';
import styles from "@/styles/Home.module.css";

import AddQuestionForm from '../components/AddQuestionForm';

function Categories() {
  // const categories = Object.keys(questionsData);
  return (
    <>
      <Head>
        <title>Chestionar GT</title>
        <meta name="description" content="Categorii chestionar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        className={styles.page}
      >
        <main className={styles.main}>
          <h1>Alege o categorie</h1>
          <div className={styles.footer}>
            <h3><Link href="/quiz/restapi">REST API</Link></h3> ⬤
            <h3><Link href="/quiz/nextjs">Next.js</Link></h3> ⬤
            <h3><Link href="/quiz/javascript">JavaScript</Link></h3>
          </div>

          <h2>Adaugă o întrebare nouă</h2>
          <AddQuestionForm />

          <h4><Link href="/">← Înapoi la prima pagină</Link></h4>
        </main>
      </div>
    </>
  );
}

export default Categories;