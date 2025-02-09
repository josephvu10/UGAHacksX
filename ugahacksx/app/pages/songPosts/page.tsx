"use client";

import React, { useEffect, useState } from "react";
import SongPostCard from "../../components/SongPostCard";
import NavBar from "../../components/NavBar/page";
import styles from "./songPosts.module.css";

interface SongData {
  title: string;
  authorName: string;
  genre: string;
  image: string;
  audio: string;
  prompt: string;
  visibility: string;
}

export default function SongPosts() {
  const [songs, setSongs] = useState<SongData[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<SongData[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("/api/pinata/songs");
        const data: SongData[] = await response.json();
        console.log("Fetched Songs:", data);
        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    const publicSongs = songs.filter(song => song.visibility === "public");
    setFilteredSongs(publicSongs);
  }, [songs]);

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <NavBar />
      </div>
      <div className={styles.header}>
        <h1 className={styles.title}>Public Songs</h1>
      </div>
      <div className={styles.songList}>
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => (
            <div className={styles.cardWrapper} key={index}>
              <SongPostCard
                title={song.title}
                authorName={song.authorName}
                genre={song.genre}
                image={song.image}
                audio={song.audio}
                prompt={song.prompt}
              />
            </div>
          ))
        ) : (
          <p>Fetching Public Songs...</p>
        )}
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}