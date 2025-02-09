"use client";

import Card from "../../components/WorkspaceCard"
import styles from "./workspace.module.css";
import GenBar from "../../components/genBar/page";
import NavBar from "../../components/NavBar/page";
import PlayBar from "../../components/playBar/page";


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
    <PlayBar />
    </div>
  );
}