"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import NavBar from './components/NavBar/page'; // Import the NavBar component
import OIAUIA from './public/oia-uia.gif';

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

  const handleGenerateSound = () => {
    if (!user) {
      // 🚀 Redirect to Auth0 Login if Not Logged In
      router.push('/api/auth/login');
    } else {
      // ✅ Redirect to Workspace if Already Logged In
      router.push('/pages/workspace');
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className={styles.page}>

      <NavBar />
      <div className={styles.titleContainer}>
        <h1 className={styles.title}> Express the Sound of Your Soul
        </h1>
      </div>

      <div className={styles.genBarContainer}>
        <input type="text" placeholder="Enter a prompt to express yourself..." />
        <button onClick={handleGenerateSound} type="button">Submit</button>
      </div>
      <div className={styles.descriptionContainer}>
        <p>Welcome to Sona!</p>
        <p>Sona is an app meant to help users express themselves through music. Insert a phrase, prompt, lyric, or poem and we will create audio, a title, and assign a genre for your piece of music.</p>
      </div>
    </div>
  );
}