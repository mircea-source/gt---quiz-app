import Head from "next/head";
import Link from 'next/link';
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Categories() {
    return (
      <>
      <Head>
        <title>Chestionar GT</title>
        <meta name="description" content="Categorii chestionar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <h1>Alege o categorie</h1>
          <div className={styles.footer}>
            <h3><Link href="/quiz/restapi">REST API</Link></h3> ⬤
            <h3><Link href="/quiz/nextjs">Next.js</Link></h3> ⬤
            <h3><Link href="/quiz/javascript">JavaScript</Link></h3>
          </div>
          <h4><Link href="/">← Înapoi la prima pagină</Link></h4>
        </main>
      </div>
      </>
    );
  }