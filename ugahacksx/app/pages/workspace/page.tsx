"use client";

import WorkspaceCard from "../../components/workspaceCard/page";
import styles from "./workspace.module.css";
import GenBar from "../../components/genBar/page";
import NavBar from "../../components/NavBar/page";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

interface SongData {
  title: string;
  authorName: string;
  genre: string;
  image: string;
  audio: string;
  prompt: string;
  visibility: string;
  userId: string; // Ensure backend sends userId (Auth0 sub)
}

export default function Workspace() {
  const [userSongs, setUserSongs] = useState<SongData[]>([]);
  const [songs, setSongs] = useState<SongData[]>([]);
  const { user, isLoading } = useUser();

  // Fetch all songs from API
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("/api/pinata");
        const data: SongData[] = await response.json();

        console.log("Fetched Songs:", data); // Debugging
        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  // Filter songs for logged-in user
  useEffect(() => {
    if (!isLoading && user && user.sub && songs.length > 0) {
      console.log("Filtering songs for user:", user.nickname);
      const filteredSongs = songs.filter(song => song.authorName === user.nickname);
      console.log("Filtered Songs:", filteredSongs); // Debugging
      setUserSongs(filteredSongs);
    }
  }, [user, songs, isLoading]);

  return (
    <div>
      <NavBar />

      <div className={styles.container1}>
        <h1 className={styles.title}>My Workspace</h1>
        <br />
      </div>

      <div className={styles.genBarContainer}>
        <GenBar />
      </div>

      <section className={styles.container2}>
        <h2>Create songs for your mood</h2>

        <div className={styles.songList}>
          {userSongs.length > 0 ? (
            userSongs.map((userSong, index) => (
              <WorkspaceCard
                key={index}
                title={userSong.title}
                authorName={userSong.authorName}
                genre={userSong.genre}
                imageCID={userSong.image}
                audioCID={userSong.audio}
                prompt={userSong.prompt}
                visibility={userSong.visibility}
              />
            ))
          ) : (
            <p>{songs.length > 0 ? "No songs found for your account." : "Fetching Your Songs..."}</p>
          )}
        </div>
      </section>
    </div>
  );
}