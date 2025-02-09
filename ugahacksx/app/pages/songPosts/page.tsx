'use client'

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

export default function songPosts() {
  const [songs, setSongs] = useState<SongData[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
       // Fetch song data from backend API
       const response = await fetch("/api/pinata");
       const data: SongData[] = await response.json();

       // Update state
       setSongs(data);
      
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    
    fetchSongs();
  }, []);

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.header}>
        <h1 className={styles.title}>Public Songs</h1>
      </div>
      <div className={styles.songList}>
        {songs.length > 0 ? (
          songs.map((song, index) => (
          <SongPostCard
          key={index}
          title={song.title}
          authorName={song.authorName}
          genre={song.genre}
          image={song.image}  // Pass Image CID
          audio={song.audio}  // Pass Audio CID
          prompt={song.prompt}
          visibility={song.visibility}
          />
          ))
        ) : (
          <p>Fetching Public Songs...</p>
        )}
      </div>
    </div>
  );
}
