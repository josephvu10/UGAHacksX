import React, { useEffect, useState } from "react";
import styles from "./SongPostCard.module.css";
interface SongPostCardProps {
  title: string;
  authorName: string;
  genre: string;
  image: string;
  audio: string;
  prompt: string;
}

const SongPostCard: React.FC<SongPostCardProps> = ({
  title,
  authorName,
  genre,
  image,
  audio,
  prompt,
}) => {
  return (
    <div className={styles.songPostCard}>
      {image ? (
        <img src={image} alt={title} className={styles.songImage} />
      ) : (
        <p>Loading image...</p>
      )}

      <h2 className={styles.songTitle}>{title}</h2>
      <p className={styles.songAuthor}>by {authorName}</p>
      <p className={styles.songGenre}>
        <span className={styles.genreLabel}>Genre: </span>
        <span className={styles.genreValue}>{genre}</span>
      </p>

      {audio ? (
        <audio controls className={styles.audioPlayer}>
          <source src={audio} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>Loading audio...</p>
      )}

      <p className={styles.songPrompt}>Prompt: {prompt}</p>
    </div>
  );
};

export default SongPostCard;