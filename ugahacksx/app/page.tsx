"use client";
import Image from "next/image";
import styles from "./page.module.css";
import GenBar from "./components/genBar/page";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('pages/exampleUsage');
  };

  const handleClickSongPosts = () => {
    router.push('pages/songPosts');
  };

  const handleClickWorkspace = () => {
    router.push('pages/workspace');
  };

  //we should make this the homepage with the slogan and make it similar to the Suno homepage
  const khoaTest = () => {
    router.push('/khoaTest');
  }
  return (
    <div className={styles.page}>
      <ul className= {styles.list}>
      <li className={styles.listItem}><button className={styles.button} onClick={handleClick}>Go to Example Usage</button></li>
      <li className={styles.listItem}><button className={styles.button} onClick={handleClickWorkspace}>Go to Blog</button></li>
      <li className={styles.listItem}><button className={styles.button} onClick={handleClickWorkspace}>Go to Workspace</button></li>
      <a className={styles.link} href="/api/auth/login">Login</a>
      <a className={styles.link} href="/api/auth/logout">Logout</a>
      </ul>

      <div className = {styles.titleContainer}> 
      <h1 className={styles.title}> Slogan slogan slogan slogan </h1>
      </div>

      <div className={styles.genBarContainer}>
        <GenBar />
      </div>

    </div>
  );
}