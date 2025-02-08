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


  //we should make this the homepage with the slogan and make it similar to the Suno homepage
  return (
    <div className={styles.page}>
      <button onClick={handleClick}>Go to Example Usage</button>
      <button onClick={handleClickBlog}>Go to Blog</button> 
    </div>
  );
}