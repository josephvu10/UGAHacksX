"use client";
import React from "react";
import styles from "./genBar.module.css";
import { useRouter } from 'next/navigation';

const GenBar = () => {
  const router = useRouter();
  
  const handleClick = () => {
    router.push('pages/exampleUsage');
  };

  return (
    <div className={styles.genContainer}>
      <input type="text" placeholder="Generate sounds..." />
      <button type="submit">Submit</button>
    </div>
  );
};

export default GenBar;