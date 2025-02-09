"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  // For Auth0
  const { user, error, isLoading } = useUser();

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div className={styles.page}>
      <ul className={styles.list}>
        <li className={styles.listItem}><button className={styles.button} onClick={handleClick}>Go to Example Usage</button></li>
        <li className={styles.listItem}><button className={styles.button} onClick={handleClickSongPosts}>Go to Public Songs</button></li>
        <li className={styles.listItem}><button className={styles.button} onClick={handleClickWorkspace}>Go to Workspace</button></li>
        <li className={styles.listItem}><button className={styles.button} onClick={khoaTest}>Khoa's Test</button></li>
        <a className={styles.link} href="/api/auth/login">Login</a>
        <a className={styles.link} href="/api/auth/logout">Logout</a>
      </ul>

      <div className={styles.titleContainer}>
        <h1 className={styles.title}> Slogan slogan slogan slogan </h1>
      </div>

      <div className={styles.genBarContainer}>
        <input type="text" placeholder="Generate sounds..." />
        <button type="submit">Submit</button>
      </div>
      {user ? (
        <div>
          <div>
            <img src={user.picture} alt={user.name} />
          </div>
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      ) : null}

    </div>

  );
}