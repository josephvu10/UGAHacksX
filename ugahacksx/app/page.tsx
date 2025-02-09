"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import NavBar from './components/NavBar/page'; // Import the NavBar component
import OIAUIA from './public/oia-uia.gif';

export default function Home() {

  return (
    <div className={styles.page}>

      <NavBar />
      <div className={styles.titleContainer}>
        <Image
          className={styles.image}
          src={OIAUIA}
          alt="oia-uia"
        />
        <h1 className={styles.title}> Slogan slogan slogan slogan </h1>
        <Image
          className={styles.image}
          src={OIAUIA}
          alt="oia-uia"
        />
      </div>

      <div className={styles.genBarContainer}>
        <input type="text" placeholder="Generate sounds..." />
        <button type="submit">Submit</button>
      </div>
    </div>
  );
}