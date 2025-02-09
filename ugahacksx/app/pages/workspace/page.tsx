"use client";

import Card from "../../components/WorkspaceCard"
import styles from "./workspace.module.css";
import GenBar from "../../components/genBar/page";
import NavBar from "../../components/NavBar/page";
import PLAY from '../../public/playButton.png';
import HEART from '../../public/heart1.jpg';
import Image from "next/image";

export default function Workspace() {
  return (
    <div>

      <NavBar />

      <div className = {styles.container1}>
        <h1 className={styles.title}>My Workspace</h1>
        <br></br>
      </div>

      <div className={styles.genBarContainer}>
        <GenBar />
      </div>

    <section className = {styles.container2}>
    <h2>Create songs for your mood</h2>
    </section>
    
    <footer className={styles.workfooter}>

        <Image 
        className={styles.image}
        src={PLAY}
        alt="play button"
        width={50}
        height={50}
      />
      <Image 
        className={styles.image}
        src={HEART}
        alt="heart"
        width={70}
        height={70}
      />
      <div className="playback-bar">
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
     </footer>
    </div>
  );
}