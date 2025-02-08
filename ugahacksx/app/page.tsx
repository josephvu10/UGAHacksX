"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/exampleUsage');
  };

  return (
    <div className={styles.page}>
      <button onClick={handleClick}>Go to Example Usage</button>
    </div>
  );
}
