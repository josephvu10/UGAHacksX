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

  //we should make this the homepage with the slogan and make it similar to the Suno homepage
  const khoaTest = () => {
    router.push('/khoaTest');
  }
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
        <Image
          className={styles.image}
          src={OIAUIA}
          alt="oia-uia"
        />
        <h1 className={styles.title}> Express the Sound of Your Soul
        </h1>
        <Image
          className={styles.image}
          src={OIAUIA}
          alt="oia-uia"
        />
      </div>

      <div className={styles.genBarContainer}>
        <input type="text" placeholder="Generate sounds..." />
        <button onClick={handleGenerateSound} type="button">Submit</button>
      </div>
    </div>
  );
}