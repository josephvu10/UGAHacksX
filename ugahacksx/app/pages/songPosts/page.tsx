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
  const [filteredSongs, setFilteredSongs] = useState<SongData[]>([]); // Stores only public songs

  // Fetch all songs from the API
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("/api/pinata");
        const data: SongData[] = await response.json();

        console.log("Fetched Songs:", data); // Debugging output

        setSongs(data); // Store all songs
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  // Filter only public songs
  useEffect(() => {
    const publicSongs = songs.filter(song => song.visibility === "public");
    setFilteredSongs(publicSongs);
  }, [songs]); // Runs when `songs` updates

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.header}>
        <h1 className={styles.title}>Public Songs</h1>
      </div>
      <div className={styles.songList}>
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => (
            <SongPostCard
              key={index}
              title={song.title}
              authorName={song.authorName}
              genre={song.genre}
              image={song.image} // Pass Image CID
              audio={song.audio} // Pass Audio CID
              prompt={song.prompt}
              visibility={song.visibility}
            />
          ))
        ) : (
          <p>Fetching Public Songs...</p>
        )}
      </div>
      <div className={styles.footer}></div>
    </div>
  );
}