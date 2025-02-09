"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('pages/exampleUsage');
  };

  const handleClickBlog = () => {
    router.push('pages/blogHome');
  };

  const handleClickWorkspace = () => {
    router.push('pages/workspace');
  }


  return (
    <div className={styles.page}>
      <ul className= {styles.list}>
      <li className={styles.listItem}><button className={styles.button} onClick={handleClick}>Go to Example Usage</button></li>
      <li className={styles.listItem}><button className={styles.button} onClick={handleClickBlog}>Go to Blog</button></li>
      <li className={styles.listItem}><button className={styles.button} onClick={handleClickWorkspace}>Go to Workspace</button></li>
      <a className={styles.link} href="/api/auth/login">Login</a>
      <a className={styles.link} href="/api/auth/logout">Logout</a>
      </ul>

      <div className = {styles.titleContainer}> 
      <h1 className={styles.title}> Slogan slogan slogan slogan </h1>
      </div>

        <div className={styles.genBarContainer}>
          <input type="text" placeholder="Generate sounds..." />
          <button type="submit">Submit</button>
      </div>

    </div>

  );
}