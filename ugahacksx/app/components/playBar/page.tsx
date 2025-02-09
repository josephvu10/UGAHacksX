"use client";
import React from "react";
import styles from "./playBar.module.css";
import { useRouter } from "next/navigation";
import PLAY from '../../public/playButton.png';
import HEART from '../../public/heart1.jpg';
import PLUS from '../../public/plus.png';
import Image from "next/image";

const PlayBar = () => {
    return (
     
        <footer className={styles.workfooter}>
        <Image 
        className={styles.image}
        src={PLAY}
        alt="play button"
        width={50}
        height={50}
      />
      
      <div className="playbackBar">
          <span className="current-time">00:00</span>
          <input
        type="range"
        min="0"
        max="100"
        className={styles.progressBar}
        step="1"
          />
          <span className="curt-time">0:30</span>
        </div>

        <Image 
        className={styles.image}
        src={HEART}
        alt="heart"
        width={70}
        height={70}
      />
      <Image 
        className={styles.image}
        src={PLUS}
        alt="plus"
        width={50}
        height={50}
      />
     </footer>
    );
};
export default PlayBar;