"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const examplePush = () => {
    router.push('/exampleUsage');
  };

  const khoaTest = () => {
    router.push('/khoaTest');
  }
  return (
    <div className={styles.page}>
      <button onClick={examplePush}>Go to Example Usage</button>
      <button onClick={khoaTest}>Go to Khoa Test</button>
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>

    </div>
  );
}
