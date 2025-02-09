'use client'

import React, { useEffect, useState } from "react";
import SongPostCard from "../../components/SongPostCard";
import NavBar from "../../components/NavBar/page";
import styles from "./songPosts.module.css";

interface SongData {
  title: string;
  author: string;
  genre: string;
  imageCID: string;
  audioCID: string;
  prompt: string;
  visibility: string;
}

export default function songPosts() {
  const [songs, setSongs] = useState<SongData[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        // Fetch song data from Pinata or backend
        const response = await fetch("/api/songs"); // Replace with your actual API
        const data: SongData[] = await response.json();
        
        // Filter songs with visibility set to "public"
        const publicSongs = data.filter(song => song.visibility === "public");
        setSongs(publicSongs);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    
    fetchSongs();
  }, []);

  return (
    <div className={styles.container}>
      <NavBar />
      <h1 className={styles.pageTitle}>Public Songs</h1>
      <div className={styles.songList}>
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <SongPostCard key={index} {...song} />
          ))
        ) : (
          <p>No public songs available.</p>
        )}
      </div>
    </div>
  );
}
