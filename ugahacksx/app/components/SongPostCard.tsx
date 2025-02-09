import React, { useEffect, useState } from "react";
import styles from "./SongPostCard/SongPostCard.module.css";
interface SongPostCardProps {
  title: string;
  authorName: string;
  genre: string;
  image: string;
  audio: string;
  prompt: string;
  visibility: string;
}

const SongPostCard: React.FC<SongPostCardProps> = ({
  title,
  authorName,
  genre,
  image,
  audio,
  prompt,
  visibility,
}) => {
  
  return (
    <div className={styles.songPostCard}>
      {/* 🎵 Render Image (Show Loading if Not Ready) */}
      {image ? (
        <img src={image} alt={title} className={styles.songImage} />
      ) : (
        <p>Loading image...</p>
      )}

      <h2 className={styles.songTitle}>{title}</h2>
      <p className={styles.songAuthor}>by {authorName}</p>
      <p className={styles.songGenre}>Genre: {genre}</p>

      {/* 🎧 Render Audio Player (Show Loading if Not Ready) */}
      {audio ? (
        <audio controls className={styles.audioPlayer}>
          <source src={audio} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>Loading audio...</p>
      )}

      <p className={styles.songPrompt}>Prompt: {prompt}</p>
      <p className={styles.songVisibility}>Visibility: {visibility}</p>
    </div>
  );
};

export default SongPostCard;